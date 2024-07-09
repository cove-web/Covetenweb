'use client'
import { User } from '@/gql/graphql';
import Cookies from 'js-cookie';
import React from 'react';
import EquipmentTable from './EquipmentTable';
import Link from 'next/link';
import { getNormalDateAndTime } from '@/shared/getNormalDateAndTime';
import { Tab } from '@headlessui/react';
import classNames from 'classnames';




const getUser = async (id: string) => {

    const token = Cookies.get('conventenToken');
    const res = fetch('http://localhost:25000/', {
        method: 'POST',
        headers: {
            "authorization": `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: `  query Users($where: UserWhere) {
                users(where: $where) {
                  userId
                  name
                  email
                  phone
                  bio
                  id
                  panCardNo
                  phoneNumber
                  companyName
                  companyEmail
                  gstNumber
                  title
                  education
                  department
                  companyPhone
                  linkedin
                  twitter
                  skypeId
                  experience
                  specialty
                  interest
                  companyDescription
                  status
                  user_type
                  createdBy
                  createdAt
                  hasDocuments {
                    hasFiles {
                      links
                    }
                  }
                  isVendor {
                    industry
                    service
                    equipmentDocs
                    hasManyEquipment {
                        name
                        model
                        make
                        calibrationDetails
                        warranty
                        yearOfInstallation
                      }
                  }
                  isClient {
                    industry
                    service
                    equipmentDocs
                    hasManyEquipment {
                        name
                        model
                        make
                        calibrationDetails
                        warranty
                        yearOfInstallation
                      }
                  }
                  hasPrimaryaddress {
                    id
                    street
                    city
                    state
                    Country
                    zipCode
                  }
                  hasSecondaryaddress {
                    id
                    street
                    city
                    state
                    Country
                    zipCode
                  }
                }
              }`,
            variables: {
                where: {
                    id: id
                },
            },

        }),
        next: { revalidate: 10 }
    })

    const { data } = await res.then(res => res.json())

    return data?.users[0]

}


// const getProject = async (id: string) => {
//     const token = Cookies.get('conventenToken');
//     const res = await fetch('http://localhost:25000/', {
//         method: 'POST',
//         headers: {
//             "authorization": `Bearer ${token}`,
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             query: `query Users($where: UserWhere) {
//                 users(where: $where) {
//                   id
//                   isVendor {
//                     hasModuleticket {
//                         id
//                         status
//                     }
//                   }
//                 }
//               }`,
//             variables: {
//                 where: {
//                     id: id
//                 },
//             },
//         }),
//         next: { revalidate: 10 }
//     });

//     const { data } = await res.json();
//     console.log(data);

//     // Extract the projects for the vendor
//     const projects = data?.users[0]?.isVendor?.hasModuleticket || [];
    
//     // Calculate the project counts based on status
//     const totalProjects = projects.length;
//     const acceptedProjects = projects.filter((project: any) => project.status === 'accepted').length;
//     const rejectedProjects = projects.filter((project: any) => project.status === 'rejected').length;
//     const completedProjects = projects.filter((project: any) => project.status === 'COMPLETED').length;
//     const draftedProjects = projects.filter((project: any)=> project.status === 'DRAFT').length;

//     return { totalProjects, acceptedProjects, rejectedProjects, completedProjects,draftedProjects };
// };
const getProject = async (id: string) => {
    const token = Cookies.get('conventenToken');
    const res = await fetch('http://localhost:25000/', {
        method: 'POST',
        headers: {
            "authorization": `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: `query Users($where: UserWhere) {
                users(where: $where) {
                  id
                  isVendor {
                    hasModuleticket {
                        id
                        status
                        rejectedReason
                        createdAt
                        projectticketHas {
                            forProject {
                                title
                                status
                            }
                        }
                    }
                  }
                }
              }`,
            variables: {
                where: {
                    id: id
                },
            },
        }),
        next: { revalidate: 10 }
    });

    const { data } = await res.json();
    console.log(data);

    // Extract the projects for the vendor
    const projects = data?.users[0]?.isVendor?.hasModuleticket || [];
    
    // Calculate the project counts based on status
    const totalProjects = projects.length;
    const acceptedProjects = projects.filter((project: any) => project.status === 'accepted').length;
    const rejectedProjects = projects.filter((project: any) => project.status === 'rejected').length;
    const completedProjects = projects.filter((project: any) => project.status === 'COMPLETED').length;
    const draftedProjects = projects.filter((project: any) => project.status === 'DRAFT').length;

    // Extract rejection reasons for rejected projects
    const rejectedProjectDetails = projects
        .filter((project: any) => project.status === 'rejected')
        .map((project: any) => ({
            id: project.id,
            rejectedReason: project.rejectedReason,
        }));

    // Extract project titles
    const projectTitles = projects.map((project: any) => ({
        title: project.projectticketHas?.forProject?.title || 'N/A',
        status: project.projectticketHas?.forProject?.status || 'N/A'
    }));

    return { 
        totalProjects, 
        acceptedProjects, 
        rejectedProjects, 
        completedProjects, 
        draftedProjects,
        rejectedProjectDetails,
        projectTitles // Added project titles here
    };
};



// Usage example:
// const projectTicket = await getProjectTicket("projectTicketId");

const UserInfo = async ({ params }: { params: any }) => {

    const userData: any = await getUser(params?.id || 'no id')
const projectData: any = await getProject(params?.id || 'no id')

    function UserDetails() {
        return (
            <div>
                {/* Content for User Details */}
                <h1 className='text-4xl font-semibold my-6'>User Details</h1>
                <p className='text-sm text-gray-600'>Created At: {getNormalDateAndTime(userData?.createdAt)}</p>
                {/* Add more details as needed */}

            <div>
                <h3 className='text-lg font-semibold mb-3 mt-5'>General Information</h3>

                <div className='grid grid-cols-2 lg:grid-cols-3 gap-3 text-sm'>
                    <p>
                        Account Type : {userData?.user_type === "SERVICE_PROVIDER" ? "Service Provider" : "Consumer"}
                    </p>
                    <p>
                        User Id : {userData?.userId || 'N/A'}
                    </p>
                    <p>
                        Name : {userData?.name || 'N/A'}
                    </p>
                    <p>
                        Email : {userData?.email || 'N/A'}
                    </p>
                    <p>
                        Phone Number : {userData?.phoneNumber || 'N/A'}
                    </p>
                    <p>
                        Title : {userData?.title || 'N/A'}
                    </p>

                    <p>
                        Eduction: {userData?.education || 'N/A'}
                    </p>
                    <p>
                        Experience: {userData?.experience || 'N/A'}
                    </p>
                    <p>
                        Specialty: {userData?.specialty || 'N/A'}
                    </p>
                    <p>
                        Department: {userData?.department || 'N/A'}
                    </p>
                    <p>
                        Interest: {userData?.interest || 'N/A'}
                    </p>
                    <p className='col-span-full'>
                        Bio: {userData?.bio || 'N/A'}
                    </p>
                </div>
            </div>
            <div>
                <h3 className='text-lg font-semibold mb-3 mt-8'>Company Information</h3>

                <div className='grid grid-cols-2 lg:grid-cols-3  gap-3 text-sm'>
                    <p className='col-span-full'>
                        About : {userData?.companyDescription || 'N/A'}
                    </p>
                    <p>
                        Company Name : <span className='capitalize'>{userData?.companyName || 'N/A'}</span>
                    </p>
                    <p>
                        Company Email : {userData?.companyEmail || 'N/A'}
                    </p>
                    <p>
                        Company Phone Number : {userData?.companyPhone || 'N/A'}
                    </p>
                    <p>
                        Other Phone Number : {userData?.phone || 'N/A'}
                    </p>
                    <p>
                        GST Number : {userData?.gstNumber || 'N/A'}
                    </p>
                    <p>
                        Pan Card Number : {userData?.panCardNo || 'N/A'}
                    </p>

                    {
                        userData?.user_type === "SERVICE_PROVIDER" ? <>
                            <ul className='list-disc list-inside'>
                                <h3 className='mb-4'>Services</h3>
                                {
                                    userData?.isVendor && userData?.isVendor?.service?.map((service: any, index: number) => (
                                        <li className='uppercase text-xs' key={index}>{service}</li>
                                    ))
                                }
                            </ul>
                            <ul className='list-disc list-inside'>
                                <h3 className='mb-4'>Industries</h3>
                                {
                                    userData?.isVendor && userData?.isVendor?.industry?.map((service: any, index: number) => (
                                        <li className='uppercase text-xs' key={index}>{service}</li>
                                    ))
                                }
                            </ul>


                        </>
                            :

                            <>

                                <ul className='list-disc list-inside'>
                                    <h3 className='mb-4'>Services</h3>
                                    {
                                        userData?.isClient && userData?.isClient?.service?.map((service: any, index: number) => (
                                            <li className='uppercase text-xs' key={index}>{service}</li>
                                        ))
                                    }
                                </ul>
                                <ul className='list-disc list-inside'>
                                    <h3 className='mb-4'>Industries</h3>
                                    {
                                        userData?.isClient && userData?.isClient?.industry?.map((service: any, index: number) => (
                                            <li className='uppercase text-xs' key={index}>{service}</li>
                                        ))
                                    }
                                </ul>

                            </>
                    }
                    <ul className='list-disc list-inside'>
                        <h3 className='mb-4'>Social Media</h3>
                        <li>
                            Linkedin : {userData?.linkedin}
                        </li>
                        <li>
                            Twitter : {userData?.twitter}
                        </li>
                        <li>
                            Skype : {userData?.skypeId}
                        </li>
                    </ul>

                    {
                        userData?.user_type === "SERVICE_PROVIDER" ?
                            <div className='col-span-full'>

                                <h4 className='font-semibold mt-6 mb-3'>
                                    Equipment Details
                                </h4>
                                <EquipmentTable data={userData?.isVendor?.hasManyEquipment} />
                            </div>
                            :
                            <div className='col-span-full'>

                                <h4 className='font-semibold mt-6 mb-3'>
                                    Equipment Details
                                </h4>
                                <EquipmentTable data={userData?.isClient?.hasManyEquipment} />
                            </div>
                    }

                </div>
            </div>

            <div>
                <h3 className='text-lg font-semibold mb-3 mt-10'>Address</h3>

                <div className='grid grid-cols-2 lg:grid-cols-3  gap-3 text-sm'>
                    <p className='col-span-full font-bold '>
                        Primary Address
                    </p>
                    <p>
                        Street : {userData?.hasPrimaryaddress?.street || 'N/A'}
                    </p>
                    <p>
                        City : {userData?.hasPrimaryaddress?.city || 'N/A'}
                    </p>
                    <p>
                        State : {userData?.hasPrimaryaddress?.state || 'N/A'}
                    </p>
                    <p>
                        Country : {userData?.hasPrimaryaddress?.Country || 'N/A'}
                    </p>
                    <p>
                        Zip Code : {userData?.hasPrimaryaddress?.zipCode || 'N/A'}
                    </p>

                    <p className='col-span-full font-bold'>
                        Secondary Address
                    </p>
                    <p>
                        Street : {userData?.hasSecondaryaddress?.street || 'N/A'}
                    </p>
                    <p>
                        City : {userData?.hasSecondaryaddress?.city || 'N/A'}
                    </p>
                    <p>
                        State : {userData?.hasSecondaryaddress?.state || 'N/A'}
                    </p>
                    <p>
                        Country : {userData?.hasSecondaryaddress?.Country || 'N/A'}
                    </p>
                    <p>
                        Zip Code : {userData?.hasSecondaryaddress?.zipCode || 'N/A'}
                    </p>

                </div>
            </div>

            <div className="space-y-4 text-gray-800 mt-2 relative top-10 ">
                <div className="my-2 space-y-1">
                    <h2 className="text-xl font-semibold sm:text-2xl">Documents</h2>
                </div>

                <div className='mt-3 grid grid-cols-2 lg:grid-cols-5 gap-2 lg:gap-6'>
                    {
                        userData?.hasDocuments ?
                            userData?.hasDocuments?.hasFiles?.links?.map((item: any, index: number) =>
                                <Link target='_blank' href={item || '#'}
                                    key={index}
                                    style={{
                                        backgroundImage: `url(${'/assets/file.svg'})`,
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'center',

                                    }}
                                    className=' h-28 w-24 text-sm flex items-center justify-center text-gray-800 font-semibold'>
                                    document-{index + 1}
                                </Link>

                            )
                            :

                            <p className='mt-3 text-xs col-span-full'>No Document Found</p>
                    }


                </div>
                <div className='relative bg-transprent mb-20'>

                    <div className="my-2 space-y-1 ">
                        <h2 className="text-xl font-semibold sm:text-2xl">Attachment</h2>
                    </div>



                    <div className='mt-3 grid grid-cols-2 lg:grid-cols-5 gap-2 lg:gap-6'>
                        {
                            userData?.isVendor ?
                                userData?.isVendor?.equipmentDocs?.map((item: any, index: number) =>
                                    <Link target='_blank' href={item || '#'}
                                        key={index}
                                        style={{
                                            backgroundImage: `url(${'/assets/file.svg'})`,
                                            backgroundRepeat: 'no-repeat',
                                            backgroundPosition: 'center',

                                        }}
                                        className=' h-28 w-24 text-sm flex items-center justify-center text-gray-800 font-semibold'>
                                        document-{index + 1}
                                    </Link>

                                )
                                :

                                <p className='mt-3 text-xs col-span-full'></p>
                        }
                        {
                            userData?.isClient ?
                                userData?.isClient?.equipmentDocs?.map((item: any, index: number) =>
                                    <Link target='_blank' href={item || '#'}
                                        key={index}
                                        style={{
                                            backgroundImage: `url(${'/assets/file.svg'})`,
                                            backgroundRepeat: 'no-repeat',
                                            backgroundPosition: 'center',

                                        }}
                                        className=' h-28 w-24 text-sm flex items-center justify-center text-gray-800 font-semibold'>
                                        document-{index + 1}
                                    </Link>

                                )
                                :

                                <p className='mt-3 text-xs col-span-full'></p>
                        }


                    </div>
                </div>
            </div>
            </div>
        );
    }
    
    function UserInfo() {
        return (
            <div>
           
           <div>
            <h1 className='text-4xl font-semibold my-6'>Project Details</h1>
            <div className='grid grid-cols-2 lg:grid-cols-3 gap-3 text-sm'>
                <p>Total Projects: {projectData.totalProjects}</p>
                <p>Accepted Projects: {projectData.acceptedProjects}</p>
                <p>Rejected Projects: {projectData.rejectedProjects}</p>
                <p>Completed Projects: {projectData.completedProjects}</p>
                <p>Draft Projects: {projectData.draftedProjects}</p>
                <h2 className='col-span-full text-xl font-semibold my-4'>Rejection Reasons</h2>
                {
                    projectData.rejectedProjectDetails.map((detail: any, index: number) => (
                        <p key={index}>Project {detail.id}: {detail.rejectedReason}</p>
                    ))
                }
                <h2 className='col-span-full text-xl font-semibold my-4'>Project Titles</h2>
                {
                    projectData.projectTitles.map((project: any, index: number) => (
                        <Link key={index} href={`/admin/dashboard/projects`}>
                            <p>Title: {project.title}</p>
                        </Link>
                    ))
                }
                <h2 className='col-span-full text-xl font-semibold my-4'>Project Statuses</h2>
                {
                    projectData.projectTitles.map((project: any, index: number) => (
                        <p key={index}>Status: {project.status}</p>
                    ))
                }
            </div>
            </div>
        </div>
        );
    }
    return (
        <section className='bg-white p-2 lg:p-8'                                 style={{backgroundColor:'#e8e8e880'}}
        >
            <div className='lg:flex items-center justify-between'>
                {/* <h1 className='text-4xl font-semibold my-6'>
                    User Details
                </h1>
                <h1 className='text-4xl font-semibold my-6'>
                    User Info
                </h1> */}
                 <div className="w-full mt-7">
                <Tab.Group>
                    <Tab.List className="sm:flex items-center justify-between">
                        <div>
                            <Tab
                                className={({ selected }) =>
                                    classNames(
                                        'py-2 px-8 mr-3',
                                        selected
                                            ? 'border-b-2 border-primary text-gray-900'
                                            : 'text-gray-900 hover:border-b-2 hover:border-primary'
                                    )
                                }
                            >
                                User Details

                            </Tab>
                            <Tab
                                className={({ selected }) =>
                                    classNames(
                                        'py-2 px-8 mr-3',
                                        selected
                                            ? 'border-b-2 border-primary text-gray-900'
                                            : 'text-gray-900 hover:border-b-2 hover:border-primary'
                                    )
                                }
                            >
                                User Info
                            </Tab>
                        </div>
                    </Tab.List>
                    <Tab.Panels>
                        <Tab.Panel>
                            <UserDetails />
                        </Tab.Panel>
                        <Tab.Panel>
                            <UserInfo />
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
                
                {/* <p className='text-sm text-gray-600'>
                    Created At:  {getNormalDateAndTime(userData?.createdAt)}
                </p> */}
            </div>
            </div>
            


        </section>
    );
};

export default UserInfo;
