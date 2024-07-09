'use client'
import AuthConfig from '@/firebase/oauth.config';
import React, { useEffect, useState } from 'react';
import ViewModal from './ViewModal';
import Loading from '@/app/loading';
import { useGqlClient } from '@/hooks/UseGqlClient';
import { useMutation } from 'graphql-hooks';
import { toast } from 'react-hot-toast';
import ComplainModal from './ComplainModal';
import Pagination from '@/components/Pagination';
import Error from '@/components/Error';
import GetModules from '@/shared/graphQl/queries/modules';
import createLog from '@/shared/graphQl/mutations/createLog';
import { useAuth } from '@/firebase/AuthProvider';
import { useRouter } from 'next/navigation';




const UPDATE_MODULE = `
mutation UpdateModuleTickets($where: ModuleTicketWhere, $update: ModuleTicketUpdateInput) {
    updateModuleTickets(where: $where, update: $update) {
      moduleTickets {
        id
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
    //states
    const [modules, setModules] = useState([])
    const [currentModuleId, setCurrentModuleId] = useState('')
    const [reset, setReset] = useState(false)
    const [loading, setLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [isViewModalOpen, setIsViewModalOpen] = useState(false)
    const [clientId, setClientId] = useState('')
    // pagination states
    const [pageLimit, setPageLimit] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [totalModules, setTotalModules] = useState(0)

    // hooks

    const { user, authLoading }: any = useAuth()
    const client = useGqlClient()
    const router = useRouter()

    // mutations
    const [updateModuleStatusFn, updateStatus] = useMutation(UPDATE_MODULE, { client })
    const [sendNotificationFn, notificationState] = useMutation(SEND_NOTIFICATION, { client })








    useEffect(() => {
        if (!authLoading && user?.user_type !== "SERVICE_PROVIDER") {

            return router.replace('/not_authorized')
        }



    }, [authLoading, user?.email]);




    // fetching module data
    useEffect(() => {
        getModulesData()
        getTotalModulesCount()
    }, [currentPage, user?.email]);






    // get module data
    const getModulesData = async () => {
        setLoading(true)

        const where = {
            vendorHas: {
                userIs: {
                    email: user?.email || 'no email'
                }
            },
            status: "UNDER_REVIEW"

        }

        const options = {
            sort: [
                {
                    createdAt: "DESC"
                }
            ],
            limit: pageLimit,
            offset: (currentPage - 1) * pageLimit
        }
        // getting modules from shared function
        const modules = await GetModules(where, options)
        if (modules) {
            setLoading(false)
            setModules(modules)
        } else {
            setLoading(false)
            setModules([])
        }
    }


    //getting total modules
    const getTotalModulesCount = async () => {
        const where = {
            vendorHas: {
                userIs: {
                    email: user?.email || 'no email'
                }
            },
            status: "UNDER_REVIEW"
        }



        const modules = await GetModules(where)
        if (modules?.length) {

            setTotalModules(modules?.length)
            setTotalPages(Math.ceil(modules?.length / pageLimit))
        }

    }



    // update module status after uploading doc
    const updateModule = async (variables: any) => {
        const { data } = await updateModuleStatusFn({
            variables: variables
        })

        if (data.updateModuleTickets.moduleTickets[0]?.id) {

            setReset(!reset)
            getModulesData()
            setIsOpen(false)
            toast.success('Module updated successfully')
            sendNotificationToVendor()

        }
    }



    const approveModule = async (id: string) => {
        const variables =
        {
            where: {
                id: id
            },
            update: {
                status: "DRAFT",
            }
        }
        updateModule(variables)

    }
    const addComplain = async (complain: string) => {
        const variables =
        {
            where: {
                id: currentModuleId
            },
            update: {
                status: "COMPLAINED",
                complain: complain
            }
        }
        updateModule(variables)

    }






    const sendNotificationToVendor = async () => {

        const { data: clientData } = await sendNotificationFn({
            variables: {
                "input": [
                    {
                        "title": `Vendor has sent your module report for review`,
                        "description": `Check the report and approve it if it is correct or reject it if it is not correct`,
                        "createdAt": new Date().toISOString(),
                        "notificationFor": "CLIENT",
                        "clientHas": {
                            "connect": {
                                "where": {
                                    "node": {
                                        "userIs": {
                                            "id": clientId
                                        }
                                    }
                                }
                            }
                        }
                    }
                ]
            }
        })

    }








    if (loading || updateStatus.loading) return <Loading />
    if (updateStatus.error) return <Error />

    return (
        <>
            <table className="w-full">
                <thead>
                    <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-white dark:text-gray-400 dark:bg-gray-800"  style={{backgroundColor:'#e8e8e880'}}>
                        <th className="px-4 py-3">Serial</th>
                        <th className="px-4 py-3">Ticket-Id</th>
                        <th className="px-4 py-3">Module Title</th>
                        <th className="px-4 py-3 text-center">Action</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800"  style={{backgroundColor:'#e8e8e880'}}>

                    {modules && modules?.map((module: any, index: number) =>

                        <tr key={module?.id} className={`${module?.isApproveRequestViewed ? 'bg-white' : "bg-gray-200"} dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400`}  style={{backgroundColor:'#e8e8e880'}}>

                            <td className="px-4 py-3 text-sm">{index + 1}</td>
                            <td className="px-4 py-3 text-sm">{module?.ticket}</td>
                            <td className="px-4 py-3 text-sm">{module?.forModule
                                ?.title || 'N/A'}</td>
                            <td className="px-4 py-3 text-sm space-x-2 flex items-center justify-center">
                                <div className="relative space-x-3">

                                    <button

                                        onClick={() => {
                                            setIsViewModalOpen(true)
                                            setCurrentModuleId(module?.id)
                                        }}
                                        className={` px-3 py-2 font-semibold bg-primary/20 text-primary rounded-sm`}>
                                        View
                                    </button>
                                    <button
                                        disabled={module?.status === "DRAFT"}
                                        onClick={() => {
                                            approveModule(module?.id)
                                            setClientId(module?.clientHas?.userIs?.id)
                                        }}
                                        className={`${module?.status === "COMPLAINED" && 'hidden'} px-3 py-2 font-semibold bg-green-200 text-green-700 rounded-sm`}>
                                        {module?.status === "DRAFT" ? "Approved" : "Approve"}
                                    </button>
                                    <button
                                        disabled={module?.status === "COMPLAINED"}
                                        onClick={() => {
                                            setIsOpen(true)
                                            setCurrentModuleId(module?.id)
                                        }
                                        } className={`${module?.status === "DRAFT" && 'hidden'}  px-3 py-2 font-semibold bg-red-200 text-red-700 rounded-sm`}>
                                        {module?.status === "COMPLAINED" ? "Rejected" : "Reject"}
                                    </button>

                                </div>

                            </td>

                        </tr>

                    )
                    }
                </tbody>
                <ComplainModal setIsOpen={setIsOpen} isOpen={isOpen} addComplain={addComplain} />
                {/* <ViewModal setIsModalOpen={setVewModal} isModalOpen={viewMOdal} /> */}

            </table>
            <div className='w-full flex items-center justify-center'>
                {totalModules! > pageLimit &&
                    <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />}

            </div>
            <ViewModal setIsViewModalOpen={setIsViewModalOpen} isViewModalOpen={isViewModalOpen} currentModuleId={currentModuleId} />
        </>
    );
};

export default Main;