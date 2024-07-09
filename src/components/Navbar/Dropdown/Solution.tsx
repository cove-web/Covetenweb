'use client'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react';
import { MdKeyboardArrowRight } from 'react-icons/md';
import Link from 'next/link';
import React, { Fragment, useEffect, useState } from 'react';

interface SolutionPage {
    solutionData?: any[];
}

const Solution = ({ solutionData = [] }: SolutionPage) => {
    const [currentSolution, setCurrentSolution] = useState('');

    useEffect(() => {
        if (solutionData.length > 0) {
            setCurrentSolution(solutionData[0]?.name || '');
        }
    }, [solutionData]);

    return (
        <Popover.Group className="hidden lg:flex lg:gap-x-12 mr-8">
            <Popover className="relative">
                <Popover.Button className="flex items-center transform transition-all hover:scale-110 duration-200 outline-none border-none focus:outline-none gap-x-1 text-sm font-400 leading-6 text-primaryText" style={{ textTransform: "uppercase", color: 'white' }}>
                    Solutions
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
                    <Popover.Panel className="absolute mt-10 lg:-ml-24 top-full z-10 w-screen max-w-xl overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-gray-900/5">
                        <div className="bg-white p-4 w-full h-[400px] overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch mx-auto grid grid-cols-1 md:grid-cols-3 shadow-lg rounded-md">
                            <ul className="px-4 w-full border-gray-300 border-b sm:border-r lg:border-b-0 pb-3 pt-3 lg:pt-3">
                                {solutionData && solutionData.map((item: any, index: number) => (
                                    <li
                                        onClick={() => setCurrentSolution(item?.name || '')}
                                        onMouseOver={() => setCurrentSolution(item?.name || '')}
                                        key={item.id}
                                        className='cursor-pointer'
                                    >
                                        <div className={`${currentSolution === item.name ? 'bg-gray-100 text-primary' : ''} flex items-center text-sm transition-all duration-300`}>
                                            <p className="block p-3 rounded uppercase">{item.name}</p>
                                            <span className={`${currentSolution === item.name ? 'block' : 'hidden'} transition-all duration-200`}><MdKeyboardArrowRight /></span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <ul className="px-4 w-full md:col-span-2 border-gray-300 pb-6 pt-6 lg:pt-3">
                                <div className='grid grid-cols-2 text-xs capitalize'>
                                    {solutionData && solutionData.find((Solution: any) => Solution.name === currentSolution)?.hasService?.length
                                        ? solutionData.find((Solution: any) => Solution.name === currentSolution)?.hasService.map((sub: any) => (
                                            <li key={sub?.id}>
                                                <Link href={`/services/${sub?.slug}`} className="block p-3 hover:bg-gray-100 rounded text-primaryText hover:text-primaryText hover:underline uppercase">{sub?.title}</Link>
                                            </li>
                                        ))
                                        : <li>
                                            <p className="block p-3 hover:bg-gray-100 rounded text-primaryText hover:text-primaryText">No Sub Solution Available yet.</p>
                                        </li>
                                    }
                                </div>
                            </ul>
                        </div>
                    </Popover.Panel>
                </Transition>
            </Popover>
        </Popover.Group>
    );
};

export default Solution;
