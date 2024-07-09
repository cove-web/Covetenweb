'use client'
import React, { Suspense, useState, useEffect } from 'react';
import { useGqlClient } from '@/hooks/UseGqlClient';
import Loading from '@/app/loading';
import Error from '@/components/Error';
import { useManualQuery, useMutation, useQuery } from 'graphql-hooks';
import AuthConfig from '@/firebase/oauth.config';
import { toast } from 'react-hot-toast';
import ProjectCard from './ProjectCard';
import Pagination from '@/components/Pagination';
import { getEmployerEmail } from '@/shared/getEmployerEmail';


const GET_ALL_PROJECTS_OVERVIEW = `
query TestTickets($options: TestTicketOptions, $where: TestTicketWhere) {
    testTickets(options: $options, where: $where) {
      id
      title
      description
      createdAt
      hasModule {
        id
        title
        files
        description
        status
        createdAt
      }
    }
  }
`
const DELETE_TEST_TICKET = `
mutation DeleteTestTickets($where: TestTicketWhere) {
    deleteTestTickets(where: $where) {
      nodesDeleted
    }
  }
`
const DELETE_TEST_MODULE = `
mutation DeleteModules($where: ModuleWhere) {
    deleteModules(where: $where) {
      nodesDeleted
    }
  }
`



//component
const Main = () => {
    //states
    const [pageLimit, setPageLimit] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [totalProject, setTotalProject] = useState(0)
    const [ProjectData, setProjectData] = useState<any>([])
    const [labEmail, setLabEmail] = useState('')


    //hooks
    const client = useGqlClient()
    const { user } = AuthConfig()

    //quires 
    const [getProjectFn, ProjectDataState] = useManualQuery(GET_ALL_PROJECTS_OVERVIEW, { client })

    // mutation
    const [deleteProjectFn, state, resetFn] = useMutation(DELETE_TEST_TICKET, { client });
    const [deleteModuleFn, moduleDeleteState,] = useMutation(DELETE_TEST_MODULE, { client });


    // refetching data based on pagination 
    useEffect(() => {
        getLabEmail()
        getProjectData(user?.email)
        // getProjectCount()

    }, [currentPage, user?.email]);



    // initializing query and mutations

    const getProjectCount = async () => {
        const { data } = await getProjectFn({
            variables: {
                where: {
                    clientOrdered: {
                        userIs: {
                            email: user?.email || 'no email'
                        }
                    }
                }
            }
        })
        if (data.projects.length) {
            setTotalProject(data.projects.length)
            setTotalPages(Math.ceil(data.projects.length / pageLimit))
        }

    }

    const getProjectData = async (email: string) => {
        if (email) {
            const { data } = await getProjectFn({
                variables: {
                    "where": {
                        "userHas": {
                            "email": email || 'no email'
                        }
                    },
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



            if (data.testTickets.length) {
                setProjectData(data?.testTickets)
            }
        }
    }


    const deleteModuleById = async (id: string) => {
        const { data } = await deleteModuleFn({
            variables: {
                where: {
                    id
                }
            }
        })
        if (data.deleteModules.nodesDeleted) {
            getProjectData(user?.email)
            toast.error('module Deleted ')
        }
    }



    // getting lab email if employee is logged in
    const getLabEmail = async () => {
        if (user?.email) {
            const email = await getEmployerEmail(user?.email)
            setLabEmail(email)
        }


    }




    // initializing project delete function
    const deleteTestById = async (id: string, modules: string[]) => {
        const { data } = await deleteProjectFn({
            variables: {
                where: {
                    id
                }
            }
        })
        if (data.deleteTestTickets.nodesDeleted) {
            getProjectData(user?.email)
            toast.error('Project Deleted ')
            modules.map((module) => deleteModuleById(module))
        }
    }




    //error handling
    if (ProjectDataState.error || state.error) return <Error message={'Sorry Something Went Wrong'} />


    if (ProjectDataState.loading || state.loading) return <Loading />

    return (
        <section >
            <Suspense fallback={<Loading />}>
                <ProjectCard data={ProjectData} deleteTestById={deleteTestById} deleteModuleById={deleteModuleById} />
                <div className='w-full flex items-center justify-center'>
                    {totalProject > pageLimit &&
                        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
                    }

                </div>
            </Suspense>

        </section>
    );
};

export default Main;