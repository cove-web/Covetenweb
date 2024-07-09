"use client";
import { db } from "@/firebase/fireabase.config";
import AuthConfig from "@/firebase/oauth.config";
import HandleFileUpload from "@/shared/HandleFileUpload";
import { Timestamp, arrayUnion, doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { toast } from "react-hot-toast";
import { saveAs } from "file-saver";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "@/firebase/AuthProvider";
interface Props {
  messages: any[];
  currentModule: string;
}

const ChatBody = ({ messages, currentModule }: Props) => {
  //states
  const [onClose, setOnClose] = useState(false);
  const [text, setText] = useState("");
  const [fileLinks, setFileLinks] = useState<any>("");
  const [uploading, setUploading] = useState(false);

  // refs
  const latestMessageRef = useRef(null);

  //hooks
  const { user }: { user: any } = useAuth();
  const { uploadFile } = HandleFileUpload();

  // handling scroll to the latest message
  useEffect(() => {
    if (latestMessageRef.current) {
      // @ts-ignore
      latestMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    e.target.reset();

    if (text) {
      await updateDoc(doc(db, "chats", currentModule), {
        messages: arrayUnion({
          id: uuidv4(),
          text,
          senderId: user?.email,
          image: null,
          senderName: user?.name,
          date: Timestamp.now(),
        }),
      });
    }
  };

  // handling file upload
  const handleUploadImage = async (e: any) => {
    const files = e.target.files;
    const filesArray = Array.from(files);

    uploadFiles(filesArray as File[]);
  };

  // upload files
  const uploadFiles = async (files: File[]) => {
    setUploading(true);
    const filePromise = files.map(async (file) => {
      const data = await uploadFile(
        file,
        `${file.name}-${uuidv4()}`,
        "ChatImages"
      );
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
        }),
      });
      setUploading(false);
    } else {
      setUploading(false);
      toast.error("Error uploading image");
    }
  };

  const handleDownload = (link: string, index: number) => {
    saveAs(link, "image-" + index + ".png");
  };

  return (
    <div className="flex flex-col flex-auto h-full px-6">
      <div className="flex flex-col flex-auto flex-shrink-0 rounded-lg bg-transprent h-full lg:max-h-[85vh]">
        <div
          onClick={() => setOnClose(true)}
          className="bg-transprent shadow-sm px-4 py-5 rounded-lg flex items-center"
        >
          <p className="bg-green-500 w-3 h-3 rounded-full mr-2"></p>
          <p className="font-bold"                 style={{color:'white'}}
> #{currentModule}</p>
        </div>
        {/* <Scrollbars style={{ width: 500, height: 300 }}>
            ehllo
        </Scrollbars> */}
        <div className="flex flex-col h-full overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch mb-4  p-4">
          {/* <Scrollbars style={{ width: 500, height: 300 }}> */}
          <div className="flex flex-col h-full ">
            <div className="grid grid-cols-12 gap-y-2">
              {messages.map((message: any) => (
                <div
                  key={message?.id}
                  className="col-start-6 col-end-13 p-3 rounded-lg"
                >
                  <div className="flex items-center justify-start flex-row-reverse">
                    <div
                                    style={{color:'white'}}

                      className={`${message.senderId === user?.email
                        ? "bg-gray-600"
                        : "bg-primary"
                        }
                        
                                                flex items-center justify-center h-10 w-10 rounded-full  text-white font-bold flex-shrink-0`}
                    >
                      {message.senderId === user?.email
                        ? user?.email?.slice(0, 1).toUpperCase()
                        : "V"}
                    </div>
                    <div
                      ref={latestMessageRef}
                      style={{color:'white'}}

                      className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl"
                    >
                      {message?.image &&
                        message?.image?.map((image: any, i: number) => (
                          <div key={i} onClick={() => handleDownload(image, i)}>
                            <img src={image} alt="" className="" />
                          </div>
                        ))}
                      {message.text && <div>{message.text}</div>}
                    </div>
                  </div>
                </div>
              ))}
              {uploading && (
                <div className="col-start-6 col-end-13 p-3 rounded-lg">
                  <div className="flex items-center justify-start flex-row-reverse">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-white font-bold flex-shrink-0">
                      {user?.email?.slice(0, 1).toUpperCase()}
                    </div>
                    <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                      <p>Uploading Image....</p>
                    </div>
                  </div>
                </div>
              )}

              {!messages.length && (
                <div className="col-start-6 col-end-13 p-3 rounded-lg flex items-center justify-center">
                  <p                 style={{color:'white'}}
>No messages yet</p>
                </div>
              )}
            </div>
          </div>
          {/* </Scrollbars> */}
        </div>
        {/* send button input */}
        <form onSubmit={handleSubmit} className=" px-4  h-16   sm:mb-0 ">
          <div className="relative flex border-none">
            <input
              onChange={(e) => setText(e.target.value)}
              type="text"
              style={{color:'white'}}

              placeholder="Write your message!"
              className="w-full outline-none focus:outline-none focus:border-none focus:ring-0 text-gray-600 placeholder-gray-600 pl-12 bg-primary/20 border-none shadow-md rounded-md py-3"
            />
            <div className="absolute right-0 items-center inset-y-0 pr-5 hidden sm:flex ">
              <div>
                <label
                  htmlFor="dropzone-file"
                  className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
                >
                  {/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-6 w-6 text-gray-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg> */}
                  <svg className="mail-attachment-label-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.438 11.662l-9.19 9.19a6.003 6.003 0 11-8.49-8.49l9.19-9.19a4.002 4.002 0 015.66 5.66l-9.2 9.19a2.001 2.001 0 11-2.83-2.83l8.49-8.48" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>

                  <input
                    onChange={handleUploadImage}
                    id="dropzone-file"
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                  />
                </label>
              </div>
              <button
                type="submit"
                className="inline-flex  items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-6 w-6 ml-2 transform rotate-90"
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                </svg>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatBody;
