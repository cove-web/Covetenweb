'use client'
import { useEffect, useState } from 'react';
import { useGqlClient } from '@/hooks/UseGqlClient';
import { useManualQuery, useMutation, useQuery } from 'graphql-hooks';
import React from 'react';
import InvoiceTable from './InvoiceTable';
import { toast } from 'react-hot-toast';
import Pagination from '@/components/Pagination';
import ViewModal from './ViewModal';
import AuthConfig from '@/firebase/oauth.config';
import createLog from '@/shared/graphQl/mutations/createLog';

const GET_INVOICES = `
query Query($where: InvoiceWhere, $options: InvoiceOptions) {
  invoices(where: $where, options: $options){
      id
      clientName
      clientEmail
      totalPrice
      status
      ticket
      complain
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
  const [isOpen, setIsOpen] = useState(false);
  const [currentComplain, setCurrentComplain] = useState<any>('')

  // search sates
  const [searchQuery, setSearchQuery] = useState('')
  const [fetchDirection, setFetchDirection] = useState('DESC')

  // pagination states
  const [pageLimit, setPageLimit] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [totalInvoice, setTotalInvoice] = useState(0)
  const [invoiceData, setInvoiceData] = useState<any>([])

  // hooks
  const client = useGqlClient()
  const { user } = AuthConfig()


  //quires 
  const [getInvoiceFn, invoiceDataState] = useManualQuery(GET_INVOICES, { client })

  // mutation
  const [deleteInvoiceFn, state] = useMutation(DELETE_INVOICES, { client });



  // refetching data based on pagination and search query
  useEffect(() => {
    let where
    where = {
      status: "COMPLAINED",
    }
    if (searchQuery) {
      where = {
        status: "COMPLAINED",
        "OR": [
          {
            "ticket_CONTAINS": searchQuery,
            "hasClient": {
              "userIs": {
                "userId_CONTAINS": searchQuery
              }
            }
          }
        ],

      }
    }



    getInvoiceData(where, fetchDirection)
    getInvoiceCount()




  }, [currentPage, fetchDirection, searchQuery]);



  // initializing query and mutations

  const getInvoiceCount = async () => {
    const { data } = await getInvoiceFn({
      variables: {
        where: {
          status: "COMPLAINED"
        }
      }
    })
    if (data.invoices.length) {
      setTotalInvoice(data.invoices.length)
      setTotalPages(Math.ceil(data.invoices.length / pageLimit))
    }

  }

  const getInvoiceData = async (where: any, fetchDirection: string = "DESC") => {
    const { data } = await getInvoiceFn({
      variables: {
        where: where,
        options: {
          limit: pageLimit,
          offset: (currentPage - 1) * pageLimit,
          sort: [
            {
              createdAt: fetchDirection
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
      getInvoiceData({ status: "COMPLAINED" })
      createLog(
        `Estimation `,
        `Estimation deleted by ${user?.email} `,
      )
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
              className="form-control"
              style={{backgroundColor:'#e8e8e880'}}

              // className=" h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block  w-full  bg-white border-gray-300  py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r text-xs  focus:border-gray-500  dark:bg-darkBg dark:border-darkBorder"
              >
              <option value={"All"}>All</option>
              <option value={"DESC"}>Descending Order</option>
              <option value={"ASC"}>Ascending Order</option>
            </select>

          </div>
        </div>
        <div className="block relative">
          <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
            {/* <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current text-gray-500">
              <path
                d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z">
              </path>
            </svg> */}
          </span>
          <input
            value={searchQuery}
            style={{backgroundColor:'#e8e8e880'}}

            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            className="form-control"
            // className="  sm:rounded-l-none border border-gray-300 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
             />
        </div>
      </div>
      <div>
        <InvoiceTable data={invoiceData} deleteInvoice={deleteInvoice} setCurrentComplain={setCurrentComplain} setIsOpen={setIsOpen} />
        <div className='w-full flex items-center justify-center'>
          {totalInvoice! > pageLimit &&
            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />}

        </div>
        <ViewModal isOpen={isOpen} setIsOpen={setIsOpen} complain={currentComplain} />
      </div>

    </>

  );
};

export default Main;