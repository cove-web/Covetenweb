
'use client';


import AddIndustryTabs from './AddIndustryTabs';
import { useGqlClient } from '@/hooks/UseGqlClient';
import { useMutation, useQuery } from 'graphql-hooks';
import Loading from '@/app/loading';
import Error from '@/components/Error';
import { toast } from 'react-hot-toast';
import deleteImage from '@/shared/deleteImage';


export interface addIndustryVariables {
    title: string,
    image: string,
    description: string,
}



const ADD_NEW = `
mutation CreateIndustryPages($input: [IndustryPageCreateInput!]!) {
    createIndustryPages(input: $input) {
      info {
        nodesCreated
      }
    }
  }
`

const GET_ALL = `
query IndustryPages($options: IndustryPageOptions) {
    industryPages(options: $options) {
      id
      title
      image
      description
      createdAt
    }
  }


`

const DELETE = `

mutation DeleteIndustryPages($where: IndustryPageWhere) {
    deleteIndustryPages(where: $where) {
      nodesDeleted
    }
  }


`

const Main = () => {
    // STATES

    // HOOKS
    const client = useGqlClient()

    // QUERY
    const { data: IndustryData, loading, error, refetch } = useQuery(GET_ALL, {
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
    const [addNewIndustryFn, addNewIndustryState] = useMutation(ADD_NEW, { client })
    const [deleteIndustryFn, deleteIndustryState] = useMutation(DELETE, { client, })



    // initialize the query and mutations

    const addNewIndustry = async (input: addIndustryVariables) => {

        const { data } = await addNewIndustryFn({
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

        if (data.createIndustryPages.info.nodesCreated) {
            toast.success('Industry added successfully')
            refetch()
        }
    }

    const deleteIndustry = async (id: string) => {

        const imageLink = IndustryData?.industryPages.find((item: any) => item.id === id)?.image
        deleteImage(imageLink)
        const { data } = await deleteIndustryFn({
            variables: {
                where: {
                    id
                }
            }
        })

        if (data.deleteIndustryPages.nodesDeleted) {
            toast.error('Industry deleted successfully')
            refetch()
        }
    }




    if (loading || addNewIndustryState.loading || deleteIndustryState.loading) return <Loading />
    // if (error || addNewIndustryState.error) return <Error />



    return (
        <>
            <AddIndustryTabs IndustryData={IndustryData?.industryPages} addNewIndustryFn={addNewIndustry} deleteIndustry={deleteIndustry} />
        </>
    );
};

export default Main;