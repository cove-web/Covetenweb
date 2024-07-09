'use client'
import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import GenarelNotification from './GenarelNotification';
import NotificationModal from './NotificationModal';
import ReceivedNotification from './ReceivedNotification ';




function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}



const NotificationPage = () => {

    // States
    const [isOpen, setIsOpen] = useState(false);
    const [newNotification, setNewNotification] = useState(false);




    return (
        <>
        <div className="w-full min-h-[80vh] rounded-lg py-4 md:py-7 px-4 md:px-8 xl:px-10" 
        style={{ backgroundImage: ' url(https://b24-0txa1s.bitrix24.in/bitrix/templates/bitrix24/themes/light/contrast-horizon/contrast-horizon.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
                <div className=" py-4 md:py-7">
                    <div className="flex items-center justify-between">
                        <p className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-400 leading-normal text-white-800">Notifications</p>

                    </div>
                </div>
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
                                                ? ' border-b-2  border-primary text-white-900'
                                                : 'text-white-900 hover:border-b-2   hover:border-primary'
                                        )
                                    }
                                    style={{color:'white'}}
                                >
                                    Received
                                </Tab>
                                <Tab
                                    className={({ selected }) =>
                                        classNames(
                                            ' py-2 px-8   mr-3',
                                            '',
                                            selected
                                                ? ' border-b-2  border-primary text-white-900'
                                                : 'text-white-900 hover:border-b-2  hover:border-primary'
                                        )
                                    }
                                    style={{color:'white'}}
                                >
                                    Sent
                                </Tab>
                            </div>

                            <button onClick={() => setIsOpen(true)} className="focus:ring-2 focus:ring-offset-2 focus:ring-primary mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-primary hover:bg-primary focus:outline-none " style={{backgroundColor:"#272c2c"}}>
                                <p className="text-sm font-medium leading-none text-white">Add Notification</p>
                            </button>
                        </Tab.List>
                        <Tab.Panels>
                            <Tab.Panel>
                                <ReceivedNotification newNotification={newNotification} />
                            </Tab.Panel>
                            <Tab.Panel>
                                <GenarelNotification newNotification={newNotification} />
                            </Tab.Panel>
                        </Tab.Panels>
                    </Tab.Group>
                </div>

            </div>
            <NotificationModal setIsOpen={setIsOpen} isOpen={isOpen} setNewNotification={setNewNotification} />
        </>
    );
};

export default NotificationPage;