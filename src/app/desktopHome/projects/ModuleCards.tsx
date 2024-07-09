'use client'

import { Module } from '@/gql/graphql';
import Link from 'next/link';
import React, { useState } from 'react';
import { HiChevronDown, HiChevronUp, HiOutlineDocumentDownload } from 'react-icons/hi';

const ModuleCards = ({ data, deleteModuleById }: { data: Module[], deleteModuleById: any }) => {

    //states
    const [expandedIndex, setExpandedIndex] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    //handle accordion click
    const handleAccordionClick = (index: any) => {
        setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
    };






    return (
        <div>
            {
                data && data.map((module, index) =>
                    <>
                        <div className="transition-all duration-500 my-2 hover:bg-white border text-gray-600 border-gray-200 rounded-md">
                            <>

                                <div
                                    key={module?.id}

                                    className={`accordion-header    cursor-pointer transition flex space-x-5 px-2 xl:px-3 items-center h-auto ${expandedIndex === index ? "bg-white" : ""
                                        }`}
                                    onClick={() => handleAccordionClick(index)}
                                >
                                    <i className={`fas ${expandedIndex === index ? "fa-minus" : "fa-plus"}`}></i>
                                    <div className="flex items-center justify-between w-full   p-3 ">
                                        <div className='flex  flex-col space-y-3 w-80% xl:w-[70%]'>
                                            <p className='text-desktopPrimary font-semibold text-[10px] xl:text-sm'>
                                                Module-{index + 1}
                                            </p>
                                        </div>


                                        <div className='flex items-center justify-center ml-3'>
                                            <button
                                                className=" bg-white  text-primaryText font-bold text-sm xl:text-base rounded-lg "
                                            // onClick={() => handleOpen(1)}
                                            >
                                                {expandedIndex === index ? <HiChevronUp /> : <HiChevronDown />}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {/* Content - body*/}
                                <div
                                    className={`accordion-content px-2 lg:px-5 pt-0 overflow-hidden ${expandedIndex === index ? "max-h-content" : "max-h-0"
                                        }`}
                                    style={{
                                        transition: "all 3s ease-out",
                                    }}
                                >
                                    <div className='py-8 my-5 px-2 lg:px-12 border border-gray-200 rounded-lg'>


                                        <div className="">
                                            <div className="pb-10 relative">
                                                <h5 className="text-primaryText font-bold text-md  mb-2">
                                                    Ticket Id: {module?.moduleticketFor?.ticket || 'Not Assigned Yet'}
                                                </h5>
                                                <h5 className="text-desktopText uppercase font-semibold text-sm  mb-3">
                                                    {module?.title}
                                                </h5>
                                                <p className='text-desktopTextLight text-sm'>
                                                    {
                                                        module?.description
                                                    }
                                                </p>
                                                <div className='grid grid-cols-4 gap-6 mt-5'>


                                                    {
                                                        module?.files ?
                                                            module?.files?.map((item, index) =>
                                                                <Link href={item || '#'} target='_blank' key={index} className=' h-14 w-full bg-gray-200 rounded-md lg:h-20 lg:w-full '>
                                                                    <div className='flex items-center text-xl  justify-center space-x-2'>
                                                                        <p className='mt-5'><HiOutlineDocumentDownload /></p>

                                                                    </div>
                                                                </Link>

                                                            )
                                                            :

                                                            <p className='mt-3 text-sm col-span-full'>No Document Found</p>
                                                    }
                                                </div>


                                                {/* <button onClick={() => setIsOpen(true)} className='absolute -top-1 right-2 py-[3px] px-3 lg:px-4 lg:py-2 bg-green-600 text-white rounded-lg text-xs'>Start</button> */}
                                            </div>

                                        </div>

                                        {/*  delete button */}
                                        <div className='w-full flex items-center justify-end'>
                                            {
                                                !module?.moduleticketFor || module?.moduleticketFor?.status === "PENDING" ? <button
                                                    onClick={() => {
                                                        deleteModuleById(module?.id)

                                                    }}
                                                    className='bg-red-200 text-red-600 font-semibold text-xs px-3 py-1 rounded text-right'>
                                                    Delete Module
                                                </button>
                                                    :
                                                    <></>
                                            }
                                        </div>

                                    </div>
                                </div>
                            </>
                        </div>


                    </>
                )
            }
        </div>
    );
};

export default ModuleCards;