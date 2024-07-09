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
mutation UpdateFeaturesPages($where: FeaturesPageWhere, $update: FeaturesPageUpdateInput) {
    updateFeaturesPages(where: $where, update: $update) {
      featuresPages {
        id
      }
    }
  }
`
const GET_DATA = `
query FeaturesPages($where: FeaturesPageWhere) {
    featuresPages(where: $where) {
        id
      title
      image
      description
    }
  }
`


const Main = () => {

    // states
    const [currentData, setCurrentData] = React.useState({
        description: '',
        title: '',
        image: ''

    })
    const [imageUploading, setImageUploading] = useState(false)

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
        if (previoustermsData?.featuresPages?.length) {
            const { title, description, image } = previoustermsData.featuresPages[0]

            setCurrentData({
                title,
                description,
                image
            })
        }



    }, [previoustermsData?.featuresPages?.length])





    // initializing the mutation and  quires
    const updateItem = async (input: any) => {
        const { data } = await updateItemFn({
            variables: {
                where: {
                    id: params?.id
                },
                "update": {
                    "title": input.title,
                    "image": input.image,
                    "description": input.description
                }
            }
        })
        if (data?.updateFeaturesPages?.featuresPages?.length) {
            toast.success('updated successfully')
            refetch()
            router.push('/admin/dashboard/settings/features')
        }
    }




    if (loading || updateState.loading || imageUploading) return <Loading />
    if (error || updateState.error) return <Error />

    return (
        <>
            <DataFrom
                setCurrentData={setCurrentData}
                currentData={currentData}
                updateItem={updateItem}
                setImageUploading={setImageUploading}
            />


        </>
    );
};

export default Main;