'use client'

import { Module } from '@/gql/graphql';
import Link from 'next/link';
import React, { useState } from 'react';
import { HiChevronDown, HiChevronUp, HiOutlineDocumentDownload } from 'react-icons/hi';


interface IModuleProps {
    data: Module[]
    setCurrentProject: any
    projectTicket: string
    clientEmail: string
    setIsOpen: any
}



const ModuleCards = ({ data, setCurrentProject, projectTicket, clientEmail, setIsOpen }: IModuleProps) => {

    //states
    const [expandedIndex, setExpandedIndex] = useState(null);


    //handle accordion click
    const handleAccordionClick = (index: any) => {
        setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
    };




// console.log(data);


    return (
        <div>
            {
                data && data.map((module, index) =>
                    <>
                        <div className="transition-all duration-500 my-2 hover:bg-white border text-gray-600 border-gray-200 rounded-md"               style={{backgroundColor:'#e8e8e880'}}
>
                            <>

                                <div
                                    key={module?.id}

                                    className={`accordion-header    cursor-pointer transition flex space-x-5 px-2 xl:px-3 items-center h-auto ${expandedIndex === index ? "bg-white" : ""
                                       
                                }`}
                                    onClick={() => handleAccordionClick(index)}
                                    style={{backgroundColor:'#e8e8e880'}}

                                >
                                    <i className={`fas ${expandedIndex === index ? "fa-minus" : "fa-plus"}`}></i>
                                    <div className="flex items-center justify-between w-full   p-3 ">
                                        <div className='flex  flex-col space-y-3 w-80% xl:w-[70%]'>
                                            <p className='text-primaryText font-semibold text-[10px] xl:text-sm'>
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
                                                    Ticket Id: {module?.moduleticketFor?.ticket}
                                                </h5>
                                                <h5 className="text-desktopText uppercase font-semibold text-sm  mb-3">
                                                    {module?.title}
                                                </h5>
                                                <p className='text-desktopTextLight capitalize text-sm'>
                                                    {
                                                        // module?.description
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


                                                {/*  delete button */}
                                                <div className='w-full flex items-center justify-end'>
                                                    {/* <button

                                                        className='bg-green-200 text-green-800 font-semibold text-xs px-3 py-1 rounded text-right'>Assign Project</button> */}
                                                    <button
                                                        disabled={module.moduleticketFor?.ticket ? true : false}
                                                        onClick={() => {
                                                            setIsOpen(true)
                                                            setCurrentProject({
                                                                clientEmail: clientEmail,
                                                                moduleId: module?.id,
                                                                projectTicket: projectTicket,
                                                            })
                                                        }}
                                                        className={`
                                                                        ${module.moduleticketFor?.ticket ? "bg-gray-400 text-primaryText" : "bg-green-600 text-white "}
                                                                         py-[2px] px-3 lg:px-7 lg:py-1 rounded text-xs`}>

                                                        {module.moduleticketFor?.ticket ? "Assigned" : "Assign"}

                                                    </button>
                                                </div>
                                            </div>

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