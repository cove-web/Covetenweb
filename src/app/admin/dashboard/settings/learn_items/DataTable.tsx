
import TableSkeleton from '@/components/TableSkeleton';
import Link from 'next/link';
import React from 'react';
import { AiFillEye, AiTwotoneDelete } from 'react-icons/ai';

interface ITermsTableProps {
    learnData: any[]
    deleteItem: (id: string) => void
    setSearchTerm: (term: string) => void
    loading: boolean
    selectedUserType: string
    setSelectedUserType: (type: string) => void
}

const DataTable = ({ learnData, deleteItem, setSearchTerm, loading, setSelectedUserType, selectedUserType }: ITermsTableProps) => {



    return (
        <>
            <div className="my-2 flex justify-end sm:flex-row flex-col mb-5">
                <div className="flex flex-row mb-1 sm:mb-0">

                    <div className="relative">
                        <select
                            value={selectedUserType}
                            onChange={(e) => setSelectedUserType(e.target.value)}
                            className=" h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block  w-full  bg-white border-gray-300  py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r text-xs  focus:border-gray-500  dark:bg-darkBg dark:border-darkBorder">
                            <option value={""}>All</option>
                            <option value={"internationally-accredited"}>Internationally Accredited</option>
                            <option value={"national-accredited"}>National Accredited</option>
                            <option value={"non-certificate"}>Non Certificate Course</option>
                            <option value={"certificate"}>Certificate Course</option>
                            <option value={"long-term"}>Long Term Course</option>
                            <option value={"short-term"}>Short Term Course</option>

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
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search"
                        className="  sm:rounded-l-none border border-gray-300 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none" />
                </div>
            </div>



            {
                loading && <TableSkeleton />
            }

            <table className="w-full leading-normal">


                <thead>
                    <tr>

                        <th
                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase ">
                            Serial No.
                        </th>
                        <th
                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase ">
                            Name
                        </th>
                        <th
                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase ">
                            Duration
                        </th>
                        <th
                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase ">
                            Certification
                        </th>

                        <th
                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase ">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        learnData && learnData?.map((item, i) =>
                            <tr key={i}>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
                                    <div className="flex items-center justify-center font-semibold text-base">

                                        {i + 1}
                                    </div>
                                </td>

                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
                                    <div className="flex items-center">

                                        <div className="">
                                            <p className="text-gray-700 font-bold uppercase whitespace-nowrap ">
                                                {item?.title}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
                                    <div className="flex items-center">

                                        <div className="">
                                            <p className="text-gray-700 font-bold  whitespace-nowrap ">
                                                {item?.duration}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
                                    <div className="flex items-center">

                                        <div className="">
                                            <p className="text-gray-700 font-bold  whitespace-nowrap ">
                                                {item?.certification}
                                            </p>
                                        </div>
                                    </div>
                                </td>



                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
                                    <div className="relative flex items-center justify-center  space-x-4 px-8 ">

                                        <Link href={`/admin/dashboard/settings/learn_items/details/${item?.id}`} className="focus:ring-2 focus:ring-offset-2  text-sm leading-none text-green-600 py-2 px-2 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none"><AiFillEye /></Link>
                                        <button onClick={() => deleteItem(item.id)} className="focus:ring-2 focus:ring-offset-2  text-sm leading-none text-red-600 py-2 px-2 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none"><AiTwotoneDelete /></button>
                                    </div>
                                </td>
                            </tr>)
                    }





                </tbody>
                {/* <TicketModal isOpen={isOpen} setIsOpen={setIsOpen} /> */}
            </table>
        </>
    );
};

export default DataTable