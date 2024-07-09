'use client'

import React, { Fragment, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid'
import toast from 'react-hot-toast';
import HandleFileUpload from '@/shared/HandleFileUpload';
import deleteImage from '@/shared/deleteImage';
import { AiTwotoneDelete } from 'react-icons/ai';


interface IAddProductProps {
    currentData: any,
    setCurrentData: any,
    updateItem: any,
    deleteItem: any
}






const DataFrom = ({ currentData, setCurrentData, updateItem, deleteItem }: IAddProductProps) => {
    // states
    const [subCategoryCount, setSubCategoryCount] = useState(0)


    const handleSubmit = (e: any) => {
        e.preventDefault()
    }


    useEffect(() => {

        if (currentData?.subCategory?.length) {
            setSubCategoryCount(currentData?.subCategory?.length)
        } else {
            setSubCategoryCount(0)
        }

    }, [currentData?.subCategory?.length])



    // render
    return (
        <>
            <div className="mt-8">
                <div className="container max-w-screen-lg mx-auto">
                    <div>

                        <div className="bg-white rounded p-4 px-4 md:p-8 mb-6">
                            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-2">


                                <div className="lg:col-span-2">
                                    <form onSubmit={handleSubmit} className=" md:grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">

                                        <div className='col-span-full '>
                                            <label htmlFor="title" className="block  text-gray-700 text-sm mb-1">
                                                Name
                                            </label>
                                            <input
                                                required
                                                type="text"
                                                name="title"
                                                defaultValue={currentData?.name}
                                                onChange={(e) => {
                                                    setCurrentData({
                                                        ...currentData,
                                                        name: e.target.value
                                                    })
                                                }}
                                                placeholder="title"
                                                className="mt-2 w-full block  placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:primary focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:primary/10"
                                            />
                                        </div>

                                        <div className="md:col-span-5 mt-8">


                                            <div>
                                                {/* service title */}
                                                <div className='flex  justify-between'>
                                                    <p className='text-xl font-semibold text-gray-800'>
                                                        Sub Categories
                                                    </p>


                                                </div>
                                                {/* service inputs */}
                                                <div className='space-y-5 mt-8'>
                                                    {
                                                        [...Array(subCategoryCount)].map((_, i) =>

                                                            <div key={i}>
                                                                <div className="md:col-span-4">
                                                                    <label htmlFor="">Sub Category Name</label>
                                                                    <div className='flex space-x-5'>
                                                                        <input
                                                                            value={currentData.subCategory[i]?.name || ''}
                                                                            onChange={(e) => {
                                                                                setCurrentData({
                                                                                    ...currentData,
                                                                                    subCategory: currentData.subCategory.map((item: any, index: number) => {
                                                                                        if (index === i) {
                                                                                            return {
                                                                                                ...item,
                                                                                                name: e.target.value
                                                                                            }
                                                                                        } else {
                                                                                            return item
                                                                                        }
                                                                                    })
                                                                                })
                                                                            }}
                                                                            type="text" id="" className="h-10 border border-gray-300 mt-1 rounded px-4 w-full " placeholder="" />

                                                                        <button onClick={() => {
                                                                            deleteItem(currentData.subCategory[i]?.id || 'no id')
                                                                        }} className="focus:ring-2 focus:ring-offset-2  text-sm leading-none text-red-600 py-2 px-2 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none"><AiTwotoneDelete /></button>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                </div>


                                            </div>
                                        </div>


                                        <div className="md:col-span-5  mt-8">
                                            <div className="inline-flex ">
                                                <button onClick={updateItem} type='button' className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-6 ">Update</button>
                                            </div>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div >

        </>

    );
};

export default DataFrom;