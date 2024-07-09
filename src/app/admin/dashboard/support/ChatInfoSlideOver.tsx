import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { SupportTicket } from '@/gql/graphql'
import Link from 'next/link'
import { HiOutlineDocumentDownload } from 'react-icons/hi'


interface Props {
    open: boolean
    setOpen: (open: boolean) => void
    data: SupportTicket,
    loading: boolean
}


export default function ChatInfoSlideOver({ open, setOpen, data, loading }: Props) {


    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-[90000000000000000]" onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-in-out duration-500"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in-out duration-500"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                                            <button
                                                type="button"
                                                className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                                onClick={() => setOpen(false)}
                                            >
                                                <span className="absolute -inset-2.5" />
                                                <span className="sr-only">Close panel</span>
                                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                            </button>
                                        </div>
                                    </Transition.Child>
                                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                                        {
                                            loading ?

                                                <p>
                                                    Loading....
                                                </p>
                                                :
                                                <>
                                                    {
                                                        data?.vendorHas?.userIs?.email ?

                                                            <div className="px-4 sm:px-6">
                                                                <p className='text-xl font-semibold '>Vendor/Service Provider</p>
                                                                <p className='capitalize'>Company name: {data?.vendorHas?.userIs?.companyName || 'N/A'}</p>
                                                                <p>Email: {data?.vendorHas?.userIs?.email || 'N/A'}</p>
                                                                <Link href={`/admin/dashboard/users/${data?.clientHas?.userIs?.id}`}>User Id: {data?.vendorHas?.userIs?.userId || 'N/A'}</Link>
                                                                {/* <p>City: {data?.vendorHas?.userIs?.hasPrimaryaddress?.city || 'N/A'}</p>
                                                                <p>State: {data?.vendorHas?.userIs?.hasPrimaryaddress?.state || 'N/A'}</p> */}
                                                            </div>
                                                            :
                                                            data?.clientHas?.userIs?.email
                                                                ?
                                                                <div className="px-4 sm:px-6 mt-8">
                                                                    <p className='text-xl font-semibold '>Client/Consumer:</p>
                                                                    <p className='capitalize'>Company name: {data?.clientHas?.userIs?.companyName || 'N/A'}</p>
                                                                    <p>Email: {data?.clientHas?.userIs?.email || 'N/A'}</p>
                                                                    <Link href={`/admin/dashboard/users/${data?.clientHas?.userIs?.id}`}>User Id: {data?.clientHas?.userIs?.userId || 'N/A'}</Link>
                                                                    {/* <p>City: {data?.clientHas?.userIs?.hasPrimaryaddress?.city || 'N/A'}</p>
                                                                    <p>State: {data?.clientHas?.userIs?.hasPrimaryaddress?.state || 'N/A'}</p> */}
                                                                </div>
                                                                :
                                                                <p>No data Found </p>
                                                    }

                                                </>

                                        }



                                        <div className="relative mt-6 flex-1 px-4 sm:px-6">

                                            {/* Your content */}

                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
