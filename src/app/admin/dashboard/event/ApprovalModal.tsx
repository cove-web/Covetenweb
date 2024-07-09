import React from 'react';
import { Event } from '@/gql/graphql';

interface ApprovalModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    data: Event | null;
    updateEvent: any
}

const ApprovalModal: React.FC<ApprovalModalProps> = ({ isOpen, onClose, onConfirm, data,updateEvent }) => {
    if (!isOpen || !data) return null;

    const handleConfirm = () => {
        if (data && data.id) {
            updateEvent(data.id, true); // Passing true to set isApproved to true
        //   closeModal();
        }
      };
    

    return (
        <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4">
               
                <div className="relative bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                   
                    <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                <p className="focus:outline-none pt-4 pb-8 text-base text-center sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
                  Event Details
                </p>
                <div>
                  <div className="mb-5">
                    <label htmlFor="title" className="block text-gray-700 text-sm mb-1">
                      Event Name
                    </label>
                    <input
                      placeholder="Product name"
                      type="text"
                      value={data?.name || 'N/A'}
                      className="mt-1 px-4 py-2 border border-gray-200 rounded-md w-full"
                      readOnly
                    />
                  </div>
                  <div className="mb-5">
                    <label htmlFor="title" className="block text-gray-700 text-sm mb-1">
                      Event Location
                    </label>
                    <input
                      placeholder="Product name"
                      type="text"
                      value={data?.location || 'N/A'}
                      className="mt-1 px-4 py-2 border border-gray-200 rounded-md w-full"
                      readOnly
                    />
                  </div>
                  <div className="mb-5">
                    <label htmlFor="title" className="block text-gray-700 text-sm mb-1">
                      Start Date
                    </label>
                    <input
                      placeholder="Product name"
                      type="text"
                    //   value={data?.features || 'N/A'}
                      value= {data.startAt.slice(0, 10)}
                      className="mt-1 px-4 py-2 border border-gray-200 rounded-md w-full"
                      readOnly
                    />
                  </div>
                  <div className="mb-5">
                    <label htmlFor="title" className="block text-gray-700 text-sm mb-1">
                      End Date 
                    </label>
                    <input
                      placeholder="Product name"
                      type="text"
                    //   value={data?.features || 'N/A'}
                    value= {data.endAt.slice(0, 10)}
                      className="mt-1 px-4 py-2 border border-gray-200 rounded-md w-full"
                      readOnly
                    />
                  </div>
                
                  <div className="mb-5">
                    <label htmlFor="price" className="block text-gray-700 text-sm mb-1">
                      Image
                    </label>
                    {data?.image ? (
                      <img
                        src={data.image}
                        alt="Image"
                        className="mt-1 border border-gray-200 rounded-md w-full"
                      />
                    ) : (
                      <p className="mt-1 px-4 py-2 border border-gray-200 rounded-md w-full">
                        N/A
                      </p>
                    )}
                  </div>
                 
                  <div className="mt-10 flex justify-between">
                    <button
                      type="button"
                      className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
                    //   onClick={closeModal}
                    
                    onClick={onClose}
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-600"
                    //   onClick={handleConfirm}
                    onClick={handleConfirm}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
                    {/* <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                            type="button"
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={onConfirm}
                        >
                            Confirm
                        </button>
                        <button
                            type="button"
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default ApprovalModal;
