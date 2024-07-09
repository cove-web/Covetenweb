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




//props interface
interface IModalProps {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    currentModuleTicket: any
    refetchModuleTickets: () => void
}

const GET_COUNTER = `query Query {
    counters {
        moduleCount
    }
  }`
const UPDATE_COUNTER = `
mutation UpdateCounters($update: CounterUpdateInput) {
    updateCounters(update: $update) {
      counters {
        moduleCount
      }
    }
  }


  `

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
mutation UpdateModuleTickets($where: ModuleTicketWhere, $disconnect: ModuleTicketDisconnectInput, $connect: ModuleTicketConnectInput, $update: ModuleTicketUpdateInput) {
    updateModuleTickets(where: $where, disconnect: $disconnect, connect: $connect, update: $update) {
      info {
        relationshipsCreated
        relationshipsDeleted
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
function TicketReassignModal({ isOpen, setIsOpen, currentModuleTicket, refetchModuleTickets }: IModalProps) {

    //states
    const [selected, setSelected] = useState<any>({});



    //hooks
    const client = useGqlClient();


    // Fetch data from graphql
    const [counterFn, counterState] = useManualQuery(GET_COUNTER, { client })

    const { data, loading } = useQuery(GET_VENDORS, {
        client,
        variables: {
            userIsWhere2: {
                status: "APPROVED"
            },

        }
    })


    //  mutations
    const [assignModuleFn, state] = useMutation(ASSIGN_MODULE, { client });
    const [updateCounterFn, updateState] = useMutation(UPDATE_COUNTER, { client })
    const [sendNotificationFn, notificationState] = useMutation(SEND_NOTIFICATION, { client })


    // initializing  assign module

    const assignModule = async () => {

        if (currentModuleTicket.vendorId) {
            await disconnectPreviousVendor()
        }
        const { data } = await assignModuleFn({
            variables: {
                "where": {
                    "id": currentModuleTicket.moduleTicketId
                },
                "update": {
                    status: "ASSIGNED",
                    createdAt: new Date().toISOString(),
                },
                "connect": {
                    "vendorHas": {
                        "where": {
                            "node": {
                                "userIs": {
                                    "id": selected?.id
                                }
                            }
                        },
                        "overwrite": true
                    }
                },

            }
        })



        if (data) {
            setIsOpen(false);
            sendNotificationToVendor()
            toast.success('Module assigned successfully');

            refetchModuleTickets()
        }
    }

    const disconnectPreviousVendor = async () => {
        const { data } = await assignModuleFn({
            variables: {
                "where": {
                    "id": currentModuleTicket.moduleTicketId
                },
                "disconnect": {
                    "vendorHas": {
                        "where": {
                            "node": {
                                "userIs": {
                                    "id": currentModuleTicket.vendorId
                                }
                            }
                        }
                    }
                },

            }
        })
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


    //handle close modal
    function closeModal() {
        setIsOpen(false);
    }


    const generateModuleTicket = async () => {
        const { data } = await counterFn()
        const counter = data?.counters[0]
        if (counter?.moduleCount) {
            const moduleCount = counter?.moduleCount + 1
            const ModuleTicket = generateUniqueId("M-", moduleCount)
            // updating project counter
            updateCounterFn({
                variables: {
                    update: {
                        moduleCount: moduleCount,
                    }
                }
            })
            return ModuleTicket
        }
        return null
    }








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
                                <p className="focus:outline-none pt-4 pb-8 text-base text-center sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">Assign Tasks</p>
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
                                            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-600"
                                        >
                                            {state.loading ? 'loading' : 'Submit'}
                                        </button>
                                        <button
                                            type="button"
                                            className="ml-2 px-4 py-2 text-gray-500 rounded-md hover:bg-gray-200"
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

export default TicketReassignModal;
