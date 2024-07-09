'use client'

import Loading from '@/app/loading';
import { useAuth } from '@/firebase/AuthProvider';
import { useGqlClient } from '@/hooks/UseGqlClient';
import { useMutation, useQuery } from 'graphql-hooks';
import { useRouter } from 'next/navigation';
import React from 'react';
import { set } from 'react-hook-form';
import toast from 'react-hot-toast';



const GET_LEAD = `
mutation CreateLeads($input: [LeadsCreateInput!]!) {
    createLeads(input: $input) {
      info {
        nodesCreated
        relationshipsCreated
      }
    }
  }
`

const GET_INDUSTRY = `
query IndustryPages($where: IndustryPageWhere, $options: IndustryPageOptions) {
    industryPages(where: $where, options: $options) {
      id
      title
    }
  }
`


const Main = () => {




    const handleSubmit = (e: any) => {
        e.preventDefault()
        const { name, email, title, industry, linkedin, leadOwner, description, company, phone, twitter, officePhone, Website, leadSource, leadStatus, reportingTo, employeeCount, annualRevenue, skype, secondaryEmail, street, state, city, country, zip, ratting, type } = e.target.elements


        const formData = {
            name: name.value,
            email: email.value,
            title: title.value,
            industry: industry.value,
            leadOwner: leadOwner.value,
            description: description.value,
            company: company.value,
            phone: phone.value,
            twitter: twitter.value,
            officePhone: officePhone.value,
            Website: Website.value,
            leadSource: leadSource.value,
            leadStatus: leadStatus.value,
            reportingTo: reportingTo.value,
            employeeCount: employeeCount.value,
            annualRevenue: annualRevenue.value,
            skype: skype.value,
            secondaryEmail: secondaryEmail.value,
            street: street.value,
            state: state.value,
            city: city.value,
            country: country.value,
            zip: zip.value,
            linkedin: linkedin.value,
            type: type.value,
            ratting: ratting.value,
        }







        // setFormData({
        //     name: name.value,
        //     email: email.value,
        //     title: title.value,
        //     leadOwner: leadOwner.value,
        //     company: company.value,
        //     phone: phone.value,
        //     officePhone: officePhone.value,
        //     Website: Website.value,
        //     leadSource: leadSource.value,
        //     leadStatus: leadStatus.value,
        //     reportingTo: reportingTo.value,
        //     annualRevenue: annualRevenue.value,
        //     skype: skype.value,
        //     secondaryEmail: secondaryEmail.value,
        //     street: street.value,
        //     state: state.value,
        //     city: city.value,
        //     country: country.value,
        //     zip: zip.value,
        //     ratting: ratting.value,
        //     employeeCount: employeeCount.value,
        //     twitter: twitter.value,
        //     description: description.value,
        //     industry: industry.value,
        // })

        handleCreateLead(formData)



    }


    //HOOKS     
    const client = useGqlClient()
    const router = useRouter()
    const { user }: { user: any } = useAuth()




    // queries a
    const { data: industries, loading, error: industryError } = useQuery(GET_INDUSTRY, { client })
    //mutation
    const [createLead, createStatus] = useMutation(GET_LEAD, { client })




    const handleCreateLead = async (formData: any) => {

        const { data } = await createLead({
            variables: {
                "input": [
                    {
                        "name": formData.name,
                        "email": formData.email,
                        "phone": formData.phone,
                        "industry": formData.industry,
                        "createdAt": new Date().toISOString(),
                        "leadOwner": formData.leadOwner,
                        "company": formData.company,
                        "Title": formData.title,
                        "Phone": formData.phone,
                        "officePhone": formData.officePhone,
                        "website": formData.Website,
                        "employeeCount": formData.employeeCount,
                        "annualRevenue": formData.annualRevenue,
                        "skypeId": formData.skype,
                        "secondaryEmail": formData.secondaryEmail,
                        "twitter": formData.twitter,
                        "linkedin": formData.linkedin,
                        "description": formData.description,
                        "ratting": formData.ratting,
                        leadStatus: formData.leadStatus,
                        type: formData.type,
                        createdBy: user.name,
                        "hasPrimaryaddress": {
                            "create": {
                                "node": {
                                    "street": formData.street,
                                    "city": formData.city,
                                    "state": formData.state,
                                    "Country": formData.country,
                                    "zipCode": formData.zip
                                }
                            }
                        },


                    }
                ]
            }
        })

        if (data) {
            toast.success('Lead Created Successfully')
            router.push('/user/dashboard/leads')
        }

    }




    const LeadSourceOption = [
        'TWITTER',
        'LINKEDIN',
        'GOOGLE_PLUS',
        'FACEBOOK',
        'CHAT',
        'WEB_RESEARCH',
        'WEB_DOWNLOAD',
        'TRADE_SHOW',
        'INTERNAL_SEMINAR',
        'SEMINAR_PARTNER',
        'SALES_EMAIL_ALIAS',
        'PUBLIC_RELATIONS',
        'PARTNER',
        'ONLINE_STORE',
        'EXTERNAL_REFERRAL',
        'EMPLOYEE_REFERRAL',
        'COLD_CALL',
        'ADVERTISEMENT',
        "WEBSITE"
    ];

    if (createStatus.loading) return <Loading />


    if (createStatus.error) return toast.error('Something went wrong. Please try again later')

    return (
        <section className=''>
            <form onSubmit={handleSubmit} className='grid grid-cols-1 lg:grid-cols-3 gap-4'>

                <div className="mb-5">
                    <label className="capitalize block  text-gray-700 text-sm mb-1">
                        Name<span className="text-red-500">*</span>
                    </label>
                    <input
                        name="name"
                        type="text"
                        required
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div className="mb-5">
                    <label className="capitalize block  text-gray-700 text-sm mb-1">
                        Email <span className="text-red-500">*</span>
                    </label>
                    <input
                        name="email"
                        type="text"
                        required
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div className="mb-5">
                    <label className="capitalize block  text-gray-700 text-sm mb-1">
                        title
                    </label>
                    <input
                        name="title"
                        type="text"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div className="mb-5">
                    <label className="capitalize block  text-gray-700 text-sm mb-1">
                        lead Owner<span className="text-red-500">*</span>
                    </label>
                    <input
                        name="leadOwner"
                        type="text"
                        required
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div className="mb-5">
                    <label className="capitalize block  text-gray-700 text-sm mb-1">
                        company<span className="text-red-500">*</span>
                    </label>
                    <input
                        name="company"
                        type="text"
                        required
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div className="mb-5">
                    <label className="capitalize block  text-gray-700 text-sm mb-1">
                        phone<span className="text-red-500">*</span>
                    </label>
                    <input
                        name="phone"
                        type="text"
                        required
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div className="mb-5">
                    <label className="capitalize block  text-gray-700 text-sm mb-1">
                        Office Phone
                    </label>
                    <input
                        name="officePhone"
                        type="text"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div className="mb-5">
                    <label className="capitalize block  text-gray-700 text-sm mb-1">
                        Website
                    </label>
                    <input
                        name="Website"
                        type="text"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div className="mb-5">
                    <label className="capitalize block  text-gray-700 text-sm mb-1">
                        No. Employee
                    </label>
                    <input
                        name="employeeCount"
                        type="text"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                </div>

                <div className="mb-5">
                    <label className="capitalize block  text-gray-700 text-sm mb-1">
                        Source<span className="text-red-500">*</span>
                    </label>
                    <div className="relative inline-flex w-full">
                        <select className='mt-1 px-4 text-sm py-2 border border-gray-300 rounded-md w-full'
                            name='leadSource'
                            required

                        > <option >SELECT</option>
                            {
                                LeadSourceOption.map((item, index) => (
                                    <option key={index} value={item} >{item}</option>
                                ))
                            }

                        </select>

                    </div>
                </div>

                <div className="mb-5">
                    <label className="capitalize block  text-gray-700 text-sm mb-1">
                        Lead Type<span className="text-red-500">*</span>
                    </label>
                    <select className='mt-1 text-sm px-4 py-2 border border-gray-300 rounded-md w-full' name="type" required>
                        <option >SELECT</option>
                        <option value="SERVICE">SERVICE</option>
                        <option value="PRODUCT">PRODUCT</option>
                        <option value="SOLUTION">SOLUTION</option>
                        <option value="EVENT">EVENT</option>
                        <option value="LEARN">LEARN</option>

                    </select>
                </div>
                <div className="mb-5">
                    <label className="capitalize block  text-gray-700 text-sm mb-1">
                        Lead Status<span className="text-red-500">*</span>
                    </label>
                    <select className='mt-1 text-sm px-4 py-2 border border-gray-300 rounded-md w-full' name="leadStatus" required>
                        <option >SELECT</option>
                        <option value="ATTEMPTED_TO_CONTACT">ATTEMPTED_TO_CONTACT</option>
                        <option value="CONTACT_IN_FUTURE">CONTACT_IN_FUTURE</option>
                        <option value="CONTACTED">CONTACTED</option>
                        <option value="JUNK_LEAD">JUNK_LEAD</option>
                        <option value="LOST_LEAD">LOST_LEAD</option>
                        <option value="NOT_CONTACTED">NOT_CONTACTED</option>
                        <option value="PRE_QUALIFIED">PRE_QUALIFIED</option>
                        <option value="NOT_QUALIFIED">NOT_QUALIFIED</option>
                    </select>
                </div>
                <div className="mb-5">
                    <label className="capitalize block  text-gray-700 text-sm mb-1">
                        Ratting
                    </label>
                    <select className='mt-1 px-4 text-sm py-2 border border-gray-300 rounded-md w-full' name="ratting">
                        <option >SELECT</option>
                        <option value="ATTEMPTED_TO_CONTACT">ATTEMPTED_TO_CONTACT</option>
                        <option value="CONTACT_IN_FUTURE">CONTACT_IN_FUTURE</option>
                        <option value="CONTACTED">CONTACTED</option>
                        <option value="JUNK_LEAD">JUNK_LEAD</option>
                        <option value="LOST_LEAD">LOST_LEAD</option>
                        <option value="NOT_CONTACTED">NOT_CONTACTED</option>
                        <option value="PRE_QUALIFIED">PRE_QUALIFIED</option>
                        <option value="NOT_QUALIFIED">NOT_QUALIFIED</option>
                    </select>
                </div>
                <div className="mb-5">
                    <label className="capitalize block  text-gray-700 text-sm mb-1">
                        Industry<span className="text-red-500">*</span>
                    </label>
                    <select className='mt-1 px-4 py-2 border border-gray-300 rounded-md w-full' name="industry" required>
                        <option value="-NONE-">-NONE-</option>
                        <option value="ASP">ASP (APPLICATION SERVICE PROVIDER)</option>
                        <option value="DATA/TELECOM OEM">DATA/TELECOM OEM</option>
                        <option value="ERP">ERP (ENTERPRISE RESOURCE PLANNING)</option>
                        <option value="GOVERNMENT/MILITARY">GOVERNMENT/MILITARY</option>
                        <option value="LARGE ENTERPRISE">LARGE ENTERPRISE</option>
                        <option value="MANAGEMENTISV">MANAGEMENTISV</option>
                        <option value="MSP">MSP (MANAGEMENT SERVICE PROVIDER)</option>
                        <option value="NETWORK EQUIPMENT ENTERPRISE">NETWORK EQUIPMENT ENTERPRISE</option>
                        <option value="NON-MANAGEMENT ISV">NON-MANAGEMENT ISV</option>
                        <option value="OPTICAL NETWORKING">OPTICAL NETWORKING</option>
                        <option value="SERVICE PROVIDER">SERVICE PROVIDER</option>
                        <option value="SMALL/MEDIUM ENTERPRISE">SMALL/MEDIUM ENTERPRISE</option>
                        <option value="STORAGE SERVICE PROVIDER">STORAGE SERVICE PROVIDER</option>
                        <option value="SYSTEMS INTEGRATOR">SYSTEMS INTEGRATOR</option>
                        <option value="WIRELESS INDUSTRY">WIRELESS INDUSTRY</option>
                        <option value="SEZ – USERS/COMPANIES">SEZ – USERS/COMPANIES</option>
                    </select>

                </div>

                <div className="mb-5">
                    <label className="capitalize block  text-gray-700 text-sm mb-1">
                        Reporting To
                    </label>
                    <input
                        name="reportingTo"
                        type="text"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                </div>



                <div className="mb-5">
                    <label className="capitalize block  text-gray-700 text-sm mb-1">
                        Annual Revenue
                    </label>
                    <input

                        name="annualRevenue"
                        type="text"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                </div>

                <div className="mb-5">
                    <label className="capitalize block  text-gray-700 text-sm mb-1">
                        Skype
                    </label>
                    <input

                        name="skype"
                        type="text"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div className="mb-5">
                    <label className="capitalize block  text-gray-700 text-sm mb-1">
                        twitter
                    </label>
                    <input

                        name="twitter"
                        type="text"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div className="mb-5">
                    <label className="capitalize block  text-gray-700 text-sm mb-1">
                        linkedin
                    </label>
                    <input

                        name="linkedin"
                        type="text"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                </div>

                <div className="mb-5">
                    <label className="capitalize block  text-gray-700 text-sm mb-1">
                        secondary email
                    </label>
                    <input

                        name="secondaryEmail"
                        type="text"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div className="mb-5">
                    <label className="capitalize block  text-gray-700 text-sm mb-1">
                        street
                    </label>
                    <input

                        name="street"
                        type="text"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div className="mb-5">
                    <label className="capitalize block  text-gray-700 text-sm mb-1">
                        State
                    </label>
                    <input

                        name="state"
                        type="text"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div className="mb-5">
                    <label className="capitalize block  text-gray-700 text-sm mb-1">
                        City
                    </label>
                    <input

                        name="city"
                        type="text"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div className="mb-5">
                    <label className="capitalize block  text-gray-700 text-sm mb-1">
                        Country
                    </label>
                    <input

                        name="country"
                        type="text"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div className="mb-5">
                    <label className="capitalize block  text-gray-700 text-sm mb-1">
                        zip code
                    </label>
                    <input

                        name="zip"
                        type="text"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div className="mb-5 col-span-full">
                    <label className="capitalize block  text-gray-700 text-sm mb-1">
                        Description
                    </label>
                    <textarea
                        rows={6}
                        name="description"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                </div>




                <div className="mt-6">
                    <button
                        type="submit"
                        className="px-10 py-2 bg-primary text-white hover:bg-blue-600"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </section>
    );
};

export default Main;