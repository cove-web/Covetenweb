import Loading from '@/app/loading';
import { useAuth } from '@/firebase/AuthProvider';
import { useGqlClient } from '@/hooks/UseGqlClient';
import { useManualQuery, useQuery } from 'graphql-hooks';
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';

interface IProps {
    setUserInfo: any,
    userInfo: any,
    setCurrentTab?: any,
    updateUser: any

}



const GeneralInfo = ({ setUserInfo, userInfo, setCurrentTab, updateUser }: IProps) => {

    const { user, authLoading }: any = useAuth()

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





    useEffect(() => { }, [userInfo?.email])








    return (
        <section className='mt-6'>
            <form onSubmit={handleSubmit} className='grid grid-cols-1 lg:grid-cols-3 gap-4'>

                {
                    user?.user_type !== "LAB_ASSISTANT" &&
                    <>
                        <div className="mb-5">
                            <label className="block  text-gray-700 text-sm mb-1">
                                User Id
                            </label>
                            <input
                                defaultValue={userInfo?.userId}
                                readOnly
                                type="text"
                                className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                            />
                        </div>
                    </>
                }

                <div className="mb-5">
                    <label className="block  text-gray-700 text-sm mb-1">
                        Name
                    </label>
                    <input
                        defaultValue={userInfo?.name}
                        name="name"
                        type="text"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div className="mb-5">
                    <label className="block  text-gray-700 text-sm mb-1">
                        Email
                    </label>
                    <input
                        defaultValue={userInfo?.email}
                        required
                        name="email"
                        type="text"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />


                </div>

                <div className="mb-5">
                    <label className="block  text-gray-700 text-sm mb-1">
                        Phone
                    </label>
                    <input
                        defaultValue={userInfo?.phone}
                        name="phone"
                        type="text"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div className="mb-5">
                    <label className="block  text-gray-700 text-sm mb-1">
                        Title
                    </label>
                    <input
                        defaultValue={userInfo?.title}
                        name="title"
                        type="text"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div className="mb-5">
                    <label className="block  text-gray-700 text-sm mb-1">
                        Department
                    </label>
                    <input
                        defaultValue={userInfo?.department}
                        name="department"
                        type="text"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div className="mb-5">
                    <label className="block  text-gray-700 text-sm mb-1">
                        Education
                    </label>
                    <input
                        defaultValue={userInfo?.education}
                        name="education"
                        type="text"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div className="mb-5">
                    <label className="block  text-gray-700 text-sm mb-1">
                        Experience
                    </label>
                    <input
                        defaultValue={userInfo?.experience}
                        name="experience"
                        type="text"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div className="mb-5">
                    <label className="block  text-gray-700 text-sm mb-1">
                        Specialty
                    </label>
                    <input
                        defaultValue={userInfo?.specialty}
                        name="specialty"
                        type="text"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div className="mb-5">
                    <label className="block  text-gray-700 text-sm mb-1">
                        Interest
                    </label>
                    <input
                        defaultValue={userInfo?.interest}
                        name="interest"
                        type="text"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                </div>



                <div className="mb-5 col-span-full">
                    <label className="block  text-gray-700 text-sm mb-1">
                        Bio
                    </label>
                    <textarea
                        defaultValue={userInfo?.bio}
                        name="bio"
                        rows={7}
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"

                    />
                </div>


                {/* <div className="mb-5">
                                        <label htmlFor="image" className="block  text-gray-700 text-sm mb-1">
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