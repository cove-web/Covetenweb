'use client'


import React, { useState, useEffect } from 'react';
import LeadsTable from './LeadsTable';

import { Leads, User } from '@/gql/graphql';
import { useGqlClient } from '@/hooks/UseGqlClient';
import { useMutation, useQuery } from 'graphql-hooks';
import { IUpdateLead } from './interface';
import LeadsModal from './leadModal';
import { toast } from 'react-hot-toast';
import Pagination from '@/components/Pagination';
import { getEmployerEmail } from '@/shared/getEmployerEmail';
import AuthConfig from '@/firebase/oauth.config';
import Loading from '@/app/loading';
import GetLeads from '@/shared/graphQl/queries/leads';
import GetCurrentUserDetails from '@/shared/graphQl/queries/currentUser';
import SliderOver from './SliderOver';
import { LuFilter } from 'react-icons/lu';
import Link from 'next/link';
import { MdAccountCircle } from 'react-icons/md';


// const RESOLVED_LEADS = `
// mutation UpdateLeads($where: LeadsWhere, $update: LeadsUpdateInput) {
//     updateLeads(where: $where, update: $update) {
//         leads {
//             id
//           }
//     }
//   }
// `





// COMPONENT
const Main = () => {
    //states
    const [leads, setLeads] = useState<Leads[] | []>([]);
    const [selectedUserType, setSelectedUserType] = useState('All')
    const [userDetails, setUserDetails] = useState<User | {}>({})
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentLead, setCurrentLead] = useState<Leads | {}>({});
    const [searchQuery, setSearchQuery] = useState('')
    const [pageLimit, setPageLimit] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [totalLeads, setTotalLeads] = useState(0)
    const [slideOverOpen, setSlideOverOpen] = useState(false)
    const [selectedFilter, setSelectedFilter] = useState<any>(null);



    // hooks 
    const client = useGqlClient();

    // MUTATIONS
    // const [updateLeadsFn, updateState] = useMutation(RESOLVED_LEADS, { client })




    // refetching data based on pagination and search query
    useEffect(() => {
        getLeadsData()
        getTotalLeadsCount()
    }, [currentPage, selectedUserType, searchQuery]);



    // initializing query and mutations
    const getLeadsData = async () => {

        let where = {}
        if (searchQuery) {
            where = {
                OR: [
                    {
                        email_CONTAINS: searchQuery.toLocaleLowerCase(),

                    },
                    {
                        interest_CONTAINS: searchQuery.toLocaleLowerCase()

                    },
                    {
                        phone_CONTAINS: searchQuery
                    }
                ]
            }
        }

        if (selectedUserType !== 'All') {
            where = {
                ...where,
                type_IN: [selectedUserType]
            }
        }


        //fetch options
        const options = {
            sort: [
                {
                    createdAt: "DESC"
                },
            ],
            limit: pageLimit,
            offset: (currentPage - 1) * pageLimit
        }

        const leads = await GetLeads(where, options);
        setLeads(leads);
    };

    const getTotalLeadsCount = async () => {
        const result = await GetLeads({}, {});
        if (result) {
            setTotalLeads(parseInt(result?.length))
            setTotalPages(Math.ceil(result?.length / pageLimit))
        }
    }


// ni

    return (

        <>
            <div className='flex items-center justify-between'>
                <h2 className="text-2xl font-semibold leading-tight">Leads</h2>
                <Link href='/admin/dashboard/leads/create' className='bg-primary px-5 py-1.5 rounded-md text-white' style={{backgroundColor:'#14bfd5'}}>
                    Create Lead
                </Link>

            </div>

            <div>
                <div className='flex items-center justify-between'>
                    <div className="my-2 flex  sm:flex-row flex-col mb-5">
                        <div className="flex flex-row mb-1 sm:mb-0">

                            <div className="relative">
                                <select
                                    value={selectedUserType}
                                    onChange={(e) => setSelectedUserType(e.target.value)}
                                    className=" h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block  w-full  bg-white border-gray-300  py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r text-xs  focus:border-gray-500  dark:bg-darkBg dark:border-darkBorder"               style={{backgroundColor:'#e8e8e880'}}
                                    >
                                    <option value={"All"}>All</option>
                                    <option value={"SERVICE"}>SERVICE</option>
                                    <option value={"PRODUCT"}>PRODUCT</option>
                                    <option value={"SOLUTION"}>SOLUTION</option>
                                    <option value={"LEARN"}>LEARN</option>
                                    <option value={"EVENT"}>EVENT</option>
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
                                style={{backgroundColor:'#e8e8e880'}}

                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search."
                                className="  sm:rounded-l-none border border-gray-300 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700  focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none dark:bg-darkBg dark:border-darkBorder" />
                        </div>
                    </div>
                    <div className='flex items-center justify-center space-x-5'>
                        <div className='flex items-center justify-center space-x-1'>
                            <span className='font-bold'>
                                {totalLeads}
                            </span>
                            <span className='text-xl'>
                                <MdAccountCircle />
                            </span>
                        </div>
                        <div onClick={() => setSlideOverOpen(true)} className='text-gray-700 cursor-pointer text-xl px-4 py-4 duration-500 rounded-full hover:bg-gray-300'>
                            <LuFilter />
                        </div>
                    </div>
                </div>

                <LeadsTable data={leads} totalLeads={totalLeads} setIsModalOpen={setIsModalOpen} setCurrentLead={setCurrentLead} currentPage={currentPage} pageLimit={pageLimit} />
                <LeadsModal
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    data={currentLead}
                    setCurrentLead={setCurrentLead}
                    userDetails={userDetails}
                    setUserDetails={setUserDetails}
                // updateLeads={updateLeads}
                />
                <div className='w-full flex items-center justify-center'>
                    {totalLeads! > pageLimit &&
                        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />}

                </div>
                <SliderOver open={slideOverOpen} setOpen={setSlideOverOpen} setSelectedFilter={setSelectedFilter} selectedFilter={selectedFilter} />

            </div>
        </>
    );
};

export default Main;