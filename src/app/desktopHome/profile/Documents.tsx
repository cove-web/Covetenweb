'use client'
import React from 'react';
import { BiMessageSquareEdit } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import IndustryModal from './IndustryModal';
import { useGqlClient } from '@/hooks/UseGqlClient';
import { useMutation } from 'graphql-hooks';
import AuthConfig from '@/firebase/oauth.config';
import { toast } from 'react-hot-toast';
import AddServiceModal from './AddServiceModal';
import Link from 'next/link';



const UPDATE_USER = `mutation Mutation($where: ClientWhere, $update: ClientUpdateInput) {
    updateClients(where: $where, update: $update) {
      info {
        nodesCreated
      }
    }
  }`



// component
const Documents = ({ data, refetch }: { data: any, refetch: any }) => {
    // states
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    // hooks
    const client = useGqlClient()
    const { user } = AuthConfig()

    // updating the user node
    const [updateUserFn, updateUserState] = useMutation(UPDATE_USER, { client })




    const deleteService = async (industry: string) => {
        const updatedIndustries = data.filter((item: string) => item !== industry)



        const { data: updateDta } = await updateUserFn({
            variables: {
                "where": {
                    "userIs": {
                        "email": user?.email
                    }
                },
                "update": {
                    service: updatedIndustries
                }
            }
        })
        if (updateDta?.updateVendors) {
            toast.error('Service deleted')
            refetch()
        }

    }


    const addService = async (service: string) => {

        if (data?.length) {
            const { data: updateDta } = await updateUserFn({
                variables: {
                    "where": {
                        "userIs": {
                            "email": user?.email
                        }
                    },
                    "update": {
                        "service_PUSH": [service]
                    }
                }
            })
            if (updateDta?.updateVendors) {
                toast.success('Service added')
                setIsModalOpen(false)
                refetch()
            }
        } else {
            const { data: updateDta } = await updateUserFn({
                variables: {
                    "where": {
                        "userIs": {
                            "email": user?.email
                        }
                    },
                    "update": {
                        "service": service
                    }
                }
            })
            if (updateDta?.updateVendors) {
                toast.success('Service added')
                setIsModalOpen(false)
                refetch()
            }
        }







    }


    // render
    return (
        <div className="relative flex flex-col mt-6 justify-center bg-white max-w-xs py-4 px-1  shadow-sm rounded-xl sm:px-7 dark:bg-gray-900 dark:text-gray-100">
            <div className="space-y-4 text-gray-800 mt-2">
                <div className="my-2 space-y-1">
                    <h2 className="text-xl font-semibold text-center sm:text-2xl">Documents</h2>
                </div>
                <div className='mt-3 grid grid-cols-3 lg:grid-cols-3 gap-2 lg:gap-6'>
                    {
                        data?.links ?
                            data?.links?.map((item: any, index: number) =>
                                <Link href={item || '#'}
                                    key={index}
                                    style={{
                                        backgroundImage: `url(${'/assets/file.svg'})`,
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'center',

                                    }}
                                    className=' h-28 w-24 text-sm flex items-center justify-center text-gray-800 font-semibold'>
                                    document-{index + 1}
                                </Link>

                            )
                            :

                            <p className='mt-3 text-xs col-span-full'>No Document Found</p>
                    }


                </div>

            </div>

        </div>
    );
};

export default Documents;