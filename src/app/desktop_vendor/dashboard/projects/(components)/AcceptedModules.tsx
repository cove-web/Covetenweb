'use client'
import AuthConfig from '@/firebase/oauth.config';

import React, { useEffect, useState } from 'react';
import ViewModal from './ViewModal';
import Loading from '@/app/loading';
import { useGqlClient } from '@/hooks/UseGqlClient';
import { useMutation } from 'graphql-hooks';
import { toast } from 'react-hot-toast';
import UploadDocModal from './UploadDocModal';
import Pagination from '@/components/Pagination';
import GetModules from '@/shared/graphQl/queries/modules';
import { getEmployerEmail } from '@/shared/getEmployerEmail';



const UPDATE_MODULE_STATUS = `
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
const AcceptedModules = () => {
    //states
    const [modules, setModules] = useState([])
    const [isDocModalOpen, setIsDocModalOpen] = useState(false)
    const [currentModuleId, setCurrentModuleId] = useState('')
    const [clientId, setClientId] = useState('')
    const [reset, setReset] = useState(false)
    const [loading, setLoading] = useState(false)
    const [labEmail, setLabEmail] = useState('')
    const [uploading, setUploading] = useState(false)
    // pagination states
    const [pageLimit, setPageLimit] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [totalModules, setTotalModules] = useState(0)

    // hooks
    const { user, authLoading } = AuthConfig()
    const client = useGqlClient()

    // UPDATING MODULE STATUS
    const [updateModuleStatusFn, updateStatus] = useMutation(UPDATE_MODULE_STATUS, { client })
    const [sendNotificationFn, notificationState] = useMutation(SEND_NOTIFICATION, { client })




    // getting module data
    useEffect(() => {
        getLabEmail()
        getModulesData()
        getTotalModulesCount()
    }, [currentPage, user?.email, authLoading, labEmail]);



    // get module data
    const getModulesData = async () => {
        setLoading(true)

        const where = {
            vendorHas: {
                userIs: {
                    email: labEmail || "no email"
                }
            },
            status_IN: ["UNDER_REVIEW", "ACCEPTED"]
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
                    email: labEmail || "no email"
                }
            },
            status_IN: ["UNDER_REVIEW", "ACCEPTED"]
        }
        const modules = await GetModules(where)
        if (modules?.length) {
            setTotalModules(modules?.length)
            setTotalPages(Math.ceil(modules?.length / pageLimit))
        }

    }


    // update module status after uploading doc
    const updateModule = async (status: string, id: string) => {
        const { data } = await updateModuleStatusFn({
            variables: {
                where: {
                    id: id
                },
                update: {
                    status: status
                }
            }
        })

        if (data) {

            setReset(!reset)
            getModulesData()
            toast.success('Module updated successfully')
        }
    }


    // on status change to completed upload doc and update status
    const handleStatusChange = (id: string) => {
        setIsDocModalOpen(true)
        setCurrentModuleId(id)
    }

    // getting lab email if employee is logged in
    const getLabEmail = async () => {
        if (user?.email) {
            const email = await getEmployerEmail(user?.email)
            setLabEmail(email)
        }


    }








    if (loading || updateStatus.loading || authLoading) return <Loading />





    return (
        <>
            <table className="w-full">
                <thead>
                    <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-white dark:text-gray-400 dark:bg-gray-800">
                        <th className="px-4 py-3">Serial</th>
                        <th className="px-4 py-3">Ticket-Id</th>
                        <th className="px-4 py-3">Module Title</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3 text-center">Action</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">

                    {modules.length ? modules?.map((module: any, index: number) =>

                        <tr key={module?.id} className={"bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400"}>

                            <td className="px-4 py-3 text-sm">{index + 1}</td>
                            <td className="px-4 py-3 text-sm">{module?.ticket}</td>
                            <td className="px-4 py-3 text-sm">{module?.forModule
                                ?.title || 'N/A'}</td>
                            <td className="px-4 py-3 text-sm">{module?.status || 'N/A'}</td>
                            <td className="px-4 py-3 text-sm space-x-2 flex items-center justify-center">
                                <div className="relative w-40 ">
                                    <button
                                        disabled={module?.status === 'UNDER_REVIEW' ? true : false}
                                        onClick={() => {
                                            handleStatusChange(module?.id)
                                            setClientId(module?.clientHas?.userIs?.id)
                                        }

                                        }
                                        className={`${module?.status === 'UNDER_REVIEW' ? "bg-gray-800 " : "bg-primary "}    h-full rounded-r block  w-full text-sm pr-8  py-1 px-3  text-white leading-tight focus:outline-none  dark:bg-darkBg dark:border-darkBorder`}>

                                        {module?.status === 'UNDER_REVIEW' ? "Submitted" : "Submit Report"}
                                    </button>

                                </div>

                            </td>

                        </tr>

                    )
                        :
                        <tr className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400">
                            <td colSpan={4} className="px-4 py-3 text-sm ">No modules found</td>
                        </tr>
                    }
                </tbody>
                <UploadDocModal isDocModalOpen={isDocModalOpen} setIsDocModalOpen={setIsDocModalOpen} currentModuleId={currentModuleId} updateModule={updateModule} />
            </table >
            <div className='w-full flex items-center justify-center'>
                {totalModules! > pageLimit &&
                    <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />}

            </div>
        </>
    );
};

export default AcceptedModules;