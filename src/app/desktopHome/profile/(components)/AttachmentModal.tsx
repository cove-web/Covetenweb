'use client'
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import Dropzone, { useDropzone } from 'react-dropzone';
import { BiMessageSquareEdit } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import { useGqlClient } from '@/hooks/UseGqlClient';
import { useMutation } from 'graphql-hooks';
import AuthConfig from '@/firebase/oauth.config';
import { toast } from 'react-hot-toast';
import Loading from '@/app/loading';
import { useAuth } from '@/firebase/AuthProvider';
import { Dialog, Transition } from '@headlessui/react';
import { HiOutlineTrash } from 'react-icons/hi';
import FilePreview from '@/app/desktop_vendor/dashboard/projects/(components)/FilePreview';
import HandleFileUpload from '@/shared/HandleFileUpload';
import { v4 as uuidv4 } from 'uuid'


const UPDATE_USER = `mutation UpdateUsers($where: UserWhere, $update: UserUpdateInput) {
    updateUsers(where: $where, update: $update) {
      info {
        nodesCreated
      }
    }
  }`



// component
const AttachmentModal = ({ isModalOpen, setIsModalOpen, getUser, oldData }: any) => {
    // states
    const [files, setFiles] = useState<File[]>([]);
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false)


    // hooks
    const client = useGqlClient()
    const { user } = useAuth()
    const { uploadFile } = HandleFileUpload()


    const [updateUserFn, updateUserState] = useMutation(UPDATE_USER, { client })


    const addEquipment = async (e: any) => {

        e.preventDefault()
        let docLinks: any
        let allLinks: any



        if (files.length > 0) {
            setLoading(true)

            docLinks = await Promise.all(files?.map(async (item: any) => {
                const link = await uploadFile(item, uuidv4(), 'user-documents')
                return link
            }))
            setLoading(false)
        } else {
            setLoading(false)
            docLinks = []
            toast.error('Please upload at least one document')
            return
        }


        if (docLinks?.length === 0) {
            toast.error('Please upload at least one document')
            return
        }

        if (oldData.length > 0) {
            allLinks = [...oldData, ...docLinks]
        } else {
            allLinks = [...docLinks]
        }




        const { data: updateDta } = await updateUserFn({
            variables: {
                "where": {
                    "email": user?.email
                },

                "update": {
                    "isClient": {
                        "update": {
                            "node": {
                                "equipmentDocs": allLinks
                            }
                        }
                    }
                }
            }
        })



        if (updateDta?.updateUsers) {
            toast.success(' added successfully ')
            getUser()
            setIsModalOpen(false)



        }
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }







    const handleDrop = useCallback((acceptedFiles: File[], fileRejections: any) => {
        // Handle accepted files
        setFiles(prevFiles => [...prevFiles, ...acceptedFiles]);

        // Handle rejected files (due to size or other reasons)
        if (fileRejections.length > 0) {
            const fileSizeError = fileRejections.some((file: any) => file.file.size > 1 * 1024 * 1024);
            if (fileSizeError) {
                setError('File size is too large. Please select files smaller than 10MB.');
            } else {
                setError('Please check the file types or try again.');
            }
        } else {
            setError('')
        }
    }, []);

    const handleRemove = useCallback((index: number) => {
        setFiles(prevFiles => {
            const newFiles = [...prevFiles];
            newFiles.splice(index, 1);
            return newFiles;
        });
    }, [setFiles]);









    if (updateUserState.loading || loading) {
        return <Loading />
    }

    // render
    return (
        <Transition.Root show={isModalOpen} as={Fragment}>
            <Dialog
                as="div"
                className="fixed z-[1000000000000005] inset-0 overflow-y-auto"
                onClose={closeModal}
            >
                <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />
                    </Transition.Child>

                    <span
                        className="hidden sm:inline-block sm:align-middle sm:h-screen"
                        aria-hidden="true"
                    >
                        &#8203;
                    </span>

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >

                        <div className="inline-block  align-bottom bg-white rounded-lg px-4 pt-5 pb-7 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full sm:p-8">
                            <p className="focus:outline-none pt-4 pb-8 text-base text-center sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800 border-b mb-7">Add New Attachment</p>

                            <div className='p-8'>
                                <div className='w-full h-full'>
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
                                                            Documents: Accreditation body and other Certifications{' '}
                                                        </p>

                                                        <input {...getInputProps()}

                                                            accept=".pdf, .docx, .doc, .xlsx, .xls, image/*" />
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
                                </div>
                            </div>

                            <button onClick={addEquipment} className='px-8 py-2 bg-desktopPrimary text-white rounded-md'>Submit</button>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default AttachmentModal;