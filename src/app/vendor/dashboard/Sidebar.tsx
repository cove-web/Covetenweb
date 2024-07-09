'use client'

// components/Sidebar.tsx
import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { HiChevronDoubleLeft, HiChevronDoubleRight, HiChevronDown, HiChevronUp } from 'react-icons/hi';
import Image from "next/image";
import Link from "next/link";
import { NavItem, controlledNavItems, defaultNavItems } from "./NavItem";
import { usePathname, useRouter } from 'next/navigation';
import RestrictAdminRoute from "@/components/RestrictAdminRoute";
import { useGqlClient } from "@/hooks/UseGqlClient";

import { useManualQuery, useQuery } from "graphql-hooks";
import UnAuthorized from "@/components/UnAuthorized";
import Loading from "@/app/loading";
import Error from "@/components/Error";
import { LuLogOut } from "react-icons/lu";
import AuthConfig from "@/firebase/oauth.config";
import { useCounterData } from "./CounterProvider";

const GET_USER = `
query Users($where: UserWhere) {
    users(where: $where){
      user_type
    }
  }`

type Props = {
    collapsed: boolean;
    setCollapsed(collapsed: boolean): void;
    setShowSidebar(showSidebar: boolean): void;
    showSidebar: boolean;
};

const Sidebar = ({
    collapsed,
    setCollapsed,
    setShowSidebar,
    showSidebar
}: Props) => {

    // states
    const [accessibleNavItems, setAccessibleNavItems] = React.useState<any[]>(controlledNavItems)
    const [isUnAuthorized, setIsUnAuthorized] = React.useState<boolean>(false)
    const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});

    // HOOKS
    const client = useGqlClient();
    const { user, logout, authLoading } = AuthConfig();
    const pathname = usePathname();
    const router = useRouter();
    const counterData = useCounterData();

    // query
    const [getDataFn, { data, loading, error }] = useManualQuery(GET_USER, { client });

    useEffect(() => {
        if (user?.email) {
            getUserAndAuthenticate(user?.email);
        }
    }, [user?.email, authLoading]);

    const getUserAndAuthenticate = async (email: string) => {
        const { data, error } = await getDataFn({
            variables: {
                where: {
                    email: email
                }
            }
        });
        if (data?.users[0]?.user_type === "LAB_ASSISTANT") {
            const filteredItems = controlledNavItems.map(section => ({
                ...section,
                links: section.links.filter(link => link.label !== "Employees" && link.label !== "Approve Projects")
            }));
            setAccessibleNavItems(filteredItems);
        }
        else if (data?.users[0]?.user_type === "SERVICE_PROVIDER") {
            setAccessibleNavItems(controlledNavItems);
        } else {
            setAccessibleNavItems([]);
            setIsUnAuthorized(true);
        }
    };

    const toggleSection = (section: string) => {
        setOpenSections(prevState => ({
            ...prevState,
            [section]: !prevState[section]
        }));
    };

    if (loading) return <Loading />;
    if (error) return <Error />;

    if (!authLoading && isUnAuthorized) {
        return <UnAuthorized />;
    }

    return (
        <div
            className={`bg-transprent text-primaryText z-[99999999999999565] border-r lg:block ${showSidebar ? 'block' : 'hidden'}`}
            // style={{ backgroundImage: ' url(https://b24-0txa1s.bitrix24.in/bitrix/templates/bitrix24/themes/light/contrast-horizon/contrast-horizon.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
            <div className={classNames({ "flex flex-col justify-between ": true, "h-full": true })}>
                <div className={classNames({ "flex items-center border-b border-gray-200 dark:border-darkBorder mb-5 p-4 justify-between": true })}>
                    {!collapsed && <Link href='/' className="whitespace-nowrap font-bold w-full">
                        {/* <img src="/assets/log.png" className="h-8" alt="logo" /> */}
                        <img src="/assets/log.png" className="h-20 " alt="logo" />

                    </Link>}
                </div>

                <nav className="flex-grow overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
                    {defaultNavItems.map((item, index) => (
                        <div key={index}>
                            <p
                                className={classNames({
                                    "text-xs font-400 flex justify-between items-center cursor-pointer": true,
                                    "transition-colors duration-300": true,
                                    "p-1 mx-3 block": !collapsed,
                                    "rounded-full p-1 mx-3 hidden": collapsed,
                                    "bg-[rgba(255,255,255,0.21)]": openSections[item.section], // Change background color if section is open

                                })}
                                style={{ fontSize: '16px', padding: '1rem',color:'white',borderRadius:'15px' }}

                                // style={{ color: 'white' }}
                                onClick={() => toggleSection(item.section)}
                            >
                                {item.section}
                                {openSections[item.section] ? <HiChevronUp /> : <HiChevronDown />
                                }
                            </p>
                            {openSections[item.section] && (
                                   <ul className={classNames({
                                    "my-2 flex flex-col gap-2 items-stretch": true,
                                    "bg-[rgba(255,255,255,0.21)]": openSections[item.section], // Change background color if section is open
                               
                                })}
                                style={{borderRadius:'15px'}}
                                // <ul className={classNames({ "my-2 flex flex-col gap-2 items-stretch": true ,})}                                             "bg-[rgba(255,255,255,0.21)]": openSections[item.section], // Change background color if section is open
>
                                    {item.links.map((link, index) => (
                                        <Link href={link.href} key={index}>
                                            <li
                                                className={classNames({
                                                    "hover:bg-gray-200 flex": true,
                                                    "transition-colors duration-300": true,
                                                    "p-2 mx-3 gap-4": !collapsed,
                                                    "rounded-full p-2 mx-3 w-10 h-10": collapsed,
                                                    "bg-primary text-white hover:bg-primary": pathname === link.href,
                                                })}
                                                style={{ marginLeft: '0.5rem' }}

                                            >
                                                <p className="flex gap-2 items-center justify-center" style={{ color: 'white' ,fontSize:'16px'}}>
                                                    <span className="text-xl">{link.icon}</span>
                                                    {!collapsed && <span className="font-400">{link.label}</span>}
                                                </p>
                                            </li>
                                        </Link>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                    {accessibleNavItems.map((item, index) => (
                        <div key={index}>
                            <p
                                className={classNames({
                                    "text-xs font-400 flex justify-between items-center cursor-pointer": true,
                                    "transition-colors duration-300": true,
                                    "p-1 mx-3 block": !collapsed,
                                    "rounded-full p-1 mx-3 hidden": collapsed,
                                    "bg-[rgba(255,255,255,0.21)]": openSections[item.section], // Change background color if section is open

                                })}
                                // style={{ color: 'white' ,fontSize:'16px'}}
                                style={{ fontSize: '16px', padding: '1rem',color:'white' ,borderRadius:'15px'}}
                                onClick={() => toggleSection(item.section)}
                            >
                                {item.section}
                                {openSections[item.section] ? <HiChevronUp /> : <HiChevronDown />}
                            </p>
                            {openSections[item.section] && (
                                <ul className={classNames({ "my-2 flex flex-col gap-2 items-stretch": true })} style={{fontSize:'16px'}}>
                                    {item.links.map((link, index) => (
                                        <Link href={link.href} key={index}>
                                            <li
                                                className={classNames({
                                                    "hover:bg-gray-200 flex": true,
                                                    "transition-colors duration-300": true,
                                                    "p-2 mx-3 gap-4": !collapsed,
                                                    "rounded-full p-2 mx-3 w-10 h-10": collapsed,
                                                    "bg-primary text-white hover:bg-primary": pathname === link.href,
                                                })}
                                                style={{borderRadius:'15px'}}>

                                            
                                                <p className="flex gap-2 items-center justify-center" style={{ color: 'white' }}>
                                                    <span className="text-lg">{link.icon}</span>
                                                    {!collapsed && <span className="font-400">
                                                        {link.label}
                                                        {link.label === "Projects" && counterData?.moduleCounter > 0 && (
                                                            <span className="relative inline-flex text-[9px] bg-red-500 text-white rounded-full py-0.5 px-1.5 ml-3">
                                                                {counterData?.moduleCounter}
                                                            </span>
                                                        )}
                                                        {link.label === "Approve Projects" && counterData?.approveCounter > 0 && (
                                                            <span className="relative inline-flex text-[9px] bg-red-500 text-white rounded-full py-0.5 px-1.5 ml-3">
                                                                {counterData?.approveCounter}
                                                            </span>
                                                        )}
                                                        {link.label === "Complaints" && counterData?.complainCounter > 0 && (
                                                            <span className="relative inline-flex text-[9px] bg-red-500 text-white rounded-full py-0.5 px-1.5 ml-3">
                                                                {counterData?.complainCounter}
                                                            </span>
                                                        )}
                                                    </span>}
                                                </p>
                                            </li>
                                        </Link>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;
