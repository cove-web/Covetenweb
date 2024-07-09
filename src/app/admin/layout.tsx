// components/Layout.tsx
"use client";

import classNames from "classnames";
import React, { PropsWithChildren, useState } from "react";
import { FaBars } from 'react-icons/fa';
import Sidebar from "./Sidebar";
import { Toaster } from "react-hot-toast";
import DashboardBody from "./DashboardBody";
import CounterProvider from "./CounterProvider";

// Background image options
const backgroundImages = [
    { url: 'https://b24-0txa1s.bitrix24.in/bitrix/templates/bitrix24/themes/light/contrast-horizon/contrast-horizon.jpg', label: 'Default Theme' },
    { url: 'https://images.unsplash.com/photo-1635776063328-153b13e3c245?q=80&w=2532&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', label: 'Theme1' },
    { url: 'https://images.unsplash.com/photo-1614852206732-6728910dc175?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', label: 'Theme2' },
    {url: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',label:'Theme3'}
];

// Component
const Layout = (props: PropsWithChildren) => {
    const [backgroundImage, setBackgroundImage] = useState(backgroundImages[0].url);

    // Handle background image change
    const handleBackgroundChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setBackgroundImage(event.target.value);
    };

    // Render
    return (
        <div className="absolute top-0 w-full z-[9999999999999] bg-gray-200 overflow-hidden"   
             style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="max-w-screen-2xl mx-auto bg-gray">
                <CounterProvider>
                    <div style={{ marginRight: '4rem' }}>
                        <DashboardBody>
                            {props.children}
                        </DashboardBody>
                    </div>
                </CounterProvider>
            </div>
            <Toaster position="bottom-right" />
            <div className="fixed bottom-4 left-4 bg-white p-2 rounded shadow"                 style={{backgroundColor:'rgba(232, 232, 232, 0.5)'}}
>
                <label htmlFor="background-select" className="block text-sm font-medium text-gray-700" 
                // style={{backgroundColor:'rgba(232, 232, 232, 0.5)'}}
                >
                    Select Theme
                </label>
                <select id="background-select" onChange={handleBackgroundChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" 
                style={{backgroundColor:"transparent"}}
                >
                    {backgroundImages.map((image, index) => (
                        <option key={index} value={image.url}>{image.label}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default Layout;
