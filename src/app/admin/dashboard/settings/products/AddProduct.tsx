"use client";

import React, { Fragment, useEffect, useState } from "react";

import Button from "@/components/Button";
import { addProductVariables } from "./Main";
import HandleFileUpload from "@/shared/HandleFileUpload";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { useGqlClient } from "@/hooks/UseGqlClient";
import { useQuery } from "graphql-hooks";
import PageTextEditor from "@/components/PageTextEditor";
import Loading from "@/app/loading";

interface IAddProductProps {
  setTab: (tab: number) => void;
  addNewProductFn: (input: addProductVariables) => void;
}

const GET_CATEGORY = `
query Categories($where: CategoryWhere) {
    categories(where: $where) {
      categoryHasChild {
        id
        name
      }
    }
  }`;

const AddProduct = ({ setTab, addNewProductFn }: IAddProductProps) => {
  // states
  const [selectedCategory, setSelectedCategory] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [file, setFile] = useState("");
  const [video, setVideo] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [sideImage, setSideImage] = useState<File | null>(null);
  const [featureEditorState, setFeatureEditorState] = useState("");
  const [uploading, setUploading] = useState(false);

  const [othersEditorState, setOthersEditorState] = useState("");

  // hooks
  const { uploadFile } = HandleFileUpload();
  const client = useGqlClient();

  //query
  const { data, loading } = useQuery(GET_CATEGORY, {
    client,
    variables: {
      where: {
        type: "PRODUCT",
      },
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setUploading(true);
    const imageLink = await uploadFile(
      image,
      `product-${uuidv4()}`,
      "product_Images"
    );
    const sideImageLink = await uploadFile(
      sideImage,
      `product-${uuidv4()}`,
      "product_Images"
    );
    setUploading(false);
    if (!imageLink)
      return toast.error("Something went wrong  please try again later ");

    const inputData = {
      title,
      shortDescription,
      video,
      file,
      features: JSON.stringify(featureEditorState),
      others: JSON.stringify(othersEditorState),
      image: imageLink,
      sideImage: sideImageLink,
      price,
      category: selectedCategory,
      IsApproved: true
    };

    addNewProductFn(inputData);
  };

  // Extract id and name
  const filteredCategory: { id: string; name: string }[] =
    data?.categories.reduce((result: any, category: any) => {
      const childCategories = category?.categoryHasChild;
      childCategories?.forEach((childCategory: any) => {
        result.push({ id: childCategory?.id, name: childCategory?.name });
      });
      return result;
    }, []);

  if (uploading) return <Loading />;

  return (
    <>
      <div className="min-h-screen">
        <form onSubmit={handleSubmit} className="bg-transparent">
          <div className="grid grid-cols-1 lg:grid-cols-2  gap-5">
            <div className=" p-1  col-span-2">
              <label
                htmlFor="title"
                className="block  text-gray-700 text-sm mb-1"
              >
                Product Name
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
            <div className=" p-1  col-span-2">
              <label
                htmlFor="title"
                className="block  text-gray-700 text-sm mb-1"
              >
                Price
              </label>
              <input
                required
                type="text"
                name="price"
                defaultValue={price}
                onChange={(e) => setPrice(parseInt(e.target.value))}
                placeholder="price"
                className="mt-2 w-full block  placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:primary focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:primary/10"
              />
            </div>
            <div className=" p-1  col-span-2">
              <label
                htmlFor="title"
                className="block  text-gray-700 text-sm mb-1"
              >
                Video Url
              </label>
              <input
                type="text"
                name="video url"
                defaultValue={video}
                onChange={(e) => setVideo(e.target.value)}
                placeholder="video"
                className="mt-2 w-full block  placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:primary focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:primary/10"
              />
            </div>
            <div className=" p-1 r col-span-2">
              <label
                htmlFor="title"
                className="block  text-gray-700 text-sm mb-1"
              >
                File Url
              </label>
              <input
                type="text"
                name="file"
                defaultValue={file}
                onChange={(e) => setFile(e.target.value)}
                placeholder="file url"
                className="mt-2 w-full block  placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:primary focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:primary/10"
              />
            </div>
            <div className="mb-5  w-full">
              <label
                htmlFor="title"
                className="block  text-gray-700 text-sm mb-1"
              >
                Category
              </label>
              <div className="relative inline-flex w-full">
                <select
                  required
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  name="category"
                  className="mt-1 px-4 py-2 border border-gray-200 rounded-md w-full"
                >
                  <option disabled defaultChecked value="">
                    Select Category
                  </option>
                  {filteredCategory &&
                    filteredCategory?.map((cat: any, idx: number) => (
                      <option key={cat?.id} value={cat?.id}>
                        {cat?.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className=" p-1  col-span-2">
              <label
                htmlFor="title"
                className="block  text-gray-700 text-sm mb-1"
              >
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
              <label
                htmlFor="title"
                className="block  text-gray-700 text-sm mb-1"
              >
                Image
              </label>
              <input
                required
                type="file"
                name="Image2"
                onChange={(e) => {
                  if (e?.target?.files && e.target.files.length > 0) {
                    setSideImage(e.target.files[0]);
                  }
                }}
                placeholder="Image"
                className="mt-2 w-full block  placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:primary focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:primary/10"
              />
            </div>
            <div className=" p-1 flex items-center col-span-2">
              <textarea
                required
                rows={5}
                defaultValue={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                name="sDescription"
                placeholder="short description"
                className="mt-2 w-full block  placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:primary focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:primary/10"
              />
            </div>
            <div className="col-span-2">
              <p className="text-dimText mb-4"> Features </p>
              <PageTextEditor
                setEditorState={setFeatureEditorState}
                editorState={featureEditorState}
              />
            </div>
            <div className="col-span-2">
              <p className="text-dimText mb-4"> Others </p>
              <PageTextEditor
                setEditorState={setOthersEditorState}
                editorState={othersEditorState}
              />
            </div>
          </div>
          <div className="mt-6 ">
            <button className="px-4 py-1.5 bg-primary text-white font-semibold">
              Add New Product
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddProduct;
