'use client'

import { Invoice } from '@/gql/graphql';
import Link from 'next/link';
import React, { useState } from 'react';
import { AiFillEye, AiTwotoneDelete } from 'react-icons/ai';
import ViewModal from './ViewModal';
import { useCounterData } from '../../CounterProvider';
interface ITableItem {
    data: Invoice[]
    deleteInvoice: (id: any) => void
    setIsOpen: (isOpen: boolean) => void
    setCurrentComplain: (complain: any) => void
}


const InvoiceTable = ({ data, deleteInvoice, setIsOpen, setCurrentComplain }: ITableItem) => {

    const counterData = useCounterData()

    const handleClick = async (id: string, isViewed: boolean) => {
        if (!isViewed) {
            counterData?.handleUpdateView(id, "complain")
            counterData?.complaintsRefetch()
        }
    }

    return (
        <table className="w-full table-auto text-sm text-left">
            <thead className="text-gray-600 font-medium border-b">
                <tr>
                    <th className="py-3 pr-6">Serial No.</th>
                    <th className="py-3 pr-6">Id</th>
                    <th className="py-3 pr-6">User Id</th>
                    <th className="py-3 pr-6">Status</th>
                    <th className="py-3 pr-6 text-right">Action</th>
                </tr>
            </thead>
            <tbody className="text-gray-600 divide-y">

                {
                    !data?.length && <>
                        <tr>
                            <td className="py-3 pr-6">No Complain Found</td>
                        </tr>

                    </>
                }

                {
                    data && data.map((item, idx) => (
                        <tr key={item?.id} className={item?.isViewed ? "bg-white" : ' bg-gray-200 '}>
                            <td className="pr-6 py-4 whitespace-nowrap">{idx + 1}</td>
                            <td className="pr-6 py-4 whitespace-nowrap">
                                {`CIS/QN${item?.ticket}`}
                            </td>
                            <td className="pr-6 py-4 whitespace-nowrap uppercase">
                                <Link target='_blank' href={`/admin/dashboard/users/${item?.hasClient?.userIs?.id}`}>
                                    {item?.hasClient?.userIs?.userId || 'N/A'}
                                </Link>
                            </td>
                            <td className="pr-6 py-4 whitespace-nowrap">
                                {item?.status}
                            </td>
                            <td className="text-right whitespace-nowrap space-x-3">

                                <button onClick={() => {
                                    setIsOpen(true)
                                    handleClick(item?.id, item?.isViewed as boolean)
                                    setCurrentComplain(item?.complain)

                                }} className="py-1.5 px-3   bg-blue-200 text-blue-700 ">
                                    View Complain
                                </button>
                                <Link href={`/admin/dashboard/complains/${item?.id}`} className="py-1.5 px-3 bg-green-200 text-green-700  ">
                                    Edit
                                </Link>
                                <button onClick={() => deleteInvoice(item?.id)} className="py-1.5 px-3 bg-red-200 text-red-700">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>

        </table>
    );
};

export default InvoiceTable;    