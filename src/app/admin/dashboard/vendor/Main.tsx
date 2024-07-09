import Pagination from '@/components/Pagination';
import { Vendor } from '@/gql/graphql';
import { useGqlClient } from '@/hooks/UseGqlClient';
import { useManualQuery, useQuery } from 'graphql-hooks';


import React, { useEffect, useState } from 'react';
const GET_VENDORS = `
query Users($where: UserWhere, $options: UserOptions) {
    users(where: $where, options: $options) {
      name
      id
      status
      companyEmail
      companyName
      email
      bio
      gstNumber
      user_type
      isVendor {
        industry
        service
      }
    }
  }
`

const Main = () => {
    //states
    const [expandedIndex, setExpandedIndex] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    // search sates
    const [searchQuery, setSearchQuery] = useState('')

    // pagination states
    const [pageLimit, setPageLimit] = useState(7)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [totalUser, setTotalUser] = useState(0)
    const [userData, setUserData] = useState<any>([])



    //hooks 
    const client = useGqlClient()

    //fetching vendors
    //quires 
    const [getUserFn, userDataState] = useManualQuery(GET_VENDORS, { client })


    // refetching data based on pagination and search query
    useEffect(() => {

        // search variable
        let where: any = {
            user_type: "SERVICE_PROVIDER",
            status: "APPROVED"
        }

        if (searchQuery) {
            where = {
                user_type: "SERVICE_PROVIDER",
                status: "APPROVED",
                OR: [
                    {
                        email_CONTAINS: searchQuery.toLowerCase(),
                    },
                    {
                        companyName: searchQuery.toLowerCase()
                    }
                ],
            }
        }

        getUserData(where)
        getUserCount()
    }, [currentPage, searchQuery]);


    // initializing query and mutations


    const getUserCount = async () => {
        const { data } = await getUserFn({
            variables: {
                where: {
                    user_type: "SERVICE_PROVIDER",
                    status: "APPROVED"
                }
            }
        })
        if (data.users.length) {
            setTotalUser(data.users.length)
            setTotalPages(Math.ceil(data.users.length / pageLimit))
        }

    }

    const getUserData = async (where: any) => {
        const { data } = await getUserFn({
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

        if (data.users.length) {
            setUserData(data?.users)
        }
    }







    const handleAccordionClick = (index: any) => {
        setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    if (userData.length === 0) return <div className="grid  mt-20 font-semibold text-primaryText">No Vendors Found</div>

    return (
        <>
            <div className="my-2 flex justify-end sm:flex-row flex-col mb-5">
                <div className="flex flex-row mb-1 sm:mb-0">
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
                        placeholder="Search By Email and Name"
                        style={{backgroundColor:'#e8e8e880'}}

                        className="  sm:rounded-l-none border border-gray-300 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700  focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none dark:bg-darkBg dark:border-darkBorder" />
                </div>
            </div>
            {/* end search */}
            <div className=" grid place-items-center overflow-scroll lg:overflow-auto">
                <div className="w-full mx-auto rounded overflow-scroll lg:overflow-auto">
                    <div className="bg-white py-7 px-4  min-w-[600px] "                                 style={{backgroundColor:'#e8e8e880'}}
>


                        {
                            userData && userData.map((vendor: any, index: number) =>
                                <>
                                    <div className="transition my-2  hover:bg-white border text-gray-600 border-gray-200 rounded-md"                                 style={{backgroundColor:'#e8e8e880'}}
>
                                        <>

                                            <div
                                                key={index}

                                                className={`accordion-header    cursor-pointer transition flex space-x-5 px-3 items-center h-16 ${expandedIndex === index ? "bg-white" : ""
                                                    }`}
                                                onClick={() => handleAccordionClick(index)}
                                            >
                                                <i className={`fas ${expandedIndex === index ? "fa-minus" : "fa-plus"}`}></i>
                                                <div className="grid grid-cols-4  gap-3 w-full ">
                                                    <div className='flex items-center justify-start'>
                                                        <p className="text-xs lg:text-sm  font-semibold capitalize">
                                                            {vendor?.companyName}
                                                        </p>
                                                    </div>
                                                    <div className='lg:flex flex-col items-center justify-center '>
                                                        <p className="text-xs lg:text-sm font-semibold text-gray-900">
                                                            Name
                                                        </p>
                                                        <p className="text-xs lg:text-sm   font-normal">{vendor?.name}</p>
                                                    </div>
                                                    <div className="">
                                                        <p className="text-xs lg:text-sm font-semibold text-gray-900">
                                                            email
                                                        </p>
                                                        <p className="text-xs lg:text-sm   font-normal">{vendor.companyEmail}</p>
                                                    </div>


                                                    <div className='flex items-center justify-center'>
                                                        <button
                                                            className="p-1 lg:p-3 bg-primary text-white rounded-lg text-xs"
                                                        // onClick={() => handleOpen(1)}
                                                        >
                                                            {expandedIndex === index ? 'Hide Details' : 'Show Details'}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Content */}
                                            <div
                                                className={`accordion-content px-5 pt-0 overflow-hidden ${expandedIndex === index ? "max-h-content" : "max-h-0"
                                                    }`}
                                                style={{
                                                    transition: "max-height 0.3s ease-out, padding 0.3s ease",
                                                }}
                                            >
                                                <div className="py-8 my-5 px-12 border border-gray-200 rounded-lg">
                                                    {/* <div className="pb-10">
                                                        <h5 className="text-gray-900 font-bold text-sm lg:text-md">
                                                            Description
                                                        </h5>
                                                        <p className="text">{vendor?.bio}</p>
                                                    </div> */}
                                                    <div className="grid grid-cols-2 lg:grid-cols-3">
                                                        <div>
                                                            <ul className="list-none">
                                                                <li>
                                                                    <p className="text-xs lg:text-sm font-bold text-gray-900">
                                                                        Name
                                                                    </p>
                                                                    <p className='text-sm'>{vendor?.name}</p>
                                                                </li>

                                                                <li>
                                                                    <p className="text-xs lg:text-sm font-bold text-gray-900">
                                                                        Email
                                                                    </p>
                                                                    <p className='text-sm'>{vendor?.email}</p>
                                                                </li>
                                                                <li>
                                                                    <p className="text-xs lg:text-sm font-bold text-gray-900">
                                                                        GST
                                                                    </p>
                                                                    <p className='text-sm'>{vendor?.gstNumber}</p>
                                                                </li>
                                                                <li>
                                                                    <p className="text-xs lg:text-sm font-bold text-gray-900">
                                                                        Address
                                                                    </p>
                                                                    <p className='text-sm'>
                                                                        {vendor?.address || 'N/A'}
                                                                    </p>
                                                                </li>

                                                            </ul>
                                                        </div>
                                                        <div className="col-span-1">
                                                            <ul className="list-none">
                                                                <li>
                                                                    <p className="text-xs lg:text-sm font-bold text-gray-900">
                                                                        Industries
                                                                    </p>

                                                                </li>
                                                                {
                                                                    vendor?.isVendor?.industry?.map((service: any, index: number) =>
                                                                        <li key={index}>
                                                                            <p className='text-sm capitalize'>{service}</p>
                                                                        </li>
                                                                    )
                                                                }

                                                            </ul>
                                                        </div>
                                                        <div className="col-span-1">
                                                            <ul className="list-none">
                                                                <li>
                                                                    <p className="text-xs lg:text-sm font-bold text-gray-900">
                                                                        Services
                                                                    </p>

                                                                </li>
                                                                {
                                                                    vendor?.isVendor?.service?.map((service: any, index: number) =>
                                                                        <li key={index}>
                                                                            <p className='text-sm capitalize'>{service}</p>
                                                                        </li>
                                                                    )
                                                                }

                                                            </ul>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    </div>


                                </>
                            )
                        }



                    </div>
                </div>
                <div className='w-full flex items-center justify-center'>
                    {totalUser! > pageLimit &&
                        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />}

                </div>
            </div>
        </>
    );
};

export default Main;