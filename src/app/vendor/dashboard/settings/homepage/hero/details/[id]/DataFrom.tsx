'use client'

import React, { Fragment, useState } from 'react';
import { v4 as uuidv4 } from 'uuid'
import toast from 'react-hot-toast';
import HandleFileUpload from '@/shared/HandleFileUpload';
import deleteImage from '@/shared/deleteImage';


interface IAddProductProps {
    currentData: any,
    setCurrentData: any,
    updateItem: any
}






const DataFrom = ({ currentData, setCurrentData, updateItem }: IAddProductProps) => {
    // states
    const [image, setImage] = useState<any>(null)


    // hooks
    const { uploadFile } = HandleFileUpload()


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const imageLink = await uploadFile(image, `feature-${uuidv4()}`, 'feature_images')
        if (imageLink && currentData?.image) {
            deleteImage(currentData.image)
        }
        if (imageLink) {
            const inputData = {
                title: currentData?.title,
                image: imageLink
            }
            updateItem(inputData)
        } else {
            const inputData = {
                title: currentData?.title,
                image: currentData?.image
            }
            updateItem(inputData)
        }


    }




    // render
    return (
        <>
            <div className='min-h-screen'>
                <form onSubmit={handleSubmit} className="bg-transparent">
                    <div className="grid grid-cols-1 lg:grid-cols-2  gap-5 text-dimText">

                        <div className=" p-1 col-span-2">
                            <label htmlFor="">Image</label>
                            <input

                                type="file"
                                name="Image"
                                onChange={(e) => {
                                    if (e?.target?.files && e.target.files.length > 0) {
                                        setImage(e.target.files[0]);
                                    }
                                }}
                                placeholder="url"
                                className="mt-2 w-full block  placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:primary focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:primary/10"
                            />
                        </div>
                        <div className=" p-1 col-span-2">
                            <label htmlFor="">Title</label>
                            <textarea
                                required
                                rows={5}
                                name="title"
                                defaultValue={currentData?.title}
                                onChange={(e) => setCurrentData({ ...currentData, title: e.target.value })}
                                placeholder="title"
                                className="mt-2 w-full block  placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:primary focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:primary/10"
                            />
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