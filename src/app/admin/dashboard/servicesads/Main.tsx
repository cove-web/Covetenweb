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
      seradstitle
      seradsdesc
      seradsimg
      sercount
      newclients
      coffecups
      photostak

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
    const [editorState, setEditorState] = useState("");
    const [ctext, setCtext] = useState('');
    const [hadstitle, setHadstitle] = useState('');
    const [hadsdesc, setHadsdesc] = useState('');
    const [btadstitle,setBtadstitle] = useState('')
    const [btadsdesc, setBtadsdesc] = useState('')
    const [hoadsimgt, setHoadsimgt] = useState('');
    const [hadstitlet, setHadstitlet] = useState('');
    const [hadsdesct, setHadsdesct] = useState('');
    //
    const [hoadsimgth, setHoadsimgth] = useState('');
    const [hadstitleth, setHadstitleth] = useState('');
    const [hadsdescth, setHadsdescth] = useState('');
    //
    const [hoadsimgf, setHoadsimgf] = useState('');
    const [hadstitlef, setHadstitlef] = useState('');
    const [hadsdescf, setHadsdescf] = useState('');
    const [sercount,setSercount] = useState('');
    const [newclients,setNewclients] = useState('');
   const [coffecups, setCoffecups] = useState('')
const [photostak,setPhotostak] = useState('');
const[seradstitle,setSeradstitle] = useState('');
const [seradsdesc,setSeradsdesc] = useState('');
const [seradsimg,setSeradsimg] = useState('');
    
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

        let hseradsimgimgLink = null;
        if (seradsimg) {
            setSeradsimg(true);
            hseradsimgimgLink = await handleImageUpload(seradsimg);
            setSeradsimg(false);
        }

        if (hseradsimgimgLink && previousData?.aboutPages[0]?.seradsimg) {
            deleteImage(previousData?.aboutPages[0]?.seradsimg);
        }

        //second 
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
                    "hoadsimgt": hoadsimgt,
                    "hadstitlet" : hadstitlet,
                    "hadsdesct" : hadsdesct,

                    "hoadsimgth": hoadsimgth,
                    "hadstitleth" : hadstitleth,
                    "hadsdescth" : hadsdescth,

                    "hoadsimgf": hoadsimgf,
                    "hadstitlef" : hadstitlef,
                    "hadsdescf" : hadsdescf,
                    "sercount":sercount,
                   "newclients":newclients,
                   "coffecups":coffecups,
                   "photostak":photostak,
                   "seradstitle":seradstitle,
                   "seradsdesc":seradsdesc,
                   "seradsimg":seradsimg

                }
            }
        });

        if (data?.updateAboutPages?.aboutPages[0]?.id) {
            toast.success("Updated successfully");
         
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
            const { title, image, description, count, ctext, hoadsimg ,hadstitle,hadsdesc,btadstitle,btadsdesc,hadsdesct,hadstitlet,hoadsimgt,
                hadsdescth,hadstitleth,hoadsimgth,hadsdescf,hadstitlef,hoadsimgf,hadsdescfi,hadstitlefi,hoadsimgfi,
                hadsdescsi,hadstitlesi,hoadsimgsi,sercount,newclients,coffecups,photostak,seradstitle,seradsdesc,seradsimg} = previousData.aboutPages[0];
            setTitle(title);
            setCount(count);
            setCtext(ctext);
            setEditorState(JSON.parse(description));
            setHoadsimg(hoadsimg);
            setHadstitle(hadstitle);
            setHadsdesc(hadsdesc);
            setBtadsdesc(btadsdesc);
            setBtadstitle(btadstitle);
            setHadsdesct(hadsdesct);
            setHadstitlet(hadstitlet);
            setHoadsimgt(hoadsimgt);

            setHadsdescth(hadsdescth);
            setHadstitleth(hadstitleth);
            setHoadsimgth(hoadsimgth);
            
            setHadsdescf(hadsdescf);
            setHadstitlef(hadstitlef);
            setHoadsimgf(hoadsimgf);
            setSercount(sercount);
            setNewclients(newclients)
            setCoffecups(coffecups);
            setPhotostak(photostak);
            setSeradstitle(seradstitle);
            setSeradsdesc(seradsdesc);
            setSeradsimg(seradsimg);
            
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
            

           
            <h4 style={{textTransform:'uppercase'}}>Service Page ads</h4>
            <div className="mb-5">
                <label htmlFor="seradsimg" className="block text-gray-700 text-sm mb-1">Ad Image</label>
                <input
                    onChange={(e) => setSeradsimg(e?.target?.files?.[0])}
                    type="file"
                    name="seradsimg"
                    className="mt-1 px-4 py-2 border border-gray-200 rounded-md w-full"
                    accept="image/*"
                />
            </div>
            {/* <div className="mb-5">
                <label htmlFor="hoadsimg" className="block text-gray-700 text-sm mb-1">Ad Image</label>
                <input
                    onChange={(e) => setHoadsimg(e?.target?.files?.[0])}
                    type="file"
                    name="hoadsimg"
                    className="mt-1 px-4 py-2 border border-gray-200 rounded-md w-full"
                    accept="image/*"
                />
            </div> */}

            <div className="mb-5">
                <label htmlFor="hadstitle" className="block text-gray-700 text-sm mb-1">
                    Count people
                </label>
                <input
                    value={sercount}
                    onChange={(e) => setSercount(e.target.value)}
                    type="text"
                    className="mt-1 px-4 py-2 border border-gray-200 rounded-md w-full"
                />
            </div>
            <div className="mb-5">
                <label htmlFor="hadstitle" className="block text-gray-700 text-sm mb-1">
                    Count Clients
                </label>
                <input
                    value={newclients}
                    onChange={(e) => setNewclients(e.target.value)}
                    type="text"
                    className="mt-1 px-4 py-2 border border-gray-200 rounded-md w-full"
                />
            </div>
            <div className="mb-5">
                <label htmlFor="coffecups" className="block text-gray-700 text-sm mb-1">
                   coffe count
                </label>
                <input
                    value={coffecups}
                    onChange={(e) => setCoffecups(e.target.value)}
                    type="text"
                    className="mt-1 px-4 py-2 border border-gray-200 rounded-md w-full"
                />
            </div>
            <div className="mb-5">
                <label htmlFor="coffecups" className="block text-gray-700 text-sm mb-1">
                   Photos taken
                </label>
                <input
                    value={photostak}
                    onChange={(e) => setPhotostak(e.target.value)}
                    type="text"
                    className="mt-1 px-4 py-2 border border-gray-200 rounded-md w-full"
                />
            </div>

            <div className="mb-5">
                <label htmlFor="seradstitle" className="block text-gray-700 text-sm mb-1">
                   Ads  title
                </label>
                <input
                    value={seradstitle}
                    onChange={(e) => setSeradstitle(e.target.value)}
                    type="text"
                    className="mt-1 px-4 py-2 border border-gray-200 rounded-md w-full"
                />
            </div>
         

            <div className="mb-5">
                <label htmlFor="hadsdesc" className="block text-gray-700 text-sm mb-1">
                    Ads Desc
                </label>
                <input
                    value={seradsdesc}
                    onChange={(e) => setSeradsdesc(e.target.value)}
                    type="text"
                    className="mt-1 px-4 py-2 border border-gray-200 rounded-md w-full"
                />
            </div>
            <br></br>
        

  


            
            <div className='mt-7'>
                <button type='submit' className='px-4 py-2 bg-primary text-white font-semibold'>Update</button>
            </div>
        </form>
    );
};

export default Main;
