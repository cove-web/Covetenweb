'use client'
import { Fragment, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Dialog, Transition } from '@headlessui/react';
import { useGqlClient } from '@/hooks/UseGqlClient';
import { useMutation } from 'graphql-hooks';
import { toast } from 'react-hot-toast';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import Image from 'next/image';
import { User } from '@/gql/graphql';
import { data } from 'autoprefixer';
import { HiOutlineDocumentDownload } from 'react-icons/hi';
import Link from 'next/link';

//props interface
interface IUserModalProps {
    isModalOpen: boolean;
    setIsModalOpen: (value: boolean) => void;
    data: User
    updateUserLoading: boolean
    updateUser: (email: string, status: string) => void
}



//component
function UserModal({ setIsModalOpen, isModalOpen, data, updateUser, updateUserLoading }: IUserModalProps) {




    //handle close modal
    function closeModal() {
        setIsModalOpen(false);
    }


    //render
    return (
        <div>


            <Transition.Root show={isModalOpen} as={Fragment}>
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
                                <p className="focus:outline-none pt-4 pb-8 text-base text-center sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">Approve user</p>
                                <div className=''>
                                    <div className="mb-5">
                                        <label htmlFor="title" className="block  text-gray-700 text-sm mb-1">
                                            Company Name
                                        </label>
                                        <input
                                            placeholder='company name'
                                            type="text"
                                            value={data?.companyName || 'N/A'}
                                            className="mt-1 px-4 py-2 border border-gray-200 rounded-md w-full"
                                        />
                                    </div>
                                    <div className="mb-5">
                                        <label htmlFor="title" className="block  text-gray-700 text-sm mb-1">
                                            Company Email
                                        </label>
                                        <input
                                            placeholder='company name'
                                            type="text"
                                            value={data?.companyEmail || 'N/A'}
                                            className="mt-1 px-4 py-2 border border-gray-200 rounded-md w-full"
                                        />
                                    </div>
                                    <div className="mb-5">
                                        <label htmlFor="title" className="block  text-gray-700 text-sm mb-1">
                                            Gst No.
                                        </label>
                                        <input
                                            placeholder='company name'
                                            type="text"
                                            value={data?.gstNumber || 'N/A'}
                                            className="mt-1 px-4 py-2 border border-gray-200 rounded-md w-full"
                                        />
                                    </div>
                                    <div className="mb-5">
                                        <div className=''>
                                            <p className='text-xs lg:text-sm font-bold text-gray-700'>Documents</p>

                                            <div className='mt-3 grid grid-cols-3 lg:grid-cols-3 gap-2 lg:gap-6'>
                                                {
                                                    data?.hasDocuments?.hasFiles?.links ?
                                                        data?.hasDocuments?.hasFiles?.links?.map((item, index) =>
                                                            <Link href={item || '#'}
                                                                key={index}
                                                                target='_blank'
                                                                style={{
                                                                    backgroundImage: `url(${'/assets/file.svg'})`,
                                                                    backgroundRepeat: 'no-repeat',
                                                                    backgroundPosition: 'center',

                                                                }}
                                                                className=' h-28 w-24 text-sm flex items-center justify-center text-gray-800 font-semibold'>
                                                                document-{index + 1}
                                                            </Link>

                                                        )
                                                        :

                                                        <p className='mt-3 text-sm col-span-full'>No Document Found</p>
                                                }


                                            </div>


                                        </div>
                                    </div>


                                    <div className="mt-10">
                                        <button
                                            onClick={() => updateUser(data?.email || "", 'APPROVED')}
                                            type="submit"
                                            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-600"
                                        >
                                            {updateUserLoading ? 'updating' : 'Confirm'}
                                        </button>
                                        <button
                                            type="button"
                                            className="ml-2 px-4 py-2 text-gray-500 rounded-md hover:bg-gray-200"
                                            onClick={closeModal}
                                        >
                                            Cancel
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

export default UserModal;
