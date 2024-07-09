import { Leads } from '@/gql/graphql';
import React from 'react';
import { ILeadsTableProps } from './interface';
import Link from 'next/link';
import { useCounterData } from '../../CounterProvider';


const LeadsTable = ({ data, setIsModalOpen, totalLeads, setCurrentLead, currentPage, pageLimit }: ILeadsTableProps) => {

    //hooks
    const counterData = useCounterData()

    const handleClick = async (id: string, isViewed: boolean) => {
        if (!isViewed) {
            counterData?.handleUpdateView(id, "lead")
            counterData?.leadRefetch()
        }
    }




    return (
        <table className="min-w-full leading-normal uppercase">
            <thead>
                <tr className='border-b border-gray-200'>
                    <th
                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-dimText dark:text-darkDimText uppercase tracking-wider dark:bg-darkBg dark:border-darkBorder"               style={{backgroundColor:'#e8e8e880'}}
                        >
                        Serial No.
                    </th>
                    <th
                                  style={{backgroundColor:'#e8e8e880'}}

                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-dimText dark:text-darkDimText uppercase tracking-wider dark:bg-darkBg dark:border-darkBorder">
                        Lead  Name
                    </th>
                    <th
                                  style={{backgroundColor:'#e8e8e880'}}

                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-dimText dark:text-darkDimText uppercase tracking-wider dark:bg-darkBg dark:border-darkBorder">
                        Company
                    </th>
                    <th
                                  style={{backgroundColor:'#e8e8e880'}}

                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-dimText dark:text-darkDimText uppercase tracking-wider dark:bg-darkBg dark:border-darkBorder">
                        Email
                    </th>
                    <th
                                  style={{backgroundColor:'#e8e8e880'}}

                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-dimText dark:text-darkDimText uppercase tracking-wider dark:bg-darkBg dark:border-darkBorder">
                        Phone
                    </th>
                    <th
                                  style={{backgroundColor:'#e8e8e880'}}

                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-dimText dark:text-darkDimText uppercase tracking-wider dark:bg-darkBg dark:border-darkBorder">
                        Lead Source
                    </th>

                    <th
                                  style={{backgroundColor:'#e8e8e880'}}

                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-dimText dark:text-darkDimText uppercase tracking-wider dark:bg-darkBg dark:border-darkBorder">
                        Lead Owner
                    </th>

                    <th
                                  style={{backgroundColor:'#e8e8e880'}}

                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-dimText dark:text-darkDimText uppercase tracking-wider dark:bg-darkBg dark:border-darkBorder">
                        Zip Code
                    </th>
                    <th
                                  style={{backgroundColor:'#e8e8e880'}}

                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-dimText dark:text-darkDimText uppercase tracking-wider dark:bg-darkBg dark:border-darkBorder">
                        Action
                    </th>

                </tr>
            </thead>
            <tbody>

                {
                    data && data.map((lead, index) =>
                        <tr key={lead?.id} className={`  ${lead?.isViewed ? " bg-white" : 'bg-gray-200 '}   border-b border-gray-200`}               style={{backgroundColor:'#e8e8e880'}}
                        >

                            <td className="px-5 py-5   text-xs dark:bg-darkBg dark:border-darkBorder" >
                                <p className=" whitespace-no-wrap">

                                    L-{currentPage > 1 ? parseInt(totalLeads) - (index + 1 + (pageLimit * (currentPage - 1))) : totalLeads - index}</p>
                            </td>
                            <td className="px-5 py-5   text-xs dark:bg-darkBg dark:border-darkBorder">
                                <p className=" whitespace-no-wrap">{lead?.name}</p>
                            </td>
                            <td className="px-5 py-5   text-xs dark:bg-darkBg dark:border-darkBorder">
                                <p className=" whitespace-no-wrap">{lead?.company?.slice(0, 16)}..</p>
                            </td>
                            <td className="px-5 py-5   text-xs dark:bg-darkBg dark:border-darkBorder">
                                <p className=" whitespace-no-wrap lowercase">{lead?.email}</p>
                            </td>
                            <td className="px-5 py-5   text-xs dark:bg-darkBg dark:border-darkBorder">
                                <p className=" whitespace-no-wrap lowercase">{lead?.phone}</p>
                            </td>
                            <td className="px-5 py-5   text-xs dark:bg-darkBg dark:border-darkBorder">
                                <p className=" whitespace-no-wrap">
                                    {lead?.leadSource || "N/A"}
                                </p>
                            </td>
                            <td className="px-5 py-5   text-xs dark:bg-darkBg dark:border-darkBorder">
                                <p className=" whitespace-no-wrap">
                                    {lead?.leadOwner || "N/A"}
                                </p>
                            </td>
                            <td className="px-5 py-5   text-xs dark:bg-darkBg dark:border-darkBorder">
                                <p className=" whitespace-no-wrap">
                                    {lead?.hasPrimaryaddress?.zipCode || "N/A"}
                                </p>
                            </td>
                            <td onClick={() => handleClick(lead?.id, lead?.isViewed as boolean)} className="px-5 py-5 cursor-pointer  bg-white text-xs dark:bg-darkBg dark:border-darkBorder rounded-xl font-semibold"               style={{backgroundColor:'#e8e8e880'}}
>
                                <Link href={`/admin/dashboard/leads/details/${lead?.id}`}

                                    className={`   
                                    bg-green-500 text-white
                                relative inline-block  px-4 py-1 rounded-md  leading-tight`} >
                                    <span
                                        className="absolute  "></span>
                                    <span className="relative font-bold">View Details</span>
                                </Link>
                            </td>

                        </tr>

                    )
                }




            </tbody>
        </table>
    );
};

export default LeadsTable;