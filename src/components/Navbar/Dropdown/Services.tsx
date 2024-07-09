'use client'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react';
import { MdKeyboardArrowRight } from 'react-icons/md';
import Link from 'next/link';
import React, { Fragment, useEffect, useState } from 'react';


interface ServicePage {
    servicesData: any
}


const Services = ({ servicesData }: ServicePage) => {

    const [currentService, setCurrentService] = useState('');


    useEffect(() => {
        setCurrentService(servicesData[0]?.name)
    }, [servicesData?.length])


    return (
        <Popover.Group className="hidden lg:flex lg:gap-x-12 mr-8">
            <Popover className="relative">
                <Popover.Button className="flex items-center transform transition-all hover:scale-110 duration-200 outline-none border-none focus:outline-none gap-x-1 text-sm font-400 leading-6 text-primaryText"  style={{textTransform:"uppercase",color:'white'}}>
                    Services
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
                    <Popover.Panel className="absolute mt-10 lg:-ml-24 top-full z-10 w-screen max-w-3xl overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-gray-900/5">

                        <div className=" bg-white p-8 w-full  mx-auto grid grid-cols-1 md:grid-cols-3 shadow-lg rounded-md ">
                            <ul className="px-4 w-full h-[400px] overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch  border-gray-300 border-b sm:border-r lg:border-b-0 pb-6 pt-6 lg:pt-3">
                                {/* <h3 className="font-bold text-xl text-primaryText text-bold mb-2">{title}</h3> */}
                                {
                                    servicesData && servicesData?.map((item: any, index: number) => (
                                        <li
                                            onClick={() => setCurrentService(item?.name || '')}
                                            onMouseOver={() => setCurrentService(item?.name || '')}
                                            key={item.id}
                                            className='cursor-pointer'
                                        >
                                            <div
                                                className={
                                                    `${currentService === item.name ?
                                                        'bg-gray-100 text-primary' : ''}    
                            flex items-center text-sm transition-all duration-300`}>
                                                <p className="block p-3   rounded ">{item.name}</p>
                                                <span className={`${currentService === item.name ? 'block' : 'hidden'} transition-all duration-200`}><MdKeyboardArrowRight /></span>
                                            </div>
                                        </li>
                                    ))
                                }


                            </ul>
                            {/* <ul className="px-4 w-full h-[400px] overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch md:col-span-2  border-gray-300  pb-6 pt-6 lg:pt-3">
                                <h3 className="font-bold text-xl text-primaryText text-bold mb-2">Sub Services</h3>
                                <div className='grid grid-cols-2 text-xs  '>
                                    {
                                        servicesData && servicesData?.find((service: any) => service.name === currentService)?.hasService?.length
                                            ?
                                            servicesData?.find((service: any) => service.name === currentService)?.hasService.map((sub: any) =>
                                                <li key={sub?.id}>
                                                    <Link href={`/services/${sub?.slug}`} className="block p-3 hover:bg-gray-100 rounded uppercase text-primaryText hover:text-primaryText hover:underline" > {sub?.title}</Link>
                                                </li>
                                            )
                                            :
                                            <li>
                                                <p className="block p-3 hover:bg-gray-100 rounded text-primaryText hover:text-primaryText">No Sub Service Available yet.</p>
                                            </li>
                                    }


                                </div>



                            </ul> */}

                        </div>
                    </Popover.Panel>
                </Transition>
            </Popover>

        </Popover.Group>
    );
};

export default Services;