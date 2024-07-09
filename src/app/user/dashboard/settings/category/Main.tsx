
'use client';


import { useGqlClient } from '@/hooks/UseGqlClient';
import { useManualQuery, useMutation, useQuery } from 'graphql-hooks';
import { useEffect, useState } from 'react';
import Loading from '@/app/loading';
import Error from '@/components/Error';
import { toast } from 'react-hot-toast';
import slugify from 'slugify';
import PageTabs from './PageTabs';


type subCategory = {
    name: string,
}



type categoryType = 'PRODUCT' | 'SOLUTION' | 'SERVICE' | 'EVENT' | 'All'


export interface addVariables {
    type: string,
    name: string,
    subCategory?: subCategory[]
}



const ADD_NEW = `
mutation CreateCategories($input: [CategoryCreateInput!]!) {
    createCategories(input: $input) {
      info {
        nodesCreated
      }
    }
  }
`

const GET_ALL = `
query Categories($where: CategoryWhere) {
    categories(where: $where) {
        id
      name
      type
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
    const [selectedType, setSelectedType] = useState<categoryType>('All')
    const [categoryData, setCategoryData] = useState<any[]>([])

    // HOOKS
    const client = useGqlClient()

    // QUERY
    // const { data: categoryData, loading, error, refetch } = useManualQuery(GET_ALL, { client })
    const [getAllDataFn, dataState] = useManualQuery(GET_ALL, { client })

    // MUTATION
    const [addNewFn, addNewState] = useMutation(ADD_NEW, { client })
    const [deleteFn, deleteState] = useMutation(DELETE, { client, })






    useEffect(() => {
        if (selectedType === 'All') {
            getCategoryData()
        }
        else {
            getCategoryData([selectedType])
        }
    }, [selectedType])





    // initialize the query and mutations

    const addNewItem = async (input: addVariables) => {

        if (input.subCategory?.length) {
            const { data } = await addNewFn({
                variables: {
                    "input": [
                        {
                            "name": input.name.toLowerCase(),
                            "type": input.type,
                            "categoryHasChild": {
                                "create": input?.subCategory?.map((item) => {
                                    return {
                                        "node": {
                                            "name": item?.name?.toLowerCase(),
                                            "type": "SUB_CATEGORY"
                                        }
                                    }
                                }),

                            }
                        }
                    ]
                }
            })

            if (data.createCategories.info.nodesCreated) {
                toast.success('Added successfully')
                getCategoryData()
            }
        } else {
            const { data } = await addNewFn({
                variables: {
                    "input": [
                        {
                            "name": input.name.toLowerCase(),
                            "type": input.type,
                        }
                    ]
                }
            })

            if (data.createCategories.info.nodesCreated) {
                toast.success('Added successfully')
                getCategoryData()
            }
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
            getCategoryData()
        }
    }


    const getCategoryData = async (type: string[] = ["PRODUCT", "SERVICE", "SOLUTION", "EVENT"]) => {
        const { data } = await getAllDataFn({
            variables: {
                where: {
                    type_IN: type
                }
            }
        })
        if (data.categories?.length) {
            setCategoryData(data.categories)
        }
    }



    if (dataState.loading || addNewState.loading || deleteState.loading) return <Loading />
    if (dataState.error || addNewState.error) return <Error />



    return (
        <>
            <PageTabs categoryData={categoryData} addNewItem={addNewItem} deleteItem={deleteItem} selectedType={selectedType} setSelectedType={setSelectedType} />
        </>
    );
};

export default Main;