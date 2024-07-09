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
import { useGqlClient } from '@/hooks/UseGqlClient';
import { useQuery } from 'graphql-hooks';
import Loading from '../loading';
import { FunnelIcon } from '@heroicons/react/20/solid';
import Main from './Main';









function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}





// component
export default function Sidebar() {


    // STATES
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [searchOption, setSearchOption] = React.useState('')
    const [searchTerm, setSearchTerm] = React.useState('')



    return (


        <>
            <div className="bg-white">
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
                                    <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white px-6 py-4 pb-12 shadow-xl">
                                        <div>
                                            {/* <h3 className="text-xl font-bold">Edu Crat</h3> */}
                                        </div>
                                        <div className="flex items-center justify-between px-4">
                                            <h2 className="text-lg font-medium text-gray-900">
                                                Filters
                                            </h2>
                                            <button
                                                type="button"
                                                className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-primary p-2 text-gray-900"
                                                onClick={() => setMobileFiltersOpen(false)}
                                            >
                                                <span className="sr-only">Close menu</span>
                                                <HiXMark className="h-6 w-6" aria-hidden="true" />
                                            </button>
                                        </div>

                                        {/* Filters */}
                                        {/* mobile filters */}
                                        <form className="mt-4 border-t border-gray-200">
                                            <Disclosure
                                                as="div"
                                                className="border-b border-gray-200 py-6"
                                            >
                                                {({ open }) => (
                                                    <>
                                                        <h3 className="-my-3 flow-root">
                                                            <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500" style={{border:'none'}}>
                                                                <span className="font-medium text-gray-900 capitalize" style={{border:'none'}}>
                                                                    DURATION
                                                                </span>
                                                                <span className="ml-6 flex items-center" style={{border:'none'}}>
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

                                                            <div className="space-y-4">
                                                                <div
                                                                    onClick={() => {

                                                                        setSearchOption('duration')
                                                                        setSearchTerm('short-term')
                                                                    }}

                                                                    className="flex items-center cursor-pointer"
                                                                >
                                                                    <p
                                                                        className="ml-3 uppercase text-sm text-gray-600 cursor-pointer  ">
                                                                        Short Term Course
                                                                    </p>
                                                                </div>
                                                            </div>

                                                            <div className="space-y-4 mt-3">
                                                                <div
                                                                    onClick={() => {

                                                                        setSearchOption('duration')
                                                                        setSearchTerm('long-term')
                                                                    }}

                                                                    className="flex items-center cursor-pointer"
                                                                >
                                                                    <p
                                                                        className="ml-3 uppercase text-sm text-gray-600 cursor-pointer  ">
                                                                        Long Term Course
                                                                    </p>
                                                                </div>
                                                            </div>

                                                        </Disclosure.Panel>
                                                    </>
                                                )}
                                            </Disclosure>
                                            <Disclosure
                                                as="div"
                                                className="border-b border-gray-200 py-6"
                                            >
                                                {({ open }) => (
                                                    <>
                                                        <h3 className="-my-3 flow-root">
                                                            <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                                                <span className="font-medium text-gray-900 uppercase">
                                                                    certification
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

                                                            <div className="space-y-4">
                                                                <div
                                                                    onClick={() => {

                                                                        setSearchOption('certification')
                                                                        setSearchTerm('certificate')
                                                                    }}

                                                                    className="flex items-center cursor-pointer"
                                                                >
                                                                    <p
                                                                        className="ml-3 uppercase text-sm text-gray-600 cursor-pointer  ">
                                                                        Certificate Course
                                                                    </p>
                                                                </div>

                                                            </div>

                                                            <div className="space-y-4 mt-3">

                                                                <div
                                                                    onClick={() => {

                                                                        setSearchOption('certification')
                                                                        setSearchTerm('non-certificate')
                                                                    }}

                                                                    className="flex items-center cursor-pointer"
                                                                >
                                                                    <p
                                                                        className="ml-3 uppercase text-sm text-gray-600 cursor-pointer  ">
                                                                        Non Certificate Course
                                                                    </p>
                                                                </div>
                                                            </div>

                                                        </Disclosure.Panel>
                                                    </>
                                                )}
                                            </Disclosure>
                                            <Disclosure
                                                as="div"
                                                className="border-b border-gray-200 py-6"
                                            >
                                                {({ open }) => (
                                                    <>
                                                        <h3 className="-my-3 flow-root">
                                                            <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                                                <span className="font-medium text-gray-900 uppercase">
                                                                    Accredited
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

                                                            <div className="space-y-4">
                                                                <div
                                                                    onClick={() => {

                                                                        setSearchOption('accredited')
                                                                        setSearchTerm('internationally-accredited')
                                                                    }}

                                                                    className="flex items-center cursor-pointer"
                                                                >
                                                                    <p
                                                                        className="ml-3 uppercase text-sm text-gray-600 cursor-pointer  ">
                                                                        Internationally accredited
                                                                    </p>
                                                                </div>
                                                            </div>

                                                            <div className="space-y-4 mt-3">
                                                                <div
                                                                    onClick={() => {

                                                                        setSearchOption('accredited')
                                                                        setSearchTerm('national-accredited')
                                                                    }}

                                                                    className="flex items-center cursor-pointer"
                                                                >
                                                                    <p
                                                                        className="ml-3 uppercase text-sm text-gray-600 cursor-pointer  ">
                                                                        National accredited
                                                                    </p>
                                                                </div>
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

                            <div className="flex items-baseline justify-between border-b border-gray-200 mt-5 pb-6">
                                {/* <h1 className="text-xl lg:text-4xl font-bold tracking-tight text-gray-900">Learn</h1> */}
                                <h1 className='text-xl font-bold lg:hidden'>Learn </h1>
                                <div className="flex items-center">
                                    <div></div>
                                    <button
                                        type="button"
                                        className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                                        onClick={() => setMobileFiltersOpen(true)}
                                    >
                                        <span className="sr-only">Filters</span>
                                        <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                                    </button>
                                </div>
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
                                    <Disclosure
                                        as="div"
                                        className="border-b border-gray-200 py-6"
                                    >
                                        {({ open }) => (
                                            <>
                                                <h3 className="-my-3 flow-root">
                                                    <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                                        <span className="font-medium text-gray-900 uppercase">
                                                            DURATION
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

                                                    <div className="space-y-4">
                                                        <div
                                                            onClick={() => {

                                                                setSearchOption('duration')
                                                                setSearchTerm('short-term')
                                                            }}

                                                            className="flex items-center cursor-pointer"
                                                        >
                                                            <p
                                                                className="ml-3 uppercase text-sm text-gray-600 cursor-pointer  ">
                                                                Short Term Course
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="space-y-4 mt-3">
                                                        <div
                                                            onClick={() => {

                                                                setSearchOption('duration')
                                                                setSearchTerm('long-term')
                                                            }}

                                                            className="flex items-center cursor-pointer"
                                                        >
                                                            <p
                                                                className="ml-3 uppercase text-sm text-gray-600 cursor-pointer  ">
                                                                Long Term Course
                                                            </p>
                                                        </div>
                                                    </div>

                                                </Disclosure.Panel>
                                            </>
                                        )}
                                    </Disclosure>
                                    <Disclosure
                                        as="div"
                                        className="border-b border-gray-200 py-6"
                                    >
                                        {({ open }) => (
                                            <>
                                                <h3 className="-my-3 flow-root">
                                                    <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                                        <span className="font-medium text-gray-900 uppercase">
                                                            certification
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

                                                    <div className="space-y-4">
                                                        <div
                                                            onClick={() => {

                                                                setSearchOption('certification')
                                                                setSearchTerm('certificate')
                                                            }}

                                                            className="flex items-center cursor-pointer"
                                                        >
                                                            <p
                                                                className="ml-3 uppercase text-sm text-gray-600 cursor-pointer  ">
                                                                Certificate Course
                                                            </p>
                                                        </div>

                                                    </div>

                                                    <div className="space-y-4 mt-3">

                                                        <div
                                                            onClick={() => {

                                                                setSearchOption('certification')
                                                                setSearchTerm('non-certificate')
                                                            }}

                                                            className="flex items-center cursor-pointer"
                                                        >
                                                            <p
                                                                className="ml-3 uppercase text-sm text-gray-600 cursor-pointer  ">
                                                                Non Certificate Course
                                                            </p>
                                                        </div>
                                                    </div>

                                                </Disclosure.Panel>
                                            </>
                                        )}
                                    </Disclosure>
                                    <Disclosure
                                        as="div"
                                        className="border-b border-gray-200 py-6"
                                    >
                                        {({ open }) => (
                                            <>
                                                <h3 className="-my-3 flow-root">
                                                    <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                                        <span className="font-medium text-gray-900 uppercase">
                                                            accredited
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

                                                    <div className="space-y-4">
                                                        <div
                                                            onClick={() => {

                                                                setSearchOption('accredited')
                                                                setSearchTerm('internationally-accredited')
                                                            }}

                                                            className="flex items-center cursor-pointer"
                                                        >
                                                            <p
                                                                className="ml-3 uppercase text-sm text-gray-600 cursor-pointer  ">
                                                                Internationally accredited
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="space-y-4 mt-3">
                                                        <div
                                                            onClick={() => {

                                                                setSearchOption('accredited')
                                                                setSearchTerm('national-accredited')
                                                            }}

                                                            className="flex items-center cursor-pointer"
                                                        >
                                                            <p
                                                                className="ml-3 uppercase text-sm text-gray-600 cursor-pointer  ">
                                                                National accredited
                                                            </p>
                                                        </div>
                                                    </div>

                                                </Disclosure.Panel>
                                            </>
                                        )}
                                    </Disclosure>
                                </form>

                                {/* Product grid */}
                                <div className="lg:col-span-3 min-h-screen">
                                    <Main searchTerm={searchTerm} searchOption={searchOption} />

                                </div>
                            </div>
                        </section>
                    </main>
                </div>
            </div >



        </>




    )
}
