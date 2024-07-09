'use client'
import { useGqlClient } from '@/hooks/UseGqlClient';
import { useMutation, useQuery } from 'graphql-hooks';
import Link from 'next/link';
import React from 'react';
import { toast } from 'react-hot-toast';
import { AiFillEye, AiTwotoneDelete } from 'react-icons/ai';

import Loading from '@/app/loading';
import deleteImage from '@/shared/deleteImage';

const GET_SOLUTION = `
 query ($where: ServiceWhere) {
    services(where: $where) {
        id
      title
      isPopular
      coverImageUrl
      thumbnailUrl
    }
  }`



const DELETE_SOLUTION = `
mutation DeleteServices($where: ServiceWhere) {
    deleteServices(where: $where) {
      nodesDeleted
    }
  }
`


const ADD_TO_HOMEPAGE = `
mutation UpdateServices($where: ServiceWhere, $update: ServiceUpdateInput) {
    updateServices(where: $where, update: $update) {
      services {
        id
      }
    }
  }
`

const Main = () => {


    //hooks 
    const client = useGqlClient()

    const { data, loading, error, refetch } = useQuery(GET_SOLUTION, {
        client,
        variables: {
            "where": {
                "isSolution": true,
            }
        }
    })

    //MUTATIONS
    const [deleteServiceFn, deleteState] = useMutation(DELETE_SOLUTION, { client })
    const [addToHomeFn, addToHomeState] = useMutation(ADD_TO_HOMEPAGE, { client })

    // INITIALIZING query and mutations



    const deleteService = async (id: string) => {
        const { data } = await deleteServiceFn({
            variables: {
                where: {
                    id: id
                }
            }
        })


        if (data.deleteServices.nodesDeleted > 0) {
            toast.error(" Deleted")
            refetch()
        }
    }

    const addToHome = async (id: string, status: boolean) => {
        const { data } = await addToHomeFn({
            variables: {
                where: {
                    id: id
                },
                "update": {
                    "isPopular": status
                }
            }
        })

        if (data.updateServices.services[0].id) {
            toast.success("Updated")
            refetch()
        }

    }




    if (loading || deleteState.loading || addToHomeState.loading) return <Loading />

    return (
        <>
            <div className='flex items-center justify-end'>
                <div>
                    <Link href='/admin/dashboard/settings/solution/create' className="focus:ring-2 focus:ring-offset-2 focus:ring-primary mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-primary hover:bg-primary focus:outline-none rounded">
                        <p className="text-sm font-medium leading-none text-white">Create new </p>
                    </Link>
                </div>
            </div>
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div className="inline-block min-w-full  rounded-sm overflow-hidden">

                    <table className="w-full leading-normal">


                        <thead>
                            <tr>

                                <th
                                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase ">
                                    Serial No.
                                </th>
                                <th
                                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase ">
                                    Name
                                </th>


                                <th
                                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase ">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data?.services && data?.services?.map((item: any, i: number) =>
                                    <tr key={i}>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
                                            <div className="flex items-center justify-center font-semibold text-base">

                                                {i + 1}
                                            </div>
                                        </td>

                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
                                            <div className="flex items-center">

                                                <div className="">
                                                    <p className="text-gray-700 font-bold  whitespace-nowrap ">
                                                        {item?.title?.slice(0, 30)}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
                                            <div className="relative flex items-center justify-center  space-x-4 px-8 ">
                                                <Link href={`/admin/dashboard/settings/solution/details/${item?.id}`} className="focus:ring-2 focus:ring-offset-2  text-sm leading-none text-primary py-2 px-2 bg-primary/20 rounded  focus:outline-none">Update</Link>

                                                {
                                                    item.isPopular ?
                                                        <button onClick={() => addToHome(item?.id, false)} className="focus:ring-2 focus:ring-offset-2  text-sm leading-none text-red-700 py-2 px-2 bg-red-100 rounded  focus:outline-none">Remove from Home</button>
                                                        :
                                                        <button onClick={() => addToHome(item?.id, true)} className="focus:ring-2 focus:ring-offset-2  text-sm leading-none text-green-800 py-2 px-2 bg-green-100  rounded  focus:outline-none">Add to Home</button>
                                                }
                                                <button onClick={() => {
                                                    deleteService(item?.id)
                                                    deleteImage(item?.coverImageUrl)
                                                    deleteImage(item?.thumbnailUrl)
                                                }} className="focus:ring-2 focus:ring-offset-2  text-sm leading-none text-red-700 py-2 px-2 bg-red-100 rounded  focus:outline-none">Delete</button>
                                            </div>
                                        </td>
                                    </tr>)
                            }





                        </tbody>
                    </table>
                </div>
            </div>

        </>
    );
};

export default Main