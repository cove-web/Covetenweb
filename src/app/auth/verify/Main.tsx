"use client";

import AnimatedButton from "@/components/AnimatedButton";
import AuthConfig from "@/firebase/oauth.config";
import { useGqlClient } from "@/hooks/UseGqlClient";
import HandleFileUpload from "@/shared/HandleFileUpload";
import { useMutation } from "graphql-hooks";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";
import Dropzone, { useDropzone } from "react-dropzone";
import { v4 as uuidv4 } from "uuid";
import { HiOutlineTrash } from "react-icons/hi";
import FilePreview from "@/app/vendor/dashboard/projects/(components)/FilePreview";
import Loading from "@/app/loading";
import emailFormate from "./emailFormate";

const VERIFY_USER = `
mutation UpdateUsers($update: UserUpdateInput, $where: UserWhere) {
    updateUsers(update: $update, where: $where) {
      info {
        nodesCreated
        nodesDeleted
        relationshipsCreated
      }
    }
  }
`;

// component
const Main = () => {
  // states
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [email, setEmail] = useState<string>("");
  const [isCustomEmail, setIsCustomEmail] = useState<boolean>(true);

  //hooks
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();

  const client = useGqlClient();
  const { user } = AuthConfig();
  const router = useRouter();
  const { uploadFile } = HandleFileUpload();

  // updating the user node
  const [updateUserFn, state] = useMutation(VERIFY_USER, { client });

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
  const updateUser = async (data: any) => {
    if (files.length) {
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
          setUploading(false);
          const { data: updateData } = await updateUserFn({
            variables: {
              update: {
                companyEmail: email,
                companyName: data.companyName.toLowerCase(),
                gstNumber: data.registrationNumber,
                hasDocuments: {
                  create: {
                    node: {
                      hasFiles: {
                        create: {
                          node: {
                            links: uploadedFilesData,
                          },
                        },
                      },
                    },
                  },
                },
              },
              where: {
                email: user?.email,
              },
            },
          });

          if (updateData.updateUsers.info.nodesCreated) {
            toast.success("Please wait for the admin to verify your account");
            router.push("/");
            sendEmail();
          }
        } else {
          setUploading(false);
        }
      } catch (error) {
        console.error("Error uploading files:", error);
      }
    } else {
      toast.error("Please upload a file");
    }
  };

  // send email
  const sendEmail = async () => {
    const res = await fetch("/api/sendEmail", {
      method: "POST",
      body: JSON.stringify({
        to: email,
        subject: "Account Verification",
        html: emailFormate,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  useEffect(() => {
    const domain = email.split("@")[1];
    const yahooDomains = ["yahoo.com", "ymail.com", "rocketmail.com"];
    const hotmailDomains = [
      "hotmail.com",
      "outlook.com",
      "live.com",
      "msn.com",
    ];
    const gmailDomain = "gmail.com";

    if (
      yahooDomains.includes(domain) ||
      hotmailDomains.includes(domain) ||
      domain === gmailDomain
    ) {
      setIsCustomEmail(false);
    } else {
      setIsCustomEmail(true);
    }
  }, [email]);

  if (state.loading || uploading) return <Loading />;

  return (
    <>
      <form onSubmit={handleSubmit(updateUser)} id="form" className=" ">
        <div className="">
          <div className="w-full mb-1">
            <label className=" text-gray-500 ">Company Name<span className="text-red-500">*</span></label>
            <input
              type="text"
              required
              {...register("companyName")}
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border border-gray-300 focus:border-primary shadow-sm rounded"
            />
          </div>
          <div>
            <label className=" text-gray-500">Company Email<span className="text-red-500">*</span></label>
            <input
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border border-gray-300 focus:border-primary shadow-sm rounded"
            />
          </div>

          {/* <div>
            <label className=" text-gray-500">GST Number<span className="text-red-500">*</span></label>
            <input
              type="text"
              required
              {...register("registrationNumber", {
                required: true,
                minLength: 15,
                maxLength: 15,
              })}
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border border-gray-300 focus:border-primary shadow-sm rounded"
            />
            {errors.registrationNumber && (
              <p className="text-red-500 text-xs">
                GST Number must be 15 characters<span className="text-red-500">*</span>
              </p>
            )}
          </div> */}
          <div>
  <label className="text-gray-500">
    GST Number<span className="text-red-500">*</span>
  </label>
  <input
    type="text"
    required
    maxLength="15"
    {...register("registrationNumber", {
      required: true,
      minLength: 15,
      maxLength: 15,
      validate: (value) => {
        const isValidLength = value.length === 15;
        const firstTwoCharsAreDigits = /^\d{2}/.test(value);
        const nextTenCharsArePan = /^[A-Z]{5}[0-9]{4}[A-Z]{1}/.test(value.slice(2, 12));
        const thirteenthCharValid = /^[0-9A-Z]$/.test(value[12]);
        const fourteenthCharIsZ = value[13] === 'Z';
        const fifteenthCharValid = /^[0-9A-Z]$/.test(value[14]);
        
        if (!isValidLength) {
          return "GST Number must be exactly 15 characters";
        }
        if (!firstTwoCharsAreDigits) {
          return "The first 2 characters must be digits";
        }
        if (!nextTenCharsArePan) {
          return "The next 10 characters must be a valid PAN format (5 letters, 4 digits, 1 letter)";
        }
        if (!thirteenthCharValid) {
          return "The 13th character must be a digit or an alphabet";
        }
        if (!fourteenthCharIsZ) {
          return "The 14th character must be 'Z'";
        }
        if (!fifteenthCharValid) {
          return "The 15th character must be a digit or an alphabet";
        }
        
        return true;
      }
    })}
    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border border-gray-300 focus:border-primary shadow-sm rounded"
  />
  {errors.registrationNumber && (
    <p className="text-red-500 text-xs">
      {errors.registrationNumber.message}<span className="text-red-500">*</span>
    </p>
  )}
</div>

          <div className="col-span-2">
            <label className=" text-gray-500">Documents<span className="text-red-500">*</span></label>
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
                        Upload or darg & drop your file Images, doc, pdf, excel{" "}
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
          <div className="col-span-2 mt-8 ">
            <AnimatedButton title="Submit" />
          </div>
        </div>

        {/* <Toaster
                position="top-center"
                reverseOrder={false}
            /> */}
      </form>

      {/* <p onClick={sendEmail} className="bg-red-900 px-4 py-5">
        send
      </p> */}
    </>
  );
};

export default Main;
