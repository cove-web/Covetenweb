'use client'

import React, { useState } from 'react';
import { v4 as uuid } from "uuid"
import HandleFileUpload from '@/shared/HandleFileUpload';
import { addVariables } from './Main';

type subCategory = {
    name: string,
    image: String
}

// component
const AddNewPage = ({ addNewItem }: any) => {
    // states
    const [subCategoryCount, setSubCategoryCount] = React.useState(3);
    const [type, setType] = useState('PRODUCT');
    const [categoryName, setCategoryName] = useState('');
    const [categoryImage, setCategoryImage] = useState<File | null>(null);
    const [subCategoryName, setSubCategoryName] = useState<subCategory[]>([]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const inputData: addVariables = {
            type: type,
            name: categoryName.toLowerCase(),
            subCategory: subCategoryName,
            categoryImage: categoryImage // Assuming your addVariables type has a categoryImage field
        };

        addNewItem(inputData);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setCategoryImage(e.target.files[0]);
        }
    };

    return (
        <>
            <div className="">
                <div className="container max-w-screen-lg mx-auto">
                    <div>
                        <div className="bg-white rounded p-4 px-4 md:p-8 mb-6">
                            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-2">
                                <div className="lg:col-span-2">
                                    <form onSubmit={handleSubmit} className="md:grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                        <div className='col-span-full '>
                                            <p>Type </p>
                                            <div className="flex  sm:flex-row  ">
                                                <div className="flex flex-row mb-1 sm:mb-0 w-full">
                                                    <select
                                                        name="status"
                                                        defaultValue={type}
                                                        onChange={(e) => setType(e.target.value)}
                                                        className="mt-2 w-full block placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:primary focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:primary/10"
                                                    >
                                                        <option>SOLUTION</option>
                                                        <option>PRODUCT</option>
                                                        <option>SERVICE</option>
                                                        <option>EVENT</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-span-full '>
                                            <label htmlFor="title" className="block text-gray-700 text-sm mb-1">
                                                Name
                                            </label>
                                            <input
                                                required
                                                type="text"
                                                name="title"
                                                value={categoryName}
                                                onChange={(e) => setCategoryName(e.target.value)}
                                                placeholder="title"
                                                className="mt-2 w-full block placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:primary focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:primary/10"
                                            />
                                        </div>
                                        <div className="mb-5 col-span-full">
                                            <div>
                                                <label htmlFor="image" className="block text-gray-700 text-sm mb-1">
                                                    Cover Image
                                                </label>
                                                <input
                                                    onChange={handleImageChange}
                                                    type="file"
                                                    name="cImage"
                                                    className="mt-1 px-4 py-2 border border-gray-200 rounded-md w-full"
                                                    accept="image/*"
                                                />
                                            </div>
                                        </div>
                                        {type === "PRODUCT" && (
                                            <>
                                                <div className="md:col-span-5 mt-8">
                                                    <div>
                                                        <div className='flex justify-between'>
                                                            <p className='text-xl font-semibold text-gray-800'>
                                                                Sub Category
                                                            </p>
                                                            <div>
                                                                <label>Add More</label>
                                                                <div className="h-10 w-28 flex border border-gray-300 rounded items-center mt-1">
                                                                    <div
                                                                        onClick={() => setSubCategoryCount(subCategoryCount - 1)}
                                                                        className="cursor-pointer outline-none focus:outline-none border-r border-gray-300 transition-all text-gray-500 hover:text-blue-600"
                                                                    >
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-2" viewBox="0 0 20 20" fill="currentColor">
                                                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                                        </svg>
                                                                    </div>
                                                                    <input
                                                                        name="soda"
                                                                        id="soda"
                                                                        placeholder="0"
                                                                        className="px-2 text-center appearance-none outline-none text-gray-800 w-full bg-transparent"
                                                                        readOnly
                                                                        value={subCategoryCount}
                                                                    />
                                                                    <div
                                                                        onClick={() => setSubCategoryCount(subCategoryCount + 1)}
                                                                        className="cursor-pointer outline-none focus:outline-none border-l border-gray-300 transition-all text-gray-500 hover:text-blue-600"
                                                                    >
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-2 fill-current" viewBox="0 0 20 20" fill="currentColor">
                                                                            <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                                                                        </svg>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='space-y-5'>
                                                            {[...Array(subCategoryCount)].map((_, i) => (
                                                                <div key={i}>
                                                                    <div className="md:col-span-4">
                                                                        <label htmlFor="">Sub Category Name</label>
                                                                        <input
                                                                            value={subCategoryName[i]?.name}
                                                                            onChange={(e) => {
                                                                                const newSubCategoryName = [...subCategoryName];
                                                                                newSubCategoryName[i] = { name: e.target.value };
                                                                                setSubCategoryName(newSubCategoryName);
                                                                            }}
                                                                            type="text"
                                                                            id=""
                                                                            className="h-10 border border-gray-300 mt-1 rounded px-4 w-full"
                                                                            placeholder=""
                                                                        />
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                        <div className="md:col-span-5 text-right mt-8">
                                            <div className="inline-flex items-end">
                                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddNewPage;
