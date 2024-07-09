'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const Sidebar = () => {
    const pathname = usePathname()
    return (
        <div className="w-64 px-4">
            <div className="h-16 flex items-center">
                <Link href="/vendor/dashboard/internal_email/compose"
                    className={`w-48 mx-auto bg-blue-600 hover:bg-blue-700 flex items-center justify-center text-gray-100 py-2 rounded space-x-2 transition duration-150`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                    <span>Compose</span>
                </Link>
            </div>
            <div className="px-2 pt-4 pb-8 border-r border-gray-300">
                <ul className="space-y-2">
                    <li>
                        <Link href="/vendor/dashboard/internal_email"
                            className={`
                            ${pathname === "/vendor/dashboard/internal_email" ? "bg-gray-400 bg-opacity-30 text-blue-600" : " bg-opacity-30 text-primaryText"}
                             flex items-center justify-between py-1.5 px-4 rounded cursor-pointer`}>
                            <span className="flex items-center space-x-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
                                </svg>
                                <span>Inbox</span>
                            </span>

                        </Link>
                    </li>

                    <li>
                        <Link href="/vendor/dashboard/internal_email/sent"
                            className={`
                            ${pathname === "/vendor/dashboard/internal_email/sent" ? "bg-gray-400 bg-opacity-30 text-blue-600" : "bg-opacity-30 text-primaryText"}
                             flex items-center space-x-2 py-1.5 px-4 rounded cursor-pointer`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                            </svg>
                            <span>Sent</span>
                        </Link>
                    </li>


                    {/* <li>
                <Link className="hover:bg-gray-500 hover:bg-opacity-10 hover:text-blue-600 flex items-center text-gray-700 py-1.5 px-4 rounded space-x-2 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                    <span>Trash</span>
                </Link>
            </li> */}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;