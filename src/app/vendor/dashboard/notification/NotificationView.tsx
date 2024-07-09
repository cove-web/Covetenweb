'use client'
import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';


//props interface
interface INotificationModal {
    isNotificationViewModalOpen: boolean;
    setIsNotificationViewModalOpen: (value: boolean) => void;
    data: any
}

// GraphQL Mutation for creating notification


//component
function NotificationView({ data, isNotificationViewModalOpen, setIsNotificationViewModalOpen }: INotificationModal) {

    //handle close modal
    function closeModal() {
        setIsNotificationViewModalOpen(false);
    }



    //render
    return (
        <div>


            <Transition.Root show={isNotificationViewModalOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed z-[120000000000] inset-0 overflow-y-auto"
                    onClose={closeModal}
                >
                    <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />
                        </Transition.Child>

                        <span
                            className="hidden sm:inline-block sm:align-middle sm:h-screen"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>

                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >

                            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                                <p className="focus:outline-none pt-4 pb-8 text-base text-center sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-white-800">Notifications</p>
                                <div className='space-y-4'>
                                    <p className="block  text-white-700 font-semibold  mb-1"> 
                                        {data?.title}
                                    </p>
                                    <p className="block  text-white-700  mb-1">
                                        {data?.description}
                                    </p>





                                    <div className="mt-16">

                                        <button
                                            type="button"
                                            className="ml-2 px-4 py-1 text-white-500 rounded-md hover:bg-gray-200"
                                            onClick={closeModal}
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        </div>
    );
}

export default NotificationView;
