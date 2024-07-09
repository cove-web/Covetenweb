'use client'

import React, { Fragment, useState } from 'react';
import { addTermsVariables } from './Main';
import PageTextEditor from '@/components/PageTextEditor';

interface IAddProductProps {
    setTab: (tab: number) => void
    addNewTermsFn: (input: addTermsVariables) => void

}





const AddTerms = ({ setTab, addNewTermsFn }: IAddProductProps) => {
    // states

    const [title, setTitle] = useState('')
    const [docUrl, setDocUrl] = useState('')
    const [termsEditorState, setTermsEditorState] = useState('');
    const [selectedUrlType, setSelectedUrlType] = useState('general')



    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        let forInvoice = false
        if (selectedUrlType === 'general') {
            forInvoice = false
        } else if (selectedUrlType === 'invoice') {
            forInvoice = true
        }

        const inputData = {
            title: title.toLowerCase(),
            content: JSON.stringify(termsEditorState),
            docUrl: docUrl,
            forInvoice: forInvoice
        }

        addNewTermsFn(inputData)
    }




    return (
        <>
            <div className='min-h-screen'>
                <form onSubmit={handleSubmit} className="bg-transparent">
                    <div className="grid grid-cols-1 lg:grid-cols-2  gap-5">
                        <div className=" p-1  col-span-2">
                            <label htmlFor="title" className="block  text-gray-700 text-sm mb-1">
                                Title
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
                        <div className="p-1  col-span-2">
                            <label htmlFor="title" className="block  text-gray-700 text-sm mb-1">
                                Select Type
                            </label>
                            <select
                                defaultValue={selectedUrlType}
                                onChange={(e) => setSelectedUrlType(e.target.value)}
                                className="mt-2 w-full block  placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:primary focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:primary/10" >
                                <option value='general'>General</option>
                                <option value='invoice'>For Invoice</option>
                            </select>

                        </div>
                        <div className="p-1  col-span-2">
                            <label htmlFor="title" className="block  text-gray-700 text-sm mb-1">
                                Downloadable Document
                            </label>
                            <input
                                required
                                type="text"
                                name="docUrl"
                                defaultValue={docUrl}
                                onChange={(e) => setDocUrl(e.target.value)}
                                placeholder="docUrl"
                                className="mt-2 w-full block  placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:primary focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:primary/10"
                            />

                        </div>


                        <div className='col-span-2'>
                            <p className='text-dimText mb-4'> Description </p>
                            <PageTextEditor setEditorState={setTermsEditorState} editorState={termsEditorState} />
                        </div>

                    </div>
                    <div className='mt-6 '>

                        <button className='px-4 py-1.5 bg-primary text-white font-semibold'>Add New </button>
                    </div>
                </form>
            </div>

        </>

    );
};

export default AddTerms;