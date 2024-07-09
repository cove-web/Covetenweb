'use client'
import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import Main from './Main';





function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}



const NotificationPage = () => {

    // States
    const [newNotification, setNewNotification] = useState(false);



    return (
        <>
            <div className="w-full  bg-white rounded-lg py-4 md:py-7 px-4 md:px-8 xl:px-10 ">
                <div className=" py-4 md:py-7">
                    <div className="flex items-center justify-between">
                        <p className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">Notifications</p>

                    </div>
                </div>
                <div className="w-full mt-7">
                    <Main />

                </div>
            </div>
        </>
    );
};

export default NotificationPage;