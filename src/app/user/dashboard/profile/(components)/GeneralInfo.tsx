import Loading from '@/app/loading';
import { useGqlClient } from '@/hooks/UseGqlClient';
import { useManualQuery, useQuery } from 'graphql-hooks';
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';

interface IProps {
    setUserInfo: any,
    userInfo: any,
    setCurrentTab: any,
    updateUser: any

}



const GeneralInfo = ({ setUserInfo, userInfo, setCurrentTab, updateUser }: IProps) => {



    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const { name, email, phone, title, department, education, experience, specialty, interest, bio, } = e.target

        const updatedData =
        {
            ...userInfo,
            name: name.value,
            email: email.value,
            phone: phone.value,
            title: title.value,
            department: department.value,
            education: education.value,
            experience: experience.value,
            specialty: specialty.value,
            interest: interest.value,
            bio: bio.value,

        }

        updateUser(updatedData)
    };





    useEffect(() => { }, [userInfo])








    return (
        <section className='mt-6'>
            <form onSubmit={handleSubmit} className='grid grid-cols-1 lg:grid-cols-3 gap-4'>

                <div className="mb-5" style={{color:'white'}}>
                    <label className="block  text-white-700 text-sm mb-1">
                        User Id<span className="text-red-500">*</span>
                    </label>
                    <input
                    style={{color:'white'}}
                        defaultValue={userInfo?.userId}
                        readOnly
                        type="text"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div className="mb-5" style={{color:'white'}}>
                    <label className="block  text-white-700 text-sm mb-1">
                        Name<span className="text-red-500">*</span>
                    </label>
                    <input
                        defaultValue={userInfo?.name}
                        name="name"
                        style={{color:'white'}}
                        type="text"
                        required
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div className="mb-5" style={{color:'white'}}>
                    <label className="block  text-white-700 text-sm mb-1">
                        Email<span className="text-red-500">*</span>
                    </label>
                    <input
                        defaultValue={userInfo?.email}
                        required
                        style={{color:'white'}}
                        name="email"
                        type="text"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />


                </div>

                <div className="mb-5" style={{color:'white'}}>
                    <label className="block  text-white-700 text-sm mb-1">
                        Phone<span className="text-red-500">*</span>
                    </label>
                    <input
                        defaultValue={userInfo?.phone}
                        name="phone"
                        style={{color:'white'}}
                        required
                        type="text"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div className="mb-5" style={{color:'white'}}>
                    <label className="block  text-white-700 text-sm mb-1">
                        Title<span className="text-red-500">*</span>
                    </label>
                    <input
                        defaultValue={userInfo?.title}
                        name="title"
                        style={{color:'white'}}
                        type="text"
                        required
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div className="mb-5" style={{color:'white'}}>
                    <label className="block  text-white-700 text-sm mb-1">
                        Department<span className="text-red-500">*</span>
                    </label>
                    <input
                        defaultValue={userInfo?.department}
                        name="department"
                        type="text"
                        style={{color:'white'}}
                        required
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div className="mb-5" style={{color:'white'}}>
                    <label className="block  text-white-700 text-sm mb-1">
                        Education<span className="text-red-500">*</span>
                    </label>
                    <input
                        defaultValue={userInfo?.education}
                        name="education"
                        type="text"
                        style={{color:'white'}}
                        required
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div className="mb-5" style={{color:'white'}}>
                    <label className="block  text-white-700 text-sm mb-1">
                        Experience<span className="text-red-500">*</span>
                    </label>
                    <input
                        defaultValue={userInfo?.experience}
                        name="experience"
                        type="text"
                        style={{color:'white'}}
                        required
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div className="mb-5" style={{color:'white'}}>
                    <label className="block  text-white-700 text-sm mb-1">
                        Specialty<span className="text-red-500">*</span>
                    </label>
                    <input
                        defaultValue={userInfo?.specialty}
                        name="specialty"
                        type="text"
                        required
                        style={{color:'white'}}
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div className="mb-5" style={{color:'white'}}>
                    <label className="block  text-white-700 text-sm mb-1">
                        Interest<span className="text-red-500">*</span>
                    </label>
                    <input
                        defaultValue={userInfo?.interest}
                        name="interest"
                        required
                        style={{color:'white'}}
                        type="text"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                </div>



                <div className="mb-5 col-span-full bg-transperent" style={{color:'white'}} >
                    <label className="block  text-white-700 text-sm mb-1">
                        Bio<span className="text-red-500">*</span>
                    </label>
                    <textarea
                        defaultValue={userInfo?.bio}
                        name="bio"
                        rows={7}
                        // style={{color:'white'}}
                        required
                        style={{backgroundColor:'transparent',color:'white'}}
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"

                    />
                </div>


                {/* <div className="mb-5">
                                        <label htmlFor="image" className="block  text-white-700 text-sm mb-1">
                                            Image Upload
                                        </label>
                                        <input
                                            id="image"
                                            name="image"
                                            type="file"
                                            className="mt-1"
                                            onChange={handleImageUpload}
                                        />
                                    </div> */}

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

export default GeneralInfo;