'use client'
import React, { useEffect, useState, Suspense } from 'react';
import { useGqlClient } from '@/hooks/UseGqlClient';
import { useManualQuery, useMutation, useQuery } from 'graphql-hooks';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { AiTwotoneDelete, AiFillEye } from 'react-icons/ai';
import { BiSolidEditAlt } from 'react-icons/bi';
import Error from '@/components/Error';
import { toast } from 'react-hot-toast';
import NotificationView from './NotificationView';
import { getEmployerEmail } from '@/shared/getEmployerEmail';
import AuthConfig from '@/firebase/oauth.config';
import Loading from '@/app/loading';
import Pagination from '@/components/Pagination';

//props interface
interface INotificationTab {
    newNotification: boolean;
}


//interface for notification data
interface INotification {
    id: string;
    image: string;
    title: string;
    notificationFor: string;
    description: string;
    createdAt: string;
}


//query for getting notification data
const GET_NOTIFICATION = `
query Notifications($where: NotificationWhere, $options: NotificationOptions) {
    notifications(where: $where, options: $options) {
      id
      image
      title
      notificationFor
      description
      createdAt
    }
  }
  `
//query for getting notification data
const UPDATE_NOTIFICATION = `
mutation UpdateNotifications($where: NotificationWhere, $update: NotificationUpdateInput) {
    updateNotifications(where: $where, update: $update) {
      notifications {
        id
      }
    }
  }
  `

//query for deleting notification
const DELETE_NOTIFICATION = `
mutation Mutation($where: NotificationWhere) {
    deleteNotifications(where: $where) {
      nodesDeleted
    }
  }
  `


//component 
const GenarelNotification = ({ newNotification }: INotificationTab) => {

    //states
    const [allNotification, setAllNotification] = useState<INotification[]>([]);
    const [isNotificationViewModalOpen, setIsNotificationViewModalOpen] = useState(false);
    const [currentNotification, setCurrentNotification] = useState<INotification | null>(null);
    // pagination states
    const [pageLimit, setPageLimit] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [totalNotification, setTotalNotification] = useState(0)




    // hooks
    const client = useGqlClient();


    //quires 
    const [getNotificationFn, dataState] = useManualQuery(GET_NOTIFICATION, { client })


    // mutation
    const [updateNotificationFn, updateState] = useMutation(UPDATE_NOTIFICATION, { client })
    const [deleteFn, deleteState, dReset] = useMutation(DELETE_NOTIFICATION, { client });



    useEffect(() => {
        getNotifications()
        getNotificationCount()
    }, [currentPage, newNotification])


    const updateNotification = async (id: string) => {
        const { data } = await updateNotificationFn({
            variables: {
                where: {
                    id
                },
                update: {
                    isViewed: true
                }
            }
        })
    }


    // getting general notifications for all users
    const getNotifications = async () => {
        const { data } = await getNotificationFn({
            variables: {
                where: {
                    notificationFor: 'GENERAL'
                },
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
        if (data?.notifications?.length > 0) {
            setAllNotification(data?.notifications)
        }
    }

    const getNotificationCount = async () => {
        const { data } = await getNotificationFn({
            variables: {
                where: {
                    notificationFor: 'GENERAL'
                },
            }
        })

        if (data?.notifications?.length > 0) {
            setTotalNotification(data?.notifications?.length)
            setTotalPages(Math.ceil(data?.notifications?.length / pageLimit))
        }
    }



    // Delete Notification
    const handleDelete = async (id: string) => {
        const { data } = await deleteFn({
            variables: {
                where: {
                    id: id
                }
            }
        });
        if (data) {
            getNotifications()
            toast.error('Notification Deleted Successfully');
        }
    };



    if (allNotification?.length === 0) {
        return <div className="w-full h-full mt-12 text-sm mx-5"> No Data Found</div>;
    }


    // Render when there is an error
    if (dataState.loading) return <Loading />



    return (
        <div>
            <div className="w-full h-full">
                <div className="bg-transperent h-full min-h-[400px] py-4 md:py-7 px-4 md:px-8 xl:px-10">
                    <div className="mt-7 overflow-x-auto">
                        <table className="w-full min-w-[750px]">
                            {/* <Suspense fallback={<div>Loading...</div>}> */}
                            <tbody>
                                {
                                    allNotification?.map((item: INotification) =>
                                        <div key={item?.id} className='w-full  flex items-center justify-center'>
                                            <tr className="focus:outline-none w-full h-16 border border-gray-100 rounded grid grid-cols-8 place-content-center ">

                                                <td className="  text-center col-span-3 mt-3">
                                                    <div className="flex items-center pl-5">
                                                        <p className="text-sm lg:text-base font-medium leading-none text-white-700 mr-2">{item?.title?.slice(0, 50)}</p>

                                                    </div>
                                                </td>
                                                <td className="  text-center mt-3">
                                                    <div className="flex items-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                            <path d="M9.16667 2.5L16.6667 10C17.0911 10.4745 17.0911 11.1922 16.6667 11.6667L11.6667 16.6667C11.1922 17.0911 10.4745 17.0911 10 16.6667L2.5 9.16667V5.83333C2.5 3.99238 3.99238 2.5 5.83333 2.5H9.16667" stroke="#52525B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"></path>
                                                            <circle cx="7.50004" cy="7.49967" r="1.66667" stroke="#52525B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"></circle>
                                                        </svg>
                                                        <p className="text-sm leading-none text-white-600 ml-2">{item?.createdAt.slice(0, 10)}</p>
                                                    </div>
                                                </td>


                                                <td className="ml-2  text-center col-span-2 ">
                                                    <button className="py-3 px-3 text-sm focus:outline-none leading-none text-primary  bg-primary/10 ">Published  at {item?.createdAt.slice(11, 16)}</button>
                                                </td>
                                                {/* <td className="  text-center">
                                                    <button className="focus:ring-2 focus:ring-offset-2  text-sm leading-none text-white-600 py-3 px-5 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none">View</button>
                                                </td> */}
                                                <td className="  text-center col-span-2 ">
                                                    <div className="relative flex items-center justify-center space-x-4  px-8 ">
                                                        <button onClick={() => {
                                                            setIsNotificationViewModalOpen(true);
                                                            setCurrentNotification(item);
                                                        }} className="focus:ring-2 focus:ring-offset-2  text-sm leading-none text-primary py-2 px-2 bg-gray-100  hover:bg-gray-200 focus:outline-none"><AiFillEye /></button>
                                                        <button onClick={() => handleDelete(item?.id)} className="focus:ring-2 focus:ring-offset-2  text-sm leading-none text-red-600 py-2 px-2 bg-gray-100  hover:bg-gray-200 focus:outline-none"><AiTwotoneDelete /></button>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr className="h-3"></tr>
                                        </div>)
                                }

                            </tbody>
                            {/* </Suspense> */}
                        </table>
                    </div>
                </div>
            </div>

            <div className='w-full flex items-center justify-center'>
                {totalNotification > pageLimit &&
                    <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />}

            </div>
            <NotificationView isNotificationViewModalOpen={isNotificationViewModalOpen} setIsNotificationViewModalOpen={setIsNotificationViewModalOpen}
                data={currentNotification} />
        </div >
    );
};

export default GenarelNotification;