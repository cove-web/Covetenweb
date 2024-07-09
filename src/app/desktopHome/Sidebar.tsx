'use client'

// components/Sidebar.tsx
import React from "react";
import classNames from "classnames";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import Image from "next/image";
import Link from "next/link";
import { NavItem, defaultNavItems } from "./NavItem";
import { LuLogOut } from "react-icons/lu";
import { useRouter } from "next/navigation";
import AuthConfig from "@/firebase/oauth.config";



type Props = {
    collapsed: boolean;
    navItems?: any;
    setCollapsed(collapsed: boolean): void;
};



const Sidebar = ({
    collapsed,
    navItems = defaultNavItems,
    setCollapsed,
}: Props) => {


    //hooks 
    const router = useRouter()
    const { logout } = AuthConfig()

    const Icon = collapsed ? HiChevronDoubleRight : HiChevronDoubleLeft;
    return (
        <div
            className={classNames({
                "bg-white text-desktopText h-screen overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch z-20 border-r ": true,
            })}
        >
            <div
                className={classNames({
                    "flex flex-col justify-between": true,
                    "h-full": true,
                })}
            >
                {/* logo and collapse button */}
                <div
                    className={classNames({
                        "flex items-center  ": true,
                        "p-4 justify-between": !collapsed,
                        "py-4 justify-center": collapsed,
                    })}
                >
                    {!collapsed && <img src="/assets/log.png" className="h-8 " alt="logo" />}
                    <button
                        className={classNames({
                            "grid place-content-center": true,
                            "hover:bg-gray-200 ": true,
                            "w-10 h-10 rounded-full": true,
                        })}
                        // 👇 set the collapsed state on click
                        onClick={() => setCollapsed(!collapsed)}
                    >
                        <Icon className="w-5 h-5 text-desktopPrimary" />
                    </button>
                </div>

                {/* nav items part */}
                <nav className="flex-grow">
                    {
                        navItems.map((item: any, index: number) =>

                            <div key={index}>
                                <p className={classNames({
                                    "text-desktopText text-sm font-semibold": true, //colors
                                    "transition-colors duration-300": true, //animation
                                    "rounded-md p-1 mx-3 block ": !collapsed,
                                    "rounded-full p-1 mx-3 hidden": collapsed,
                                })}>{item?.section}</p>
                                <ul
                                    className={classNames({
                                        "my-2 flex flex-col gap-2 items-stretch": true,
                                    })}
                                >
                                    {item.links.map((item: any, index: number) => {
                                        return (
                                            <li
                                                key={index}
                                                className={classNames({
                                                    "text-desktopText hover:bg-gray-200  flex": true, //colors
                                                    "transition-colors duration-300": true, //animation
                                                    "rounded-md p-2 mx-3 gap-4 ": !collapsed,
                                                    "rounded-full p-2 mx-3 w-10 h-10": collapsed,
                                                })}
                                            >
                                                <Link href={item.href} className="flex gap-2 ">
                                                    <span>  {item.icon}</span> <span className="text-desktopText font-semibold">{!collapsed && item.label}</span>
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        )

                    }

                </nav>
                {/* profile part ...omitted for brevity */}


                {/* prifile */}
                <div
                    onClick={() => {
                        logout()
                        router.push('/desktopHome/auth/login')
                    }}
                    className={classNames({
                        "text-desktopText hover:bg-gray-200 cursor-pointer flex": true, //colors
                        "transition-colors duration-300": true, //animation
                        "rounded-md p-2 mx-3 gap-4 ": !collapsed,
                        "rounded-full p-2 mx-3 w-10 h-10": collapsed,
                    })}
                >
                    <p className="flex gap-2 items-center justify-center cursor-pointer">
                        <span className="text-xl">  <LuLogOut /></span>
                        {!collapsed &&
                            <>
                                <span className=" font-semibold"> Log Out</span>
                            </>
                        }

                    </p>
                </div>
            </div>
        </div>
    );
};
export default Sidebar;

