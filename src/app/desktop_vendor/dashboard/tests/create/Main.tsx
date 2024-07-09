'use client'
import AutoComplete from '@/components/AutoComplete';
import { useForm, SubmitHandler } from "react-hook-form"
import React, { useEffect } from 'react';
import ModuleFrom from './ModuleFrom';
import { IModuleInput, IInput } from './createProject.interface';
import { useGqlClient } from '@/hooks/UseGqlClient';
import { useManualQuery, useMutation, useQuery } from 'graphql-hooks';
import AuthConfig from '@/firebase/oauth.config';
import { generateUniqueId } from '@/shared/genarateUniqueId';
import { toast } from 'react-hot-toast';
import Loading from '@/app/loading';
import { useRouter } from 'next/navigation';
import HandleFileUpload from '@/shared/HandleFileUpload';
import { v4 as uuidv4 } from 'uuid';
import createLog from '@/shared/graphQl/mutations/createLog';
import { getEmployerEmail } from '@/shared/getEmployerEmail';
import AutoSelectModule from '../AutoSelectModule';




const CREATE_PROJECT = `
mutation CreateTestTickets($input: [TestTicketCreateInput!]!) {
    createTestTickets(input: $input) {
      info {
        nodesCreated
        relationshipsCreated
      }
    }
  }
  `
const GET_USER = `
query Query($where: UserWhere) {
    users(where: $where) {
      companyName
      city
      address
      zip
      state
      gstNumber
    }
  }
  `

const GET_PROJECT_COUNTER = `
query Query {
    counters {
        testCount

    }
  }
  `
const UPDATE_PROJECT_COUNTER = `
mutation UpdateCounters($update: CounterUpdateInput) {
    updateCounters(update: $update) {
      counters {
        testCount
      }
    }
  }


  `
const SEND_NOTIFICATION = `
  mutation CreateNotifications($input: [NotificationCreateInput!]!) {
      createNotifications(input: $input) {
        info {
          nodesCreated
        }
      }
    }`


