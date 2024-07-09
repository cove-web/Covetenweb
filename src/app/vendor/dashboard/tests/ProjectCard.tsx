'use client'

import React, { useState } from 'react';
import ModuleCards from './ModuleCards';
import { Module, Project, TestTicket } from '@/gql/graphql';
import AssignmentModal from './AssignmentModal';

const ProjectCard = ({ data, deleteTestById, deleteModuleById }: { data: TestTicket[], deleteTestById: (id: string, module: string[]) => void, deleteModuleById: any }) => {

    //states
    const [expandedIndex, setExpandedIndex] = useState(null);
    const [isDeleteAble, setIsDeleteAble] = useState(false);


    //handle accordion click
    const handleAccordionClick = (index: any) => {
        setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
    };




    const checkStatus = (modules: any) => {
        const result = modules?.map((module: Module) => module?.testticketHas?.status)

        if (result?.includes('PENDING')) {

            setIsDeleteAble(true)
            return true
        } else {

            setIsDeleteAble(false)
            return false

        }
    }



    return (
        <div>
            {
                data && data.map((test, index) =>
                    <>
                        <div className="transition-all duration-500 my-2 hover:bg-white border text-gray-600 border-gray-200 rounded-md">
                            <>

                                <div
                                    key={test?.id}

                                    className={`accordion-header    cursor-pointer transition flex space-x-5 px-2 xl:px-3 items-center h-auto ${expandedIndex === index ? "bg-white" : ""
                                        }`}
                                    onClick={() => handleAccordionClick(index)}
                                >
                                    <i className={`fas ${expandedIndex === index ? "fa-minus" : "fa-plus"}`}></i>
                                    <div className="flex items-center justify-between w-full  p-3 ">
                                        <div className='flex  flex-col space-y-3 w-80% xl:w-[70%]'>
                                            <p className="text-sm lg:text-xl text-gray-700 font-semibold ">
                                                {test?.title?.slice(0, 50)}
                                            </p>
                                            <p className='text-xs xl:text-sm text-dimText'>{test?.description?.slice(0, 300)}</p>
                                            <p className='text-primary text-[10px] xl:text-sm    '>Created: {test?.createdAt?.slice(0, 10)}</p>
                                        </div>


                                        <div className='flex items-center justify-center ml-3'>
                                            <button
                                                className=" bg-white border-2 border-gray-700 text-gray-700 font-bold text-sm  rounded-lg px-4 py-1 "
                                                onClick={() => checkStatus(test?.hasModule)}
                                            >
                                                {expandedIndex === index ? 'Hide Details' : 'View'}
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

                                        {/* modules section */}
                                        <div className="">
                                            <div className="pb-10 relative">
                                                {/* <h5 className="text-gray-700 font-bold text-lg  mb-3">
                                                    Ticket Id: #{project?.projectticketFor?.projectTicket}
                                                </h5> */}
                                                <h5 className="text-desktopText font-semibold text-md  mb-3">
                                                    Test name: {test?.title}
                                                </h5>
                                                <p className='text-dimText text-sm'>
                                                    {test?.description}
                                                </p>

                                                <ModuleCards data={test?.hasModule} deleteModuleById={deleteModuleById} />



                                            </div>
                                            <div className='w-full flex items-center justify-end'>

                                            </div>

                                        </div>

                                        {/*  delete button */}
                                        <div className='w-full flex items-center justify-end'>

                                            {
                                                !isDeleteAble && <button
                                                    onClick={() => {
                                                        let modules = test?.hasModule?.map((module: any) => module?.id)
                                                        deleteTestById(test?.id as string, modules)

                                                    }}
                                                    className='bg-red-200 text-red-600 font-semibold text-xs px-3 py-1 rounded text-right'>
                                                    Delete Tests
                                                </button>
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

export default ProjectCard;