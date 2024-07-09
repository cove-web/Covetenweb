'use client'
import { useGqlClient } from '@/hooks/UseGqlClient';
import { useMutation, useQuery } from 'graphql-hooks';
import React, { useEffect, useState } from 'react';
import DataFrom from './DataFrom';

import { useParams, useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Loading from '@/app/loading';
import Error from '@/components/Error';



const UPDATE_INDUSTRY = `
mutation Mutation($where: IndustryPageWhere, $update: IndustryPageUpdateInput) {
    updateIndustryPages(where: $where, update: $update) {
      industryPages {
        id
      }
    }
  }
`
const GET_INDUSTRY = `
query IndustryPages($where: IndustryPageWhere, $options: IndustryPageOptions) {
    industryPages(where: $where, options: $options) {
      id
      title
      image
      description
    }
  }

`


const Main = () => {

    // states
    const [descriptionEditorState, setDescriptionEditorState] = useState('');


    const [IndustryData, setIndustryData] = React.useState({
        description: '',
        image: '',
        title: '',

    })

    // hooks
    const client = useGqlClient()
    const params = useParams()
    const router = useRouter()


    // QUERY
    const { data: previousIndustryData, loading, error, refetch } = useQuery(GET_INDUSTRY, { client, variables: { where: { id: params?.id } } })

    //mutation
    const [updateIndustryFn, updateState] = useMutation(UPDATE_INDUSTRY, { client })







    // // action on change
    useEffect(() => {
        if (previousIndustryData?.industryPages?.length) {
            const { title, description, image } = previousIndustryData.industryPages[0]
            setDescriptionEditorState(JSON.parse(description))
            setIndustryData({
                title,
                description,
                image,
            })
        }



    }, [previousIndustryData?.industryPages?.length])















    // initializing the mutation and  quires
    const updateIndustry = async (input: any) => {
        const { data } = await updateIndustryFn({
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
        if (data?.updateIndustryPages?.industryPages?.length) {
            toast.success('Industry updated successfully')
            refetch()


        }
    }




    if (loading || updateState.loading) return <Loading />
    if (error || updateState.error) return <Error />

    return (
        <>
            <DataFrom
                setIndustryData={setIndustryData}
                IndustryData={IndustryData}
                descriptionEditorState={descriptionEditorState}
                setDescriptionEditorState={setDescriptionEditorState}
                updateIndustryFn={updateIndustry}
            />


        </>
    );
};

export default Main;