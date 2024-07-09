'use client'

import React, { useState, useCallback, useEffect } from 'react';
import { useGqlClient } from '@/hooks/UseGqlClient';
import { useMutation, useQuery } from 'graphql-hooks';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import Loading from '@/app/loading';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import HandleFileUpload from '@/shared/HandleFileUpload';
import { v4 as uuidv4 } from 'uuid';

import slugify from 'slugify';
import deleteImage from '@/shared/deleteImage';



const GET_PREVIOUS_DATA = `
query AboutUsSections {
    aboutUsSections {
      id
      title
      imageUrl
      description
      hasPoints {
        id
        title
        description
        url
        iconUrl
      }
    }
  }
`




const UPDATE = `
mutation UpdateAboutUsSections($update: AboutUsSectionUpdateInput, $where: AboutUsSectionWhere) {
    updateAboutUsSections(update: $update, where: $where) {
      info {
        nodesCreated
      }
    }
  }
`



// COMPONENT
const Main = () => {

    // states
    const [imageUploading, setImageUploading] = useState(false)


    const [data, setData] = useState<any>({
        title: '',
        image: '',
        description: '',
        hasPoints: [

        ]
    })


    const [editorState, setEditorState] = useState("")

    // hooks
    const client = useGqlClient()
    const router = useRouter()
    const { uploadFile } = HandleFileUpload()


    // QUERY
    const { data: previousData, loading } = useQuery(GET_PREVIOUS_DATA, { client })

    // mutation query
    const [updateFn, updateState, resetFn] = useMutation(UPDATE, { client })



    // initializing the  communication creation
    const updateAboutPage = async () => {
        let imageLink = null
        if (data?.image) {
            setImageUploading(true)
            imageLink = await handleImageUpload(data?.image)
            setImageUploading(false)
        }

        if (imageLink && previousData?.aboutUsSections[0]?.imageUrl) {
            deleteImage(previousData?.aboutUsSections[0]?.imageUrl)
        }


        const iconLinks = await Promise.all(
            data?.hasPoints.map(async (item: any) => {
                const link = await uploadAndDeletePreviousImage(item?.iconUrl, findPreviousImageUrl(item?.id));
                return {
                    id: item?.id,
                    link,
                };
            })
        );



        let { data: updateData } = await updateFn({
            variables: {
                "where": {
                    "id": previousData.aboutUsSections[0]?.id || 'no id'
                },
                "update": {
                    "title": data?.title,
                    "description": data?.description,
                    "imageUrl": imageLink || data?.imageUrl,
                    "hasPoints": data?.hasPoints.map((item: any) => {
                        return {
                            "update": {
                                "node": {
                                    "title": item?.title,
                                    "description": item?.description,
                                    "url": item?.url,
                                    "iconUrl": iconLinks?.find((link: any) => link?.id === item?.id)?.link
                                }
                            },
                            "where": {
                                "node": {
                                    "id": item?.id || 'no id'
                                }
                            }
                        }
                    }),



                }
            }
        })

        if (updateData) {
            toast.success("updated successfully")
            // router.push('/admin/dashboard/settings/about_page')

        }


    }


    // starts the communication creation
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await updateAboutPage()
        resetFn()
    }


    const findPreviousImageUrl = (id: string) => {
        const previous = previousData?.aboutUsSections[0]?.hasPoints.find((item: any) => item.id === id)
        return previous?.iconUrl
    }



    const allIconLinks = async () => { }



    const uploadAndDeletePreviousImage = async (currentImage: File, previousUrl: string) => {
        let imageLink
        if (currentImage) {
            setImageUploading(true)
            imageLink = await handleImageUpload(currentImage)
            setImageUploading(false)

            if (imageLink && previousUrl) {
                deleteImage(previousUrl)
            }

            return imageLink
        } else {
            return previousUrl
        }



    }




    useEffect(() => {
        if (previousData?.aboutUsSections?.length) {
            const { title, id, imageUrl, hasPoints, description } = previousData.aboutUsSections[0]
            setData({ title, id, imageUrl, hasPoints, description })

        }


    }, [previousData])







    //handle image upload to firebase
    async function handleImageUpload(file: any) {
        const res = await uploadFile(file, `${file?.name}-${uuidv4()}`, "About_images");
        return res;
    }

    if (updateState.loading || imageUploading) return <Loading />


    //render
    return (
        <form onSubmit={handleSubmit} className='bg-white rounded p-5 '>


            <div className="mb-5 ">
                <label htmlFor="title" className="block  text-gray-700 text-sm mb-1">
                    Title
                </label>
                <input
                    value={data.title}
                    onChange={(e) => setData({
                        ...data,
                        title: e.target.value

                    })}
                    type="text"
                    className="mt-1 px-4 py-2 border border-gray-200 rounded-md w-full"
                />
            </div>
            <div className="mb-5 ">
                <label htmlFor="title" className="block  text-gray-700 text-sm mb-1">
                    description
                </label>
                <input
                    value={data.description}
                    onChange={(e) => setData({
                        ...data,
                        description: e.target.value

                    })}
                    type="text"
                    className="mt-1 px-4 py-2 border border-gray-200 rounded-md w-full"
                />
            </div>

            <div className="mb-5">
                <div>
                    <label htmlFor="image" className="block  text-gray-700 text-sm mb-1">Image</label>

                    <input
                        onChange={
                            (e) => setData({
                                ...data,
                                image: e?.target?.files?.[0]
                            })
                        }
                        type="file"
                        name="image"
                        className="mt-1 px-4 py-2 border border-gray-200 rounded-md w-full"
                        accept="image/*"
                    />
                </div>
            </div>

            <div>
                <p className='text-lg font-bold text-primaryText mb-8 mt-12'>Points </p>
                {
                    [...Array(data?.hasPoints?.length)].map((_, index) =>
                        <div key={index} className='mb-8'>
                            <p className='mb-5 font-semibold'>Point - {index + 1}</p>
                            <div className="mb-5 ">
                                <label htmlFor="title" className="block  text-gray-700 text-sm mb-1">
                                    Title
                                </label>
                                <input
                                    value={data?.hasPoints[index]?.title || ''}
                                    onChange={(e) => setData({
                                        ...data,
                                        hasPoints: data.hasPoints.map((item: any, i: number) => {
                                            if (i === index) {
                                                return {
                                                    ...item,
                                                    title: e.target.value
                                                }
                                            } else {
                                                return item
                                            }
                                        })
                                    })}
                                    type="text"
                                    className="mt-1 px-4 py-2 border border-gray-200 rounded-md w-full"
                                />
                            </div>
                            <div className="mb-5 ">
                                <label htmlFor="title" className="block  text-gray-700 text-sm mb-1">
                                    description
                                </label>
                                <input
                                    value={data?.hasPoints[index]?.description || ''}
                                    onChange={(e) => setData({
                                        ...data,
                                        hasPoints: data.hasPoints.map((item: any, i: number) => {
                                            if (i === index) {
                                                return {
                                                    ...item,
                                                    description: e.target.value
                                                }
                                            } else {
                                                return item
                                            }
                                        })
                                    })}
                                    type="text"
                                    className="mt-1 px-4 py-2 border border-gray-200 rounded-md w-full"
                                />
                            </div>
                            <div className="mb-5 ">
                                <label htmlFor="title" className="block  text-gray-700 text-sm mb-1">
                                    url
                                </label>
                                <input
                                    value={data?.hasPoints[index]?.url}
                                    onChange={(e) => setData({
                                        ...data,
                                        hasPoints: data.hasPoints.map((item: any, i: number) => {
                                            if (i === index) {
                                                return {
                                                    ...item,
                                                    url: e.target.value
                                                }
                                            } else {
                                                return item
                                            }
                                        })

                                    })}
                                    type="text"
                                    className="mt-1 px-4 py-2 border border-gray-200 rounded-md w-full"
                                />
                            </div>
                            <div className="mb-5">
                                <div>
                                    <label htmlFor="image" className="block  text-gray-700 text-sm mb-1">Icon</label>

                                    <input
                                        onChange={
                                            (e) => setData({
                                                ...data,
                                                hasPoints: data.hasPoints.map((item: any, i: number) => {
                                                    if (i === index) {
                                                        return {
                                                            ...item,
                                                            iconUrl: e?.target?.files?.[0]
                                                        }
                                                    } else {
                                                        return item
                                                    }
                                                })
                                            })
                                        }
                                        type="file"
                                        name="image"
                                        className="mt-1 px-4 py-2 border border-gray-200 rounded-md w-full"
                                        accept="image/*"
                                    />
                                </div>
                            </div>
                        </div>

                    )
                }
            </div>




            <div className='mt-7'>
                <button type='submit' className='px-4 py-2 bg-primary text-white font-semibold'>Update</button>
            </div>
        </form>
    );
};

export default Main;