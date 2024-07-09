'use client'

import Loading from '@/app/loading';
import { useAuth } from '@/firebase/AuthProvider';
import { Leads } from '@/gql/graphql';
import { useGqlClient } from '@/hooks/UseGqlClient';
import { getNormalDateAndTime } from '@/shared/getNormalDateAndTime';
import { useMutation, useQuery } from 'graphql-hooks';
import { useRouter } from 'next/navigation';
import React from 'react';
import { set } from 'react-hook-form';
import toast from 'react-hot-toast';



const UPDATE_LEAD = `
mutation UpdateLeads($update: LeadsUpdateInput, $where: LeadsWhere) {
    updateLeads(update: $update, where: $where) {
      info {
        nodesCreated
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

const GET_PREVIOUS_DATA = `
query Leads($where: LeadsWhere) {
    leads(where: $where) {
      id
      name
      email
      phone
      industry
      gstNumber
      message
      createdAt
      duration
      vendorAddress
      price
      type
      interest
      condition
      leadOwner
      company
      Title
      Phone
      officePhone
      website
      employeeCount
      annualRevenue
      skypeId
      secondaryEmail
      twitter
      linkedin
      description
      leadSource
      leadStatus
      ratting
      status
      updatedBy
      updatedAt
      hasPrimaryaddress {
        street
        city
        state
        Country
        zipCode
      }
    }
  }
