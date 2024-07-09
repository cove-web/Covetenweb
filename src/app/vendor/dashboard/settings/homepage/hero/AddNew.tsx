'use client'

import React, { Fragment, useState } from 'react';
import { v4 as uuid } from "uuid"
import HandleFileUpload from '@/shared/HandleFileUpload';
import Loading from '@/app/loading';







// component
const AddNewPage = ({ addNewItem }: any) => {


    // states
    const [title, setTitle] = useState<any>('')
    const [image, setImage] = useState<any>('')
    const [imageUploading, setImageUploading] = useState<boolean>(false)


    // hooks
    const { uploadFile } = HandleFileUpload()




    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setImageUploading(true)
        const imageLink = await uploadFile(image, `Hero-${uuid()}`, 'hero_images')
        setImageUploading(false)
        if (imageLink) {
            setImageUploading(false)
            const inputData = {
                title: title.toLowerCase(),
                image: imageLink as string
            }
            addNewItem(inputData)
        }


    }


    if (imageUploading) return <Loading />


    return (
        <>
            <div className='min-h-screen'>
                <form onSubmit={handleSubmit} className="bg-transparent">
                    <div className="grid grid-cols-1 lg:grid-cols-2  gap-5">

                        <div className=" p-1  col-span-2">
                            <label htmlFor="title" className="block  text-gray-700 text-sm mb-1">
                                image
                            </label>
                            <input
                                required
                                type="file"
                                name="image"
                                onChange={(e) => {
                                    if (e?.target?.files && e.target.files.length > 0) {
                                        setImage(e.target.files[0]);
                                    }
                                }}
                                placeholder="image"
                                className="mt-2 w-full block  placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:primary focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:primary/10"
                            />
                        </div>
                        <div className=" p-1  col-span-2">
                            <label htmlFor="title" className="block  text-gray-700 text-sm mb-1">
                                Title
                            </label>
                            <input
                                required
                                name="title"
                                type="text"
                                maxLength={55}
                                defaultValue={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="title"
                                className="mt-2 w-full block  placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:primary focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:primary/10"
                            />
                        </div>




                    </div>
                    <div className='mt-6 '>

                        <button className='px-4 py-1.5 bg-primary text-white font-semibold'>
                            {imageUploading ? 'loading' : 'Add New'}
                        </button>
                    </div>
                </form>
            </div>

        </>

    );
};

export default AddNewPage;