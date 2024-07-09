'use client'
import React, { Fragment, useState } from 'react';
import { Popover, Transition } from '@headlessui/react';
import Link from 'next/link';
import { FaCaretDown } from 'react-icons/fa';

type Items = {
    name: string;
    description: string;
    url: string;
    icon?: any;

}


interface IDropdownProps {
    data: Items[]
    title: string
}



const Dropdown = ({ data, title }: IDropdownProps) => {

    return (
        <Popover.Group className="hidden lg:flex lg:gap-x-12 mr-8">
            <Popover className="relative">
                <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-primaryText">
                    {title}

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
                    <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-gray-900/5">
                        <div className="p-4">
                            {data?.map((item: Items) => (
                                <Link
                                    href={item?.url}
                                    key={item.name}
                                    className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                                >
                                    <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                        <item.icon
                                            className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                                            aria-hidden="true"
                                        />
                                    </div>
                                    <div className="flex-auto">
                                        <p className="block font-semibold text-primaryText">
                                            {item.name}
                                            <span className="absolute inset-0" />
                                        </p>
                                        <p className="mt-1 text-gray-600">
                                            {item.description}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </Popover.Panel>
                </Transition>
            </Popover>
        </Popover.Group>
    );
};

export default Dropdown;