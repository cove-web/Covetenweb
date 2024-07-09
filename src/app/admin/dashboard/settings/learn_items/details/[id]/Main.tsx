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
mutation UpdateLearnItems($where: LearnItemWhere, $update: LearnItemUpdateInput) {
    updateLearnItems(where: $where, update: $update) {
      learnItems {
        id
      }
    }
  }
`
const GET_DATA = `
query LearnItems($where: LearnItemWhere) {
    learnItems(where: $where) {
      id
      title
      description
      url
      imageUrl
      courseFor
      rating
        mode
        seats
        price
        credit
        startDate
        endDate

    }
  }
`


const Main = () => {

    // states
    const [currentData, setCurrentData] = React.useState({
        description: '',
        title: '',
        url: '',
        imageUrl: '',
        mode: '',
        seats: '',
        price: '',
        credit: '',
        startDate: '',
        endDate: '',
        rating: '',
        courseFor: '',
        accredited: '',
        certification: '',
        duration: '',

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
        if (previoustermsData?.learnItems?.length) {
            const { title, description, url, rating, imageUrl, courseFor, mode, seats, price, credit, startDate, endDate, accredited, certification, duration } = previoustermsData.learnItems[0]

            setCurrentData({
                title,
                description,
                url,
                imageUrl,
                mode,
                seats,
                price,
                credit,
                startDate,
                endDate,
                rating,
                courseFor,
                accredited,
                certification,
                duration
            })
        }



    }, [previoustermsData?.learnItems?.length])
















    // initializing the mutation and  quires
    const updateItem = async (input: any) => {
        const { data } = await updateItemFn({
            variables: {
                where: {
                    id: params?.id
                },
                "update": {
                    "title": currentData.title,
                    "description": currentData.description,
                    "url": input.documentUrl,
                    imageUrl: input.imageUrl,
                    "mode": currentData.mode,
                    "seats": currentData.seats,
                    "price": currentData.price,
                    "credit": currentData.credit,
                    "startDate": currentData.startDate,
                    "endDate": currentData.endDate,
                    rating: currentData.rating,
                    courseFor: currentData.courseFor,
                    accredited: currentData.accredited,
                    certification: currentData.certification,
                    duration: currentData.duration,
                    "createdAt": new Date().toISOString()
                }
            }
        })
        if (data?.updateLearnItems?.learnItems?.length) {
            toast.success('updated successfully')
            refetch()
            router.push('/admin/dashboard/settings/learn_items')


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