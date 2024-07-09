'use client'

import React, { Fragment, useState } from 'react';




import Button from '@/components/Button';
import HandleFileUpload from '@/shared/HandleFileUpload';
import { v4 as uuidv4 } from 'uuid'
import toast from 'react-hot-toast';
import deleteImage from '@/shared/deleteImage';
import Loading from '@/app/loading';
import PageTextEditor from '@/components/PageTextEditor';

interface IAddProductProps {
    IndustryData: any,
    setIndustryData: any,
    descriptionEditorState: any,
    setDescriptionEditorState: any,
    updateIndustryFn: any
}






const DataFrom = ({ IndustryData, setIndustryData, descriptionEditorState, setDescriptionEditorState, updateIndustryFn }: IAddProductProps) => {

    // states
    const [image, setImage] = useState<File | null>(null)
    const [imageUploading, setImageUploading] = useState(false)


    // hooks 
    const { uploadFile } = HandleFileUpload()




    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        let imageLink

        if (image) {
            setImageUploading(true)
            imageLink = await uploadFile(image, `industry-${uuidv4()}`, 'industry_Images')
            setImageUploading(false)
            const previousImage = IndustryData?.image
            deleteImage(previousImage)

            const inputData = {
                title: IndustryData?.title,
                image: imageLink,
                description: JSON.stringify(descriptionEditorState),
            }
            updateIndustryFn(inputData)
        } else {
            const inputData = {
                title: IndustryData?.title,
                image: IndustryData?.image,
                description: JSON.stringify(descriptionEditorState),
            }
            updateIndustryFn(inputData)
        }



    }


    if (imageUploading) return <Loading />



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
                                defaultValue={IndustryData?.title}
                                onChange={(e) => setIndustryData({ ...IndustryData, title: e.target.value })}
                                placeholder="title"
                                className="mt-2 w-full block  placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:primary focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:primary/10"
                            />
                        </div>

                        <div className=" p-1  col-span-2">
                            <label htmlFor="">Image</label>
                            <input

                                type="file"
                                name="Image"
                                onChange={(e) => {
                                    if (e?.target?.files && e.target.files.length > 0) {
                                        setImage(e.target.files[0]);
                                    }
                                }}
                                placeholder="Image"
                                className="mt-2 w-full block  placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:primary focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:primary/10"
                            />
                        </div>

                        <div className='col-span-2'>
                            <p className='text-dimText mb-4'> Description </p>
                            <PageTextEditor setEditorState={setDescriptionEditorState} editorState={descriptionEditorState} />
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