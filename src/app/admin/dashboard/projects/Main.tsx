'use client'

import { useGqlClient } from '@/hooks/UseGqlClient';
import { useManualQuery, useQuery } from 'graphql-hooks';
import React, { useState, useEffect } from 'react';
import AssignmentModal from './AssignmentModal';
import Loading from '@/app/loading';
import Error from '@/components/Error';
import Pagination from '@/components/Pagination';
import TableSkeleton from '@/components/TableSkeleton';
import ModuleCards from './ModuleCards';
import { useCounterData } from '../../CounterProvider';
import Link from 'next/link';
import { getNormalDateAndTime } from '@/shared/getNormalDateAndTime';

interface ICurrentProject {
    clientEmail: string;
    moduleId: string;
    projectTicket: string;
}

const GET_PROJECTS = `
query Projects($where: ProjectWhere, $options: ProjectOptions) {
    projects(where: $where, options: $options){
      id
      title
      status
      gst
      email
      description
      createdAt
      country
      isViewed
      type
      priority
      companyName
     
      projectticketFor {
        projectTicket
      }
      clientOrdered {
        userIs {
          userId
          id
        }
      }
      hasModule {
        title
        description
        files
        id
        receivedBy
        moduleticketFor {
            ticket
            status
           
          }
      }
    }
  }
`

