'use client'

import React, { useState } from 'react';
import { useGqlClient } from '@/hooks/UseGqlClient';
import { addVariables } from './Main';
import { v4 as uuidv4 } from 'uuid'
import HandleFileUpload from '@/shared/HandleFileUpload';
import Loading from '@/app/loading';
import toast from 'react-hot-toast';


interface IAddProductProps {
    setTab: (tab: number) => void
    addNewFn: (input: addVariables) => void

}


// component
const AddNew = ({
    addNewFn }: IAddProductProps) => {

    // states
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState<File | null>(null)
    const [uploading, setUploading] = useState(false)
    const [mode, setMode] = useState('')
    const [seats, setSeats] = useState(0)
    const [price, setPrice] = useState(0)
    const [credit, setCredit] = useState('')
    const [startAt, setStartAt] = useState('')
    const [endAt, setEndAt] = useState('')
    const [rating, setRating] = useState('')
    const [courseFor, setCourseFor] = useState('')
    const [selectedUrlType, setSelectedUrlType] = useState('url')
    const [document, setDocument] = useState<File | null>(null)
    const [duration, setDuration] = useState('')
    const [certification, setCertification] = useState('')
    const [accredited, setAccredited] = useState('')


    // hooks
    const { uploadFile } = HandleFileUpload()




    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let imageLink
        let documentLink
        if (image) {
            setUploading(true)
            imageLink = await uploadFile(image, `learn-${uuidv4()}`, 'Learn_Images')
            setUploading(false)
        }
        if (document && selectedUrlType === 'pdf') {
            setUploading(true)
            documentLink = await uploadFile(document, `learn-${uuidv4()}`, 'Learn_Documents')
            setUploading(false)
        } else {
            documentLink = url
        }
        const inputData = {
            title: title.toLowerCase(),
            description: description,
            url: documentLink || '',
            imageUrl: imageLink || '',
            mode: mode,
            seats: seats,
            price: price,
            credit: credit,
            startDate: startAt,
            endDate: endAt,
            rating: rating,
            courseFor: courseFor,
            accredited,
            certification,
            duration,
        }
        addNewFn(inputData)
    }



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



    if (uploading) return <Loading />

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
                                        defaultValue={url}
                                        onChange={(e) => setUrl(e.target.value)}

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
                                required
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
                        <div className=" p-1  col-span-2">
                            <label htmlFor="title" className="block  text-gray-700 text-sm mb-1">
                                Course For
                            </label>
                            <input
                                required
                                type="text"
                                defaultValue={courseFor}
                                onChange={(e) => setCourseFor(e.target.value)}

                                className="mt-2 w-full block  placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:primary focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:primary/10"
                            />
                        </div>
                        <div className="p-1  col-span-2">
                            <label htmlFor="title" className="block text-gray-700 text-sm mb-1">
                                Duration
                            </label>
                            <select
                                defaultValue={duration}
                                onChange={(e) => setDuration(e.target.value)}
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
                                defaultValue={certification}
                                onChange={(e) => setCertification(e.target.value)}
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
                                defaultValue={accredited}
                                onChange={(e) => setAccredited(e.target.value)}
                                className="mt-2 w-full block placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:primary focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:primary/10"
                            >
                                <option value="">Select</option>
                                <option value="national-accredited">National Accredited</option>
                                <option value="internationally-accredited">Internationally Accredited</option>
                            </select>
                        </div>
                        <div className=" p-1  col-span-2">
                            <label htmlFor="title" className="block  text-gray-700 text-sm mb-1">
                                rating
                            </label>
                            <input
                                required
                                type="text"
                                defaultValue={rating}
                                onChange={(e) => setRating(e.target.value)}

                                className="mt-2 w-full block  placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:primary focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:primary/10"
                            />
                        </div>
                        <div className=" p-1  col-span-2">
                            <label htmlFor="title" className="block  text-gray-700 text-sm mb-1">
                                Mode
                            </label>
                            <input
                                required
                                type="text"
                                defaultValue={mode}
                                onChange={(e) => setMode(e.target.value)}

                                className="mt-2 w-full block  placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:primary focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:primary/10"
                            />
                        </div>
                        <div className=" p-1  col-span-2">
                            <label htmlFor="title" className="block  text-gray-700 text-sm mb-1">
                                Seats
                            </label>
                            <input
                                required
                                type="text"
                                defaultValue={seats}
                                onChange={(e) => setSeats(parseInt(e.target.value))}

                                className="mt-2 w-full block  placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:primary focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:primary/10"
                            />
                        </div>
                        <div className=" p-1  col-span-2">
                            <label htmlFor="title" className="block  text-gray-700 text-sm mb-1">
                                Price
                            </label>
                            <input
                                required
                                type="text"
                                defaultValue={price}
                                onChange={(e) => setPrice(parseInt(e.target.value))}

                                className="mt-2 w-full block  placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:primary focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:primary/10"
                            />
                        </div>
                        <div className=" p-1  col-span-2">
                            <label htmlFor="title" className="block  text-gray-700 text-sm mb-1">
                                Credits
                            </label>
                            <input
                                required
                                type="text"
                                defaultValue={credit}
                                onChange={(e) => setCredit(e.target.value)}

                                className="mt-2 w-full block  placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:primary focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:primary/10"
                            />
                        </div>
                        <div className=" p-1  ">
                            <label htmlFor='startAt' className="block text-sm text-gray-500 dark:text-gray-300">Registration Start</label>
                            <input
                                type="date"
                                name="endAt"
                                defaultValue={startAt}
                                required
                                onChange={(e) => setStartAt(e.target.value)}
                                placeholder="ends At"
                                className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />

                        </div>
                        <div className=" p-1  ">
                            <label htmlFor='startAt' className="block text-sm text-gray-500 dark:text-gray-300">Registration End</label>
                            <input
                                type="date"
                                name="endAt"
                                required
                                defaultValue={endAt}
                                onChange={(e) => setEndAt(e.target.value)}
                                placeholder="ends At"
                                className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />

                        </div>


                        <div className='col-span-2'>
                            <p className='text-dimText mb-4'> Description </p>
                            <textarea
                                rows={5}
                                defaultValue={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className='mt-1 px-4 py-2 border border-gray-200 rounded-md w-full'
                            />
                        </div>

                    </div>
                    <div className='mt-6 '>

                        <button className='px-4 py-1.5 bg-primary text-white font-semibold'>Add New </button>
                    </div>
                </form >
            </div >

        </>

    );
};

export default AddNew;