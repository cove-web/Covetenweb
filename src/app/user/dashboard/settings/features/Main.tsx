
'use client';


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
    image: string
}



const ADD_NEW = `
mutation CreateFeaturesPages($input: [FeaturesPageCreateInput!]!) {
    createFeaturesPages(input: $input) {
      info {
        nodesCreated
      }
    }
  }
`

const GET_ALL = `
query FeaturesPages($where: FeaturesPageWhere, $options: FeaturesPageOptions) {
    featuresPages(where: $where, options: $options) {
        id
      title
      image
      description
      createdAt
    }
  }


`

const DELETE = `
mutation DeleteFeaturesPages($where: FeaturesPageWhere) {
    deleteFeaturesPages(where: $where) {
      nodesDeleted
    }
  }
`

const Main = () => {
    // STATES

    // HOOKS
    const client = useGqlClient()

    // QUERY
    const { data: featureData, loading, error, refetch } = useQuery(GET_ALL, {
        client,
        variables: {
            "options": {
                "sort": [
                    {
                        "createdAt": "ASC"
                    }
                ]
            }
        }
    })

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
                        "image": input.image,
                        "description": input.description,
                        createdAt: new Date().toISOString(),
                    }
                ]
            }
        })

        if (data.createFeaturesPages.info.nodesCreated) {
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

        if (data.deleteFeaturesPages.nodesDeleted) {
            toast.error('Terms deleted successfully')
            refetch()
        }
    }




    if (loading || addNewState.loading || deleteState.loading) return <Loading />
    if (error || addNewState.error) return <Error />



    return (
        <>
            <Tab featureData={featureData?.featuresPages} addNewFn={addNewItem} deleteItem={deleteItem} />
        </>
    );
};

export default Main;