'use client'

import React from 'react';
import { Fragment, useState } from 'react';
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react';


import {
    HiSquares2X2,
    HiFunnel,
    HiPlus,
    HiMinus,
    HiChevronDown,
    HiXMark,
} from 'react-icons/hi2';
import Link from 'next/link';
import { TbArrowBarLeft } from "react-icons/tb";
import { FunnelIcon } from '@heroicons/react/20/solid';

type Option = {
    title: string
    path: string;
};

interface Props {
    children: React.ReactNode;
    setSearchFilter: any;
    category: any;

}

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}





export default function SideBarFilter({ children, setSearchFilter, category }: Props) {

    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(true);

    const filters = [
        {
            id: 1,
            name: 'Date',
            options: [
                {
                    title: 'Today',
                    path: '/'
                },
                {
                    title: 'This Week',
                    path: '/'
                },
                {
                    title: 'This Month',
                    path: '/'
                },

            ],
        },


    ];





    return (


        <>
            <div className="bg-transprent">
                <div>
                    {/* Mobile filter dialog */}
                    <Transition.Root show={mobileFiltersOpen} as={Fragment}>
                        <Dialog
                            as="div"
                            className="relative z-40 lg:hidden"
                            onClose={setMobileFiltersOpen}
                        >
                            <Transition.Child
                                as={Fragment}
                                enter="transition-opacity ease-linear duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="transition-opacity ease-linear duration-300"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="fixed inset-0 bg-black bg-opacity-25" />
                            </Transition.Child>

                            <div className="fixed inset-0 z-40 flex">
                                <Transition.Child
                                    as={Fragment}
                                    enter="transition ease-in-out duration-300 transform"
                                    enterFrom="translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transition ease-in-out duration-300 transform"
                                    leaveFrom="translate-x-0"
                                    leaveTo="translate-x-full"
                                >
                                    <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-transprent py-4 pb-12 shadow-xl">
                                        <div>
                                            {/* <h3 className="text-xl font-bold">Edu Crat</h3> */}
                                        </div>
                                        <div className="flex items-center justify-between px-4">
                                            <h2 className="text-lg font-medium text-gray-900">
                                                Filters
                                            </h2>
                                            <button
                                                type="button"
                                                className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-transprent p-2 text-gray-400"
                                                onClick={() => setMobileFiltersOpen(false)}
                                            >
                                                <span className="sr-only">Close menu</span>
                                                <HiXMark className="h-6 w-6" aria-hidden="true" />
                                            </button>
                                        </div>

                                        {/* Filters */}
                                        <form className="mt-4 border-t border-gray-200">
                                            {filters?.map((section) => (
                                                <Disclosure
                                                    as="div"
                                                    key={section?.id}
                                                    className="border-t border-gray-200 px-4 py-6"
                                                >
                                                    {({ open }) => (
                                                        <>
                                                            <h3 className="-mx-2 -my-3 flow-root">
                                                                <Disclosure.Button className="flex w-full items-center justify-between bg-transprent px-2 py-3 text-gray-400 hover:text-gray-500">
                                                                    <span className="font-medium  uppercase text-md text-gray-900">
                                                                        {section?.name}
                                                                    </span>
                                                                    <span className="ml-6 flex items-center">
                                                                        {open ? (
                                                                            <HiMinus
                                                                                className="h-5 w-5"
                                                                                aria-hidden="true"
                                                                            />
                                                                        ) : (
                                                                            <HiPlus
                                                                                className="h-5 w-5"
                                                                                aria-hidden="true"
                                                                            />
                                                                        )}
                                                                    </span>
                                                                </Disclosure.Button>
                                                            </h3>
                                                            <Disclosure.Panel className="pt-6">

                                                                <div className="space-y-6">
                                                                    {section?.options?.map(
                                                                        (option: Option, optionIdx: number) => (
                                                                            <button
                                                                                onClick={() => setSearchFilter({
                                                                                    type: 'Date',
                                                                                    value: option?.title
                                                                                })}
                                                                                key={option?.title}
                                                                                className="flex items-center"
                                                                            >
                                                                                <label
                                                                                    htmlFor={`filter-mobile-${section?.id}-${optionIdx}`}
                                                                                    className="ml-3 min-w-0 flex-1 text-gray-500 uppercase"
                                                                                >
                                                                                    {option?.title}
                                                                                </label>
                                                                            </button>
                                                                        )
                                                                    )}
                                                                </div>

                                                            </Disclosure.Panel>
                                                        </>
                                                    )}
                                                </Disclosure>
                                            ))}
                                            <Disclosure
                                                as="div"

                                                className="border-t border-gray-200 px-4 py-6"
                                            >
                                                {({ open }) => (
                                                    <>
                                                        <h3 className="-mx-2 -my-3 flow-root">
                                                            <Disclosure.Button className="flex w-full items-center justify-between bg-transprent px-2 py-3 text-gray-400 hover:text-gray-500">
                                                                <span className="font-medium uppercase text-sm text-gray-900">
                                                                    Category
                                                                </span>
                                                                <span className="ml-6 flex items-center">
                                                                    {open ? (
                                                                        <HiMinus
                                                                            className="h-5 w-5"
                                                                            aria-hidden="true"
                                                                        />
                                                                    ) : (
                                                                        <HiPlus
                                                                            className="h-5 w-5"
                                                                            aria-hidden="true"
                                                                        />
                                                                    )}
                                                                </span>
                                                            </Disclosure.Button>
                                                        </h3>
                                                        <Disclosure.Panel className="pt-6">

                                                            <div className="space-y-6">
                                                                {category?.map(
                                                                    (option: any, optionIdx: number) => (
                                                                        <button
                                                                            onClick={() => setSearchFilter({
                                                                                type: 'Category',
                                                                                value: option?.name
                                                                            })}
                                                                            key={option?.name}
                                                                            className="flex items-center"
                                                                        >
                                                                            <label

                                                                                className="ml-3 min-w-0 flex-1 capitalize text-gray-500"
                                                                            >
                                                                                {option?.name}
                                                                            </label>
                                                                        </button>
                                                                    )
                                                                )}
                                                            </div>

                                                        </Disclosure.Panel>
                                                    </>
                                                )}
                                            </Disclosure>
                                        </form>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </Dialog>
                    </Transition.Root>

                    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <>

                            <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-5">
                                <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                                    Events
                                </h1>

                                <button
                                    type="button"
                                    className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                                    onClick={() => setMobileFiltersOpen(true)}
                                >
                                    <span className="sr-only">Filters</span>
                                    <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                                </button>
                            </div>

                        </>

                        <section aria-labelledby="products-heading" className="pb-24 pt-6">
                            <h2 id="products-heading" className="sr-only">
                                Products
                            </h2>

                            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                                {/* to categroies*/}
                                <form className="hidden lg:block">
                                    {/* this is filters */}

                                    {filters.map((section) => (
                                        <Disclosure
                                            as="div"
                                            key={section.id}
                                            className="border-b border-gray-200 py-6"
                                        >
                                            {({ open }) => (
                                                <>
                                                    <h3 className="-my-3 flow-root">
                                                        <Disclosure.Button className="flex w-full items-center justify-between bg-transprent py-3 text-sm text-gray-400 hover:text-gray-500">
                                                            <span className="uppercase text-md text-gray-900">
                                                                {section.name}
                                                            </span>
                                                            <span className="ml-6 flex items-center">
                                                                {open ? (
                                                                    <HiMinus
                                                                        className="h-5 w-5"
                                                                        aria-hidden="true"
                                                                    />
                                                                ) : (
                                                                    <HiPlus
                                                                        className="h-5 w-5"
                                                                        aria-hidden="true"
                                                                    />
                                                                )}
                                                            </span>
                                                        </Disclosure.Button>
                                                    </h3>
                                                    <Disclosure.Panel className="pt-6">

                                                        <div className="space-y-4 text-sm">
                                                            {section.options.map(
                                                                (option: Option, optionIdx: number) => (
                                                                    <button
                                                                        onClick={() => setSearchFilter({
                                                                            type: 'Date',
                                                                            value: option?.title
                                                                        })}
                                                                        key={option?.title}
                                                                        className="flex items-center"
                                                                    >
                                                                        <label
                                                                            htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                                                            className="ml-3 min-w-0 flex-1 text-gray-500 uppercase"
                                                                        >
                                                                            {option?.title}
                                                                        </label>
                                                                    </button>
                                                                )
                                                            )}
                                                        </div>

                                                    </Disclosure.Panel>
                                                </>
                                            )}
                                        </Disclosure>
                                    ))}

                                    <Disclosure
                                        as="div"

                                        className="border-t border-gray-200  py-6"
                                    >
                                        {({ open }) => (
                                            <>
                                                <h3 className="-mx-2 -my-3 flow-root">
                                                    <Disclosure.Button className="flex w-full items-center justify-between bg-transprent px-2 py-3 text-gray-400 hover:text-gray-500">
                                                        <span className="uppercase text-sm text-gray-900">
                                                            Category
                                                        </span>
                                                        <span className="ml-6 flex items-center">
                                                            {open ? (
                                                                <HiMinus
                                                                    className="h-5 w-5"
                                                                    aria-hidden="true"
                                                                />
                                                            ) : (
                                                                <HiPlus
                                                                    className="h-5 w-5"
                                                                    aria-hidden="true"
                                                                />
                                                            )}
                                                        </span>
                                                    </Disclosure.Button>
                                                </h3>
                                                <Disclosure.Panel className="pt-6">

                                                    <div className="space-y-4 text-sm">
                                                        {category?.map(
                                                            (option: any, optionIdx: number) => (
                                                                <button
                                                                    onClick={() => setSearchFilter({
                                                                        type: 'Category',
                                                                        value: option?.name
                                                                    })}
                                                                    key={option?.name}
                                                                    className="flex items-center"
                                                                >
                                                                    <label

                                                                        className="ml-3 text-sm capitalize min-w-0 flex-1 text-gray-500"
                                                                    >
                                                                        {option?.name}
                                                                    </label>
                                                                </button>
                                                            )
                                                        )}
                                                    </div>

                                                </Disclosure.Panel>
                                            </>
                                        )}
                                    </Disclosure>
                                </form>

                                {/* Product grid */}
                                <div className="lg:col-span-3 min-h-screen">{children}</div>
                            </div>
                        </section>
                    </main>
                </div>
            </div >



        </>




    )
}
