'use client'
import React from 'react';
import { useGqlClient } from '@/hooks/UseGqlClient';
import { useMutation, useQuery } from 'graphql-hooks';
import InvoiceForm from './InvoiceForm';
import { toast } from 'react-hot-toast';
import { useParams, useRouter } from 'next/navigation';
import AuthConfig from '@/firebase/oauth.config';
import Loading from '@/app/loading';

const UPDATE_INVOICE = `
mutation UpdateInvoices($where: InvoiceWhere, $update: InvoiceUpdateInput) {
    updateInvoices(where: $where, update: $update) {
      invoices {
        id
      }
    }
  }
`

const GET_INVOICE_DATA = `
query Invoices($where: InvoiceWhere) {
    invoices(where: $where) {
      id
      taxType
      taxRate
      hasPurchase {
        itemName
        price
        quantity
      }
    }
  }
`



// component
const Main = () => {


    // hooks
    const client = useGqlClient()
    const { user } = AuthConfig()
    const router = useRouter()
    const params = useParams()


    // QUERY
    const { data: invoiceData, loading, error } = useQuery(GET_INVOICE_DATA, {
        client,
        variables: {
            where: {
                id: params.id || 'no id'
            }
        }
    })



    // MUTATION
    const [updateInvoiceFn, state] = useMutation(UPDATE_INVOICE, { client });


    // calculate total price
    const calculateTotalPrice = (purchases: any, taxRate: number) => {
        const allPriceArray = purchases.map((service: any, i: number) => {
            let price = service.price
            let quantity = service.quantity
            const totalPrice = parseInt(price) * parseInt(quantity)
            return totalPrice
        })
        const totalPrice = allPriceArray.reduce((a: number, b: number) => a + b, 0)
        const totalPriceWithTax = Math.floor(totalPrice + (totalPrice * taxRate / 100))

        return { totalPriceWithTax, totalPrice }
    }




    // initializing invoice creation function
    const updateInvoice = async (invoiceData: any) => {



        const taxRate = parseInt(invoiceData?.taxRate)
        const { totalPriceWithTax, totalPrice } = calculateTotalPrice(invoiceData.hasPurchase, taxRate)

        const { data } = await updateInvoiceFn({
            variables: {
                "where": {
                    "id": params.id || 'no id'
                },
                "update": {
                    "taxType": invoiceData.taxType,
                    "taxRate": taxRate,
                    "totalPrice": totalPrice,
                    "priceWithTax": totalPriceWithTax,
                    "status": "SENT",
                    isViewedByClient: false,
                    "hasPurchase": invoiceData.hasPurchase.map((item: any) => {
                        return {
                            "update": {
                                "node": {
                                    "itemName": item.itemName,
                                    "price": item.price,
                                    quantity: item.quantity
                                }
                            },
                            "where": {
                                "node": {
                                    "id": item.id
                                }
                            }
                        }
                    }),


                }
            }
        })

        if (data.updateInvoices.invoices[0].id) {
            toast.success('Invoice update successfully')
            router.push('/admin/dashboard/complains')
        }
    }

    if (loading || state.loading) return <Loading />

    // rendering
    return (
        <div>
            <InvoiceForm updateInvoice={updateInvoice} invoiceData={invoiceData?.invoices[0]} />
        </div>
    );
};

export default Main;