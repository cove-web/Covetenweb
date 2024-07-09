"use client";
import { Fragment, useCallback, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useGqlClient } from "@/hooks/UseGqlClient";
import { useMutation, useQuery } from "graphql-hooks";
import Dropzone, { useDropzone } from "react-dropzone";
import { v4 as uuidv4 } from "uuid";

import { HiOutlineDocumentDownload, HiOutlineTrash } from "react-icons/hi";
import Link from "next/link";
import Loading from "@/app/loading";
import Image from "next/image";
import { MdDelete } from "react-icons/md";
import FilePreview from "./FilePreview";
import HandleFileUpload from "@/shared/HandleFileUpload";
import { toast } from "react-hot-toast";

//props interface
interface IUserModalProps {
  isDocModalOpen: boolean;
  setIsDocModalOpen: (value: boolean) => void;
  currentModuleId?: string;
  updateModule?: any;
}

const UPDATE_MODULE_REPORT = `
mutation Mutation($where: ModuleTicketWhere, $update: ModuleTicketUpdateInput) {
    updateModuleTickets(where: $where, update: $update) {
      moduleTickets {
        id
      }
    }
  }

`;

//component
function UploadDocModal({
  setIsDocModalOpen,
  isDocModalOpen,
  currentModuleId,
  updateModule,
}: IUserModalProps) {
  // states
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  //hooks
  const client = useGqlClient();
  const { uploadFile } = HandleFileUpload();

  // fetching data
  const [updateModuleReportFn, updateStatus] = useMutation(
    UPDATE_MODULE_REPORT,
    { client }
  );

  //handle close modal
  function closeModal() {
    setIsDocModalOpen(false);
  }

  // handling files
  const handleDrop = useCallback(
    (acceptedFiles: File[], fileRejections: any) => {
      // Handle accepted files
      setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);

      // Handle rejected files (due to size or other reasons)
      if (fileRejections.length > 0) {
        const fileSizeError = fileRejections.some(
          (file: any) => file.file.size > 1 * 1024 * 1024
        );
        if (fileSizeError) {
          setError(
            "File size is too large. Please select files smaller than 10MB."
          );
        } else {
          setError("Please check the file types or try again.");
        }
      } else {
        setError("");
      }
    },
    []
  );

  const handleRemove = useCallback(
    (index: number) => {
      setFiles((prevFiles) => {
        const newFiles = [...prevFiles];
        newFiles.splice(index, 1);
        return newFiles;
      });
    },
    [setFiles]
  );

  //uploading files to firebase and change the status of the module
  const handleUpload = async () => {
    if (!files.length) {
      toast.error("Please select a file");
      return;
    }

    setUploading(true);
    const uploadPromises = files.map(async (file) => {
      const data = await uploadFile(
        file,
        `${file.name}-${uuidv4()}`,
        "ModuleReports"
      );
      return data;
    });

    try {
      const uploadedFilesData = await Promise.all(uploadPromises);
      if (uploadedFilesData) {
        const { data } = await updateModuleReportFn({
          variables: {
            where: {
              id: currentModuleId,
            },
            update: {
              reports: uploadedFilesData,
            },
          },
        });

        if (data.updateModuleTickets.moduleTickets.length) {
          updateModule("UNDER_REVIEW", currentModuleId);
          closeModal();
          setUploading(false);
        }
      }
    } catch (error) {
      console.error("Error uploading files:", error);
      setUploading(false);
    }
  };

  if (uploading) return <Loading />;

  //render
  return (
    <div>
      <Transition.Root show={isDocModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-[120000000000] inset-0 overflow-y-auto"
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
              <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full sm:p-6">
                <p className="focus:outline-none pt-4 pb-8 text-base text-center sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
                  Module Details
                </p>
                <div className="">
                  <p className="text-red-500 font-semibold text-center">
                    {error}
                  </p>

                  <div>
                    <div>
                      <Dropzone maxSize={10485760} onDrop={handleDrop}>
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
                                Upload or darg & drop your file Images, doc,
                                pdf, excel{" "}
                              </p>

                              <input
                                {...getInputProps()}
                                accept=".pdf, .docx, .doc, .xlsx, .xls, image/*"
                              />
                            </label>
                          </div>
                        )}
                      </Dropzone>

                      <div className="border-0 flex flex-wrap mt-2">
                        {files.map((file, index) => (
                          <div
                            key={file.name}
                            className="border-0 w-40 h-40 m-1 relative bg-gray-300 "
                          >
                            {file.type === "application/pdf" ? (
                              <FilePreview name={file.name} />
                            ) : file.type ===
                                "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
                              file.type === "application/msword" ? (
                              <FilePreview name={file.name} />
                            ) : file.type ===
                                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
                              file.type === "application/vnd.ms-excel" ? (
                              <FilePreview name={file.name} />
                            ) : file.type.startsWith("image/") ? (
                              <img //eslint-disable-line
                                src={URL.createObjectURL(file)}
                                alt={file.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="absolute top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center rounded-xl">
                                Invalid File
                              </div>
                            )}

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

                  <div className="mt-10">
                    <button
                      onClick={handleUpload}
                      type="button"
                      className="ml-2 px-4 py-2 bg-primary text-white  "
                    >
                      {uploading ? "Uploading..." : "Upload"}
                    </button>
                    <button
                      type="button"
                      className="ml-2 px-4 py-2 text-gray-500  hover:bg-gray-200"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}

export default UploadDocModal;
