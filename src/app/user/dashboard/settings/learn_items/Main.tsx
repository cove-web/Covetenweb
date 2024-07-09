
'use client';

import React, { useState, useEffect } from 'react';
import Tab from './PageTabs';
import { useGqlClient } from '@/hooks/UseGqlClient';
import { useMutation, useQuery } from 'graphql-hooks';
import Loading from '@/app/loading';
import Error from '@/components/Error';
import { toast } from 'react-hot-toast';
import slugify from 'slugify';


export interface addVariables {
    description: string,
    title: string,
    url: string,
    imageUrl: string,
    mode: string,
    seats: number,
    price: number,
    credit: string,
    startDate: string,
    endDate: string,
    rating: string,
    courseFor: string,
    accredited: string,
    certification: string,
    duration: string,

}



const ADD_NEW = `
mutation CreateLearnItems($input: [LearnItemCreateInput!]!) {
    createLearnItems(input: $input) {
      info {
        nodesCreated
      }
    }
  }
`

const GET_ALL = `
query LearnItems($where: LearnItemWhere, $options: LearnItemOptions) {
    learnItems(where: $where, options: $options) {
      id
      title
      description
      url
      imageUrl
      duration
      certification
      accredited
    }
  }

`

const DELETE = `

mutation DeleteLearnItems($where: LearnItemWhere) {
    deleteLearnItems(where: $where) {
      nodesDeleted
    }
  }
`

const Main = () => {
    // STATES
    const [learnData, setLearnData] = useState<any[]>([])
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [selectedUserType, setSelectedUserType] = useState('')

    // HOOKS
    const client = useGqlClient()

    // QUERY
    // const { data: learnData, loading, error, refetch } = useQuery(GET_ALL, { client })

    const [getLearnDataFn, getLearnDataState] = useMutation(GET_ALL, { client, })

    // MUTATION
    const [addNewFn, addNewState] = useMutation(ADD_NEW, { client })
    const [deleteFn, deleteState] = useMutation(DELETE, { client, })




    // initialize the query and mutations

    const addNewItem = async (input: addVariables) => {


        const { data } = await addNewFn({
            variables: {
                "input": [
                    {
                        "title": input.title,
                        "description": input.description,
                        "url": input.url,
                        "imageUrl": input.imageUrl,
                        "mode": input.mode,
                        "seats": input.seats,
                        rating: input.rating,
                        courseFor: input.courseFor,
                        "price": input.price,
                        "credit": input.credit,
                        "startDate": input.startDate,
                        "endDate": input.endDate,
                        accredited: input.accredited,
                        certification: input.certification,
                        duration: input.duration,
                        "createdAt": new Date().toISOString()
                    }
                ]
            }
        })

        if (data.createLearnItems.info.nodesCreated) {
            toast.success('Added successfully')
            getData()
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

        if (data.deleteLearnItems.nodesDeleted) {
            toast.error('Terms deleted successfully')
            getData()

        }
    }






    const getData = async (where: any = {}) => {
        const { data } = await getLearnDataFn({
            variables: {
                "options": {
                    "sort": [
                        {
                            "createdAt": "ASC"
                        }
                    ]
                },
                "where": where
            }
        })

        if (data?.learnItems) {
            setLearnData(data?.learnItems)
        }
    }




    useEffect(() => {

        let where: any = {}

        if (searchTerm) {
            where = {
                "title_CONTAINS": searchTerm
            }
        }
        if (selectedUserType !== 'All') {
            where = {
                "OR": [
                    {
                        "accredited_CONTAINS": selectedUserType,

                    },
                    {
                        "duration_CONTAINS": selectedUserType,

                    },
                    {
                        "certification_CONTAINS": selectedUserType,

                    }
                ]
            }




        }

        getData(where)


    }, [searchTerm, selectedUserType])








    if (addNewState.loading || deleteState.loading) return <Loading />
    if (getLearnDataState?.error || addNewState.error) return <Error />




    return (
        <>
            <Tab setSearchTerm={setSearchTerm} selectedUserType={selectedUserType} setSelectedUserType={setSelectedUserType} loading={getLearnDataState?.loading} learnData={learnData} addNewFn={addNewItem} deleteItem={deleteItem} />
        </>
    );
};

export default Main;