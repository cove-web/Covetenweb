'use client'
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Tab } from '@headlessui/react';
import GeneralInfo from './GeneralInfo';
import CompanyInfo from './CompanyInfo';
import AddressInfo from './AddressInfo';
import ServicesAndIndustryTab from './ServicesAndIndustryTab';
import EquipmentTab from './EquipmentTab';
import DocumentTab from './DocumentTab';




function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}




const Tabs = ({ userInfo, setUserInfo, updateUser, getUser }: any) => {

    //states
    const [currentTab, setCurrentTab] = useState<any>(0);


    return (
        <>
            <div className="w-full">
                <div className="">
                    <Tab.Group selectedIndex={currentTab} onChange={setCurrentTab}>
                        <Tab.List className="flex space-x-1 rounded-sm bg-gray-100 p-1 w-full ">
                            <Tab
                                className={({ selected }: any) =>
                                    classNames(
                                        'w-full rounded-sm py-2.5 text-sm font-medium leading-5 text-gray-900',
                                        '',
                                        selected
                                            ? 'bg-white shadow'
                                            : 'text-gray hover:bg-blue/[0.12] hover:text-blue'
                                    )
                                }
                            >
                                General Info
                            </Tab>
                            <Tab
                                className={({ selected }: any) =>
                                    classNames(
                                        'w-full rounded-sm py-2.5 text-sm font-medium leading-5 text-gray-900',
                                        '',
                                        selected
                                            ? 'bg-white shadow'
                                            : 'text-gray hover:bg-blue/[0.12] hover:text-blue'
                                    )
                                }
                            >
                                Company Info
                            </Tab>
                            {/* <Tab
                                className={({ selected }: any) =>
                                    classNames(
                                        'w-full rounded-sm py-2.5 text-sm font-medium leading-5 text-gray-900',
                                        '',
                                        selected
                                            ? 'bg-white shadow'
                                            : 'text-gray hover:bg-blue/[0.12] hover:text-blue'
                                    )
                                }
                            >
                                Address
                            </Tab> */}
                            <Tab
                                className={({ selected }: any) =>
                                    classNames(
                                        'w-full rounded-sm py-2.5 text-sm font-medium leading-5 text-gray-900',
                                        '',
                                        selected
                                            ? 'bg-white shadow'
                                            : 'text-gray hover:bg-blue/[0.12] hover:text-blue'
                                    )
                                }
                            >
                                Service and Industry
                            </Tab>
                            <Tab
                                className={({ selected }: any) =>
                                    classNames(
                                        'w-full rounded-sm py-2.5 text-sm font-medium leading-5 text-gray-900',
                                        '',
                                        selected
                                            ? 'bg-white shadow'
                                            : 'text-gray hover:bg-blue/[0.12] hover:text-blue'
                                    )
                                }
                            >
                                Equipments
                            </Tab>
                            <Tab
                                className={({ selected }: any) =>
                                    classNames(
                                        'w-full rounded-sm py-2.5 text-sm font-medium leading-5 text-gray-900',
                                        '',
                                        selected
                                            ? 'bg-white shadow'
                                            : 'text-gray hover:bg-blue/[0.12] hover:text-blue'
                                    )
                                }
                            >
                                Documents
                            </Tab>


                        </Tab.List>
                        <Tab.Panels>
                            <Tab.Panel>
                                <GeneralInfo updateUser={updateUser} setCurrentTab={setCurrentTab} userInfo={userInfo} setUserInfo={setUserInfo} />
                            </Tab.Panel>
                            <Tab.Panel>
                                <CompanyInfo updateUser={updateUser} setCurrentTab={setCurrentTab} userInfo={userInfo} setUserInfo={setUserInfo} />
                            </Tab.Panel>

                            {/* <Tab.Panel>
                                <AddressInfo updateUser={updateUser} setCurrentTab={setCurrentTab} userInfo={userInfo} setUserInfo={setUserInfo} />
                            </Tab.Panel> */}
                            <Tab.Panel>
                                <ServicesAndIndustryTab setCurrentTab={setCurrentTab} userInfo={userInfo} />
                            </Tab.Panel>
                            <Tab.Panel>
                                <EquipmentTab getUser={getUser} setCurrentTab={setCurrentTab} userInfo={userInfo} />
                            </Tab.Panel>
                            <Tab.Panel>
                                <DocumentTab setCurrentTab={setCurrentTab} userInfo={userInfo} getUser={getUser} />
                            </Tab.Panel>

                        </Tab.Panels>
                    </Tab.Group>
                </div>
            </div>
        </>
    );
};

export default Tabs;