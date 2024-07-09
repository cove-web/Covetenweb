'use client'
import { useGqlClient } from '@/hooks/UseGqlClient';
import { useMutation, useQuery } from 'graphql-hooks';
import React, { useEffect, useState } from 'react';
import DataFrom from './DataFrom';
import { useParams, useRouter } from 'next/navigation';
import { Service } from '@/gql/graphql';
import { toast } from 'react-hot-toast';
import Loading from '@/app/loading';
import Error from '@/components/Error';
import slugify from 'slugify';



const UPDATE = `
mutation UpdateServices($where: ServiceWhere, $update: ServiceUpdateInput) {
    updateServices(where: $where, update: $update) {
      services {
        id
      }
    }
  }
`
const GET_DATA = `
query Services($where: ServiceWhere, $options: ServiceOptions) {
    services(where: $where, options: $options) {
      id
      coverImageUrl
      title
      description
      slug
      pageContent
      isPopular
      thumbnailUrl
      categoryHas {
        name
        id
      }
    }
  }

`


const Main = () => {

    // states
    const [ContentEditorState, setContentEditorState] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<any>([])

    const [ServiceData, setServiceData] = React.useState({
        title: '',
        description: '',
        coverImageUrl: '',
        pageContent: '',
        thumbnailUrl: '',

    })

    // hooks
    const client = useGqlClient()
    const params = useParams()
    const router = useRouter()



    // QUERY
    const { data: previousServiceData, loading, error } = useQuery(GET_DATA, { client, variables: { where: { id: params?.id } } })

    //mutation
    const [updateServiceFn, updateState] = useMutation(UPDATE, { client })







    // // action on change
    useEffect(() => {
        if (previousServiceData?.services?.length) {
            const { title, description, coverImageUrl, pageContent, thumbnailUrl } = previousServiceData.services[0]
            setContentEditorState(JSON.parse(pageContent))
            setSelectedCategory(previousServiceData.services[0].categoryHas)
            setServiceData({
                thumbnailUrl,
                pageContent,
                coverImageUrl,
                description,
                title
            })
        }
    }, [previousServiceData?.services?.length])















    // initializing the mutation and  quires
    const updateService = async (input: Service) => {
        const { data } = await updateServiceFn({
            variables: {
                where: {
                    id: params?.id
                },
                "update": {
                    "title": input?.title?.toLowerCase(),
                    "description": input.description,
                    "coverImageUrl": input.coverImageUrl,
                    slug: slugify(input.title as string, { replacement: '_', remove: /[*+~.()'"!:@]/g }),
                    "pageContent": input.pageContent,
                    "thumbnailUrl": input.thumbnailUrl,
                    "categoryHas": [
                        {
                            "disconnect": previousServiceData.services[0].categoryHas.map((item: any) => {
                                return {
                                    "where": {
                                        "node": {
                                            "id": item.id
                                        }
                                    }
                                }
                            }),
                            "connect": selectedCategory.map((item: any) => {
                                return {
                                    "where": {
                                        "node": {
                                            "id": item.id
                                        }
                                    },
                                    "overwrite": true
                                }
                            })
                        }
                    ],
                    // "categoryHas": selectedCategory.map((item: any) => {
                    //     return {
                    //         "where": {
                    //             "node": {
                    //                 "id": item.id
                    //             }
                    //         }
                    //     }
                    // }),

                    // [
                    //     {
                    //         "where": {
                    //             "node": {
                    //                 "id": null
                    //             }
                    //         }
                    //     }
                    // ]





                }
            }
        })
        if (data?.updateServices?.services[0]?.id) {
            toast.success(' updated successfully')
            router.push('/admin/dashboard/settings/services')

        }
    }



    if (loading || updateState.loading) return <Loading />
    if (error || updateState.error) return <Error />

    return (
        <>
            <DataFrom
                setServiceData={setServiceData}
                ServiceData={ServiceData}
                ContentEditorState={ContentEditorState}
                setContentEditorState={setContentEditorState}
                updateServiceFn={updateService}
                setSelectedCategory={setSelectedCategory}
                selectedCategory={selectedCategory}
            />


        </>
    );
};

export default Main;