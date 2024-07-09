'use client'
import { useEffect, useState } from 'react';
import { useGqlClient } from '@/hooks/UseGqlClient';
import { useManualQuery, useMutation, useQuery } from 'graphql-hooks';
import React from 'react';
import InvoiceTable from './InvoiceTable';
import { toast } from 'react-hot-toast';
import Pagination from '@/components/Pagination';

const GET_INVOICES = `
query Query($where: InvoiceWhere, $options: InvoiceOptions) {
  invoices(where: $where, options: $options){
      id
      clientName
      clientEmail
      totalPrice
      priceWithTax
      expiryDate
      createdAt
      status
      ticket
      sentBy
      type
      isViewed
      hasClient {
        userIs {
          userId
          id
        }
      }
      
    }
  }`
const DELETE_INVOICES = `
mutation Mutation($where: InvoiceWhere) {
  deleteInvoices(where: $where) {
    nodesDeleted
  }
}`


const Main = () => {
  // search sates
  const [searchQuery, setSearchQuery] = useState('')
  const [fetchDirection, setFetchDirection] = useState('All')

  // pagination states
  const [pageLimit, setPageLimit] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [totalInvoice, setTotalInvoice] = useState(0)
  const [invoiceData, setInvoiceData] = useState<any>([])

  // hooks
  const client = useGqlClient()


  //quires 
  const [getInvoiceFn, invoiceDataState] = useManualQuery(GET_INVOICES, { client })

  // mutation
  const [deleteInvoiceFn, state] = useMutation(DELETE_INVOICES, { client });


  // refetching data based on pagination and search query
  useEffect(() => {
    let where
    where = {
      sentBy_IN: ["ADMIN", "VENDOR"],
      "isQuotation": true,
    }
    if (searchQuery) {
      where = {
        sentBy_IN: ["ADMIN", "VENDOR"],
        "isQuotation": true,
        "OR": [
          {
            ticket_CONTAINS: searchQuery
          },
          {
            "hasClient": {
              "userIs": {
                "userId_CONTAINS": searchQuery
              }
            },
          },
          {
            "vendorCreated": {
              "userIs": {
                "userId_CONTAINS": searchQuery
              }
            }
          }

        ]
      }
    }
    if (fetchDirection !== "All") {
      where = {
        sentBy_IN: ["ADMIN", "VENDOR"],
        "isQuotation": true,
        "status": fetchDirection
      }
    }

    getInvoiceData(where)
    getInvoiceCount()
  }, [currentPage, searchQuery, fetchDirection]);



  // initializing query and mutations

  const getInvoiceCount = async () => {
    const { data } = await getInvoiceFn({
      variables: {
        where: {
          sentBy_IN: ["ADMIN", "VENDOR"],
          "isQuotation": true,
        }
      }
    })
    if (data.invoices.length) {
      setTotalInvoice(data.invoices.length)
      setTotalPages(Math.ceil(data.invoices.length / pageLimit))
    }

  }

  const getInvoiceData = async (where: any, dic: string = "DESC") => {
    const { data } = await getInvoiceFn({
      variables: {
        where: where,
        options: {
          limit: pageLimit,
          offset: (currentPage - 1) * pageLimit,
          sort: [
            {
              createdAt: dic
            }
          ]
        }
      }
    })



    if (data.invoices.length) {
      setInvoiceData(data?.invoices)
    }
  }




  const deleteInvoice = async (id: any) => {
    const { data } = await deleteInvoiceFn({
      variables: {
        where: {
          id: id
        }
      }
    })

    if (data?.deleteInvoices?.nodesDeleted > 0) {
      toast.success('Invoice deleted successfully')
      getInvoiceData({ sentBy_IN: ["ADMIN", "VENDOR"], "isQuotation": true, })
    }
  }




  return (
    <>
      <div className="my-2 flex justify-end sm:flex-row flex-col mb-5">
        <div className="flex flex-row mb-1 sm:mb-0">

          <div className="relative">
            <select
              value={setFetchDirection as any}
              onChange={(e) => setFetchDirection(e.target.value)}
              // className=" h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block  w-full  bg-white border-gray-300  py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r text-xs  focus:border-gray-500  dark:bg-darkBg dark:border-darkBorder"
              className="form-control"
              style={{backgroundColor:'#e8e8e880'}}

             >
              <option value={"All"}>All</option>
              <option value={"CONFIRMED"}>CONFIRMED</option>
              <option value={"COMPLAINED"}>COMPLAINED</option>
              <option value={"SENT"}>SENT</option>
            </select>

          </div>
        </div>
        <div className="block relative">
          <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current text-gray-500">
              <path
                d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z">
              </path>
            </svg>
          </span>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            className="form-control"
            style={{backgroundColor:'#e8e8e880'}}

            // className="  sm:rounded-l-none border border-gray-300 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none" 
            />
        </div>
      </div>

      <div>
        <InvoiceTable data={invoiceData} deleteInvoice={deleteInvoice} />
        <div className='w-full flex items-center justify-center'>
          {totalInvoice! > pageLimit &&
            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />}

        </div>
      </div>

    </>

  );
};

export default Main;