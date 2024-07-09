'use client'

import React, { useState } from 'react';
import ModuleCards from './ModuleCards';
import { Module, Project } from '@/gql/graphql';
import { getNormalDateAndTime } from '@/shared/getNormalDateAndTime';

const ProjectCard = ({ data, deleteProjectById, deleteModuleById }: { data: any[], deleteProjectById: (id: string, module: string[]) => void, deleteModuleById: any }) => {

    //states
    const [expandedIndex, setExpandedIndex] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    //handle accordion click
    const handleAccordionClick = (index: any) => {
        setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
    };




    const checkStatus = (modules: any) => {
        const result = modules.map((module: Module) => module.moduleticketFor?.status)
        if (result.includes('PENDING')) {

            return true
        } else {

            return false

        }
    }




    return (
        <div>
            {
                data && data.map((project, index) =>
                    <>
                        <div className="transition-all duration-500 my-2 hover:bg-white border text-gray-600 border-gray-200 rounded-md">
                            <>

                                <div
                                    key={project?.id}

                                    className={`accordion-header    cursor-pointer transition flex space-x-5 px-2 xl:px-3 items-center h-auto ${expandedIndex === index ? "bg-white" : ""
                                        }`}
                                    onClick={() => handleAccordionClick(index)}
                                >
                                    <i className={`fas ${expandedIndex === index ? "fa-minus" : "fa-plus"}`}></i>
                                    <div className="flex items-center justify-between w-full  p-3 ">
                                        <div className='flex  flex-col space-y-3 w-80% xl:w-[70%]'>
                                            <p className="text-sm lg:text-xl text-gray-700 font-semibold capitalize ">
                                                {project?.title?.slice(0, 50)}
                                            </p>
                                            <p className='text-xs xl:text-sm text-dimText'>{project?.description?.slice(0, 300)}</p>
                                            <p className='text-desktopPrimary text-[10px] xl:text-sm    '>Created: {getNormalDateAndTime(project.createdAt)}</p>
                                        </div>


                                        <div className='flex items-center justify-center ml-3'>
                                            <button
                                                className=" bg-white border-2 border-desktopPrimary text-desktopPrimary font-bold text-sm xl:text-base rounded-lg px-4 xl:px-6 py-2 xl:py-3"
                                            // onClick={() => handleOpen(1)}
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
                                                <h5 className="text-gray-700 font-bold text-lg  mb-3">
                                                    Ticket Id: #{project?.projectticketFor?.projectTicket}
                                                </h5>
                                                <h5 className="text-desktopText font-semibold text-md  mb-3">
                                                    Project name: {project?.title}
                                                </h5>
                                                <h5 className="text-desktopText font-semibold text-md  mb-3">
                                                    Project Type: {project?.type}
                                                </h5>
                                                <h5 className="text-desktopText font-semibold text-md  mb-3">
                                                    Priority: {project?.priority}
                                                </h5>
                                                <p className='text-dimText text-sm'>
                                                    {project?.description}
                                                </p>

                                                <ModuleCards data={project?.hasModule} deleteModuleById={deleteModuleById} />



                                            </div>

                                        </div>

                                        {/*  delete button */}
                                        <div className='w-full flex items-center justify-end'>
                                            {
                                                !checkStatus(project?.hasModule) || project?.status === "PENDING" && <button
                                                    onClick={() => {
                                                        let modules = project?.hasModule?.map((module: any) => module?.id)
                                                        deleteProjectById(project?.id, modules)

                                                    }}
                                                    className='bg-red-200 text-red-600 font-semibold text-xs px-3 py-1 rounded text-right'>
                                                    Delete Project
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