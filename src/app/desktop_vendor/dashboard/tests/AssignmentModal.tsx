'use client'
import { Fragment, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Dialog, Transition } from '@headlessui/react';
import AutoSelect from '@/components/AutoSelect';
import { useGqlClient } from '@/hooks/UseGqlClient';
import { useManualQuery, useMutation, useQuery } from 'graphql-hooks';
import { toast } from 'react-hot-toast';
import { generateUniqueId } from '@/shared/genarateUniqueId';
import AutoSelectVendor from '@/components/AutoSelectVendor';
import createLog from '@/shared/graphQl/mutations/createLog';
import AuthConfig from '@/firebase/oauth.config';




//props interface
interface IModalProps {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    currentProject: any
    refetchProjects: () => void
}

const GET_COUNTER = `query Query {
    counters {
        moduleCount
    }
  }`


const GET_VENDORS = `
query Vendors( $userIsWhere2: UserWhere) {
    vendors {
      id
      userIs(where: $userIsWhere2) {
        id
        companyName
        status
      }
    }
  }
`

const ASSIGN_MODULE = `
mutation UpdateModules($where: ModuleWhere, $update: ModuleUpdateInput) {
    updateModules(where: $where, update: $update) {
      info {
        nodesCreated
        relationshipsCreated
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
function AssignmentModal({ isOpen, setIsOpen, currentModuleId }: any) {

    //states
    const [selected, setSelected] = useState<any>({});



    //hooks
    const client = useGqlClient();
    const { user } = AuthConfig()


    // Fetch data from graphql
    const [counterFn, counterState] = useManualQuery(GET_COUNTER, { client })

    const { data, loading } = useQuery(GET_VENDORS, {
        client,
        variables: {
            userIsWhere2: {
                status: "APPROVED"
            }
        }
    })


    //  mutations
    const [assignModuleFn, state] = useMutation(ASSIGN_MODULE, { client });
    const [sendNotificationFn, notificationState] = useMutation(SEND_NOTIFICATION, { client })


    // initializing  assign module

    const assignModule = async () => {
        const { data } = await assignModuleFn({
            variables: {

                "where": {
                    "id": currentModuleId || ""
                },
                "update": {
                    "status": 'ASSIGNED',
                    createdAt: new Date().toISOString(),
                    "forUser": {
                        "connect": {
                            "where": {
                                "node": {
                                    "email": selected?.email
                                }
                            }
                        }
                    },

                }

            }
        })


        if (data?.updateModules) {
            setIsOpen(false);
            toast.success('Module assigned successfully');
            // refetchProjects()
            sendNotificationToVendor()
            createLog(
                `Module Assignment`,
                ` Module assigned to ${selected.companyName} by ${user?.email} `
            )

        }
    }





    //handle close modal
    function closeModal() {
        setIsOpen(false);
    }




    const sendNotificationToVendor = async () => {
        const { data } = await sendNotificationFn({
            variables: {
                "input": [
                    {
                        "title": "You Have a New Module",
                        "description": "You have been assigned a new module. Please check the module details and If you have any questions, please contact us.",
                        "createdAt": new Date().toISOString(),
                        "notificationFor": "VENDOR",
                        "vendorHas": {
                            "connect": {
                                "where": {
                                    "node": {
                                        "userIs": {
                                            "id": selected.id
                                        }
                                    }
                                }
                            }
                        }
                    }
                ]
            }
        })

    }

    // const sendNotificationToClient = async () => {
    //     const { data } = await sendNotificationFn({
    //         variables: {
    //             "input": [
    //                 {
    //                     "title": "Your Module Has Been Assigned",
    //                     "description": `Your module has been assigned to ${selected.companyName}.  `,
    //                     // "type": null,
    //                     "createdAt": new Date().toISOString(),
    //                     "clientHas": {
    //                         "connect": {
    //                             "where": {
    //                                 "node": {
    //                                     "userIs": {
    //                                         "email": null
    //                                     }
    //                                 }
    //                             }
    //                         }
    //                     },

    //                 }
    //             ]
    //         }
    //     })
    // }





    //render
    return (
        <div>


            <Transition.Root show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed z-[5000000000] inset-0 overflow-y-auto"
                    onClose={closeModal}
                >
                    <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />
                        </Transition.Child>

                        <span
                            className="hidden sm:inline-block sm:align-middle sm:h-screen"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>

                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >

                            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full sm:p-6">
                                <p className="focus:outline-none pt-4 pb-8 text-base text-center sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">Assing Tasks</p>
                                <div className='p-8'>
                                    <div className='grid grid-cols-1 gap-6 mb-12'>

                                        <div>
                                            <p className="text-xs lg:text-sm font-semibold mb-1  text-gray-700">
                                                Select Vendor
                                            </p>

                                            <div className='relative'>

                                                <AutoSelectVendor setSelected={setSelected} selected={selected} data={data?.vendors} />
                                            </div>
                                        </div>
                                    </div>


                                    <div className="mt-20">
                                        <button
                                            onClick={assignModule}
                                            type="submit"
                                            className="px-4 py-2 bg-primary text-white  hover:bg-blue-600"
                                        >
                                            {state.loading ? 'loading' : 'Submit'}
                                        </button>
                                        <button
                                            type="button"
                                            className="ml-2 px-4 py-2 text-gray-500  hover:bg-gray-200"
                                            onClick={closeModal}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        </div>
    );
}

export default AssignmentModal;
