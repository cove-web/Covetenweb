import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

export default function SliderOver({ open, setOpen, setSelectedFilter, selectedFilter }: any) {





    const SystemDefinedFilters = [
        {
            id: 1,
            name: "Touched Records",
        },
        {
            id: 2,
            name: "Untouched Records",
        },
        {
            id: 3,
            name: "Record Action",
        },
        {
            id: 4,
            name: "Related Records Action",
        },
        {
            id: 5,
            name: "Activities",
        },
        {
            id: 6,
            name: "Notes",
        },
        {
            id: 7,
            name: "Campaigns",
        },
    ]

    const CustomFilters = [
        {
            id: 9,
            name: "Annual Revenue",
        },
        {
            id: 10,
            name: "City",
        },
        {
            id: 11,
            name: "Company",
        },
        {
            id: 12,
            name: "Converted Account",
        },
        {
            id: 13,
            name: "Converted Contact",
        },
        {
            id: 14,
            name: "Converted Deal",
        },
        {
            id: 15,
            name: "Country",
        },
        {
            id: 16,
            name: "Created By",
        },
        {
            id: 17,
            name: "Created Time",
        },
        {
            id: 18,
            name: "Email",
        },
        {
            id: 19,
            name: "Email Opt Out",
        },
        {
            id: 20,
            name: "First Name",
        },
        {
            id: 21,
            name: "Industry",
        },
        {
            id: 22,
            name: "Last Activity Time",
        },
        {
            id: 23,
            name: "Last Name",
        },
        {
            id: 24,
            name: "Lead Conversion Time",
        },
        {
            id: 25,
            name: "Lead Name",
        },
        {
            id: 26,
            name: "Lead Owner",
        },
        {
            id: 27,
            name: "Lead Source",
        },
        {
            id: 28,
            name: "Lead Status",
        },
        {
            id: 29,
            name: "Mobile",
        },
        {
            id: 30,
            name: "Modified By",
        },
        {
            id: 31,
            name: "No. of Employees",
        },
    ]

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-[50000000000000]" onClose={setOpen}>
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
                                        <div className="px-4 sm:px-6">
                                            {/* <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                                                Panel title
                                            </Dialog.Title> */}
                                        </div>
                                        <div className="relative mt-6 flex-1 px-4 sm:px-6">


                                            <div>
                                                <h1 className='font-bold text-lg'>System Defined Filters:</h1>
                                                <ul>
                                                    {SystemDefinedFilters.map((item: any) => (
                                                        <li key={item.id}>
                                                            <label htmlFor={`system-filter-${item.id}`} className="max-w-xs mt-5 flex p-3 block w-full bg-white border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400">
                                                                <input
                                                                    type="radio"
                                                                    id={`system-filter-${item.id}`}
                                                                    name="system-filters"
                                                                    checked={selectedFilter?.id === item.id}
                                                                    onChange={() => setSelectedFilter(item)}
                                                                    className=""
                                                                />
                                                                <span className="text-sm text-gray-800 ms-3 dark:text-gray-400">{item.name}</span>
                                                            </label>
                                                        </li>
                                                    ))}
                                                    <h1 className='font-bold text-lg mt-10'>Filter By Fields:</h1>
                                                    {CustomFilters.map((item: any) => (
                                                        <li key={item.id}>
                                                            <label htmlFor={`custom-filter-${item.id}`} className="max-w-xs mt-5 flex p-3 block w-full bg-white border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400">
                                                                <input
                                                                    type="radio"
                                                                    id={`custom-filter-${item.id}`}
                                                                    name="custom-filters"
                                                                    checked={selectedFilter?.id === item.id}
                                                                    onChange={() => setSelectedFilter(item)}
                                                                    className=""
                                                                />
                                                                <span className="text-sm text-gray-800 ms-3 dark:text-gray-400">{item.name}</span>
                                                            </label>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>


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
