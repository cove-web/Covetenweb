'use client'

import React, { useState, useEffect } from 'react';
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
      servicesecdtitle
      servicesecdec
      servicesecdimg
      threesertitle
      threeserdesc
      threeserimg
      foursertitle
      fourserdesc
      fourserimg
      fivesertitle
      fiveserdesc
      fiveserimg
      sereelone
  
      
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
    const [btadstitle, setBtadstitle] = useState('')
    const [btadsdesc, setBtadsdesc] = useState('')
    const [hoadsimgt, setHoadsimgt] = useState('');
    const [hadstitlet, setHadstitlet] = useState('');
    const [hadsdesct, setHadsdesct] = useState('');
    const [hoadsimgth, setHoadsimgth] = useState('');
    const [hadstitleth, setHadstitleth] = useState('');
    const [hadsdescth, setHadsdescth] = useState('');
    const [hoadsimgf, setHoadsimgf] = useState('');
    const [hadstitlef, setHadstitlef] = useState('');
    const [hadsdescf, setHadsdescf] = useState('');
    const [sercount, setSercount] = useState('');
    const [newclients, setNewclients] = useState('');
    const [coffecups, setCoffecups] = useState('');
    const [photostak, setPhotostak] = useState('');
    const [seradstitle, setSeradstitle] = useState('');
    const [seradsdesc, setSeradsdesc] = useState('');
    const [seradsimg, setSeradsimg] = useState<any>(null);
    const [servicesecdtitle, setServicesecdtitle] = useState('');
    const [servicesecdec, setServicesecdec] = useState('');
    const [servicesecdimg, setServicesecdimg] = useState<any>(null);
    const [threesertitle, setThreesertitle] = useState('');
    const [threeserdesc, setThreeserdesc] = useState('');
    const [threeserimg, setThreeserimg] = useState<any>(null);
    const [foursertitle, setFoursertitle] = useState('');
    const [fourserdesc, setFourserdesc] = useState('');
    const [videoReel, setVideoReel] = useState(null);
  
    const [horserviceimg, setHorserviceimg] = useState<any>(null);
    const [fourserimg, setFourserimg] = useState<any>(null);
    const [fivesertitle, setFivesertitle] = useState('');
    const [fiveserdesc, setFiveserdesc] = useState('');
    const [fiveserimg, setFiveserimg] = useState<any>(null);

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

        let seradsimgLink = null;
        if (seradsimg) {
            setImageUploading(true);
            seradsimgLink = await handleImageUpload(seradsimg);
            setImageUploading(false);
        }

        if (seradsimgLink && previousData?.aboutPages[0]?.seradsimg) {
            deleteImage(previousData?.aboutPages[0]?.seradsimg);
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

        let servicesecdimgLink = null;
        if (servicesecdimg) {
            setImageUploading(true);
            servicesecdimgLink = await handleImageUpload(servicesecdimg);
            setImageUploading(false);
        }

        if (servicesecdimgLink && previousData?.aboutPages[0]?.servicesecdimg) {
            deleteImage(previousData?.aboutPages[0]?.servicesecdimg);
        }

        let threeserimgLink = null;
        if (threeserimg) {
            setImageUploading(true);
            threeserimgLink = await handleImageUpload(threeserimg);
            setImageUploading(false);
        }

        if (threeserimgLink && previousData?.aboutPages[0]?.threeserimg) {
            deleteImage(previousData?.aboutPages[0]?.threeserimg);
        }

        let fourserimgLink = null;
        if (fourserimg) {
            setImageUploading(true);
            fourserimgLink = await handleImageUpload(fourserimg);
            setImageUploading(false);
        }

        if (fourserimgLink && previousData?.aboutPages[0]?.fourserimg) {
            deleteImage(previousData?.aboutPages[0]?.fourserimg);
        }

        let fiveserimgLink = null;
        if (fiveserimg) {
            setImageUploading(true);
            fiveserimgLink = await handleImageUpload(fiveserimg);
            setImageUploading(false);
        }

        if (fiveserimgLink && previousData?.aboutPages[0]?.fiveserimg) {
            deleteImage(previousData?.aboutPages[0]?.fiveserimg);
        }


        let horserviceimgLink = null;
        if (horserviceimg) {
            setImageUploading(true);
            horserviceimgLink = await handleImageUpload(horserviceimg);
            setImageUploading(false);
        }

        if (horserviceimgLink && previousData?.aboutPages[0]?.horserviceimg) {
            deleteImage(previousData?.aboutPages[0]?.horserviceimg);
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
                    "hadstitle": hadstitle,
                    "hadsdesc": hadsdesc,
                    "btadsdesc": btadsdesc,
                    "btadstitle": btadstitle,
                    "hoadsimgt": hoadsimgt,
                    "hadstitlet": hadstitlet,
                    "hadsdesct": hadsdesct,
                    "hoadsimgth": hoadsimgth,
                    "hadstitleth": hadstitleth,
                    "hadsdescth": hadsdescth,
                    "hoadsimgf": hoadsimgf,
                    "hadstitlef": hadstitlef,
                    "hadsdescf": hadsdescf,
                    "sercount": sercount,
                    "newclients": newclients,
                    "coffecups": coffecups,
                    "photostak": photostak,
                    "seradstitle": seradstitle,
                    "seradsdesc": seradsdesc,
                    "seradsimg": seradsimgLink || previousData?.aboutPages[0]?.seradsimg,
                    "servicesecdtitle": servicesecdtitle,
                    "servicesecdec": servicesecdec,
                    "servicesecdimg": servicesecdimgLink || previousData?.aboutPages[0]?.servicesecdimg,
                    "threesertitle": threesertitle,
                    "threeserdesc": threeserdesc,
                    "threeserimg": threeserimgLink || previousData?.aboutPages[0]?.threeserimg,
                    "foursertitle": foursertitle,
                    "fourserdesc": fourserdesc,
                    "fourserimg": fourserimgLink || previousData?.aboutPages[0]?.fourserimg,
                    "fivesertitle": fivesertitle,
                    "fiveserdesc": fiveserdesc,
                    "fiveserimg": fiveserimgLink || previousData?.aboutPages[0]?.fiveserimg,
                    
                
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
            const {
                title, image, description, count, ctext, hoadsimg, hadstitle, hadsdesc, btadstitle, btadsdesc, hadsdesct, hadstitlet, hoadsimgt,
                hadsdescth, hadstitleth, hoadsimgth, hadsdescf, hadstitlef, hoadsimgf, sercount, newclients, coffecups, photostak, seradstitle, seradsdesc, seradsimg,
                servicesecdtitle, servicesecdec, servicesecdimg, threesertitle, threeserdesc, threeserimg, foursertitle, fourserdesc, fourserimg, fivesertitle, fiveserdesc, fiveserimg,
          
            } = previousData.aboutPages[0];
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
            setServicesecdtitle(servicesecdtitle);
            setServicesecdec(servicesecdec);
            setServicesecdimg(servicesecdimg);
            setThreesertitle(threesertitle);
            setThreeserdesc(threeserdesc);
            setThreeserimg(threeserimg);
            setFoursertitle(foursertitle);
            setFourserdesc(fourserdesc);
            setFourserimg(fourserimg);
            setFivesertitle(fivesertitle);
            setFiveserdesc(fiveserdesc);
            setFiveserimg(fiveserimg);
            
            setHorserviceimg(previousData.aboutPages[0].horserviceimg);
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
            <h4 style={{ textTransform: 'uppercase' }}>Service Page ads</h4>
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

            <div className="mb-5">
                <label htmlFor="seradstitle" className="block text-gray-700 text-sm mb-1">
                    Ads Title
                </label>
                <input
                    value={seradstitle}
                    onChange={(e) => setSeradstitle(e.target.value)}
                    type="text"
                    className="mt-1 px-4 py-2 border border-gray-200 rounded-md w-full"
                />
            </div>

            <div className="mb-5">
                <label htmlFor="seradsdesc" className="block text-gray-700 text-sm mb-1">
                    Ads Description
                </label>
                <input
                    value={seradsdesc}
                    onChange={(e) => setSeradsdesc(e.target.value)}
                    type="text"
                    className="mt-1 px-4 py-2 border border-gray-200 rounded-md w-full"
                />
            </div>

            <h4 style={{ textTransform: 'uppercase' }}>Service Section</h4>
            <div className="mb-5">
                <label htmlFor="servicesecdtitle" className="block text-gray-700 text-sm mb-1">Section Title</label>
                <input
                    value={servicesecdtitle}
                    onChange={(e) => setServicesecdtitle(e.target.value)}
                    type="text"
                    className="mt-1 px-4 py-2 border border-gray-200 rounded-md w-full"
                />
            </div>
            <div className="mb-5">
                <label htmlFor="servicesecdec" className="block text-gray-700 text-sm mb-1">Section Description</label>
                <input
                    value={servicesecdec}
                    onChange={(e) => setServicesecdec(e.target.value)}
                    type="text"
                    className="mt-1 px-4 py-2 border border-gray-200 rounded-md w-full"
                />
            </div>
            <div className="mb-5">
                <label htmlFor="servicesecdimg" className="block text-gray-700 text-sm mb-1">Section Image</label>
                <input
                    onChange={(e) => setServicesecdimg(e?.target?.files?.[0])}
                    type="file"
                    name="servicesecdimg"
                    className="mt-1 px-4 py-2 border border-gray-200 rounded-md w-full"
                    accept="image/*"
                />
            </div>

            <h4 style={{ textTransform: 'uppercase' }}>Three Service Section</h4>
            <div className="mb-5">
                <label htmlFor="threesertitle" className="block text-gray-700 text-sm mb-1">Three Service Title</label>
                <input
                    value={threesertitle}
                    onChange={(e) => setThreesertitle(e.target.value)}
                    type="text"
                    className="mt-1 px-4 py-2 border border-gray-200 rounded-md w-full"
                />
            </div>
            <div className="mb-5">
                <label htmlFor="threeserdesc" className="block text-gray-700 text-sm mb-1">Three Service Description</label>
                <input
                    value={threeserdesc}
                    onChange={(e) => setThreeserdesc(e.target.value)}
                    type="text"
                    className="mt-1 px-4 py-2 border border-gray-200 rounded-md w-full"
                />
            </div>
            <div className="mb-5">
                <label htmlFor="threeserimg" className="block text-gray-700 text-sm mb-1">Three Service Image</label>
                <input
                    onChange={(e) => setThreeserimg(e?.target?.files?.[0])}
                    type="file"
                    name="threeserimg"
                    className="mt-1 px-4 py-2 border border-gray-200 rounded-md w-full"
                    accept="image/*"
                />
            </div>

            <h4 style={{ textTransform: 'uppercase' }}>Four Service Section</h4>
            <div className="mb-5">
                <label htmlFor="foursertitle" className="block text-gray-700 text-sm mb-1">Four Service Title</label>
                <input
                    value={foursertitle}
                    onChange={(e) => setFoursertitle(e.target.value)}
                    type="text"
                    className="mt-1 px-4 py-2 border border-gray-200 rounded-md w-full"
                />
            </div>
            <div className="mb-5">
                <label htmlFor="fourserdesc" className="block text-gray-700 text-sm mb-1">Four Service Description</label>
                <input
                    value={fourserdesc}
                    onChange={(e) => setFourserdesc(e.target.value)}
                    type="text"
                    className="mt-1 px-4 py-2 border border-gray-200 rounded-md w-full"
                />
            </div>
            <div className="mb-5">
                <label htmlFor="fourserimg" className="block text-gray-700 text-sm mb-1">Four Service Image</label>
                <input
                    onChange={(e) => setFourserimg(e?.target?.files?.[0])}
                    type="file"
                    name="fourserimg"
                    className="mt-1 px-4 py-2 border border-gray-200 rounded-md w-full"
                    accept="image/*"
                />
            </div>

            <h4 style={{ textTransform: 'uppercase' }}>Five Service Section</h4>
            <div className="mb-5">
                <label htmlFor="fivesertitle" className="block text-gray-700 text-sm mb-1">Five Service Title</label>
                <input
                    value={fivesertitle}
                    onChange={(e) => setFivesertitle(e.target.value)}
                    type="text"
                    className="mt-1 px-4 py-2 border border-gray-200 rounded-md w-full"
                />
            </div>
            <div className="mb-5">
                <label htmlFor="fiveserdesc" className="block text-gray-700 text-sm mb-1">Five Service Description</label>
                <input
                    value={fiveserdesc}
                    onChange={(e) => setFiveserdesc(e.target.value)}
                    type="text"
                    className="mt-1 px-4 py-2 border border-gray-200 rounded-md w-full"
                />
            </div>
            <div className="mb-5">
                <label htmlFor="fiveserimg" className="block text-gray-700 text-sm mb-1">Five Service Image</label>
                <input
                    onChange={(e) => setFiveserimg(e?.target?.files?.[0])}
                    type="file"
                    name="fiveserimg"
                    className="mt-1 px-4 py-2 border border-gray-200 rounded-md w-full"
                    accept="image/*"
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
