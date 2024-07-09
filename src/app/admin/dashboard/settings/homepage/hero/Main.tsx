
'use client';

import React, { useState } from 'react';
import { useGqlClient } from '@/hooks/UseGqlClient';
import { useMutation, useQuery } from 'graphql-hooks';
import Loading from '@/app/loading';
import Error from '@/components/Error';
import { toast } from 'react-hot-toast';
import slugify from 'slugify';
import PageTabs from './PageTabs';


export interface addVariables {
    title: string,
    image: string
}



const ADD_NEW = `
mutation CreateHeroes($input: [HeroCreateInput!]!) {
    createHeroes(input: $input) {
      info {
        nodesCreated
      }
    }
  }
`

const GET_ALL = `
query Heroes($where: HeroWhere) {
    heroes(where: $where) {
      id
      title
      image
    }
  }

`

const DELETE = `
mutation DeleteHeroes($where: HeroWhere) {
    deleteHeroes(where: $where) {
      nodesDeleted
    }
  }
`

const Main = () => {
    // STATES


    // HOOKS
    const client = useGqlClient()

    // QUERY
    const { data: heroData, loading, error, refetch } = useQuery(GET_ALL, { client })

    // MUTATION
    const [addNewFn, addNewState] = useMutation(ADD_NEW, { client })
    const [deleteFn, deleteState] = useMutation(DELETE, { client, })



    // initialize the query and mutations

    const addNewItem = async (input: any) => {


        const { data } = await addNewFn({
            variables: {
                "input": [
                    {
                        "title": input.title,
                        "image": input.image
                    }
                ]
            }
        })

        if (data.createHeroes.info.nodesCreated) {
            toast.success('Added successfully')
            refetch()
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

        if (data.deleteHeroes.nodesDeleted) {
            toast.error('Terms deleted successfully')
            refetch()
        }
    }




    if (loading || addNewState.loading || deleteState.loading) return <Loading />
    if (error || addNewState.error) return <Error />



    return (
        <>
            <PageTabs heroData={heroData?.heroes} addNewItem={addNewItem} deleteItem={deleteItem} />
        </>
    );
};

export default Main;