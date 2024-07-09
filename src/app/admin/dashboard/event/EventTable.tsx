import React, { useState } from 'react';
import { AiOutlineEye } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import ApprovalModal from './ApprovalModal';

interface Props {
    data: any;
    setCurrentEvent: any;
    loading: boolean;
    setOpenUpdateModal: any;
    setOpenPreviewModal: any;
    setDeleteId: any;
    deleteEvent: any;
    updateEvent :any;
}

const EventTable: React.FC<Props> = ({
    data,
    deleteEvent,
    setCurrentEvent,
    loading,
    setOpenUpdateModal,
    setDeleteId,
    setOpenPreviewModal,
    updateEvent
}) => {
    const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<any>(null);

    const handleApproveClick = (event: any) => {
        setSelectedEvent(event);
        setIsApprovalModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsApprovalModalOpen(false);
    };

    const handleConfirmApproval = () => {
        // Handle the approval logic here
        setIsApprovalModalOpen(false);
    };

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
                            Approve
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
                            {/* <td>
                                <button onClick={() => handleApproveClick(item)} className="text-blue-500">
                                    Approve
                                </button>
                            </td> */}
                              <td>
                                {!item.IsApproved ? (
                                    <button onClick={() => handleApproveClick(item)} className="text-blue-500">
                                        Approve
                                    </button>
                                ) : (
                                    <span className="text-green-500">Approved</span>
                                )}
                            </td>
                            <td>
                                <div className="flex items-center space-x-2">
                                    <AiOutlineEye onClick={() => {
                                        setOpenUpdateModal(true);
                                        setCurrentEvent(item?.id);
                                    }} className='text-xl text-green-500' />
                                    <MdDelete onClick={() => {
                                        deleteEvent(item?.id);
                                    }} className='text-xl text-red-500' />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ApprovalModal
                isOpen={isApprovalModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleConfirmApproval}
                data={selectedEvent}
                updateEvent={updateEvent}
            />
        </div>
    );
};

export default EventTable;
