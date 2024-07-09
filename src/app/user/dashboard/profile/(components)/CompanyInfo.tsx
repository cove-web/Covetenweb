import React, { useCallback, useEffect, useState } from "react";
import HandleFileUpload from "@/shared/HandleFileUpload";

interface IProps {
  setUserInfo: any;
  userInfo: any;
  setCurrentTab: any;
  updateUser: any;
}

const CompanyInfo = ({
  setUserInfo,
  userInfo,
  setCurrentTab,
  updateUser,
}: IProps) => {
  //states
  // const [files, setFiles] = useState<File[]>([]);
  // const [attachment, setAttachment] = useState<File[]>([]);
  const [error, setError] = useState<string>("");

  //hooks

  const { uploadFile } = HandleFileUpload();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const {
      companyName,
      companyEmail,
      companyPhone,
      otherPhone,
      linkedin,
      twitter,
      skypeId,
      aboutCompany,
      gst,
      panCardNo,
      street,
      country,
      state,
      city,
      otherState,
      otherCountry,
      otherCity,
      otherStreet,
      zip,
      otherZip,
    } = e.target;

    const updatedData = {
      ...userInfo,
      companyName: companyName.value,
      companyEmail: companyEmail.value,
      companyPhone: companyPhone.value,
      otherPhone: otherPhone.value,
      linkedin: linkedin.value,
      twitter: twitter.value,
      skypeId: skypeId.value,
      aboutCompany: aboutCompany.value,
      gst: gst.value,
      panCardNo: panCardNo.value,
      street: street.value,
      country: country.value,
      state: state.value,
      city: city.value,
      otherCity: otherCity.value,
      otherCountry: otherCountry.value,
      otherState: otherState.value,
      otherStreet: otherStreet.value,
      zip: zip.value,
      otherZip: otherZip.value,
    };

    updateUser(updatedData);
  };

  return (
    <section className="mt-6">
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-4"
      >
        <div className="mb-5" style={{color:'white'}}>

          <label className="block  text-white-700 text-sm mb-1">
            Company Name<span className="text-red-500">*</span>
          </label>
           <input  style={{color:'white'}}
            defaultValue={userInfo?.companyName}
            name="companyName"
            type="text"
            required
            className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="mb-5" style={{color:'white'}}>

          <label className="block  text-white-700 text-sm mb-1">
            Company Email<span className="text-red-500">*</span>
          </label>
           <input  style={{color:'white'}}
            defaultValue={userInfo?.companyEmail}
            name="companyEmail"
            type="text"
            required
            className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="mb-5" style={{color:'white'}}>

          <label className="block  text-white-700 text-sm mb-1">
            Company Phone<span className="text-red-500">*</span>
          </label>
           <input  style={{color:'white'}}
            defaultValue={userInfo?.companyPhone}
            name="companyPhone"
            type="text"
            required
            className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="mb-5" style={{color:'white'}}>

          <label className="block  text-white-700 text-sm mb-1">
            Other Phone
          </label>
           <input  style={{color:'white'}}
            defaultValue={userInfo?.otherPhone}
            name="otherPhone"
            type="text"
            className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="mb-5" style={{color:'white'}}>

          <label className="block  text-white-700 text-sm mb-1">
            Pan card No<span className="text-red-500">*</span>
          </label>
           <input  style={{color:'white'}}
            defaultValue={userInfo?.otherPhone}
            name="panCardNo"
            type="text"
            required
            className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="mb-5" style={{color:'white'}}>

          <label className="block  text-white-700 text-sm mb-1">GST No<span className="text-red-500">*</span></label>
           <input  style={{color:'white'}}
            defaultValue={userInfo?.otherPhone}
            name="gst"
            type="text"
            required
            className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="mb-5" style={{color:'white'}}>

          <label className="block  text-white-700 text-sm mb-1">
            Linkedin ID<span className="text-red-500">*</span>
          </label>
           <input  style={{color:'white'}}
            defaultValue={userInfo?.linkedin}
            name="linkedin"
            type="text"
            required
            className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="mb-5" style={{color:'white'}}>

          <label className="block  text-white-700 text-sm mb-1">twitter</label>
           <input  style={{color:'white'}}
            defaultValue={userInfo?.twitter}
            name="twitter"
            type="text"
            className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="mb-5" style={{color:'white'}}>

          <label className="block  text-white-700 text-sm mb-1">Skype Id</label>
           <input  style={{color:'white'}}
            defaultValue={userInfo?.skypeId}
            name="skypeId"
            type="text"
            className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        {/* new start ************************************************ */}
        <div className="mb-5" style={{color:'white'}}>

          <label className="block  text-white-700 text-sm mb-1">Street<span className="text-red-500">*</span></label>
           <input  style={{color:'white'}}
            defaultValue={userInfo?.street}
            name="street"
            type="text"
            required
            className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="mb-5" style={{color:'white'}}>

          <label className="block  text-white-700 text-sm mb-1">City<span className="text-red-500">*</span></label>
           <input  style={{color:'white'}}
            defaultValue={userInfo?.city}
            name="city"
            required
            type="text"
            className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="mb-5" style={{color:'white'}}>

          <label className="block  text-white-700 text-sm mb-1">State<span className="text-red-500">*</span></label>
           <input  style={{color:'white'}}
            defaultValue={userInfo?.state}
            name="state"
            type="text"
            required
            className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="mb-5" style={{color:'white'}}>

          <label className="block  text-white-700 text-sm mb-1">Country<span className="text-red-500">*</span></label>
           <input  style={{color:'white'}}
            defaultValue={userInfo?.country}
            name="country"
            required
            type="text"
            className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="mb-5" style={{color:'white'}}>

          <label className="block  text-white-700 text-sm mb-1">Zip<span className="text-red-500">*</span></label>
           <input  style={{color:'white'}}
            defaultValue={userInfo?.zip}
            name="zip"
            required
            type="text"
            className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        {/* other address */}

        <div className="mb-5" style={{color:'white'}}>

          <label className="block  text-white-700 text-sm mb-1">
            Other Street
          </label>
           <input  style={{color:'white'}}
            defaultValue={userInfo?.otherStreet}
            name="otherStreet"
            type="text"
            className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="mb-5" style={{color:'white'}}>

          <label className="block  text-white-700 text-sm mb-1">
            Other City
          </label>
           <input  style={{color:'white'}}
            defaultValue={userInfo?.otherCity}
            name="otherCity"
            type="text"
            className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="mb-5" style={{color:'white'}}>

          <label className="block  text-white-700 text-sm mb-1">
            Other State
          </label>
           <input  style={{color:'white'}}
            defaultValue={userInfo?.otherState}
            name="otherState"
            type="text"
            className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="mb-5" style={{color:'white'}}>

          <label className="block  text-white-700 text-sm mb-1">
            Other Country
          </label>
           <input  style={{color:'white'}}
            defaultValue={userInfo?.otherCountry}
            name="otherCountry"
            type="text"
            className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="mb-5" style={{color:'white'}}>

          <label className="block  text-white-700 text-sm mb-1">Other Zip</label>
           <input  style={{color:'white'}}
            defaultValue={userInfo?.otherZip}
            name="otherZip"
            type="text"
            className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        <div className="mb-5 col-span-full">
          <label className="block  text-white-700 text-sm mb-1">
            About Company<span className="text-red-500">*</span>
          </label>
          <textarea
            defaultValue={userInfo?.aboutCompany}
            name="aboutCompany"
            rows={7}
            required
            className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="px-10 py-2 bg-primary text-white hover:bg-blue-600"
          >
            Update
          </button>
        </div>
      </form>
    </section>
  );
};

export default CompanyInfo;
