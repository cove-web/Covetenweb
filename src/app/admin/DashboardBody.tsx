'use client'

import classNames from "classnames";
import React, { PropsWithChildren, useState, useEffect, Fragment } from "react";
import { Transition, Menu } from '@headlessui/react';
import { FaBars } from 'react-icons/fa';
import Sidebar from "./Sidebar";
import RightSidebar from "./RightSidebar";

import { Toaster } from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthConfig from "@/firebase/oauth.config";
import CheckNotification from "./CheckNotification";
import { useAuth } from "@/firebase/AuthProvider";
import UnAuthorized from "../not_authorized/page";
import Loading from "../loading";

const DashboardBody = (props: PropsWithChildren) => {

    // state
    const [newNotificationCount, setNewNotificationCount] = useState(0)
    const [collapsed, setSidebarCollapsed] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false)
    const [unAuthorized, setUnAuthorized] = useState(false)
    const [currentTime, setCurrentTime] = useState('')

    // hooks 
    const router = useRouter()
    // const { logout } = AuthConfig()
    const { user, logout, authLoading }: any = useAuth()

    // update time
    useEffect(() => {
        const updateTime = () => {
            const now = new Date()
            const hours = now.getHours()
            const minutes = now.getMinutes()
            const ampm = hours >= 12 ? 'PM' : 'AM'
            const formattedHours = hours % 12 || 12
            const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes
            setCurrentTime(`${formattedHours}:${formattedMinutes} ${ampm}`)
        }

        updateTime()
        const interval = setInterval(updateTime, 60000) // update every minute
        return () => clearInterval(interval)
    }, [])

    if (authLoading) return <Loading />

    return (
        <>
            {unAuthorized ? <UnAuthorized /> :
                <>
                    <div
                        className={`grid min-h-screen ${showSidebar ? 'grid-cols-sidebar' : 'hide-sidebar'} lg:grid-cols-sidebar 
        transition-[grid-template-columns] duration-300 ease-in-out overflow-hidden`}
                        style={{ backgroundColor: 'none' }}
                    >
                        <div 
                            className="max-h-screen overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
                        >
                            <Sidebar
                                collapsed={collapsed}
                                setCollapsed={() => setSidebarCollapsed((prev) => !prev)}
                                showSidebar={showSidebar}
                                setShowSidebar={setShowSidebar}
                            />
                                                   

                        </div>
                      


                        {/* content */}
                        <div className="relative max-h-screen overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
                            <div className="sticky top-0 h-16 z-[300000000]  dark:bg-gray-800 lg:py-2.5 "
                                        // style={{ backgroundImage: ' url(https://b24-0txa1s.bitrix24.in/bitrix/templates/bitrix24/themes/light/contrast-horizon/contrast-horizon.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
                                        >
                                <div className="flex items-center justify-between space-x-4 px-6 2xl:container">
                                    <div className="flex items-center space-x-4">
                                        <div className="text-sm text-gray-600 dark:text-gray-300" style={{color:'white'}}>
                                            {currentTime}
                                        </div>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                className="bg-gray-200 bg-opacity-50 rounded-full py-2 px-4 text-gray-700"
                                                placeholder="Search..."
                                                style={{ backgroundColor: 'rgba(232, 232, 232, 0.5)',color:'white' }}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <div className="flex items-center space-x-2 bg-gray-200 bg-opacity-50 rounded-full py-2 px-4 text-gray-700" style={{ backgroundColor: 'rgba(232, 232, 232, 0.5)' }}>
                                            <img src="/assets/no_user.png" alt="profile" className="w-6 h-6 rounded-full"/>
                                            <span style={{color:'white',fontSize:'15px'}}>covetenapp@gmail.com</span>
                                        </div>
                                        <button className="bg-green-500 text-white px-4 py-2 rounded-full" style={{fontSize:'12px'}}>
                                            Buy Now
                                        </button>
                                        <button className="bg-green-500 text-white px-4 py-2 rounded-full" style={{fontSize:'12px',backgroundColor:'#eba51c'}}>
                                            Send
                                        </button>
                                    </div>
                                    <button onClick={() => setShowSidebar(!showSidebar)} className="-mr-2 h-16 w-12 border-r lg:hidden dark:border-gray-700 dark:text-gray-300">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="my-auto h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M4 6h16M4 12h16M4 18h16"
                                            />
                                        </svg>
                                    </button>
                                    <div className="flex items-center space-x-4">
                                        {/* <p style={{color:'white'}}>user id:</p> */}
                                        {/* <Link href='/admin/dashboard/notification' className="relative m-auto h-5 w-5 text-sm text-gray-600 dark:text-gray-300">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 16 16">
                                                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
                                            </svg>
                                            <span className="absolute top-0 right-0 inline-flex items-center py-0.5 px-1.5 rounded-full text-xs font-medium transform -translate-y-1/2 translate-x-1/2 bg-rose-500 text-white">{newNotificationCount}</span>
                                        </Link> */}
                                        <Menu as="div" className="relative inline-block text-left">
                                            <div>
                                                <Menu.Button className="">
                                                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 dark:border-white border-gray-500">
                                                        <img src="/assets/no_user.png" alt="" className="w-full h-full object-cover" />
                                                    </div>
                                                </Menu.Button>
                                            </div>

                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                    <div className="py-1">
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <Link
                                                                    href={`/admin/dashboard/profile`}
                                                                    className={classNames(
                                                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                        'block px-4 py-2 text-sm'
                                                                    )}
                                                                >
                                                                    Profile
                                                                </Link>
                                                            )}
                                                        </Menu.Item>
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <button
                                                                    type="submit"
                                                                    onClick={() => {
                                                                        logout()
                                                                        router.push('/auth/login')
                                                                    }}
                                                                    className={classNames(
                                                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                        'block w-full px-4 py-2 text-left text-sm'
                                                                    )}
                                                                >
                                                                    Sign out
                                                                </button>
                                                            )}
                                                        </Menu.Item>
                                                    </div>
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
                                    </div>
                                </div>
                            </div>
                            <RightSidebar />
                            <div className="w-full min-h-screen h-auto  p-2 lg:p-6"
                                        // style={{ backgroundImage: ' url(https://b24-0txa1s.bitrix24.in/bitrix/templates/bitrix24/themes/light/contrast-horizon/contrast-horizon.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
                                        >
                                {props.children}
                            </div>
                        </div>
                        <CheckNotification setNewNotificationCount={setNewNotificationCount} />
                    </div>
                </>
            }
        </>
    );
};

export default DashboardBody;
