'use client'

import React, { useState, useCallback, useEffect } from 'react';
import { useGqlClient } from '@/hooks/UseGqlClient';
import { useMutation, useQuery } from 'graphql-hooks';
import Loading from '@/app/loading';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import HandleFileUpload from '@/shared/HandleFileUpload';
import { v4 as uuidv4 } from 'uuid';

import slugify from 'slugify';
import PageTextEditor from '@/components/PageTextEditor';


const GET_SERVICES = `
query Categories($where: CategoryWhere) {
    categories(where: $where) {
      id
      name
    }
  }`




const CREATE_NEW_SUB_SERVICE = `
mutation CreateServices($input: [ServiceCreateInput!]!) {
    createServices(input: $input) {
      info {
        nodesCreated
      }
    }
  }
`



// COMPONENT
const Main = () => {

    // states
    const [uploading, setUploading] = useState(false)
    const [title, setTitle] = useState('')
    const [CoverImage, setCoverImage] = useState<any>(null)
    const [thumbnail, setThumbnail] = useState<any>(null)
    const [description, setDescription] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('')
    const [editorState, setEditorState] = useState("")

    // hooks
    const client = useGqlClient()
    const router = useRouter()
    const { uploadFile } = HandleFileUpload()

    // query
    const { data, loading, error } = useQuery(GET_SERVICES, {
        client,
        variables: {
            "where": {
                "type": "SOLUTION"
            }
        }
    })

    // mutation query
    const [createServiceFn, createState, resetFn] = useMutation(CREATE_NEW_SUB_SERVICE, { client })



    // initializing the  communication creation
    const createService = async () => {
        const coverImageUrl = await handleImageUpload(CoverImage)
        const imageLinkUrl = await handleImageUpload(thumbnail)

        // text editor's content
        const contentString = JSON.stringify(editorState)

        let { data } = await createServiceFn({
            variables: {
                "input": [
                    {
                        "coverImageUrl": coverImageUrl,
                        "title": title,
                        "description": description,
                        slug: slugify(title, { replacement: '_', remove: /[*+~.()'"!:@]/g }),
                        "pageContent": contentString,
                        "isPopular": false,
                        "thumbnailUrl": imageLinkUrl,
                        "isSolution": true,
                        "categoryHas": {
                            "connect": {
                                "where": {
                                    "node": {
                                        "id": selectedCategory
                                    }
                                }
                            }
                        }
                    }
                ],

            }
        })


        if (data.createServices.info.nodesCreated) {
            toast.success("created successfully")
            router.push('/admin/dashboard/settings/solution')
        }


    }


    // starts the communication creation
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await createService()
        resetFn()
    }



    useEffect(() => {

        if (data?.categories?.length) {
            setSelectedCategory(data?.categories[0]?.id)
        }
    }, [data?.categories?.length])





    //handle image upload to firebase
    async function handleImageUpload(file: any) {
        setUploading(true)
        const res = await uploadFile(file, `${file?.name}-${uuidv4()}`, "Service_images");
        setUploading(false)
        return res;
    }

    if (createState.loading) return <Loading />


    //render
    return (
        <form onSubmit={handleSubmit} className='bg-white rounded p-5 '>

            <div className="mb-5 ">
                <label htmlFor="title" className="block  text-gray-700 text-sm mb-1">
                    category
                </label>
                <div className="relative inline-flex w-full">
                    <select

                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        name='userType'
                        className="mt-1 px-4 py-2 border border-gray-200 rounded-md w-full"
                    >
                        {
                            data?.categories && data?.categories.map((service: any) =>
                                <option key={service?.id} value={service?.id} >{service?.name}</option>
                            )
                        }

                    </select>

                </div>
            </div>
            <div className="mb-5 ">
                <label htmlFor="title" className="block  text-gray-700 text-sm mb-1">
                    Title
                </label>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    className="mt-1 px-4 py-2 border border-gray-200 rounded-md w-full"
                />
            </div>

            <div className="mb-5">
                <div>
                    <label htmlFor="image" className="block  text-gray-700 text-sm mb-1">Cover Image</label>

                    <input
                        onChange={(e) => setCoverImage(e?.target?.files?.[0])}
                        type="file"
                        name="cImage"
                        className="mt-1 px-4 py-2 border border-gray-200 rounded-md w-full"
                        accept="image/*"
                    />
                </div>
            </div>
            <div className="mb-5">
                <div>
                    <label htmlFor="image" className="block  text-gray-700 text-sm mb-1">Thumbnail Image</label>

                    <input
                        onChange={(e) => setThumbnail(e?.target?.files?.[0])}
                        type="file"
                        name="tImage"
                        className="mt-1 px-4 py-2 border border-gray-200 rounded-md w-full"
                        accept="image/*"
                    />
                </div>
            </div>
            <div className='bg-white'>
                <label htmlFor="title" className="block  text-gray-700 text-sm mb-1">
                    Description
                </label>
                <textarea
                    rows={6}
                    name="image"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-1 px-4 py-2 border border-gray-200 rounded-md w-full"
                />
            </div>
            <div className='bg-white'>
                <label htmlFor="title" className="block  text-gray-700 text-sm mb-1">
                    Page Content
                </label>
                <PageTextEditor setEditorState={setEditorState} editorState={editorState} />
            </div>


            <div className=' mt-6'>
                <button type='submit' className='px-4 py-2 bg-primary text-white font-semibold'>
                    {
                        uploading ? 'image Uploading..' : 'Create'
                    }

                </button>
            </div>
        </form>
    );
};

export default Main;