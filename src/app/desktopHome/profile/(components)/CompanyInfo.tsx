import FilePreview from '@/app/vendor/dashboard/projects/(components)/FilePreview';
import React, { useCallback, useEffect, useState } from 'react';
import Dropzone, { useDropzone } from 'react-dropzone';
import { HiOutlineTrash } from 'react-icons/hi';
import MultiSelectIndustry from './MultiSelectIndustry';
import MultiSelectService from './MultiSelectService';
import HandleFileUpload from '@/shared/HandleFileUpload';
import Equipment from './Equipment';

interface IProps {
    setUserInfo: any,
    userInfo: any,
    setCurrentTab: any,
    updateUser: any
}



const CompanyInfo = ({ setUserInfo, userInfo, setCurrentTab, updateUser }: IProps) => {

    //states
    // const [files, setFiles] = useState<File[]>([]);
    // const [attachment, setAttachment] = useState<File[]>([]);
    const [error, setError] = useState<string>('');







    //hooks 

    const { uploadFile } = HandleFileUpload()



    const handleSubmit = async (e: any) => {
        e.preventDefault();



        const { companyName, companyEmail, companyPhone, otherPhone, linkedin, twitter, skypeId, aboutCompany, gst, panCardNo, street, country, state, city, otherState, otherCountry, otherCity, otherStreet, zip, otherZip } = e.target

        const updatedData =
        {
            ...userInfo, companyName: companyName.value, companyEmail: companyEmail.value, companyPhone: companyPhone.value, otherPhone: otherPhone.value, linkedin: linkedin.value, twitter: twitter.value, skypeId: skypeId.value, aboutCompany: aboutCompany.value, gst: gst.value, panCardNo: panCardNo.value, street: street.value, country: country.value, state: state.value, city: city.value, otherCity: otherCity.value, otherCountry: otherCountry.value, otherState: otherState.value, otherStreet: otherStreet.value, zip: zip.value, otherZip: otherZip.value
        }




        updateUser(updatedData)
    };









    return (
        <section className='mt-6'>
            <form onSubmit={handleSubmit} className='grid grid-cols-1 lg:grid-cols-3 gap-4'>

                <div className="mb-5">
                    <label className="block  text-gray-700 text-sm mb-1">
                        Company Name
                    </label>
                    <input
                        defaultValue={userInfo?.companyName}
                        name="companyName"
                        type="text"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div className="mb-5">
                    <label className="block  text-gray-700 text-sm mb-1">
                        Company Email
                    </label>
                    <input
                        defaultValue={userInfo?.companyEmail}
                        name="companyEmail"
                        type="text"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div className="mb-5">
                    <label className="block  text-gray-700 text-sm mb-1">
                        Company Phone
                    </label>
                    <input
                        defaultValue={userInfo?.companyPhone}
                        name="companyPhone"
                        type="text"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div className="mb-5">
                    <label className="block  text-gray-700 text-sm mb-1">
                        Other Phone
                    </label>
                    <input
                        defaultValue={userInfo?.otherPhone}
                        name="otherPhone"
                        type="text"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div className="mb-5">
                    <label className="block  text-gray-700 text-sm mb-1">
                        Pan card No
                    </label>
                    <input
                        defaultValue={userInfo?.otherPhone}
                        name="panCardNo"
                        type="text"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div className="mb-5">
                    <label className="block  text-gray-700 text-sm mb-1">
                        GST No
                    </label>
                    <input
                        defaultValue={userInfo?.otherPhone}
                        name="gst"
                        type="text"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div className="mb-5">
                    <label className="block  text-gray-700 text-sm mb-1">
                        Linkedin ID
                    </label>
                    <input
                        defaultValue={userInfo?.linkedin}
                        name="linkedin"
                        type="text"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div className="mb-5">
                    <label className="block  text-gray-700 text-sm mb-1">
                        twitter
                    </label>
                    <input
                        defaultValue={userInfo?.twitter}
                        name="twitter"
                        type="text"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div className="mb-5">
                    <label className="block  text-gray-700 text-sm mb-1">
                        Skype Id
                    </label>
                    <input
                        defaultValue={userInfo?.skypeId}
                        name="skypeId"
                        type="text"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                {/* new start ************************************************ */}
                <div className="mb-5">
                    <label className="block  text-gray-700 text-sm mb-1">
                        Street
                    </label>
                    <input
                        defaultValue={userInfo?.street}
                        name="street"
                        type="text"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div className="mb-5">
                    <label className="block  text-gray-700 text-sm mb-1">
                        City
                    </label>
                    <input
                        defaultValue={userInfo?.city}
                        name="city"
                        type="text"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div className="mb-5">
                    <label className="block  text-gray-700 text-sm mb-1">
                        State
                    </label>
                    <input
                        defaultValue={userInfo?.state}
                        name="state"
                        type="text"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div className="mb-5">
                    <label className="block  text-gray-700 text-sm mb-1">
                        Country
                    </label>
                    <input
                        defaultValue={userInfo?.country}
                        name="country"
                        type="text"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div className="mb-5">
                    <label className="block  text-gray-700 text-sm mb-1">
                        Zip
                    </label>
                    <input
                        defaultValue={userInfo?.zip}
                        name="zip"
                        type="text"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                </div>


                {/* other address */}


                <div className="mb-5">
                    <label className="block  text-gray-700 text-sm mb-1">
                        Other Street
                    </label>
                    <input
                        defaultValue={userInfo?.otherStreet}
                        name="otherStreet"
                        type="text"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div className="mb-5">
                    <label className="block  text-gray-700 text-sm mb-1">
                        Other  City
                    </label>
                    <input
                        defaultValue={userInfo?.otherCity}
                        name="otherCity"
                        type="text"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div className="mb-5">
                    <label className="block  text-gray-700 text-sm mb-1">
                        Other State
                    </label>
                    <input
                        defaultValue={userInfo?.otherState}
                        name="otherState"
                        type="text"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div className="mb-5">
                    <label className="block  text-gray-700 text-sm mb-1">
                        Other Country
                    </label>
                    <input
                        defaultValue={userInfo?.otherCountry}
                        name="otherCountry"
                        type="text"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div className="mb-5">
                    <label className="block  text-gray-700 text-sm mb-1">
                        Other Zip
                    </label>
                    <input
                        defaultValue={userInfo?.otherZip}
                        name="otherZip"
                        type="text"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                </div>

                <div className="mb-5 col-span-full">
                    <label className="block  text-gray-700 text-sm mb-1">
                        About Company
                    </label>
                    <textarea
                        defaultValue={userInfo?.aboutCompany}
                        name="aboutCompany"
                        rows={7}
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"

                    />
                </div>







                <div className="mt-6">

                    <button
                        type="submit"
                        className="px-12 rounded-md py-3 bg-desktopPrimary text-white "
                    >
                        Update
                    </button>
                </div>
            </form>
        </section>
    );
};

export default CompanyInfo;