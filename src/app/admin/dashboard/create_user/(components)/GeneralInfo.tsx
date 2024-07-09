import Loading from '@/app/loading';
import { useGqlClient } from '@/hooks/UseGqlClient';
import { useManualQuery, useQuery } from 'graphql-hooks';
import React from 'react';
import toast from 'react-hot-toast';

interface IProps {
    setFormData: any,
    formData: any,
    setCurrentTab: any,

}

const GET_USER_BY_EMAIL = `
query Users($where: UserWhere) {
    users(where: $where) {
      email
    }
  }
`

const GeneralInfo = ({ setFormData, formData, setCurrentTab, }: IProps) => {

    //states
    const [error, setError] = React.useState<any>(null);



    //HOOKS     
    const client = useGqlClient()



    //quires
    const [isUserExistsFn, state] = useManualQuery(GET_USER_BY_EMAIL, { client })


    //function

    const isUserExists = async (email: string) => {
        const { data } = await isUserExistsFn({ variables: { where: { email: email } } })
        if (data?.users.length > 0) {
            return true
        } else {
            return false
        }
    }




    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const { name, email, phone, title, department, education, experience, specialty, interest, reportingTo, bio, userType } = e.target




        const isExists = await isUserExists(email.value)

        if (isExists) {
            toast.error('User already exists')
            setError('User already exists')
            return
        }


        setFormData({
            ...formData,
            name: name.value,
            email: email.value,
            // password: password.value,
            phone: phone.value,
            title: title.value,
            department: department.value,
            education: education.value,
            experience: experience.value,
            specialty: specialty.value,
            interest: interest.value,
            reportingTo: reportingTo.value,
            userType: userType.value,
            bio: bio.value,

        })
        setCurrentTab(1)
    };

    if (state.loading) return <Loading />

    return (
        <section className='mt-6'>
            <form onSubmit={handleSubmit} className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
                <div className="mb-5">
                    <label className="block  text-gray-700 text-sm mb-1">
                        User Type
                    </label>
                    <div className="relative inline-flex w-full">
                        <select
                            name='userType'
                            className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                        >
                            <option  >Select</option>
                            <option value="CONSUMER" >Consumer</option>
                            <option value="SERVICE_PROVIDER" >Service Provider</option>

                        </select>

                    </div>
                </div>
                <div className="mb-5">
                    <label className="block  text-gray-700 text-sm mb-1">
                        Name
                    </label>
                    <input
                        defaultValue={formData.name}
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
                        defaultValue={formData.email}
                        required
                        name="email"
                        type="text"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                    {
                        error && <p className='text-sm mt-1 text-red-600'>
                            {error}
                        </p>
                    }

                </div>
                {/* <div className="mb-5">
                    <label className="block  text-gray-700 text-sm mb-1">
                        password
                    </label>
                    <input
                        defaultValue={formData.password}
                        name="password"
                        type="text"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                </div> */}
                <div className="mb-5">
                    <label className="block  text-gray-700 text-sm mb-1">
                        Phone
                    </label>
                    <input
                        defaultValue={formData.phone}
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
                        defaultValue={formData.title}
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
                        defaultValue={formData.department}
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
                        defaultValue={formData.education}
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
                        defaultValue={formData.experience}
                        name="experience"
                        type="text"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div className="mb-5">
                    <label className="block  text-gray-700 text-sm mb-1">
                        specialty
                    </label>
                    <input
                        defaultValue={formData.specialty}
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
                        defaultValue={formData.interest}
                        name="interest"
                        type="text"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div className="mb-5">
                    <label className="block  text-gray-700 text-sm mb-1">
                        Reporting To
                    </label>
                    <input
                        defaultValue={formData.reportingTo}
                        name="reportingTo"
                        type="text"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                </div>


                <div className="mb-5 col-span-full">
                    <label className="block  text-gray-700 text-sm mb-1">
                        Bio
                    </label>
                    <textarea
                        defaultValue={formData.bio}
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
                        Next
                    </button>
                </div>
            </form>
        </section>
    );
};

export default GeneralInfo;