const Main = () => {
    //states
    const [expandedIndex, setExpandedIndex] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [currentProject, setCurrentProject] = useState<ICurrentProject | {}>({});

    // search sates
    const [searchQuery, setSearchQuery] = useState('')

    // pagination states
    const [pageLimit, setPageLimit] = useState(5)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [projectsCount, setProjectsCount] = useState(0)
    const [ProjectData, setProjectData] = useState<any>([])

    //hooks 
    const client = useGqlClient()
    const counterData = useCounterData()

    //queries 
    const [getProjectFn, ProjectDataState] = useManualQuery(GET_PROJECTS, { client })

    // refetching data based on pagination and search query
    useEffect(() => {
        let where

        // sending parameters to query based on search query
        if (searchQuery) {
            where = {
                OR: [
                    {
                        title: searchQuery,
                    },
                    {
                        clientOrdered: {
                            userIs: {
                                userId: searchQuery,
                            }
                        }
                    },
                    {
                        clientOrdered: {
                            userIs: {
                                companyName: searchQuery
                            }
                        }
                    },
                ]
            }
        } else {
            where = {}
        }

        getProjectData(where)
        getProjectCount()
    }, [currentPage, searchQuery]);

    // initializing query and mutations

    const getProjectCount = async () => {
        const { data } = await getProjectFn()
        if (data.projects.length) {
            setProjectsCount(data.projects.length)
            setTotalPages(Math.ceil(data.projects.length / pageLimit))
        }
    }

    const getProjectData = async (where: any = {}) => {
        const { data } = await getProjectFn({
            variables: {
                where: where,
                options: {
                    limit: pageLimit,
                    offset: (currentPage - 1) * pageLimit,
                    sort: [
                        {
                            createdAt: "DESC"
                        }
                    ]
                }
            }
        })
        if (data.projects.length) {
            setProjectData(data?.projects)
        }
    }

    const handleClick = async (id: string, isViewed: boolean) => {
        if (!isViewed) {
            counterData?.handleUpdateView(id, "project")
            counterData?.projectRefetch()
        }
    }

    //handle accordion click
    const handleAccordionClick = (index: any) => {
        setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    function getStatus(modules: any) {
        const moduleStatuses = modules.map((module: any) => module?.moduleticketFor?.status);
        
        if (moduleStatuses.includes('COMPLETED')) {
            return { text: 'COMPLETED', textColor: 'text-[#43a047]', bgColor: 'bg-[#f0fff0]' };
        } else if (moduleStatuses.includes('ACCEPTED')) {
            return { text: 'ACCEPTED', textColor: 'text-[#2196f3]', bgColor: 'bg-[#e3f2fd]' };
        } else if (moduleStatuses.includes('ASSIGNED')) {
            return { text: 'ASSIGNED', textColor: 'text-[#ff9800]', bgColor: 'bg-[#fff3e0]' };
        } 
        else if (moduleStatuses.includes('PENDING')) {
            return { text: 'PENDING', textColor: 'text-[#ff9800]', bgColor: 'bg-[#fff3e0]' };
        }
        else if (moduleStatuses.includes('DRAFT')) {
            return { text: 'DRAFT', textColor: 'text-[#ff9800]', bgColor: 'bg-[#fff3e0]' };
        }else {
            return { text: 'YET TO ASSIGN', textColor: 'text-[#e65100]', bgColor: 'bg-[#fff2e0]' };
        }
    }
    
    
console.log("prodata",ProjectData);

    return (
        <> <div className='flex items-center justify-between'>
        <h2 className='md:text-2xl xl:text-3xl font-semibold text-primaryText'></h2>
        <Link href='/admin/dashboard/projects/create' className='bg-primary md:text-base xl:text-lg font-semibold text-white px-6 xl:px-8 py-2 xl:py-4 rounded-md flex items-center justify-center space-x-3'>
            <p>Create Project</p>
            {/* <span><FaPlusCircle /></span> */}
        </Link>

    </div>
            <div className="my-2 flex justify-end sm:flex-row flex-col">
                <div className="block relative">
                    <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                        {/* <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current text-gray-500">
                            <path
                                d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z">
                            </path>
                        </svg> */}
                    </span>
                    <input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search"
                        style={{backgroundColor:'#e8e8e880'}}

                        className="form-control"
                        // className="sm:rounded-l-none border border-gray-300 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none" 
                        />
                </div>
            </div>
            {/* end fo search */}
            <div className="bg-white py-7 lg:px-4 w-full  "               style={{backgroundColor:'#e8e8e880'}}
> 
                {
                    ProjectDataState.loading ? <TableSkeleton />
                        :
                        ProjectData && ProjectData.map((project: any, index: number) =>
                            <>
                                <div 
                                onClick={() => handleClick(project?.id, project?.isViewed as boolean)} className={`${project?.isViewed ? 'bg-white' : 'bg-red-200'} transition-all duration-500 my-2  text-gray-600 `}
                                style={{backgroundColor:'#e8e8e880'}}

                                >
                                    <>
                                        <div className="transition-all duration-500 my-2 hover:bg-white border text-gray-600 border-gray-200 ">
                                            <>

                                                <div
                                                    key={project?.id}

                                                    className={`accordion-header cursor-pointer transition flex space-x-5 px-2 xl:px-3 items-center h-auto ${expandedIndex === index ? "bg-white" : ""
                                                        }`}
                                                    onClick={() => handleAccordionClick(index)}
                                                >
                                                    <i className={`fas ${expandedIndex === index ? "fa-minus" : "fa-plus"}`}></i>
                                                    <div className="flex items-center justify-between w-full  p-3 ">
                                                        <div className='flex  flex-col space-y-3 w-80% xl:w-[70%]'>
                                                            <p className="text-base lg:text-lg uppercase text-gray-700 font-bold xl:font-semibold ">
                                                                {project?.title?.slice(0, 50)}
                                                            </p>
                                                            <div className='text-dimText text-sm   '>
                                                                <Link href={`/admin/dashboard/users/${project?.clientOrdered?.userIs?.id}`} className="uppercase">
                                                                    User Id: {project?.clientOrdered?.userIs?.userId || 'N/A'}
                                                                </Link>
                                                                {/* <span className='px-1'>|</span> */}
                                                                {/* <span className={`uppercase ${getStatus(project?.hasModule).color}`}>Status:
                                                                    {
                                                                        getStatus(project?.hasModule).text
                                                                    }
                                                                </span> */}
                                                            </div>
                                                            <p className='text-dimText text-sm  uppercase '>Created:  {getNormalDateAndTime(project.createdAt)}</p>
                                                            {/* <p className='text-dimText text-sm  uppercase '>Created:  {getNormalDateAndTime(project.createdAt)}</p> */}

                                                        </div>
                                                        {/* <span className={`ml-3 ${getStatus(project?.hasModule).textColor}`} style={{textAlign:'left'}}>
                                                                {getStatus(project?.hasModule).text}
                                                            </span> */}
                                                            <span className={`ml-2 py-1 px-2 rounded ${getStatus(project?.hasModule).bgColor} ${getStatus(project?.hasModule).textColor}`}>
                                                                {getStatus(project?.hasModule).text}
                                                            </span>
                                                        <div className='flex items-center justify-center ml-3'>
                                                            <button
                                                                className="bg-white border-2 border-gray-700 text-gray-700 font-bold text-sm  rounded-lg px-6 py-1.5"
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
                                                                <h5 className="text-desktopText font-semibold text-md lg:text-lg capitalize mb-1">
                                                                    Client Company Name: 
                                                                    {project?.companyName}
                                                                </h5>
                                                                <Link href={`/admin/dashboard/users/${project?.clientOrdered?.userIs?.id}`} className="text-desktopText font-semibold lg:text-lg mb-3">
                                                                    User Id: {project?.clientOrdered?.userIs?.userId || 'N/A'}
                                                                </Link>
                                                                <h5 className="text-desktopText font-semibold text-md lg:text-lg mb-1">
                                                                    Project name: {project?.title}
                                                                </h5>
                                                                <h5 className="text-desktopText font-bold text-md lg:text-base  mb-3">
                                                                    Ticket Id: #{project?.projectticketFor?.projectTicket}
                                                                </h5>
                                                                <h5 className="text-desktopText font-bold text-md lg:text-base  mb-3">
                                                                    Priority: {project?.priority}
                                                                </h5>
                                                                <h5 className="text-desktopText font-bold text-md lg:text-base  mb-3">
                                                                    Type: {project?.type}
                                                                </h5>
                                                                <p className='text-desktopTextLight text-xs lg:text-sm'>
                                                                    {project?.description}
                                                                </p>
                                                                <ModuleCards data={project?.hasModule} setCurrentProject={setCurrentProject}
                                                                    projectTicket={project?.projectticketFor?.projectTicket}
                                                                    clientEmail={project?.email}
                                                                    setIsOpen={setIsOpen}
                                                                />
                                                            </div>
                                                            <div className='w-full flex items-center justify-end'>
                                                                <Link target='_blank' href='/admin/dashboard/quotation/create_quotation'
                                                                    className={`bg-green-600 text-white  py-[2px] px-3 lg:px-7 lg:py-1 rounded text-xs`}>
                                                                    Create Quotation
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        </div>
                                    </>
                                </div>
                            </>
                        )
                }
                <AssignmentModal setIsOpen={setIsOpen} isOpen={isOpen} currentProject={currentProject} refetchProjects={getProjectData} />
            </div>
            {/* pagination */}
            <div className='w-full flex items-center justify-center'>
                {projectsCount! > pageLimit &&
                    <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />}
            </div>
        </>
    );
};

export default Main;   
