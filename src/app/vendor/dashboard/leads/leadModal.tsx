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
import { IUserModalProps } from './interface';
import AuthConfig from '@/firebase/oauth.config';



//component
function LeadsModal({ setUserDetails, userDetails, data, setIsModalOpen, isModalOpen, updateLeads, loading }: IUserModalProps) {





    //handle close modal
    function closeModal() {
        setIsModalOpen(false);
    }


    const handleSubmit = (e: any) => {
        e.preventDefault();
        const address = e.target.address.value;
        const duration = e.target.duration.value;
        const price = e.target.price.value;

        const data = {
            address,
            duration,
            price
        }
        updateLeads(data);

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
                                <p className="focus:outline-none pt-4 pb-8 text-base text-center sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">Lead</p>

                                <p className='text-md text-dimText my-6'>
                                    Description : {data?.message}
                                </p>
                                <form onSubmit={handleSubmit} className=''>
                                    <div className="mb-5">
                                        <label htmlFor="title" className="block  text-gray-700 text-sm mb-1">
                                            Address
                                        </label>
                                        <input
                                            type="text"
                                            name='address'
                                            onChange={
                                                (e) => setUserDetails({ ...userDetails, address: e.target.value })}
                                            value={userDetails?.address}
                                            className="mt-1 px-4 py-2 border border-gray-200 rounded-md w-full"
                                        />
                                    </div>
                                    <div className="mb-5">
                                        <label htmlFor="title" className="block  text-gray-700 text-sm mb-1">
                                            Duration
                                        </label>
                                        <input
                                            name='duration'
                                            type="text"
                                            className="mt-1 px-4 py-2 border border-gray-200 rounded-md w-full"
                                        />
                                    </div>
                                    <div className="mb-5">
                                        <label htmlFor="title" className="block  text-gray-700 text-sm mb-1">
                                            Price
                                        </label>
                                        <input
                                            type="number"
                                            name='price'
                                            className="mt-1 px-4 py-2 border border-gray-200 rounded-md w-full"
                                        />
                                    </div>



                                    <div className="mt-10">
                                        <button
                                            // onClick={() => updateUser(data?.email || "", 'APPROVED')}
                                            type="submit"
                                            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-600"
                                        >
                                            {loading ? 'updating' : 'Accept'}
                                        </button>
                                        <button
                                            type="button"
                                            className="ml-2 px-4 py-2 text-gray-500 rounded-md hover:bg-gray-200"
                                            onClick={closeModal}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        </div>
    );
}

export default LeadsModal;