`


const Main = ({ id }: { id: string }) => {

    //HOOKS     
    const client = useGqlClient()
    const router = useRouter()
    const { user }: { user: any } = useAuth()







    // queries
    const { data: industries, loading, error: industryError } = useQuery(GET_INDUSTRY, { client })
    const { data: previousData, loading: preLoading, refetch } = useQuery(GET_PREVIOUS_DATA, {
        client,
        variables: {
            where: {
                id: id
            },
        }
    })
    //mutation
    const [createLead, createStatus] = useMutation(UPDATE_LEAD, { client })


    // FUNCTIONS
    const handleSubmit = (e: any) => {
        e.preventDefault()
        const { name, email, title, industry, linkedin, leadOwner, description, company, phone, twitter, officePhone, Website, leadSource, leadStatus, employeeCount, annualRevenue, skype, secondaryEmail, street, state, city, country, zip, ratting } = e.target.elements


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
        }
        handleCreateLead(formData)



    }

    const handleCreateLead = async (formData: any) => {

        const { data } = await createLead({
            variables: {

                "where": {
                    "id": previousData?.leads[0]?.id
                },
                "update": {
                    "name": formData.name,
                    "email": formData.email,
                    "phone": formData.phone,
                    "industry": formData.industry,
                    // "createdAt": new Date().toISOString(),
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
                    updatedAt: new Date().toISOString(),
                    updatedBy: user.name,
                    "hasPrimaryaddress": {
                        "update": {
                            "node": {
                                "street": formData.street,
                                "city": formData.city,
                                "state": formData.state,
                                "Country": formData.country,
                                "zipCode": formData.zip,
                            }
                        }
                    }
                }


            }
        })

        if (data) {
            toast.success('Lead updated Successfully')
            refetch()
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

    if (createStatus.loading || preLoading) return <Loading />

    return (
        <section className='mt-12'>
            <div className='bg-gray-100 flex items-center justify-between w-full h-20 mb-12 p-4'>
                <div>
                    <p className='text-sm'>
                        Created At : {
                            getNormalDateAndTime(previousData?.leads[0]?.createdAt as string)
                        }
                    </p>
                    <p className='text-sm'>By : {previousData?.leads[0]?.createdBy}</p>
                </div>
                {previousData?.leads[0]?.updatedAt &&
                    <div>
                        <p className='text-sm'>
                            Modified At : {
                                getNormalDateAndTime(previousData?.leads[0]?.updatedAt as string)
                            }
                        </p>
                        <p className='text-sm'>By : {previousData?.leads[0]?.updatedBy}</p>
                    </div>
                }
            </div>
            <form onSubmit={handleSubmit} className='grid grid-cols-1 lg:grid-cols-3 gap-4'>

                <div className="mb-5">
                    <label className="capitalize block  text-gray-700 text-sm mb-1">
                        Lead Name
                    </label>
                    <input
                        defaultValue={previousData?.leads[0]?.name as string}
                        name="name"
                        type="text"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div className="mb-5">
                    <label className="capitalize block  text-gray-700 text-sm mb-1">
                        Email
                    </label>
                    <input
                        defaultValue={previousData?.leads[0]?.email as string}
                        name="email"
                        type="text"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div className="mb-5">
                    <label className="capitalize block  text-gray-700 text-sm mb-1">
                        title
                    </label>
                    <input
                        defaultValue={previousData?.leads[0]?.Title as string}
                        name="title"
                        type="text"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div className="mb-5">
                    <label className="capitalize block  text-gray-700 text-sm mb-1">
                        lead Owner
                    </label>
                    <input
                        defaultValue={previousData?.leads[0]?.leadOwner as string}
                        name="leadOwner"
                        type="text"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div className="mb-5">
                    <label className="capitalize block  text-gray-700 text-sm mb-1">
                        company
                    </label>
                    <input
                        defaultValue={previousData?.leads[0]?.company as string}
                        name="company"
                        type="text"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div className="mb-5">
                    <label className="capitalize block  text-gray-700 text-sm mb-1">
                        phone
                    </label>
                    <input
                        defaultValue={previousData?.leads[0]?.Phone as string}
                        name="phone"
                        type="text"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div className="mb-5">
                    <label className="capitalize block  text-gray-700 text-sm mb-1">
                        Office Phone
                    </label>
                    <input
                        defaultValue={previousData?.leads[0]?.officePhone as string}
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
                        defaultValue={previousData?.leads[0]?.website as string}
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
                        defaultValue={previousData?.leads[0]?.employeeCount as string}
                        name="employeeCount"
                        type="text"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                </div>

                <div className="mb-5">
                    <label className="capitalize block  text-gray-700 text-sm mb-1">
                        Source
                    </label>
                    <div className="relative inline-flex w-full">
                        <select
                            defaultValue={previousData?.leads[0]?.leadSource as string}
                            className='mt-1 px-4 py-2 text-sm border border-gray-300 rounded-md w-full'
                            name='leadSource'

                        >  <option >SELECT</option>
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
                        Lead Type
                    </label>
                    <select
                        defaultValue={previousData?.leads[0]?.type as string}
                        className='mt-1 text-sm px-4 py-2 border border-gray-300 rounded-md w-full' name="type">
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
                        Lead Status
                    </label>
                    <select
                        defaultValue={previousData?.leads[0]?.leadStatus as string}
                        className='mt-1 px-4 py-2 border text-sm border-gray-300 rounded-md w-full' name="leadStatus">

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
                    <select
                        defaultValue={previousData?.leads[0]?.ratting as string}
                        className='mt-1 px-4 py-2 border text-sm border-gray-300 rounded-md w-full' name="ratting">
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
                        Industry
                    </label>
                    <select
                        defaultValue={previousData?.leads[0]?.industry as string}
                        className='mt-1 px-4 py-2 border border-gray-300 rounded-md w-full' name="industry">
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

                {/* <div className="mb-5">
                    <label className="capitalize block  text-gray-700 text-sm mb-1">
                        Reporting To
                    </label>
                    <input
                        defaultValue={previousData?.leads[0]?. as string}
                        name="reportingTo"
                        type="text"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                </div> */}



                <div className="mb-5">
                    <label className="capitalize block  text-gray-700 text-sm mb-1">
                        Annual Revenue
                    </label>
                    <input
                        defaultValue={previousData?.leads[0]?.annualRevenue as string}
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
                        defaultValue={previousData?.leads[0]?.skypeId as string}
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
                        defaultValue={previousData?.leads[0]?.twitter as string}
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
                        defaultValue={previousData?.leads[0]?.linkedin as string}
                        name="linkedin"
                        type="text"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                </div>

                <div className="mb-5">
                    <label className="capitalize block  text-gray-700 text-sm mb-1">
                        secondary Email
                    </label>
                    <input
                        defaultValue={previousData?.leads[0]?.secondaryEmail as string}
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
                        defaultValue={previousData?.leads[0]?.hasPrimaryaddress?.street as string}
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
                        defaultValue={previousData?.leads[0]?.hasPrimaryaddress?.state as string}
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
                        defaultValue={previousData?.leads[0]?.hasPrimaryaddress?.city as string}
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

                        defaultValue={previousData?.leads[0]?.hasPrimaryaddress?.Country as string}
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
                        defaultValue={previousData?.leads[0]?.hasPrimaryaddress?.zipCode as string}
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
                        defaultValue={previousData?.leads[0]?.description as string}
                        name="description"
                        rows={6}
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