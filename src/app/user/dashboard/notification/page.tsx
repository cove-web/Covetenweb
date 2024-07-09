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
            <div className="w-full  bg-transprent rounded-lg py-4 md:py-7 px-4 md:px-8 xl:px-10 "                                
                    //  style={{ backgroundImage: ' url(https://b24-0txa1s.bitrix24.in/bitrix/templates/bitrix24/themes/light/contrast-horizon/contrast-horizon.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
>
                <div className=" py-4 md:py-7">
                    <div className="flex items-center justify-between">
                        <p className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-white-800">Notifications</p>

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