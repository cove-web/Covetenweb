'use client'

import { useGqlClient } from '@/hooks/UseGqlClient';
import { useManualQuery, useQuery } from 'graphql-hooks';
import React, { useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import { Notification } from '@/gql/graphql';
import AuthConfig from '@/firebase/oauth.config';
import NotificationCard from '@/components/NotificationCard';

import InfoCards from '@/components/InfoCards';
import NotificationBlock from '@/components/NotificationBlock';



const GET_NOTIFICATIONS = `
query Notifications($where: NotificationWhere, $options: NotificationOptions) {
    notifications(where: $where, options: $options) {
      title
      description
      createdAt
    }
  }
`

const GET_MODULE_TICKET = `
query ModuleTickets($where: ModuleTicketWhere, $options: ModuleTicketOptions) {
    moduleTickets(where: $where, options: $options) {
      id
      ticket
      status
      createdAt
    }
  }
`



const Main = () => {

    // STATES
    const [totalTickets, setTotalTickets] = React.useState<any>(0)
    const [pendingTickets, setPendingTickets] = React.useState<any>(0)
    const [completedTickets, setCompletedTickets] = React.useState<any>(0)
    const [latestTickets, setLatestTickets] = React.useState<any>('')
    const [rejectionTickets, setRejectionTickets] = React.useState<any>(0)
    const [underReviewTickets, setUnderReviewTickets] = React.useState<any>(0)

    // HOOKS 
    const client = useGqlClient()
    const { user } = AuthConfig()


    // getting data based on user
    useEffect(() => {
        getModuleTicketCount()
        getUnderReviewTicket()
        getPendingTicket()
        getCompletedTicket()
        getLatestTicket()
        getRejectedTicket()
    }, [user?.email])





    // queries
    const [moduleTicketDataFn, state] = useManualQuery(GET_MODULE_TICKET, { client })
    const { data: notificationsData, error: notificationError, loading: notificationLoading } = useQuery(GET_NOTIFICATIONS, {
        client,
        revalidateOnMount: 3600,
        revalidateOnReconnect: 3600,
        revalidateOnFocus: false,
        variables: {
            "where": {
                "type_IN": ["VENDOR", "GENERAL"]
            },
            "options": {
                "limit": 3,
                "sort": [
                    {
                        "createdAt": "DESC"
                    }
                ]
            }
        }
    })




    // fetching functions
    const getModuleTicketCount = async () => {
        const { data } = await moduleTicketDataFn({
            variables: {
                "where": {
                    "vendorHas": {
                        "userIs": {
                            "email": user?.email || 'no email'
                        }
                    }

                }
            }
        })

        data.moduleTickets.length && setTotalTickets(data?.moduleTickets?.length)
    }
    const getPendingTicket = async () => {
        const { data } = await moduleTicketDataFn({
            variables: {
                "where": {
                    "status": "PENDING",
                    "vendorHas": {
                        "userIs": {
                            "email": user?.email || 'no email'
                        }
                    }

                }
            }
        })
        data.moduleTickets.length && setPendingTickets(data?.moduleTickets?.length)
    }
    const getUnderReviewTicket = async () => {
        const { data } = await moduleTicketDataFn({
            variables: {
                "where": {
                    "status": "UNDER_REVIEW",
                    "vendorHas": {
                        "userIs": {
                            "email": user?.email || 'no email'
                        }
                    }

                }
            }
        })
        data.moduleTickets.length && setUnderReviewTickets(data?.moduleTickets?.length)
    }
    const getCompletedTicket = async () => {
        const { data } = await moduleTicketDataFn({
            variables: {
                "where": {
                    status: "COMPLETED",
                    "vendorHas": {
                        "userIs": {
                            "email": user?.email || 'no email'
                        }
                    }

                }
            }
        })
        data.moduleTickets.length && setCompletedTickets(data?.moduleTickets?.length)
    }
    const getRejectedTicket = async () => {
        const { data } = await moduleTicketDataFn({
            variables: {
                "where": {
                    status: "REJECTED",
                }
            }
        })
        data.moduleTickets.length && setRejectionTickets(data?.moduleTickets?.length)
    }
    const getLatestTicket = async () => {
        const { data } = await moduleTicketDataFn({
            variables: {
                "where": {
                    "vendorHas": {
                        "userIs": {
                            "email": user?.email || 'no email'
                        }
                    }
                },
                "options": {
                    "sort": [
                        {
                            "createdAt": "DESC"
                        }
                    ],
                    "limit": 6
                }
            }
        })
        data.moduleTickets.length && setLatestTickets(data?.moduleTickets)
    }





    //render
    return (
        <>
            {/* <!-- status section Start --> */}
            <section className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 w-full max-w-6xl" >

                <div className='mb-5'>
                    <InfoCards title='Tickets' value={`${totalTickets < 10 ? `0${totalTickets}` : totalTickets}` || '00'} />
                </div>
                <div className='mb-5'>
                    <InfoCards title='On Going ' value={`${pendingTickets < 10 ? `0${pendingTickets}` : pendingTickets}` || '00'} />
                </div>
                <div className='mb-5'>
                    <InfoCards title='Under Review' value={`${underReviewTickets < 10 ? `0${underReviewTickets}` : underReviewTickets}` || '00'} />
                </div>
                <div className='mb-5'>
                    <InfoCards title='Rejected Tickets' value={`${rejectionTickets < 10 ? `0${rejectionTickets}` : rejectionTickets}` || '00'} />
                </div>
                <div className='mb-5'>
                    <InfoCards title='Completed' value={`${completedTickets < 10 ? `0${completedTickets}` : completedTickets}` || '00'} />
                </div>
            </section >
            {/* <!-- status section End  --> */}

            {/* <!-- chart section Start --> */}
            <section className="grid lg:grid-cols-2 gap-6 w-full my-8 rounded">
                <div className="bg-white rounded shadow pb-6 dark:bg-darkBgLight dark:text-white overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
                    <p className="focus:outline-none px-5 pt-5 text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-700">Notifications</p>
                    <NotificationBlock data={notificationsData?.notifications} />
                </div>
                <div className="bg-white rounded shadow dark:bg-darkBgLight dark:text-white">
                    <p className="focus:outline-none px-5 pb-3 pt-5 text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-700">Latest Tickets</p>
                    <div className='space-y-3 mt-3'>
                        {
                            latestTickets && latestTickets?.map((item: any, i: number) =>
                                <div key={i} className='w-full flex items-center justify-between px-3 py-2 border-b'>
                                    <div className='flex items-center  space-x-3'>
                                        <div className='h-3 w-3 rounded-full bg-green-500'></div>
                                        <div className='text-sm'>

                                            <p className='text-desktopText text-xs xl:text-base'>{item?.ticket}</p>
                                            <p className='text-desktopTextLight text-[10px] xl:text-sm'>{item?.createdAt}</p>
                                        </div>
                                    </div>

                                    <div className='flex items-center justify-center space-x-3'>

                                        <button className='bg-primary/10 text-primary text-[10px] xl:text-sm px-4 py-1 rounded-2xl'>
                                            {item?.status}
                                        </button>

                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </section>




        </>
    )


};

export default Main;