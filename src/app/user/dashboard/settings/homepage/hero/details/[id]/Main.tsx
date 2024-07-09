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



const UPDATE_DATA = `
mutation UpdateHeroes($where: HeroWhere, $update: HeroUpdateInput) {
    updateHeroes(where: $where, update: $update) {
      heroes {
        id
      }
    }
  }
`
const GET_DATA = `
query Heroes($where: HeroWhere) {
    heroes(where: $where) {
      id
      title
      image
    }
  }
`


const Main = () => {

    // states
    const [currentData, setCurrentData] = React.useState({
        title: '',
        image: ''

    })

    // hooks
    const client = useGqlClient()
    const params = useParams()
    const router = useRouter()


    // QUERY
    const { data: previoustermsData, loading, error, refetch } = useQuery(GET_DATA, { client, variables: { where: { id: params?.id } } })

    //mutation
    const [updateItemFn, updateState] = useMutation(UPDATE_DATA, { client })



    // // action on change
    useEffect(() => {
        if (previoustermsData?.heroes?.length) {
            const { title, image } = previoustermsData.heroes[0]

            setCurrentData({
                title,
                image
            })
        }



    }, [previoustermsData?.heroes?.length])





    // initializing the mutation and  quires
    const updateItem = async (input: any) => {
        const { data } = await updateItemFn({
            variables: {
                where: {
                    id: params?.id
                },
                "update": {
                    "title": input.title,
                    "image": input.image
                }
            }
        })
        if (data?.updateHeroes?.heroes?.length) {
            toast.success('updated successfully')
            refetch()
            router.push('/admin/dashboard/settings/homepage/hero')
        }
    }




    if (loading || updateState.loading) return <Loading />
    if (error || updateState.error) return <Error />

    return (
        <>
            <DataFrom
                setCurrentData={setCurrentData}
                currentData={currentData}
                updateItem={updateItem}
            />


        </>
    );
};

export default Main;