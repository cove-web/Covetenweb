'use client'
import React, { useEffect, useState } from 'react';
import { useGqlClient } from '@/hooks/UseGqlClient';
import { useManualQuery, useMutation } from 'graphql-hooks';
import InvoiceForm from './InvoiceForm';

import { parse } from 'path';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import createLog from '@/shared/graphQl/mutations/createLog';
import AuthConfig from '@/firebase/oauth.config';
import { query } from 'firebase/firestore';
import { generateUniqueId } from '@/shared/genarateUniqueId';
import Loading from '@/app/loading';
import { getEmployerEmail } from '@/shared/getEmployerEmail';

const CREATE_INVOICE = `
mutation CreateInvoices($input: [InvoiceCreateInput!]!) {
    createInvoices(input: $input) {
      info {
        nodesCreated
        relationshipsCreated
      }
    }
  }
`
const GET_COUNTER = `
query 
Query {
    counters {
        invoiceCount
    }
  }`
const UPDATE_COUNTER = `
mutation UpdateCounters($update: CounterUpdateInput) {
    updateCounters(update: $update) {
      counters {
        invoiceCount
      }
    }
  }


  `
const SEND_NOTIFICATION = `
  mutation CreateNotifications($input: [NotificationCreateInput!]!) {
      createNotifications(input: $input) {
        info {
          nodesCreated
        }
      }
    }`

// component
const Main = () => {


    // states
    const [labEmail, setLabEmail] = useState('')

    // hooks
    const client = useGqlClient()
    const { user } = AuthConfig()
    const router = useRouter()


    // query
    const [counterFn, counterState] = useManualQuery(GET_COUNTER, { client })

    // mutations
    const [createInvoiceFn, state] = useMutation(CREATE_INVOICE, { client });
    const [updateCounterFn, updateState] = useMutation(UPDATE_COUNTER, { client })
    const [sendNotificationFn, notificationState] = useMutation(SEND_NOTIFICATION, { client })


    // calculate total price
    const calculateTotalPrice = (purchases: any, taxRate: number) => {
        const allPriceArray = purchases.map((service: any, i: number) => {
            let price = service[`serviceName${i}`].price
            let quantity = service[`serviceName${i}`].quantity
            const totalPrice = parseInt(price) * parseInt(quantity)
            return totalPrice
        })
        const totalPrice = allPriceArray.reduce((a: number, b: number) => a + b, 0)
        const totalPriceWithTax = Math.floor(totalPrice + (totalPrice * taxRate / 100))

        return { totalPriceWithTax, totalPrice }
    }


    // getting lab email if employee is logged in
    const getLabEmail = async (userEmail: string) => {
        const email = await getEmployerEmail(userEmail)
        setLabEmail(email)
    }


    // get lab email when user changes
    useEffect(() => {
        if (user?.email) {
            getLabEmail(user?.email)

        }
    }, [user?.email]);



    // initializing invoice creation function
    const createInvoice = async (invoiceData: any, purchases: any, company: any) => {

        const taxRate = parseInt(invoiceData?.taxRate)
        const { totalPriceWithTax, totalPrice } = calculateTotalPrice(purchases, taxRate)
        const ticketId = await getTicket()
        const { data } = await createInvoiceFn({
            variables: {
                input: [
                    {
                        totalPrice: totalPrice,
                        priceWithTax: totalPriceWithTax,
                        ticket: ticketId,
                        taxRate: taxRate,
                        sentBy: "VENDOR",
                        status: "SENT",
                        expiryDate: invoiceData.expiryDate,
                        taxType: invoiceData.taxType,
                        createdAt: new Date().toISOString(),
                        hsn: invoiceData.hns,
                        placeOfSupply: invoiceData.placeOfSupply,
                        subject: invoiceData.subject,
                        type: invoiceData.type,
                        vendorCreated: {
                            connect: {
                                where: {
                                    node: {
                                        userIs: {
                                            email: labEmail
                                        }
                                    }
                                }
                            }
                        },
                        hasPurchase: {
                            create: purchases.map((service: any, i: number) => {
                                let name = service[`serviceName${i}`].serviceName
                                let price = service[`serviceName${i}`].price
                                let quantity = service[`serviceName${i}`].quantity

                                return {
                                    node: {
                                        itemName: name,
                                        price: parseInt(price),
                                        quantity: parseInt(quantity)
                                    }
                                }
                            }
                            )
                        }

                    }
                ]
            }
        })

        if (data.createInvoices.info.nodesCreated) {
            toast.success('Invoice created successfully')
            router.push('/desktop_vendor/dashboard/invoice')
            sendNotification()
            createLog(
                `Invoice Creation`,
                `Invoice Sent to Admin by Vendor`,
            )
        }
    }



    const sendNotification = async () => {

        const { data: adminData } = await sendNotificationFn({
            variables: {
                "input": [
                    {
                        "title": `Vendor has sent a Estimation`,
                        "description": `Please check the estimation for more information .`,
                        "createdAt": new Date().toISOString(),
                        "notificationFor": "ADMIN",
                    }
                ]
            }
        })

    }


    const getTicket = async () => {
        const { data } = await counterFn()
        const counter = data?.counters[0]

        if (counter?.invoiceCount) {
            const invoiceCount = counter?.invoiceCount + 1
            const ticket = generateUniqueId("", invoiceCount)
            // updating project counter
            updateCounterFn({
                variables: {
                    update: {
                        invoiceCount: invoiceCount,
                    }
                }
            })

            return ticket
        }
        return null
    }



    if (state.loading || updateState.loading) return <Loading />

    // rendering
    return (
        <div>
            <InvoiceForm createInvoice={createInvoice} />
        </div>
    );
};

export default Main;