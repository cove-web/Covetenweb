'use client'
import { useGqlClient } from '@/hooks/UseGqlClient';
import { useMutation, useQuery } from 'graphql-hooks';
import React, { useEffect, useState } from 'react';
import DataFrom from './DataFrom';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Loading from '@/app/loading';
import Error from '@/components/Error';
import slugify from 'slugify';
import AddSubCategory from './AddSubCategory';
import { FaBullseye } from 'react-icons/fa';



const UPDATE_DATA = `
mutation Mutation($where: CategoryWhere, $update: CategoryUpdateInput) {
    updateCategories(where: $where, update: $update) {
      categories {
        id
      }
    }
  }
`
const GET_DATA = `
query Categories($where: CategoryWhere) {
    categories(where: $where) {
      name
      id
      categoryHasChild {
        id
        name
      }
    }
  }
`

const DELETE = `
mutation DeleteCategories($where: CategoryWhere) {
    deleteCategories(where: $where) {
      nodesDeleted
    }
  }
`


const Main = () => {

    // states
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [newSubCategoryName, setNewSubCategoryName] = useState('')
    const [currentData, setCurrentData] = React.useState({
        id: '',
        name: '',
        subCategory: [],

    })

    // hooks
    const client = useGqlClient()
    const params = useParams()
    const router = useRouter()


    // QUERY
    const { data: previoustermsData, loading, error, refetch } = useQuery(GET_DATA, { client, variables: { where: { id: params?.id } } })

    //mutation
    const [updateItemFn, updateState] = useMutation(UPDATE_DATA, { client })
    const [deleteFn, deleteState] = useMutation(DELETE, { client, })


    // // action on change
    useEffect(() => {
        if (previoustermsData?.categories?.length) {
            const { id, name, categoryHasChild } = previoustermsData.categories[0]

            setCurrentData({
                id,
                name,
                subCategory: categoryHasChild

            })
        }



    }, [previoustermsData?.categories?.length])





    // // initializing the mutation and  quires
    const updateItem = async (input: any) => {
        const { data } = await updateItemFn({
            variables: {
                "where": {
                    "id": currentData.id
                },
                "update": {
                    "name": currentData.name,
                    "categoryHasChild": currentData?.subCategory.map((item: any) => {
                        return {
                            "where": {
                                "node": {
                                    "id": item?.id
                                }
                            },
                            "update": {
                                "node": {
                                    "name": item?.name
                                }
                            }
                        }
                    }),
                }
            }
        })
        if (data?.updateCategories?.categories[0]?.id) {
            toast.success('updated successfully')
            refetch()
            router.push('/admin/dashboard/settings/category')
        }
    }


    const addNewSubCategory = async () => {
        const { data } = await updateItemFn({
            variables: {
                "where": {
                    "id": currentData.id
                },
                "update": {
                    "categoryHasChild": [
                        {
                            "create": [
                                {
                                    "node": {
                                        "name": newSubCategoryName,
                                        "type": "SUB_CATEGORY"
                                    }
                                }
                            ]
                        }
                    ]
                }
            }
        })
        if (data?.updateCategories?.categories[0]?.id) {
            toast.success('Added successfully')
            refetch()
            setIsModalOpen(false)
            router.push('/admin/dashboard/settings/category')
        }
    }



    const deleteItem = async (id: string) => {
        const { data } = await deleteFn({
            variables: {
                where: {
                    id
                }
            }
        })

        if (data.deleteCategories.nodesDeleted) {
            toast.error('deleted successfully')
            router.push('/admin/dashboard/settings/category')
            refetch()
        }
    }



    if (loading || updateState.loading || deleteState.loading) return <Loading />
    if (error || updateState.error) return <Error />

    return (
        <>
            <div className='flex items-center justify-between'>
                <h2 className="text-2xl font-semibold leading-tight mb-10">Item Details</h2>
                <button onClick={() => setIsModalOpen(true)} type='button' className="bg-primary hover:bg-blue-700 text-white  py-2 px-4 ">Add Sub Category</button>
            </div>
            <DataFrom
                setCurrentData={setCurrentData}
                currentData={currentData}
                updateItem={updateItem}
                deleteItem={deleteItem}
            />

            <AddSubCategory setNewSubCategoryName={setNewSubCategoryName} newSubCategoryName={newSubCategoryName} setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} addNewSubCategory={addNewSubCategory} />


        </>
    );
};

export default Main;