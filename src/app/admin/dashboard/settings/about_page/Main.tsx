'use client'

import React, { useState, useCallback, useEffect } from 'react';
import { useGqlClient } from '@/hooks/UseGqlClient';
import { useMutation, useQuery } from 'graphql-hooks';
import Loading from '@/app/loading';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import HandleFileUpload from '@/shared/HandleFileUpload';
import { v4 as uuidv4 } from 'uuid';

import slugify from 'slugify';
import deleteImage from '@/shared/deleteImage';
import PageTextEditor from '@/components/PageTextEditor';

const GET_PREVIOUS_ABOUT_US = `
query AboutPages {
    aboutPages {
      id
      title
      image
      description
      count
      ctext
      hoadsimg
      hadstitle
      hadsdesc
      btadsdesc
      btadstitle
      productsastitle
      productsasdesc
      producthoradstitle
      worksSpace
      differentt
      website
    }
  }
`

const UPDATE_ABOUT_US = `
mutation UpdateAboutPages($update: AboutPageUpdateInput) {
    updateAboutPages(update: $update) {
      aboutPages {
        id
      }
    }
  }
`

// COMPONENT
const Main = () => {

    // states
    const [imageUploading, setImageUploading] = useState(false);
    const [title, setTitle] = useState('');
    const [image, setImage] = useState<any>(null);
    const [hoadsimg, setHoadsimg] = useState<any>(null);
    const [count, setCount] = useState('');
    const [worksSpace,setWorksSpace] = useState('');
    const [website,setWebsite] = useState('');
    const [differentt, setDifferentt] = useState('');
    const [editorState, setEditorState] = useState("");
    const [ctext, setCtext] = useState('');
    const [hadstitle, setHadstitle] = useState('');
    const [hadsdesc, setHadsdesc] = useState('');
    const [btadstitle,setBtadstitle] = useState('')
    const [btadsdesc, setBtadsdesc] = useState('')
    const [productsastitle,setProductsastitle]=useState('')
    const [productsasdesc,setProductsasdesc] = useState('')
    const [producthoradstitle,setProducthoradstitle] = useState('')

    // hooks
    const client = useGqlClient();
    const router = useRouter();
    const { uploadFile } = HandleFileUpload();

    // QUERY
    const { data: previousData, loading } = useQuery(GET_PREVIOUS_ABOUT_US, { client });

    // mutation query
    const [updateAboutPageFn, updateState, resetFn] = useMutation(UPDATE_ABOUT_US, { client });

    // initializing the communication creation
    const updateAboutPage = async () => {
        let imageLink = null;
        if (image) {
            setImageUploading(true);
            imageLink = await handleImageUpload(image);
            setImageUploading(false);
        }

        if (imageLink && previousData?.aboutPages[0]?.image) {
            deleteImage(previousData?.aboutPages[0]?.image);
        }

        let hoadsimgLink = null;
        if (hoadsimg) {
            setImageUploading(true);
            hoadsimgLink = await handleImageUpload(hoadsimg);
            setImageUploading(false);
        }

        if (hoadsimgLink && previousData?.aboutPages[0]?.hoadsimg) {
            deleteImage(previousData?.aboutPages[0]?.hoadsimg);
        }

        
        const contentString = JSON.stringify(editorState);

        let { data } = await updateAboutPageFn({
            variables: {
                "update": {
                    "title": title,
                    "image": imageLink || previousData?.aboutPages[0]?.image,
                    "description": contentString,
                    "count": count,
                    "ctext": ctext,
                    "hoadsimg": hoadsimgLink || previousData?.aboutPages[0]?.hoadsimg,
                    "hadstitle":hadstitle,
                    "hadsdesc":hadsdesc,
                    "btadsdesc":btadsdesc,
                    "btadstitle":btadstitle,
                    "productsastitle":productsastitle,
                    "productsasdesc":productsasdesc,
                    "producthoradstitle":producthoradstitle,
                    "worksSpace":worksSpace,
                    "differentt":differentt,
                    "website":website


                }
            }
        });

        if (data?.updateAboutPages?.aboutPages[0]?.id) {
            toast.success("Updated successfully");
            // router.push('/admin/dashboard/settings/about_page')
        }
    }

    // starts the communication creation
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await updateAboutPage();
        resetFn();
    }

    useEffect(() => {
        if (previousData?.aboutPages?.length) {
            const { title, image, description, count, ctext, hoadsimg ,hadstitle,hadsdesc,btadstitle,btadsdesc,productsastitle,productsasdesc,producthoradstitle,worksSpace,website,differentt} = previousData.aboutPages[0];
            setTitle(title);
            setCount(count);
            setCtext(ctext);
            setEditorState(JSON.parse(description));
            setHoadsimg(hoadsimg);
            setHadstitle(hadstitle);
            setHadsdesc(hadsdesc);
            setBtadsdesc(btadsdesc);
            setBtadstitle(btadstitle);
            setProductsastitle(productsastitle);
            setProductsasdesc(productsasdesc);
            setProducthoradstitle(producthoradstitle);
            setWorksSpace(worksSpace);
setDifferentt(differentt);
setWebsite(website);

        }
    }, [previousData]);

    // handle image upload to firebase
    async function handleImageUpload(file: any) {
        const res = await uploadFile(file, `${file?.name}-${uuidv4()}`, "About_images");
        return res;
    }

    if (updateState.loading || imageUploading) return <Loading />;

    // render
    return (
        <form onSubmit={handleSubmit} className='bg-white rounded p-5'>
            <div className="mb-5">
                <label htmlFor="title" className="block text-gray-700 text-sm mb-1">
                    Title
                </label>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    className="mt-1 px-4 py-2 border border-gray-200 rounded-md w-full"
                />
            </div>

            <div className="mb-5">
                <label htmlFor="image" className="block text-gray-700 text-sm mb-1">Cover Image</label>
                <input
                    onChange={(e) => setImage(e?.target?.files?.[0])}
                    type="file"
                    name="image"
                    className="mt-1 px-4 py-2 border border-gray-200 rounded-md w-full"
                    accept="image/*"
                />
            </div>

          

            <div className='bg-white'>
                <label htmlFor="content" className="block text-gray-700 text-sm mb-1">
                    Page Content
                </label>
                <PageTextEditor setEditorState={setEditorState} editorState={editorState} />
            </div>

            <div className="mb-5">
                <label htmlFor="count" className="block text-gray-700 text-sm mb-1">
                    Count
                </label>
                <input
                    value={count}
                    onChange={(e) => setCount(e.target.value)}
                    type="text"
                    className="mt-1 px-4 py-2 border border-gray-200 rounded-md w-full"
                />
            </div>


            <div className="mb-5">
                <label htmlFor="count" className="block text-gray-700 text-sm mb-1">
                    Workspace
                </label>
                <input
                    value={worksSpace}
                    onChange={(e) => setWorksSpace(e.target.value)}
                    type="text"
                    className="mt-1 px-4 py-2 border border-gray-200 rounded-md w-full"
                />
            </div>

            <div className="mb-5">
                <label htmlFor="count" className="block text-gray-700 text-sm mb-1">
                    Testing Types
                </label>
                <input
                    value={differentt}
                    onChange={(e) => setDifferentt(e.target.value)}
                    type="text"
                    className="mt-1 px-4 py-2 border border-gray-200 rounded-md w-full"
                />
            </div>

            <div className="mb-5">
                <label htmlFor="count" className="block text-gray-700 text-sm mb-1">
                    Website Visitors
                </label>
                <input
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    type="text"
                    className="mt-1 px-4 py-2 border border-gray-200 rounded-md w-full"
                />
            </div>
            <div className="mb-5">
                <label htmlFor="ctext" className="block text-gray-700 text-sm mb-1">
                    Text1
                </label>
                <input
                    value={ctext}
                    onChange={(e) => setCtext(e.target.value)}
                    type="text"
                    className="mt-1 px-4 py-2 border border-gray-200 rounded-md w-full"
                />
            </div>
            <h1>vertical ads</h1>
            <div className="mb-5">
                <label htmlFor="hoadsimg" className="block text-gray-700 text-sm mb-1">Ad Image</label>
                <input
                    onChange={(e) => setHoadsimg(e?.target?.files?.[0])}
                    type="file"
                    name="hoadsimg"
                    className="mt-1 px-4 py-2 border border-gray-200 rounded-md w-full"
                    accept="image/*"
                />
            </div>

            <div className="mb-5">
                <label htmlFor="hadstitle" className="block text-gray-700 text-sm mb-1">
                    Ads Headline
                </label>
                <input
                    value={hadstitle}
                    onChange={(e) => setHadstitle(e.target.value)}
                    type="text"
                    className="mt-1 px-4 py-2 border border-gray-200 rounded-md w-full"
                />
            </div>


            <div className="mb-5">
                <label htmlFor="hadsdesc" className="block text-gray-700 text-sm mb-1">
                    Ads Desc
                </label>
                <input
                    value={hadsdesc}
                    onChange={(e) => setHadsdesc(e.target.value)}
                    type="text"
                    className="mt-1 px-4 py-2 border border-gray-200 rounded-md w-full"
                />
            </div>

            <h1>Horizontal ads</h1>
            <div className="mb-5">
                <label htmlFor="hoadsimg" className="block text-gray-700 text-sm mb-1">Ad Image</label>
                <input
                    onChange={(e) => setHoadsimg(e?.target?.files?.[0])}
                    type="file"
                    name="hoadsimg"
                    className="mt-1 px-4 py-2 border border-gray-200 rounded-md w-full"
                    accept="image/*"
                />
            </div>

            <div className="mb-5">
                <label htmlFor="btadstitle" className="block text-gray-700 text-sm mb-1">
                    Ads Headline
                </label>
                <input
                    value={btadstitle}
                    onChange={(e) => setBtadstitle(e.target.value)}
                    type="text"
                    className="mt-1 px-4 py-2 border border-gray-200 rounded-md w-full"
                />
            </div>


            <div className="mb-5">
                <label htmlFor="btadsdesc" className="block text-gray-700 text-sm mb-1">
                    Ads Desc
                </label>
                <input
                    value={btadsdesc}
                    onChange={(e) => setBtadsdesc(e.target.value)}
                    type="text"
                    className="mt-1 px-4 py-2 border border-gray-200 rounded-md w-full"
                />
            </div>
            <h1>Product Page Ads</h1>
            <div className="mb-5">
                <label htmlFor="productsastitle" className="block text-gray-700 text-sm mb-1">
                   Product Ads Headline
                </label>
                <input
                    value={productsastitle}
                    onChange={(e) => setProductsastitle(e.target.value)}
                    type="text"
                    className="mt-1 px-4 py-2 border border-gray-200 rounded-md w-full"
                />
            </div>
            <div className="mb-5">
                <label htmlFor="productsasdesc" className="block text-gray-700 text-sm mb-1">
                   Product Ads Description
                </label>
                <input
                    value={productsasdesc}
                    onChange={(e) => setProductsasdesc(e.target.value)}
                    type="text"
                    className="mt-1 px-4 py-2 border border-gray-200 rounded-md w-full"
                />
            </div>

            <h1>Product Horizontal Ads</h1>
            <div className="mb-5">
                <label htmlFor="productsasdesc" className="block text-gray-700 text-sm mb-1">
                   Product Ads Description
                </label>
                <input
                    value={producthoradstitle}
                    onChange={(e) => setProducthoradstitle(e.target.value)}
                    type="text"
                    className="mt-1 px-4 py-2 border border-gray-200 rounded-md w-full"
                />
            </div>
            <div className='mt-7'>
                <button type='submit' className='px-4 py-2 bg-primary text-white font-semibold'>Update</button>
            </div>
        </form>
    );
};

export default Main;
