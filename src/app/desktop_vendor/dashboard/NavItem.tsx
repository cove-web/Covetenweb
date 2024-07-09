'use client'
import React from "react";

import { LuAppWindow, LuCalculator, LuBellRing, LuUser, LuTerminalSquare, LuShieldCheck, LuReplaceAll, LuSchool2, LuQrCode, LuHeadphones, LuMessagesSquare, LuBookKey, LuCopySlash } from "react-icons/lu";
// define a NavItem prop
export type NavItem = {
    label: string;
    href: string;
    icon: React.ReactNode;
};

export const defaultNavItems = [
    {
        section: "General",
        links: [
            {
                label: "Dashboard",
                href: "/desktop_vendor/dashboard",
                icon: <LuAppWindow className="" />,
            },
            {
                label: "Notifications",
                href: "/desktop_vendor/dashboard/notification",
                icon: <LuBellRing className="" />,
            },
        ]
    },
]



export const controlledNavItems = [


    {
        section: "Services Management",
        links: [
            {
                label: "Projects",
                href: "/desktop_vendor/dashboard/projects",
                icon: <LuSchool2 className="" />,
            },
            {
                label: "Approve Projects",
                href: "/desktop_vendor/dashboard/approve_Reports",
                icon: <LuSchool2 className="" />,
            },
            // {
            //     label: "Tests",
            //     href: "/desktop_vendor/dashboard/tests",
            //     icon: <LuSchool2 className="" />,
            // },
            // {
            //     label: "Reports",
            //     href: "/desktop_vendor/dashboard/reports",
            //     icon: <LuSchool2 className="" />,
            // },
            {
                label: "Project Samples",
                href: "/desktop_vendor/dashboard/sample",
                icon: <LuSchool2 className="" />,
            },
            {
                label: "Complaints",
                href: "/desktop_vendor/dashboard/complains",
                icon: <LuSchool2 className="" />,
            },
            {
                label: "Leads",
                href: "/desktop_vendor/dashboard/leads",
                icon: <LuUser className="" />,
            },
            {
                label: "Samples",
                href: "/desktop_vendor/dashboard/sample",
                icon: <LuUser className="" />,
            },
            // {
            //     label: "All Tickets",
            //     href: "/desktop_vendor/dashboard/ticket_system/all_tickets",
            //     icon: <LuBookKey className="" />,
            // },
        ]
    },
    {
        section: "Communication",
        links: [
            {
                label: "Internal Email",
                href: "/desktop_vendor/dashboard/internal_email",
                icon: <LuCopySlash />,
            },
            {
                label: "Ongoing Chats",
                href: "/desktop_vendor/dashboard/chats",
                icon: <LuMessagesSquare className="" />,
            },
        ]
    },
    {
        section: "Business Management",
        links: [
            {
                label: "Employees",
                href: "/desktop_vendor/dashboard/employees",
                icon: <LuSchool2 className="" />,
            },
            {
                label: "Quotation",
                href: "/desktop_vendor/dashboard/invoice",
                icon: <LuSchool2 className="" />,
            },
        ]
    },
    {
        section: "Grievances",
        links: [
            {
                label: "Support",
                href: "/desktop_vendor/dashboard/support/",
                icon: <LuHeadphones className="" />,
            },

        ]
    },
]
