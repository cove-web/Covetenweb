// components/Sidebar.tsx
'use client';

import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { HiChevronDoubleLeft, HiChevronDoubleRight, HiChevronUp, HiChevronDown } from 'react-icons/hi';
import Link from "next/link";
import { controlledNavItems, defaultNavItems } from "./NavItem";
import { usePathname, useRouter } from 'next/navigation';
import RestrictAdminRoute from "@/components/RestrictAdminRoute";
import { useGqlClient } from "@/hooks/UseGqlClient";
import { useQuery } from "graphql-hooks";
import { LuLogOut } from "react-icons/lu";
import AuthConfig from "@/firebase/oauth.config";
import { useCounterData } from "./CounterProvider";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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

    const [accessibleNavItems, setAccessibleNavItems] = useState<any[]>([]);
    const [navCollapsed, setNavCollapsed] = useState(false);
    const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});

    const [managementNavItemsAccess, setManagementNavItemsAccess] = useState<any[]>([]);
    const [prevCounters, setPrevCounters] = useState({
        projectCounter: 0,
        ticketCounter: 0,
        emailCounter: 0,
        invoiceCounter: 0,
        leadCounter: 0,
        newUserCounter: 0,
        supportCounter: 0,
        complainCounter: 0
    });
    const [projectReminderInterval, setProjectReminderInterval] = useState<any>(null);
    const [ticketReminderInterval, setTicketReminderInterval] = useState<any>(null);
    const [reminderShown, setReminderShown] = useState({
        projectReminderShown: false,
        ticketReminderShown: false
    });

    // const [audio] = useState(new Audio(reminderAudio)); // Create audio element

    const toggleCollapse = () => {
        setNavCollapsed(!navCollapsed);
    };

    useEffect(() => { }, [accessibleNavItems]);

    const client = useGqlClient();
    const { user, logout } = AuthConfig();
    const pathname = usePathname();
    const router = useRouter();
    const counterData = useCounterData();

    useEffect(() => {
        checkForNewNotifications(counterData, prevCounters);
        setPrevCounters(counterData);
    }, [counterData]);

    // Function to check for new notifications
    const checkForNewNotifications = (currentCounters, previousCounters) => {
        Object.keys(currentCounters).forEach(key => {
            if (currentCounters[key] > previousCounters[key]) {
                showNotification(key);
            }
        });

        if (currentCounters.projectCounter > previousCounters.projectCounter) {
            startProjectReminderInterval();
        }

        if (currentCounters.ticketCounter > previousCounters.ticketCounter) {
            startTicketReminderInterval();
        }
    };

    // Function to show a notification
    const showNotification = (type) => {
        toast.info(`New ${type.replace(/Counter$/, '')} notification received!`, {
            position: "top-right",
            autoClose: 5000,
            style: { marginTop: '80px' } // Adjust this value as needed
        });
    };

    // Function to start the project reminder interval
    const startProjectReminderInterval = () => {
        if (!projectReminderInterval && !reminderShown.projectReminderShown) {
            const interval = setInterval(() => {
                if (!reminderShown.projectReminderShown) {
                    showProjectReminder();
                    playReminderAudio();
                } else {
                    clearInterval(interval);
                    setProjectReminderInterval(null);
                }
            }, 11 * 60 * 1000); // Check every 11 minutes
            setProjectReminderInterval(interval);
        }
    };

    // Function to start the ticket reminder interval
    const startTicketReminderInterval = () => {
        if (!ticketReminderInterval && !reminderShown.ticketReminderShown) {
            const interval = setInterval(() => {
                if (!reminderShown.ticketReminderShown) {
                    showTicketReminder();
                    playReminderAudio();
                } else {
                    clearInterval(interval);
                    setTicketReminderInterval(null);
                }
            }, 3 * 60 * 1000); // Check every 3 minutes
            setTicketReminderInterval(interval);
        }
    };

    // Function to show the project reminder
    const showProjectReminder = () => {
        toast.info('You have an assigned project that you haven\'t viewed yet. Please check it!', {
            position: "top-right",
            autoClose: 5000,
            style: { marginTop: '80px' } // Adjust this value as needed
        });
        setReminderShown(prev => ({ ...prev, projectReminderShown: true }));
    };

    // Function to show the ticket reminder
    const showTicketReminder = () => {
        toast.info('You have an assigned ticket that you haven\'t viewed yet. Please check it!', {
            position: "top-right",
            autoClose: 5000,
            style: { marginTop: '80px' } // Adjust this value as needed
        });
        setReminderShown(prev => ({ ...prev, ticketReminderShown: true }));
    };

    // Function to play the reminder audio
    const playReminderAudio = () => {
        // audio.play();
    };

    const navigateToLink = (href: string) => {
        router.push(href);
        setShowSidebar(false);
    };

    const Icon = navCollapsed ? HiChevronDoubleRight : HiChevronDoubleLeft;

    const toggleSection = (section: string) => {
        setOpenSections(prevState => ({
            ...prevState,
            [section]: !prevState[section]
        }));
    };

    return (
        <RestrictAdminRoute setAccessibleNavItems={setAccessibleNavItems} navItems={controlledNavItems} accessibleNavItems={accessibleNavItems} managementNavItems={[]} setManagementNavItemsAccess={setManagementNavItemsAccess}>
            <div className={classNames({
                "flex flex-col justify-between": true,
                "h-full": true,
            })}>
                <nav
                    className="flex-grow text-white custom-scrollbar"
                    style={{
                        // backgroundImage: 'url(https://b24-0txa1s.bitrix24.in/bitrix/templates/bitrix24/themes/light/contrast-horizon/contrast-horizon.jpg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                >
                    <Link href='/' className="whitespace-nowrap hidden lg:block font-bold w-full" style={{ marginTop: '1rem', marginLeft: '1rem' }}>
                    <img src="/assets/log.png" className="h-20 " alt="logo" />

                    </Link>
                    {
                        defaultNavItems.map((item, index) => (
                            <div key={index}>
                                <p
                                    className={classNames({
                                        "text-xs text-white cursor-pointer flex items-center": true,
                                        "transition-colors duration-300": true,
                                        "p-1 mx-3 block": !navCollapsed,
                                        "p-1 mx-3 hidden": navCollapsed,
                                        "bg-[rgba(255,255,255,0.21)]": openSections[item.section], // Change background color if section is open
                                    })}
                                    style={{ fontSize: '16px', padding: '1rem', fontWeight: '400',borderRadius:'15px' }}
                                    onClick={() => toggleSection(item.section)}
                                >
                                    {item.section}
                                    <span className="ml-auto">
                                        {openSections[item.section] ? <HiChevronUp className="text-white" /> : <HiChevronDown className="text-white" />}
                                    </span>
                                </p>
                                {
                                    openSections[item.section] && (
                                        <ul className={classNames({
                                            "my-2 flex flex-col gap-2 items-stretch": true,
                                            "bg-[rgba(255,255,255,0.21)]": openSections[item.section], // Change background color if section is open
                                       
                                        })}
                                            style={{ marginLeft: '0.5rem' ,borderRadius:'15px'}}
                                            >
                                            {item.links.map((link, index) => (
                                                <Link href={link.href} key={index}>
                                                    <li key={index} onClick={() => navigateToLink(link.href)} className={classNames({
                                                        "hover:bg-gray-200/50 flex": true,
                                                        "transition-colors duration-300": true,
                                                        "p-2 mx-3 gap-4": !navCollapsed,
                                                        "p-2 mx-3 w-10 h-10": navCollapsed,
                                                        "bg-white/50 text-white": pathname === link.href,
                                                    })}
                                                    style={{borderRadius:'15px'}}>
                                                        <p className="flex gap-2 items-center justify-center" >
                                                            <span className="text-xl">{link.icon}</span>
                                                            <span className="font-400 text-sm">{!navCollapsed && link.label}</span>
                                                        </p>
                                                    </li>
                                                </Link>
                                            ))}
                                        </ul>
                                    )
                                }
                            </div>
                        ))
                    }
                    
                    {
                        accessibleNavItems && accessibleNavItems.map((item, index) => (
                            <div key={index} style={{cursor:'pointer'}}>
                                <p
                                    className={classNames({
                                        "text-xs font-400 text-white cursor-pointer flex items-center": true,
                                        "transition-colors duration-300": true,
                                        "p-1 mx-3 block": !navCollapsed,
                                        "rounded-full p-1 mx-3 hidden": navCollapsed,
                                        "bg-[rgba(255,255,255,0.21)]": openSections[item.section], // Change background color if section is open
                                    })}
                                    style={{ fontSize: '16px', padding: '1rem',borderRadius:'15px' }}
                                    onClick={() => toggleSection(item.section)}
                                >
                                    {item.section}
                                    <span className="ml-auto">
                                        {openSections[item.section] ? <HiChevronUp className="text-white" /> : <HiChevronDown className="text-white" />}
                                    </span>
                                </p>
                                {
                                    openSections[item.section] && (
                                        <ul className={classNames({
                                            "my-2 flex flex-col gap-2 items-stretch": true,
                                            "bg-[rgba(255,255,255,0.21)]": openSections[item.section], // Change background color if section is open
                                        })}
                                        style={{borderRadius:'15px'}}>
                                            {item.links.map((link, index) => (
                                                <Link href={link.href} key={index}>
                                                    <li className={classNames({
                                                        "hover:bg-gray-200/50 flex": true,
                                                        "transition-colors duration-300": true,
                                                        "p-2 mx-3 gap-4": !navCollapsed,
                                                        "rounded-full p-2 mx-3 w-10 h-10": navCollapsed,
                                                        "bg-white/50 text-white": pathname === link.href,
                                                    })}>
                                                        <div className="flex gap-2 items-center justify-center w-full">
                                                            <span className="text-lg">{link.icon}</span>
                                                            <div className="flex flex-grow items-center justify-between font-semibold text-sm">
                                                                <p>{!navCollapsed && link.label}</p>
                                                                {
                                                                    link.label === "Internal Email" && counterData.emailCounter > 0 && <span className="relative inline-flex text-[9px] bg-red-500 text-white rounded-full py-0.5 px-1.5">
                                                                        {counterData.emailCounter}
                                                                    </span>
                                                                }
                                                                {
                                                                    link.label === "Quotation" && counterData.invoiceCounter > 0 && <span className="relative inline-flex text-[9px] bg-red-500 text-white rounded-full py-0.5 px-1.5">
                                                                        {counterData.invoiceCounter}
                                                                    </span>
                                                                }
                                                                {
                                                                    link.label === "Projects" && counterData.projectCounter > 0 && <span className="relative inline-flex text-[9px] bg-red-500 text-white rounded-full py-0.5 px-1.5">
                                                                        {counterData.projectCounter}
                                                                    </span>
                                                                }
                                                                {
                                                                    link.label === "Tickets" && counterData.ticketCounter > 0 && <span className="relative inline-flex text-[9px] bg-red-500 text-white rounded-full py-0.5 px-1.5">
                                                                        {counterData.ticketCounter}
                                                                    </span>
                                                                }
                                                                {
                                                                    link.label === "Leads" && counterData.leadCounter > 0 && <span className="relative inline-flex text-[9px] bg-red-500 text-white rounded-full py-0.5 px-1.5">
                                                                        {counterData.leadCounter}
                                                                    </span>
                                                                }
                                                                {
                                                                    link.label === "Users" && counterData.newUserCounter > 0 && <span className="relative inline-flex text-[9px] bg-red-500 text-white rounded-full py-0.5 px-1.5">
                                                                        {counterData.newUserCounter}
                                                                    </span>
                                                                }
                                                                {
                                                                    link.label === "Support" && counterData.supportCounter > 0 && <span className="relative inline-flex text-[9px] bg-red-500 text-white rounded-full py-0.5 px-1.5">
                                                                        {counterData.supportCounter}
                                                                    </span>
                                                                }
                                                                {
                                                                    link.label === "Quotation complaints" && counterData.complainCounter > 0 && <span className="relative inline-flex text-[9px] bg-red-500 text-white rounded-full py-0.5 px-1.5">
                                                                        {counterData.complainCounter}
                                                                    </span>
                                                                }
                                                            </div>
                                                        </div>
                                                    </li>
                                                </Link>
                                            ))}
                                        </ul>
                                    )
                                }
                            </div>
                        ))
                    }
                </nav>
                {/* profile part ...omitted for brevity */}
                {/* log out */}
            </div>
            <ToastContainer />
        </RestrictAdminRoute>
    );
};

export default Sidebar;
