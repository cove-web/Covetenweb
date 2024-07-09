'use client'
import React, { Fragment, useState } from 'react';
import { Popover, Transition } from '@headlessui/react';
import Link from 'next/link';





const Features = ({ features }: any) => {


    return (
        <Popover.Group className="hidden lg:flex lg:gap-x-12 mr-8">
            <Popover className="relative">
                <Popover.Button  className="flex outline-none border-none ring-0 items-center gap-x-1 text-sm font-400 leading-6 text-primaryText transform transition-all hover:scale-110 duration-200"  style={{textTransform:"uppercase",color:'white'}}>
                    Features
                </Popover.Button>

                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                >
                    <Popover.Panel className="absolute -left-8 top-full  border-none outline-none z-10 mt-10 w-screen max-w-2xl  overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-gray-900/5">
                        <div className="p-4 grid grid-cols-1 lg:grid-cols-2 lg:gap-2">
                            <Link
                                href={`/about_us`}
                                className="group relative flex items-center gap-x-4 rounded-lg p-4 text-sm leading-6 hover:bg-gray-200"
                            >

                                <div className="flex-auto">
                                    <p className="block uppercase font-400 text-primaryText">
                                        About Us
                                        <span className="absolute inset-0" />
                                    </p>
                                    <p className="mt-1 text-xs text-gray-600">
                                        Learn about our company
                                    </p>
                                </div>
                            </Link>
                            {/* {features?.length && features?.map((item: any) => (
                                <Link
                                    href={`/features#${item?.id}`}
                                    key={item?.title}
                                    className="group  relative flex items-center gap-x-4 rounded-lg p-4 text-sm leading-6 hover:bg-gray-200"
                                >

                                    <div className="flex-auto">
                                        <p className="block uppercase font-400 text-primaryText ">
                                            {item?.title}
                                            <span className="absolute inset-0" />
                                        </p>
                                        <p className="mt-1 text-xs text-gray-600">
                                            Learn About  {item?.title}
                                        </p>
                                    </div>
                                </Link>
                            ))} */}
                              <Link
                                href={`/feature`}
                                className="group relative flex items-center gap-x-4 rounded-lg p-4 text-sm leading-6 hover:bg-gray-200"
                            >

                                <div className="flex-auto">
                                    <p className="block uppercase font-400 text-primaryText">
                                        Aboutt more
                                        <span className="absolute inset-0" />
                                    </p>
                                    <p className="mt-1 text-xs text-gray-600">
                                        Learn about our company
                                    </p>
                                </div>
                            </Link>
                        </div>
                    </Popover.Panel>
                </Transition>
            </Popover>
        </Popover.Group>
    );
};

export default Features;
