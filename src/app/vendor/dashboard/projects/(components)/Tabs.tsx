'use client'
import React from 'react';
import { Tab } from '@headlessui/react';
import NewModules from './NewModules';
import AcceptedModules from './AcceptedModules';
import CompletedModules from './CompletedModules';
import RejectedModules from './RejectedModules';




function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}



// component
const Tabs = () => {
    return (
        <div className="w-full mt-7">
            <Tab.Group>
                <Tab.List className="sm:flex items-center justify-between">
                    <div className=''>
                        <Tab
                            className={({ selected }) =>
                                classNames(
                                    ' py-2 px-8   mr-3',
                                    '',
                                    selected
                                        ? ' border-b-2  border-primary text-gray-900'
                                        : 'text-gray-900 hover:border-b-2   hover:border-primary'
                                )
                            }
                        >
                            New Modules
                        </Tab>
                        <Tab
                            className={({ selected }) =>
                                classNames(
                                    ' py-2 px-8   mr-3',
                                    '',
                                    selected
                                        ? ' border-b-2  border-primary text-gray-900'
                                        : 'text-gray-900 hover:border-b-2  hover:border-primary'
                                )
                            }
                        >
                            Accepted
                        </Tab>
                        <Tab
                            className={({ selected }) =>
                                classNames(
                                    ' py-2 px-8   mr-3',
                                    '',
                                    selected
                                        ? ' border-b-2  border-primary text-gray-900'
                                        : 'text-gray-900 hover:border-b-2  hover:border-primary'
                                )
                            }
                        >
                            Completed
                        </Tab>
                        {/* <Tab
                            className={({ selected }) =>
                                classNames(
                                    ' py-2 px-8   mr-3',
                                    '',
                                    selected
                                        ? ' border-b-2  border-primary text-gray-900'
                                        : 'text-gray-900 hover:border-b-2  hover:border-primary'
                                )
                            }
                        >
                            Rejected
                        </Tab> */}
                    </div>
                </Tab.List>
                <Tab.Panels className='mt-10'>
                    <Tab.Panel>
                        <NewModules />
                    </Tab.Panel>
                    <Tab.Panel>
                        <AcceptedModules />
                    </Tab.Panel>
                    <Tab.Panel>
                        <CompletedModules />
                    </Tab.Panel>
                    {/* <Tab.Panel>
                        <RejectedModules />
                    </Tab.Panel> */}
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
};

export default Tabs;