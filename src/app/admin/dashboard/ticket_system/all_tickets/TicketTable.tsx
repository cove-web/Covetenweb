'use client'

import React, { useState } from 'react';
import { AiTwotoneDelete } from 'react-icons/ai';
import { BiSolidEditAlt } from 'react-icons/bi';
import TicketModal from './TicketReassignModal';
import { ModuleTicket } from '@/gql/graphql';
import ViewReportModal from './ViewReportModal';
import RejectReasonModal from './RejectReasonModal';
import { useGqlClient } from '@/hooks/UseGqlClient';
import { useMutation } from 'graphql-hooks';
import toast from 'react-hot-toast';
import Loading from '@/app/loading';
import Link from 'next/link';
import { getNormalDateAndTime } from '@/shared/getNormalDateAndTime';


interface ITicketTable {
    data: any[],
    setIsOpen: (value: boolean) => void,
    setCurrentModuleTicket: (value: any) => void
    getModuleTicketData: () => void
}




const UPDATE_MODULE_TICKET = `
mutation UpdateModuleTickets($where: ModuleTicketWhere, $update: ModuleTicketUpdateInput) {
    updateModuleTickets(where: $where, update: $update) {
      info {
        nodesCreated
      }
    }
  }
`





const TicketTable = ({ data, setIsOpen, setCurrentModuleTicket, getModuleTicketData }: ITicketTable) => {

    //states
    const [isReportModalOpen, setIsReportModalOpen] = React.useState(false);
    const [isRejectModalOpen, setIsRejectModalOpen] = React.useState(false);
    const [currentReports, setCurrentReports] = React.useState<string[]>([]);
    const [selectedTicket, setSelectedTicket] = React.useState<ModuleTicket>({} as ModuleTicket);
    const [reason, setReason] = React.useState<string>('');

    //hooks
    const client = useGqlClient()

    //mutations
    const [updateModuleTicketFn, state] = useMutation(UPDATE_MODULE_TICKET, { client })



    const handleUpdateModuleTicket = async (id: string) => {
        const { data } = await updateModuleTicketFn({
            variables: {
                where: {
                    id: id
                },
                "update": {
                    "isApprovedByAdmin": true
                }
            }
        })
        if (data) {
            getModuleTicketData()
            toast.success('Ticket Approved')
            setIsReportModalOpen(false)

        }
    }


    if (state.loading) return <Loading />

    return (
        <table className="min-w-full leading-normal"               style={{backgroundColor:'#e8e8e880'}}
        >
            <thead>
                <tr               style={{backgroundColor:'#e8e8e880'}}
>
                    <th
                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-[11px] font-semibold text-gray-600 uppercase tracking-wider">
                        Client
                    </th>
                    <th
                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-[11px] font-semibold text-gray-600 uppercase tracking-wider">
                        Vendor
                    </th>
                    <th
                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-[11px] font-semibold text-gray-600 uppercase tracking-wider">
                        Ticket Id
                    </th>
                    <th
                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-[11px] font-semibold text-gray-600 uppercase tracking-wider">
                        Module Status
                    </th>
                    <th
                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-[11px] font-semibold text-gray-600 uppercase tracking-wider">
                        Report Status
                    </th>
                    <th
                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-[11px] font-semibold text-gray-600 uppercase tracking-wider">
                        Date
                    </th>
                    <th
                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-[11px] font-semibold text-gray-600 uppercase tracking-wider">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody               style={{backgroundColor:'#e8e8e880'}}
>

                {
                    data && data.map((item, index) =>
                        <tr key={item.id}>
                            <td className="px-5 py-5 border-b border-gray-200  text-[11px]"               style={{backgroundColor:'#e8e8e880'}}
 >
                                <div className="flex items-center">

                                    <div className="ml-3">
                                        <Link href={`/admin/dashboard/users/${item.clientHas?.userIs?.id}`} className="text-gray-700  text-[10px">
                                            {item.clientHas?.userIs?.userId || "N/A"}
                                        </Link>
                                    </div>
                                </div>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-[11px]"               style={{backgroundColor:'#e8e8e880'}}
>
                                <div className="flex items-center">

                                    <div className="">
                                        <Link href={`/admin/dashboard/users/${item.vendorHas?.userIs?.id}`} className="text-gray-700 ">
                                            {item.vendorHas?.userIs?.userId || "N/A"}
                                        </Link>

                                    </div>
                                </div>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-[11px]"               style={{backgroundColor:'#e8e8e880'}}
>
                                <p className="text-gray-700 whitespace-no-wrap font-bold">
                                    {item.ticket}
                                </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-[11px]"               style={{backgroundColor:'#e8e8e880'}}
>
                                <span
                                    className="relative inline-block px-3 py-1  leading-tight">
                                    <span aria-hidden
                                        className="absolute inset-0 opacity-50 rounded-full"></span>
                                    <span className="relative bg-green-200 text-green-800 px-2 p-1 rounded font-semibold">{item.status || 'PENDING'}</span>
                                </span>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-[11px]"               style={{backgroundColor:'#e8e8e880'}}
>
                                <span
                                    className="relative inline-block px-3 py-1  leading-tight">
                                    <span aria-hidden
                                        className="absolute inset-0 opacity-50 rounded-full"></span>
                                    <span
                                        className={`relative   px-2 p-1 rounded font-semibold
                                        ${item?.isApprovedByAdmin ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"}
                                        `}>
                                        {item?.isApprovedByAdmin ? "Approved" : "Not Approved"}
                                    </span>
                                </span>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-[11px]"               style={{backgroundColor:'#e8e8e880'}}
>
                                <p className="text-gray-700 whitespace-no-wrap font-bold">
                                    {item?.createdAt.slice(0, 10)}
                                </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-[11px]"               style={{backgroundColor:'#e8e8e880'}}
>
                                <div className="relative flex items-center justify-around  space-x-3 px-8 ">
                                    <button
                                        onClick={() => {
                                            setSelectedTicket(item)
                                            setCurrentReports(item?.reports as string[])
                                            setIsReportModalOpen(true)
                                        }}
                                        className="py-1.5  text-[11px]  px-3 bg-primary text-white duration-150 uppercase border rounded"
                                    >
                                        Reports
                                    </button>

                                    {
                                        ((item?.status as string) === 'ACCEPTED' || (item?.status as string) === 'COMPLAINED' || (item?.status as string) === 'ASSIGNED' || (item?.status as string) === 'COMPLETED' || (item?.status as string) === 'UNDER_REVIEW' || (item?.status as string) === 'DRAFT')
                                            ? (
                                                <button
                                                    disabled
                                                    onClick={() => setIsOpen(true)}
                                                    className="py-1.5 text-[11px]  bg-gray-600 px-3 text-white duration-150 uppercase border rounded"
                                                >
                                                    Reassign
                                                </button>
                                            ) : (
                                                <>
                                                    <button
                                                        onClick={() => {
                                                            setReason(item?.rejectedReason as string || 'N/A')
                                                            setIsRejectModalOpen(true)
                                                        }}
                                                        className="py-1.5 text-[11px]  px-3 bg-primary text-white duration-150 uppercase border rounded"
                                                    >
                                                        Reason
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setIsOpen(true)
                                                            setCurrentModuleTicket({
                                                                moduleTicketId: item.id,
                                                                vendorId: item.vendorHas?.userIs?.id
                                                            })
                                                        }}
                                                        className="py-1.5 text-[11px]  bg-red-600 px-3 text-white duration-150 uppercase border rounded"
                                                    >
                                                        Reassign
                                                    </button>

                                                </>

                                            )
                                    }



                                </div>
                            </td>

                            <RejectReasonModal isOpen={isRejectModalOpen} setIsOpen={setIsRejectModalOpen} reason={reason} />
                        </tr>

                    )
                }





            </tbody>
            <ViewReportModal handleUpdateModuleTicket={handleUpdateModuleTicket} moduleDetails={selectedTicket} setIsOpen={setIsReportModalOpen} isOpen={isReportModalOpen} reports={currentReports} />
            {/* <TicketModal isOpen={isOpen} setIsOpen={setIsOpen} /> */}
        </table>
    );
};

export default TicketTable;