//component
const Main = () => {

    //states
    const [moduleCount, setModuleCount] = React.useState(1)
    const [selectedModule, setSelectModule] = React.useState<any>(null);
    const [modules, setModules] = React.useState<any[]>([]);
    const [uploading, setUploading] = React.useState(false);
    const [labEmail, setLabEmail] = React.useState('')



    //hooks
    const { user } = AuthConfig()
    const router = useRouter()
    const client = useGqlClient()
    const { uploadFile } = HandleFileUpload()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IInput>()







    //query
    const [counterFn, counterState] = useManualQuery(GET_PROJECT_COUNTER, { client })



    // mutations
    const [createProjectFn, state] = useMutation(CREATE_PROJECT, { client })
    const [updateTestCounterFn, updateState] = useMutation(UPDATE_PROJECT_COUNTER, { client })
    const [sendNotificationFn, notificationState] = useMutation(SEND_NOTIFICATION, { client })




    //submitting form for project creation
    const handleProjectSubmit = (data: IInput) => {
        createProject(data)
    }

    //handle project creation 
    const createProject = async (testData: IInput) => {
        const { testDescription, testName } = testData



        // uploading files -> create module data
        const moduleDataPromise = await modules.map(async (module, i) => {
            const title = module[`moduleTitle${i + 1}`].title
            const description = module[`moduleTitle${i + 1}`].description
            const documents = module[`moduleTitle${i + 1}`].documents
            return {
                node: {
                    title: title,
                    description: description,
                    files: await uploadFiles(documents.files),
                    ticket: await generateTestTicket(),
                    type: "TEST",
                    "userHas": {
                        "connect": {
                            "where": {
                                "node": {
                                    "email": labEmail || 'no email'
                                }
                            }
                        }
                    }

                }
            }
        })

        const moduleData = await Promise.all(moduleDataPromise)

        if (labEmail && selectedModule) {

            const { data } = await createProjectFn({
                variables: {
                    input: [
                        {
                            title: testName,
                            description: testDescription,
                            createdAt: new Date().toISOString(),
                            "userHas": {
                                "connect": {
                                    "where": {
                                        "node": {
                                            "email": labEmail || 'no email'
                                        }
                                    }
                                }
                            },
                            hasModule: {
                                create: moduleData
                            },
                            "moduleticketHas": {
                                "connect": {
                                    "where": {
                                        "node": {
                                            "ticket": selectedModule.ticket || 'no ticket'
                                        }
                                    }
                                }
                            }
                        }
                    ]
                }
            })
            if (data.createTestTickets.info.nodesCreated) {
                toast.success(' created successfully')
                router.push('/desktop_vendor/dashboard/tests')
                // sendNotification('')
                // createLog(
                //     `Test Creation`,
                //     `Test with ticket ${projectId} by ${user?.email}`
                // )
            }
        }


    }


    // getting lab email if employee is logged in
    const getLabEmail = async () => {
        if (user?.email) {
            const email = await getEmployerEmail(user?.email)
            setLabEmail(email)
        }


    }




    // // making change able  data
    useEffect(() => {
        getLabEmail()
    }, [user?.email])



    // upload files
    const uploadFiles = async (files: File[]) => {
        setUploading(true)

        const filePromise = files.map(async (file) => {
            const data = await uploadFile(file, `${file.name}-${uuidv4()}`, "ModuleDocuments");
            return data;
        });
        const fileLinks = await Promise.all(filePromise);
        setUploading(false)

        return fileLinks;
    }


    // generating project ticket based on project count on database
    const generateTestTicket = async () => {
        const { data } = await counterFn()
        const counter = data?.counters[0]
        if (counter?.testCount) {
            let testCount
            if (counter?.testCount === 1) {
                testCount = 1
            } else {
                testCount = counter?.testCount + 1
            }

            const projectTicket = generateUniqueId("T-", testCount)
            // updating project counter
            updateTestCounterFn({
                variables: {
                    update: {
                        testCount: testCount,
                    }
                }
            })
            return projectTicket
        }
        return null
    }


    if (moduleCount < 1) {
        setModuleCount(1)
    }





    // const sendNotification = async (projectId: string) => {

    //     const { data: adminData } = await sendNotificationFn({
    //         variables: {
    //             "input": [
    //                 {
    //                     "title": `A user has created a new project`,
    //                     "description": `A user has created a `,
    //                     "createdAt": new Date().toISOString(),
    //                     "notificationFor": "ADMIN",
    //                 }
    //             ]
    //         }
    //     })

    // }






    // if (loading) return <div><Loading /></div>

    //render
    return (

        <div className="">
            <div className="container max-w-screen-lg mx-auto">
                <div>

                    <form onSubmit={handleSubmit(handleProjectSubmit)} className="bg-white rounded p-4 px-4 md:p-8 mb-6">
                        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-2">


                            <div className="lg:col-span-2">
                                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">


                                    {/* project details */}

                                    <div className="col-span-full">
                                        <label htmlFor="address"> name</label>
                                        <input type="text" id="address" className="h-10 border border-gray-300 mt-1 rounded px-4 w-full " placeholder=""   {...register('testName')} />
                                    </div>

                                    <div className="col-span-full">
                                        <label htmlFor="city"> Description</label>
                                        <textarea rows={4} id="city" className=" border border-gray-300 mt-1 rounded px-4 w-full " placeholder="" {...register("testDescription")} />
                                    </div>
                                    <div className="col-span-full  pt-5">
                                        <label htmlFor="city"> Select Module</label>
                                        <div className='relative'>
                                            <AutoSelectModule selected={selectedModule} setSelected={setSelectModule} />
                                        </div>
                                    </div>



                                    {/* modules add  start */}
                                    <div className="md:col-span-5 mt-20">
                                        <div>
                                            {/* modules title */}
                                            <div className='flex  justify-between'>
                                                <p className='text-xl font-semibold text-gray-800'>
                                                    Tests
                                                </p>

                                                <div>
                                                    <label >Add More Modules</label>
                                                    <div className="h-10 w-28  flex border border-gray-300  rounded items-center mt-1">
                                                        <button
                                                            type='button'
                                                            onClick={() => setModuleCount(moduleCount - 1)}
                                                            className="cursor-pointer outline-none focus:outline-none border-r border-gray-300 transition-all text-gray-500 hover:text-desktopPrimary">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-2" viewBox="0 0 20 20" fill="currentColor">
                                                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                            </svg>
                                                        </button>
                                                        <input name="soda" id="soda" placeholder="0"
                                                            className="px-2 text-center appearance-none outline-none text-gray-800 w-full bg-transparent"
                                                            readOnly
                                                            defaultValue={moduleCount}
                                                        />
                                                        <button type='button' onClick={() => setModuleCount(moduleCount + 1)} className="cursor-pointer outline-none focus:outline-none border-l border-gray-300 transition-all text-gray-500 hover:text-desktopPrimary">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-2 fill-current" viewBox="0 0 20 20" fill="currentColor">
                                                                <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>

                                            </div>
                                            {/* service inputs */}
                                            <div className='space-y-5'>
                                                {
                                                    [...Array(moduleCount)].map((_, i) =>
                                                        <div key={i} className='grid grid-cols-1 gap-4 max-w-2xl'>
                                                            <ModuleFrom index={i + 1} setModules={setModules} modules={modules} />
                                                        </div>

                                                    )
                                                }
                                            </div>


                                        </div>
                                    </div>

                                    <div className=" mt-8">
                                        <div className="">
                                            <button type='submit' className="bg-primary  text-white font-bold py-3 px-12 text-lg rounded">{state.loading || uploading ? "loading" : 'Submit'}</button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default Main;