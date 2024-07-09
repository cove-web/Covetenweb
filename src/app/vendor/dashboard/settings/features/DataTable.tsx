
import deleteImage from '@/shared/deleteImage';
import Link from 'next/link';
import React from 'react';
import { AiFillEye, AiTwotoneDelete } from 'react-icons/ai';

interface ITermsTableProps {
    featureData: any[]
    deleteItem: (id: string) => void
}

const DataTable = ({ featureData, deleteItem }: ITermsTableProps) => {



    return (
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
                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase ">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    featureData && featureData?.map((item, i) =>
                        <tr key={i}>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
                                <div className="flex items-center justify-center font-semibold text-base">

                                    {i + 1}
                                </div>
                            </td>

                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
                                <div className="flex items-center">

                                    <div className="">
                                        <p className="text-gray-700 font-bold  whitespace-nowrap ">
                                            {item?.title}
                                        </p>
                                    </div>
                                </div>
                            </td>



                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
                                <div className="relative flex items-center justify-center  space-x-4 px-8 ">

                                    <Link href={`/admin/dashboard/settings/features/details/${item?.id}`} className="focus:ring-2 focus:ring-offset-2  text-sm leading-none text-green-600 py-2 px-2 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none"><AiFillEye /></Link>
                                    <button onClick={() => {
                                        deleteItem(item.id)
                                        deleteImage(item.image)
                                    }} className="focus:ring-2 focus:ring-offset-2  text-sm leading-none text-red-600 py-2 px-2 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none"><AiTwotoneDelete /></button>
                                </div>
                            </td>
                        </tr>)
                }





            </tbody>
            {/* <TicketModal isOpen={isOpen} setIsOpen={setIsOpen} /> */}
        </table>
    );
};

export default DataTable