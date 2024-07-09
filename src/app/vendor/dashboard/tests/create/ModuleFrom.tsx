'use client'


import React, { useCallback, useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';
import { useForm, SubmitHandler } from "react-hook-form"
import { IModuleInput } from './createProject.interface';
import { HiOutlineTrash } from 'react-icons/hi';
import FilePreview from '@/app/vendor/dashboard/projects/(components)/FilePreview';

//interface props
interface IModuleFrom {
    index: number
    modules: any[]
    setModules: (modules: any[]) => void
}



//component
const ModuleFrom = ({ index, setModules, modules }: IModuleFrom) => {


    //states
    const [files, setFiles] = useState<any[]>([]);
    const [title, setTitle] = useState<string>('');



    // hook from 
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<any>()


    // current module index
    const moduleIndex = modules.findIndex(module => module.hasOwnProperty(`moduleTitle${index}`));






    // setting the module data
    const handleModule: SubmitHandler<any> = (data) => {
        //getting the dynamic data
        const title = data[`moduleTitle${index}`];
        const description = data[`moduleDescription${index}`];


        // checking if all data is present
        if (title && description) {
            const moduleData: IModuleInput = {
                title,
                description,
                documents: {
                    files: files,
                    images: []

                }
            };

            // checking if the module is already present
            const moduleIndex = modules.findIndex(module => module.hasOwnProperty(`moduleTitle${index}`));

            // updating the module
            if (moduleIndex !== -1) {
                const updatedModules = [...modules];
                updatedModules[moduleIndex][`moduleTitle${index}`] = moduleData;
                setModules(updatedModules);
            } else {
                const newModule = {
                    [`moduleTitle${index}`]: moduleData
                };
                setModules([...modules, newModule]);
            }
        }
    };

    // updating the module data when files are added
    useEffect(() => {
        if (moduleIndex !== -1 && files.length) {
            const updatedModules = [...modules];
            updatedModules[moduleIndex][`moduleTitle${index}`].documents.files = files;
        }

    }, [files.length, moduleIndex])


    //handlers
    const handleDrop = useCallback((acceptedFiles: File[]) => {
        setFiles(prevFiles => [...prevFiles, ...acceptedFiles]);
    }, [setFiles]);

    const handleRemove = useCallback((index: number) => {
        setFiles(prevFiles => {
            const newFiles = [...prevFiles];
            newFiles.splice(index, 1);
            return newFiles;
        });
    }, [setFiles]);
    return (
        <form onChange={handleSubmit(handleModule)}>
            <div className="">
                <label htmlFor="address">Module-{index}</label>
                <input type="text" id="address" className="h-10 border border-gray-300 mt-1 rounded px-4 w-full " placeholder=""   {...register(`moduleTitle${index}`)} />
            </div>

            <div className="">
                <label htmlFor="city">Description</label>
                <textarea rows={4} id="city" className=" border border-gray-300 mt-1 rounded px-4 w-full " placeholder="" {...register(`moduleDescription${index}`)} />
            </div>
            <div>

                <Dropzone maxSize={10485760}

                    onDrop={handleDrop}>
                    {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()}>
                            <label
                                htmlFor="dropzone-file"
                                className="flex flex-col items-center w-full  p-5 mx-auto mt-2 text-center bg-white border-2 border-gray-300 border-dashed cursor-pointer dark:bg-gray-900 dark:border-gray-700 rounded-xl"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-8 h-8 text-gray-500 dark:text-gray-400"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                                    />
                                </svg>

                                <h2 className="mt-1 font-medium tracking-wide text-gray-700 dark:text-gray-200">
                                    Upload Files
                                </h2>

                                <p className="mt-2 text-xs tracking-wide text-gray-500 dark:text-gray-400">
                                    Upload or darg & drop your file Images, doc, pdf, excel{' '}
                                </p>

                                <input {...getInputProps()}
                                    accept=".pdf, .docx, .doc, .xlsx, .xls, image/*"
                                    {...register(`file`)}
                                />
                            </label>
                        </div>
                    )}
                </Dropzone>

                <div className="border-0 flex flex-wrap mt-2">
                    {files.map((file, index) => (
                        <div key={file.name} className="border-0 w-40 h-40 m-1 relative bg-gray-300 " >

                            {
                                file.type === 'application/pdf' ?
                                    <FilePreview name={file.name} />
                                    :

                                    file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                                        || file.type === 'application/msword'
                                        ?
                                        <FilePreview name={file.name} />
                                        :
                                        file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.type === 'application/vnd.ms-excel'
                                            ?
                                            <FilePreview name={file.name} />
                                            :
                                            file.type.startsWith('image/')
                                                ?
                                                <img //eslint-disable-line
                                                    src={URL.createObjectURL(file)}
                                                    alt={file.name}
                                                    className="w-full h-full object-cover"
                                                />
                                                :
                                                <div className="absolute top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center rounded-xl">
                                                    Invalid File
                                                </div>


                            }


                            <button
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-2"
                                onClick={() => handleRemove(index)}
                            >
                                <HiOutlineTrash className="text-lg" />
                            </button>
                        </div>
                    ))}
                </div>

            </div>
        </form>
    );
};

export default ModuleFrom;