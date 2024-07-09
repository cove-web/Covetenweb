'use client'
import { db } from '@/firebase/fireabase.config';
import AuthConfig from '@/firebase/oauth.config';
import HandleFileUpload from '@/shared/HandleFileUpload';
import React, { useEffect, useRef, useState } from 'react';
import 'react-photo-view/dist/react-photo-view.css';
import { toast } from 'react-hot-toast';
import { saveAs } from 'file-saver';
import { v4 as uuidv4 } from 'uuid';

import { useManualQuery } from 'graphql-hooks';
import { useGqlClient } from '@/hooks/UseGqlClient';
import { useAuth } from '@/firebase/AuthProvider';
import { addDoc, collection, doc, getDoc, getDocs, Timestamp, arrayUnion, updateDoc, onSnapshot, setDoc } from "firebase/firestore";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { ImAttachment } from "react-icons/im";
import Link from 'next/link';
import { BsCloudDownload } from 'react-icons/bs';


interface Props {
    currentModule: string;
}




const ChatBody = ({ currentModule }: Props) => {

    //states
    const [messages, setMessages] = React.useState<any>([]);
    const [isReply, setIsReply] = useState(false)
    const [text, setText] = useState('')
    const [fileLinks, setFileLinks] = useState<any>('')
    const [uploading, setUploading] = useState(false);
    const [isSlideOverOpen, setIsSlideOverOpen] = useState(false)
    const [data, setData] = useState<any>(null)

    // refs
    const latestMessageRef = useRef(null)

    //hooks
    const { user }: { user: any } = useAuth()
    const { uploadFile } = HandleFileUpload()
    const client = useGqlClient();

    //quires 
    // const [getUserDataFn, userState] = useManualQuery(GET_MODULE_TICKETS, { client })




    useEffect(() => {

        if (currentModule) {
            getData()
        }
    }, [currentModule]);





    // creating chat in firebase if not exist
    const getData = async () => {
        const docRef = doc(db, "chats", currentModule);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const unsubscribe = onSnapshot(doc(db, "chats", currentModule), (doc) => {

                if (doc.exists()) {
                    setMessages(doc.data().messages)
                }

                return () => unsubscribe();
            });
        } else {
            await setDoc(doc(db, "chats", currentModule), { messages: [] });
        }

    }



    const handleSubmit = async (e: any) => {
        e.preventDefault()

        e.target.reset()

        if (text) {
            await updateDoc(doc(db, "chats", currentModule), {
                messages: arrayUnion({
                    id: uuidv4(),
                    text,
                    senderId: user?.email,
                    image: null,
                    senderName: user?.name,
                    date: Timestamp.now(),
                })
            })
            getData()
            setIsReply(false)
        }



    }



    // handling file upload
    const handleUploadImage = async (e: any) => {
        const files = e.target.files
        const filesArray = Array.from(files);

        uploadFiles(filesArray as File[])
    }


    // upload files
    const uploadFiles = async (files: File[]) => {
        setUploading(true)
        const filePromise = files.map(async (file) => {
            const data = await uploadFile(file, `${file.name}-${uuidv4()}`, "ChatImages");
            return data;

        });
        const fileLinks = await Promise.all(filePromise);
        if (fileLinks.length) {
            await updateDoc(doc(db, "chats", currentModule), {
                messages: arrayUnion({
                    id: uuidv4(),
                    text: "",
                    senderId: user?.email,
                    image: fileLinks,
                    senderName: user?.name,
                    date: Timestamp.now(),
                })
            })
            getData()
            setUploading(false)
            setIsReply(false)
        } else {
            setUploading(false)
            toast.error("Error uploading image")
        }

    }

    const handleDownload = (link: string, index: number) => {

        saveAs(link, 'image-' + index + '.png');
    };




    return (
        <div className="flex flex-col mt-16 flex-auto  h-full   bg-transparent pb-2">
            <div
                className="flex flex-col flex-auto flex-shrink-0  bg-white h-full "
            >
                <div className="flex flex-col h-full overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch mb-4  p-4">

                    <div className="flex flex-col h-full ">
                        <div className="grid grid-cols-1 gap-y-2">



                            {
                                messages.map((message: any) =>

                                    <div key={message?.id} className={` p-3 rounded-lg`}>
                                        <div className="w-full">

                                            <div
                                                ref={latestMessageRef}
                                                className="relative mr-3 text-sm py-2 px-4 shadow rounded-xl"
                                            >

                                                {
                                                    message?.image && message?.image?.map((image: any, i: number) => (


                                                        <div key={i} onClick={() => handleDownload(image, i)}>
                                                            {/* <img src={image} alt="" className='' /> */}
                                                            <Link href={image} target='_blank' key={i}>
                                                                <div
                                                                    style={{
                                                                        backgroundImage: `url(${'/assets/file.svg'})`,
                                                                        backgroundRepeat: 'no-repeat',
                                                                        backgroundPosition: 'center',

                                                                    }}
                                                                    className=' h-24 w-full text-xl bg-gray-100 flex items-center justify-center text-gray-800 font-semibold'>
                                                                    <BsCloudDownload />
                                                                </div>
                                                            </Link>
                                                            <p className='text-[10px] text-gray-600 mt-1'>send by {message?.senderName === user?.name || '' ? 'you' : message?.senderName} </p>
                                                        </div>


                                                    ))
                                                }
                                                {
                                                    message.text && <div>{message.text}
                                                        <p className='text-[10px] text-gray-600 mt-1'>send by {message?.senderName === user?.name ? 'you' : message?.senderName} </p>
                                                    </div>
                                                }


                                            </div>
                                        </div>
                                    </div>


                                )
                            }
                            {
                                uploading && (
                                    <div className="w-full p-3 rounded-lg">
                                        <div className="flex items-center justify-start flex-row-reverse">

                                            <div

                                                className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl"
                                            >
                                                <p>Uploading File....</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }





                        </div>
                    </div>

                </div>
                {/* send button input */}
                {
                    isReply &&

                    <>
                        <form onSubmit={handleSubmit} className=" h-full  sm:mb-0 relative">
                            {/* <p className='absolute z-50 bottom-0 right-0 text-xl'>
                                <RiDeleteBack2Fill />
                            </p> */}
                            <div className="relative flex border-none h-full">

                                <textarea rows={10} onChange={(e) => setText(e.target.value)} placeholder="Write your message!" className="w-full outline-none focus:outline-none focus:border-none focus:ring-0 h-28 text-gray-600 placeholder-gray-600 pl-12 bg-gray-100 border-none  rounded-md py-3" />
                                <div className="absolute right-0 items-center inset-y-0 pr-5 hidden sm:flex ">

                                    <div>


                                        <label htmlFor="dropzone-file" className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                                            <ImAttachment />



                                            <input onChange={handleUploadImage} id="dropzone-file" type="file" multiple className="hidden" />
                                        </label>
                                    </div>

                                    <button type="submit" className="inline-flex  items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 ml-2 transform rotate-90">
                                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                                        </svg>
                                    </button>

                                </div>
                            </div>

                        </form>
                    </>
                }
            </div >

            {
                !isReply &&
                <div className='w-full'>
                    <button onClick={() => setIsReply(!isReply)} className='border border-gray-700 px-8 py-2 rounded-full'>
                        Reply
                    </button>
                </div>
            }
        </div >
    );
};

export default ChatBody;