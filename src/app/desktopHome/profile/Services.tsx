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
import Loading from '@/app/loading';



const UPDATE_USER = `mutation UpdateUsers($where: UserWhere, $update: UserUpdateInput) {
    updateUsers(where: $where, update: $update) {
      info {
        nodesCreated
      }
    }
  }`



// component
const Services = ({ data, refetch }: { data: string[], refetch: any }) => {
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
                    "email": user?.email
                },
                "update": {
                    "isClient": {
                        "update": {
                            "node": {
                                "service": updatedIndustries
                            }
                        }
                    }
                }
            }
        })
        if (updateDta?.updateUsers) {
            toast.error('Service deleted')
            refetch()
        }

    }


    const addService = async (service: string) => {

        if (data?.includes(service)) {
            toast.error('service already exists')
            return
        }

        const serviceArray = data?.length ? [...data, service] : [service]


        const { data: updateDta } = await updateUserFn({
            variables: {
                "where": {
                    "email": user?.email
                },
                "update": {
                    "isClient": {
                        "update": {
                            "node": {
                                "service": serviceArray
                            }
                        }
                    }
                }
            }
        })
        if (updateDta?.updateUsers) {
            toast.success('Service added')
            setIsModalOpen(false)
            refetch()
        }






    }


    if (updateUserState.loading) {
        return <Loading />
    }

    // render
    return (
        <div className="relative border h-full flex flex-col mt-6 justify-center bg-white max-w-xs py-4 px-1  shadow-sm rounded-xl sm:px-7 dark:bg-gray-900 dark:text-gray-100">
            {/* edit button */}
            <div>
                <button type='button' onClick={() => setIsModalOpen(true)} className="absolute top-3 right-0 p-2 hover:bg-gray-200 rounded-full  dark:bg-gray-900 dark:text-gray-100">
                    <BiMessageSquareEdit />
                </button>
            </div>

            <div className="space-y-4 text-gray-800 mt-2">
                <div className="my-2 space-y-1">
                    <h2 className="text-xl font-semibold text-center sm:text-2xl">Services</h2>
                </div>
                <ul className="my-2 space-y-2 ">
                    {
                        data && data.map((item, i) =>
                            <li key={item}
                                className=" text-xs md:text-sm font-normal sm:text-2xl flex items-center justify-between">
                                <p className='capitalize'>
                                    {item}
                                </p>
                                <button type='button' onClick={() => deleteService(item)} className='text-gray-700 text-lg'><MdDelete /></button>
                            </li>

                        )
                    }


                </ul>

            </div>
            <AddServiceModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} addService={addService} />
        </div>
    );
};

export default Services;