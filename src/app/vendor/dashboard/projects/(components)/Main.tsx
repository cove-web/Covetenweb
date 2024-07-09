'use client'
import React, { useState } from 'react';
import Tabs from './Tabs';







const Main = () => {

    // States
    const [isOpen, setIsOpen] = useState(false);
    const [newNotification, setNewNotification] = useState(false);



    return (
        <>
            <Tabs />


        </>
    );
};

export default Main;