'use client'
import React, { Fragment, useState } from 'react';




import Button from '@/components/Button';

import HandleFileUpload from '@/shared/HandleFileUpload';
import { v4 as uuidv4 } from 'uuid'
import toast from 'react-hot-toast';
import { useGqlClient } from '@/hooks/UseGqlClient';
import { useQuery } from 'graphql-hooks';
import { addIndustryVariables } from './Main';
import PageTextEditor from '@/components/PageTextEditor';

interface IAddProductProps {
    setTab: (tab: number) => void
    addNewIndustryFn: (input: addIndustryVariables) => void

}

const GET_CATEGORY = `
query SubCategories {
    subCategories {
      id
      name
    }
  }`




const AddProduct = ({ setTab, addNewIndustryFn }: IAddProductProps) => {
    // states

    const [title, setTitle] = useState('')
    const [image, setImage] = useState<File | null>(null)
    const [industryEditorState, setIndustryEditorState] = useState('');

    const [othersEditorState, setOthersEditorState] = useState('');


    // hooks 
    const { uploadFile } = HandleFileUpload()
    const client = useGqlClient()

    //query
    const { data, loading, error } = useQuery(GET_CATEGORY, { client })







    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const imageLink = await uploadFile(image, `industry-${uuidv4()}`, 'industry_Images')
        if (!imageLink) return toast.error('Something went wrong  please try again later ')

        const inputData = {
            title: title.toLowerCase(),
            description: JSON.stringify(industryEditorState),
            image: imageLink,
        }



        addNewIndustryFn(inputData)
    }




    return (
        <>
            <div className='min-h-screen'>
                <form onSubmit={handleSubmit} className="bg-transparent">
                    <div className="grid grid-cols-1 lg:grid-cols-2  gap-5">
                        <div className=" p-1  col-span-2">
                            <label htmlFor="title" className="block  text-gray-700 text-sm mb-1">
                                Name
                            </label>
                            <input
                                required
                                type="text"
                                name="title"
                                defaultValue={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="title"
                                className="mt-2 w-full block  placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:primary focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:primary/10"
                            />
                        </div>
                        <div className=" p-1  col-span-2">
                            <label htmlFor="title" className="block  text-gray-700 text-sm mb-1">
                                Image
                            </label>
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
                            <PageTextEditor setEditorState={setIndustryEditorState} editorState={industryEditorState} />
                        </div>

                    </div>
                    <div className='mt-6 '>

                        <button className='px-4 py-1.5 bg-primary text-white font-semibold'>Add New Industry</button>
                    </div>
                </form>
            </div>

        </>

    );
};

export default AddProduct;