'use client'

import React, { Fragment, useState } from 'react';
import Button from '@/components/Button';
import HandleFileUpload from '@/shared/HandleFileUpload';
import { v4 as uuidv4 } from 'uuid'
import toast from 'react-hot-toast';
import { Product } from '@/gql/graphql';
import deleteImage from '@/shared/deleteImage';
import PageTextEditor from '@/components/PageTextEditor';

interface IAddProductProps {
    ServiceData: any,
    setServiceData: any,
    ContentEditorState: any,
    setContentEditorState: any,
    updateServiceFn: (inputData: any) => void
}






const DataFrom = ({ ServiceData, setServiceData, ContentEditorState, setContentEditorState, updateServiceFn }: IAddProductProps) => {

    // states
    const [CoverImage, setCoverImage] = useState<any>(null)
    const [thumbnail, setThumbnail] = useState<any>(null)


    // hooks 
    const { uploadFile } = HandleFileUpload()




    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const CoverImageUrl = await uploadFile(CoverImage, `service-${uuidv4()}`, 'Service_Images')
        const thumbnailUrl = await uploadFile(thumbnail, `service-${uuidv4()}`, 'Service_Images')

        if (CoverImageUrl && ServiceData.coverImageUrl) {
            deleteImage(ServiceData.coverImageUrl)

        }
        if (thumbnailUrl && ServiceData.thumbnailUrl) {
            deleteImage(ServiceData.thumbnailUrl)
        }

        const inputData = {
            title: ServiceData?.title,
            description: ServiceData?.description,
            coverImageUrl: CoverImageUrl || ServiceData.coverImageUrl,
            thumbnailUrl: thumbnailUrl || ServiceData.thumbnailUrl,
            pageContent: JSON.stringify(ContentEditorState),


        }


        updateServiceFn(inputData)

    }




    return (
        <>
            <div className='min-h-screen'>
                <form onSubmit={handleSubmit} className="bg-transparent">
                    <div className="grid grid-cols-1 lg:grid-cols-2  gap-5 text-dimText">
                        <div className=" p-1 col-span-2">
                            <label htmlFor="">Title</label>
                            <input
                                required
                                type="text"
                                name="title"
                                defaultValue={ServiceData?.title}
                                onChange={(e) => setServiceData({ ...ServiceData, title: e.target.value })}
                                placeholder="title"
                                className="mt-2 w-full block  placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:primary focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:primary/10"
                            />
                        </div>

                        <div className="p-1 col-span-2">
                            <div>
                                <label htmlFor="image" className="block  text-gray-700 text-sm mb-1">Cover Image</label>

                                <input
                                    onChange={(e) => setCoverImage(e?.target?.files?.[0])}
                                    type="file"
                                    name="cImage"
                                    className="mt-2 w-full block  placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:primary focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:primary/10"
                                    accept="image/*"
                                />
                            </div>
                        </div>
                        <div className="p-1 col-span-2">
                            <div>
                                <label htmlFor="image" className="block  text-gray-700 text-sm mb-1">Thumbnail Image</label>

                                <input
                                    onChange={(e) => setThumbnail(e?.target?.files?.[0])}
                                    type="file"
                                    name="tImage"
                                    className="mt-2 w-full block  placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:primary focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:primary/10"
                                    accept="image/*"
                                />
                            </div>
                        </div>

                        <div className=" p-1  col-span-2 ">
                            <label htmlFor="">Short Description</label>
                            <textarea
                                required
                                rows={5}
                                defaultValue={ServiceData?.description}
                                onChange={(e) => setServiceData({ ...ServiceData, description: e.target.value })}
                                name="sDescription"
                                placeholder="short description"
                                className="mt-2 w-full block  placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:primary focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:primary/10"
                            />
                        </div>
                        <div className='col-span-2'>
                            <p className='text-dimText mb-4'> Page Content </p>
                            <PageTextEditor setEditorState={setContentEditorState} editorState={ContentEditorState} />
                        </div>




                    </div>
                    <div className='mt-6 '>

                        <button className='px-4 py-1.5 bg-primary text-white font-semibold'>Update</button>
                    </div>
                </form>
            </div>

        </>

    );
};

export default DataFrom;