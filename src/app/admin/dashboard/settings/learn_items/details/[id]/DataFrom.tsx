'use client'

import React, { Fragment, useState } from 'react';
import { v4 as uuidv4 } from 'uuid'
import toast from 'react-hot-toast';
import HandleFileUpload from '@/shared/HandleFileUpload';
import deleteImage from '@/shared/deleteImage';
import Loading from '@/app/loading';


interface IAddProductProps {
    currentData: any,
    setCurrentData: any,
    updateItem: any
}






const DataFrom = ({ currentData, setCurrentData, updateItem }: IAddProductProps) => {

    // states
    const [image, setImage] = useState<File | null>(null)
    const [uploading, setUploading] = useState(false)
    const [selectedUrlType, setSelectedUrlType] = useState('url')
    const [document, setDocument] = useState<File | null>(null)



    // hooks
    const { uploadFile } = HandleFileUpload()


    const handleDocument = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e?.target?.files && e.target.files.length > 0) {
            const selectedFile = e.target.files[0];
            const maxFileSizeMB = 5; // 5MB

            if (selectedFile.type === "application/pdf" && selectedFile.size <= maxFileSizeMB * 1024 * 1024) {
                setDocument(selectedFile);
            } else {
                // Invalid file format or size
                // You can display an error message or take appropriate action here
                toast.error("Please select a PDF file that is 5MB or smaller.");
                e.target.value = ""; // Clear the file input
            }
        }
    }


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let imageLink
        let documentLink
        if (image) {
            setUploading(true)
            imageLink = await uploadFile(image, `learn-${uuidv4()}`, 'Learn_Images')
            setUploading(false)
            if (currentData?.imageUrl) {
                deleteImage(currentData?.imageUrl)
            }
        }

        if (document && selectedUrlType === 'pdf') {
            setUploading(true)
            documentLink = await uploadFile(document, `learn-${uuidv4()}`, 'Learn_Documents')
            setUploading(false)
            if (currentData?.url) {
                deleteImage(currentData?.url)
            }
        } else {
            documentLink = currentData?.url
        }

        const inputData = {
            imageUrl: imageLink || currentData?.imageUrl,
            documentUrl: documentLink || currentData?.url
        }
        updateItem(inputData)


    }


    if (uploading) return <Loading />

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
                                defaultValue={currentData?.title}
                                onChange={(e) => setCurrentData({ ...currentData, title: e.target.value })}
                                placeholder="title"
                                className="mt-2 w-full block  placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:primary focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:primary/10"
                            />
                        </div>
                        <div className="p-1  col-span-2">
                            <label htmlFor="title" className="block  text-gray-700 text-sm mb-1">
                                Select Url Type
                            </label>
                            <select
                                defaultValue={selectedUrlType}
                                onChange={(e) => setSelectedUrlType(e.target.value)}
                                className="mt-2 w-full block  placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:primary focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:primary/10" >
                                <option value='url'>Add External Url</option>
                                <option value='pdf'>Add Document</option>
                            </select>

                        </div>
                        {
                            selectedUrlType === 'url' ?
                                <div className=" p-1  col-span-2">
                                    <label htmlFor="title" className="block  text-gray-700 text-sm mb-1">
                                        Url
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        defaultValue={currentData?.url}
                                        onChange={(e) => setCurrentData({ ...currentData, url: e.target.value })}

                                        className="mt-2 w-full block  placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:primary focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:primary/10"
                                    />
                                </div>
                                :
                                <>
                                    <div className=" p-1  col-span-2">
                                        <label htmlFor="title" className="block  text-gray-700 text-sm mb-1">
                                            Upload Document
                                        </label>
                                        <input
                                            required
                                            type="file"
                                            name="Image"
                                            accept=".pdf"
                                            onChange={handleDocument}
                                            placeholder="Image"
                                            className="mt-2 w-full block placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:primary focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:primary/10"
                                        />

                                    </div>

                                </>
                        }
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


                        <div className="p-1  col-span-2">
                            <label htmlFor="title" className="block text-gray-700 text-sm mb-1">
                                Duration
                            </label>
                            <select
                                defaultValue={currentData?.duration}
                                onChange={(e) => setCurrentData({ ...currentData, duration: e.target.value })}
                                className="mt-2 w-full block placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:primary focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:primary/10"
                            >
                                <option value="">Select</option>
                                <option value="short-term">Short Term Course</option>
                                <option value="long-term">Long Term Course</option>
                            </select>
                        </div>

                        <div className="p-1 col-span-2">
                            <label htmlFor="title" className="block text-gray-700 text-sm mb-1">
                                Certification
                            </label>
                            <select
                                defaultValue={currentData?.certification}
                                onChange={(e) => setCurrentData({ ...currentData, certification: e.target.value })}
                                className="mt-2 w-full block placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:primary focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:primary/10"
                            >
                                <option value="">Select</option>
                                <option value="certificate">Certificate Course</option>
                                <option value="non-certificate">Non Certificate Course</option>
                            </select>
                        </div>

                        <div className="p-1 col-span-2">
                            <label htmlFor="title" className="block text-gray-700 text-sm mb-1">
                                Accredited
                            </label>
                            <select
                                defaultValue={currentData?.accredited}
                                onChange={(e) => setCurrentData({ ...currentData, accredited: e.target.value })}
                                className="mt-2 w-full block placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:primary focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:primary/10"
                            >
                                <option value="">Select</option>
                                <option value="national-accredited">National Accredited</option>
                                <option value="internationally-accredited">Internationally Accredited</option>
                            </select>
                        </div>

                        <div className=" p-1  col-span-2">
                            <label htmlFor="title" className="block  text-gray-700 text-sm mb-1">
                                Course For
                            </label>
                            <input
                                required
                                type="text"
                                defaultValue={currentData?.courseFor}
                                onChange={(e) => setCurrentData({ ...currentData, courseFor: e.target.value })}

                                className="mt-2 w-full block  placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:primary focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:primary/10"
                            />
                        </div>
                        <div className=" p-1  col-span-2">
                            <label htmlFor="title" className="block  text-gray-700 text-sm mb-1">
                                rating
                            </label>
                            <input
                                required
                                type="text"
                                defaultValue={currentData?.rating}
                                onChange={(e) => setCurrentData({ ...currentData, rating: e.target.value })}

                                className="mt-2 w-full block  placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:primary focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:primary/10"
                            />
                        </div>
                        <div className=" p-1  col-span-2">
                            <label htmlFor="title" className="block  text-gray-700 text-sm mb-1">
                                mode
                            </label>
                            <input
                                required
                                type="text"
                                name="url"
                                defaultValue={currentData?.mode}
                                onChange={(e) => setCurrentData({ ...currentData, mode: e.target.value })}

                                className="mt-2 w-full block  placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:primary focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:primary/10"
                            />
                        </div>
                        <div className=" p-1  col-span-2">
                            <label htmlFor="title" className="block  text-gray-700 text-sm mb-1">
                                seats
                            </label>
                            <input
                                required
                                type="number"
                                name="url"
                                defaultValue={currentData?.seats}
                                onChange={(e) => setCurrentData({ ...currentData, seats: parseInt(e.target.value) })}

                                className="mt-2 w-full block  placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:primary focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:primary/10"
                            />
                        </div>
                        <div className=" p-1  col-span-2">
                            <label htmlFor="title" className="block  text-gray-700 text-sm mb-1">
                                price
                            </label>
                            <input
                                required
                                type="number"
                                defaultValue={currentData?.price}
                                onChange={(e) => setCurrentData({ ...currentData, price: parseInt(e.target.value) })}

                                className="mt-2 w-full block  placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:primary focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:primary/10"
                            />
                        </div>
                        <div className=" p-1  col-span-2">
                            <label htmlFor="title" className="block  text-gray-700 text-sm mb-1">
                                credit
                            </label>
                            <input
                                required
                                type="text"
                                name="url"
                                defaultValue={currentData?.credit}
                                onChange={(e) => setCurrentData({ ...currentData, credit: e.target.value })}

                                className="mt-2 w-full block  placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:primary focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:primary/10"
                            />
                        </div>
                        <div className=" p-1  ">
                            <label htmlFor='startAt' className="block text-sm text-gray-500 dark:text-gray-300">Registration Start</label>
                            <input
                                type="date"
                                name="endAt"
                                defaultValue={currentData?.startAt}
                                onChange={(e) => setCurrentData({ ...currentData, startDate: e.target.value })}
                                placeholder="ends At"
                                className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />

                        </div>
                        <div className=" p-1  ">
                            <label htmlFor='startAt' className="block text-sm text-gray-500 dark:text-gray-300">Registration End</label>
                            <input
                                type="date"
                                name="endAt"
                                defaultValue={currentData?.endAt}
                                onChange={(e) => setCurrentData({ ...currentData, endDate: e.target.value })}
                                placeholder="ends At"
                                className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />

                        </div>


                        <div className='col-span-2'>
                            <p className='text-dimText mb-4'> Description </p>
                            <textarea
                                rows={5}
                                defaultValue={currentData.description}
                                onChange={(e) => setCurrentData({ ...currentData, description: e.target.value })}
                                className='mt-2 w-full block  placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:primary focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:primary/10'
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