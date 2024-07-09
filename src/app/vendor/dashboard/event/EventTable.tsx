import { Switch } from '@headlessui/react';
import React, { useState } from 'react';
import { AiFillEye, AiOutlineEye, } from 'react-icons/ai';
import { BsPencilSquare } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';


interface Props {
    data: any;
    setCurrentEvent: any;
    loading: boolean;
    setOpenUpdateModal: any;
    setOpenPreviewModal: any;
    setDeleteId: any;
    deleteEvent: any;

}




const EventTable: React.FC<Props> = ({ data, deleteEvent, setCurrentEvent, loading, setOpenUpdateModal, setDeleteId, setOpenPreviewModal }) => {
    if (loading) return <div>Loading...</div>;
    return (
        <div className="container mx-auto px-4 overflow-x-auto">
            <table className="min-w-[800px] w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Serial no.
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Name
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Location
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Start At
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Ends At
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data && data.map((item: any, i: number) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {i + 1}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {item?.name?.slice(0, 20) + '...'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {item?.location?.slice(0, 20)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {item?.startAt.slice(0, 10)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {item?.endAt.slice(0, 10)}
                            </td>
                            <td  >
                                <button className="px-6 py-4 whitespace-nowrap text-center text-md font-medium flex items-center space-x-2">
                                    <button className="px-6 py-4 whitespace-nowrap text-center text-md font-medium flex items-center space-x-2">
                                        <AiOutlineEye onClick={() => {
                                            setOpenUpdateModal(true)
                                            setCurrentEvent(item?.id)
                                        }} className='text-xl text-green-500' />
                                    </button>

                                    <MdDelete onClick={() => {
                                        deleteEvent(item?.id)
                                    }} className='text-xl text-red-500' />
                                </button>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EventTable;