'use client'

// components/Layout.tsx
import classNames from "classnames";
import React, { PropsWithChildren, useState } from "react";
import { Toaster } from 'react-hot-toast';
import { FaBars } from 'react-icons/fa';
import Sidebar from "./Sidebar";
import dynamic from "next/dynamic";
import CounterProvider from "./CounterProvider";

const CheckPushNotification = dynamic(
    () => import("./CheckPushNotification").then((mod) => mod.default),
    { ssr: false }
);



// component
const Layout = (props: PropsWithChildren) => {
    const [collapsed, setSidebarCollapsed] = useState(false);
    return (
        <CounterProvider>
            <div className="absolute top-0 w-full z-[9999999999999] bg-white">
                <div
                    className={classNames({
                        "grid min-h-screen ": true,
                        // 👇 toggle the width of the sidebar depending on the state
                        "grid-cols-sidebar": !collapsed,
                        "grid-cols-sidebar-collapsed": collapsed,
                        // 👇 transition animation classes
                        "transition-[grid-template-columns] duration-300 ease-in-out": true,
                    })}
                >

                    <Sidebar
                        collapsed={collapsed}
                        setCollapsed={() => setSidebarCollapsed((prev) => !prev)}
                    />
                    {/* content */}
                    <div className="h-screen overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"> {props.children}</div>
                </div>
                <Toaster
                    position="bottom-right"
                />
                <CheckPushNotification />
            </div>
        </CounterProvider>
    );
};
export default Layout;