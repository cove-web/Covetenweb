'use client'
import { useManualQuery, useQuery } from 'graphql-hooks';
import React, { useState, useEffect } from 'react';
import TicketTable from './TicketTable';
import { useGqlClient } from '@/hooks/UseGqlClient';
import AssignmentModal from '../../projects/AssignmentModal';
import Pagination from '@/components/Pagination';
import TableSkeleton from '@/components/TableSkeleton';
import TicketReassignModal from './TicketReassignModal';
import ViewReportModal from './ViewReportModal';

const GET_MODULE_TICKETS = `
query ModuleTickets($where: ModuleTicketWhere, $options: ModuleTicketOptions) {
  moduleTickets(where: $where, options: $options) {
      id
      ticket
      status
      reports
      rejectedReason
      createdAt
      isApprovedByAdmin
      forModule {
        title
        description
        files
      }
      clientHas {
        userIs {
        companyName
        userId
        id
        }
      }
      vendorHas {
        userIs {
          userId
          id
        }
      }
      
    }
  }

`

const Main = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [currentModuleTicket, setCurrentModuleTicket] = React.useState<any>({});
  // search sates
  const [searchQuery, setSearchQuery] = useState('')
  const [statusType, setStatusType] = useState('All')

  // pagination states
  const [pageLimit, setPageLimit] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [moduleTicketsCount, setModuleTicketsCount] = useState(0)
  const [moduleTicketData, setModuleTicketData] = useState<any>([])


  //hooks
  const client = useGqlClient()

  //quires 
  const [getModuleTicketFn, moduleTicketDataState,] = useManualQuery(GET_MODULE_TICKETS, { client })


  // refetching data based on pagination and search query
  useEffect(() => {
    let where = {}

    // sending parameters to query based on search query
    if (searchQuery) {
      where = {
        OR: [
          {
            ticket: searchQuery.toUpperCase(),
          },
          {
            clientHas: {
              userIs: {
                userId_CONTAINS: searchQuery.toLocaleLowerCase(),
              }
            }
          },
          {
            forModule: {
              title_CONTAINS: searchQuery.toLocaleLowerCase()
            }
          },
          {
            vendorHas: {
              userIs: {
                userId_CONTAINS: searchQuery.toLocaleLowerCase()
              }
            }
          }
        ]
      }
    }

    // sending parameters to query based on status type

    if (statusType !== 'All') {

      if (statusType === 'REPORT_APPROVED') {
        where = {
          ...where,
          isApprovedByAdmin: true
        }
      } else if (statusType === 'REPORT_NOT_APPROVED') {
        where = {
          ...where,
          isApprovedByAdmin: false
        }
      } else {
        where = {
          ...where,
          status: statusType
        }
      }

    }




    getModuleTicketData(where)
    getModuleTicketCount()
  }, [currentPage, searchQuery, statusType]);



  // initializing query and mutations

  const getModuleTicketCount = async () => {
    const { data } = await getModuleTicketFn()
    if (data.moduleTickets.length) {
      setModuleTicketsCount(data.moduleTickets.length)
      setTotalPages(Math.ceil(data.moduleTickets.length / pageLimit))
    }

  }

  const getModuleTicketData = async (where: any = {}) => {
    const { data } = await getModuleTicketFn({
      variables: {
        where: where,
        options: {
          limit: pageLimit,
          offset: (currentPage - 1) * pageLimit,
          sort: [
            {
              createdAt: "DESC"
            }
          ]
        }
      }
    })
    if (data.moduleTickets.length) {
      setModuleTicketData(data?.moduleTickets)
    }
  }



  useEffect(() => {
    console.log('')
  }, [moduleTicketDataState.loading, moduleTicketDataState.data])




  return (
    <>
      <div className="my-2 flex justify-end sm:flex-row flex-col mb-5">
        <div className="flex flex-row mb-1 sm:mb-0">

          <div className="relative">
            <select
              value={statusType}
              onChange={(e) => setStatusType(e.target.value)}
              className=" h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block  w-full  bg-white border-gray-300  py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r text-xs  focus:border-gray-500  dark:bg-darkBg dark:border-darkBorder"               style={{backgroundColor:'#e8e8e880'}}
              >
              <option value={"All"}>All</option>
              <option value={"PENDING"}>PENDING</option>
              <option value={"ASSIGNED"}>ASSIGNED</option>
              <option value={"ACCEPTED"}>ACCEPTED</option>
              <option value={"COMPLETED"}>COMPLETED</option>
              <option value={"REJECTED"}>REJECTED</option>
              <option value={"UNDER_REVIEW"}>UNDER_REVIEW</option>
              <option value={'REPORT_APPROVED'}>REPORT APPROVED</option>
              <option value={'REPORT_NOT_APPROVED'}>REPORT NOT APPROVED</option>
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
            className="  sm:rounded-l-none border border-gray-300 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"               style={{backgroundColor:'#e8e8e880'}}
            />
        </div>
      </div>


      {/* search */}

      <div>
        {
          moduleTicketDataState.loading && <TableSkeleton />
        }
        <TicketTable getModuleTicketData={getModuleTicketData} data={moduleTicketData} setIsOpen={setIsOpen} setCurrentModuleTicket={setCurrentModuleTicket} />
        <TicketReassignModal setIsOpen={setIsOpen} isOpen={isOpen} currentModuleTicket={currentModuleTicket} refetchModuleTickets={getModuleTicketData} />

      </div>


      {/* pagination */}
      <div className='w-full flex items-center justify-center'>
        {moduleTicketsCount! > pageLimit &&
          <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />}

      </div>

    </>
  );
};

export default Main;