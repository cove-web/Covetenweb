// components/defaultNavItems.tsx
import React from "react";



import { LuAppWindow,LuMail, LuCalculator, LuBellRing, LuUser, LuFlaskConical, LuFolderSymlink, LuFolderPlus, LuShieldCheck, LuReplaceAll, LuSchool2, LuQrCode, LuHeadphones,LuClipboardCheck, LuMessagesSquare, LuBookKey, LuCopySlash, LuServer, LuSquareEqual, LuStore, LuTouchpad, LuTrello, LuWallet, LuTable } from "react-icons/lu";
import { FaCalendar } from 'react-icons/fa';

// import { LuAppWindow, LuCalculator, LuBellRing, LuVoicemail, LuUser, LuTerminalSquare, LuShieldCheck, LuReplaceAll, LuSchool2, LuQrCode, LuHeadphones, LuCopySlash, LuClipboardCheck, LuMail } from "react-icons/lu";
// define a NavItem prop

type Links =
    {
        label: string;
        href: string;
        icon: React.ReactNode
    }



export type NavItem = {
    section: string;
    links: Links[]
};



export const defaultNavItems = [
    {
        section: "General",
        links: [
            {
                label: "Dashboard",
                href: "/user/dashboard",
                icon: <LuAppWindow className="w-6 h-6" />,
            },
            {
                label: "Notifications",
                href: "/user/dashboard/notification",
                icon: <LuBellRing className="w-6 h-6" />,
            }
            ,
            {
                label: "Feed",
                href: "/user/dashboard/notification",
                icon: <LuBellRing className="w-6 h-6" />,
            },
           
            {
                label: "Calendar",
                href: "/user/dashboard/cal",
                icon: <FaCalendar className="" />,
            },
            {
                label: "Drive",
                href: "/vendor/dashboard/drive",
                icon: <LuFolderPlus className="" />,
            },
            {
                label: "Notifications",
                href: "/vendor/dashboard/notifications",
                icon: <LuBellRing className="" />,
            },
        ]
    },
    {
        section: "Communication",
        links: [
            {
                label: "Internal Email",
                href: "/user/dashboard/internal_email",
                icon: <LuCopySlash className="w-6 h-6" />,
            },
            {
                label: "Chats",
                href: "/user/dashboard/chats",
                icon: <LuMail className="w-6 h-6" />,
            }
        ]
    },
    {
        section: "Services",
        links: [
            {
                label: "Projects",
                href: "/user/dashboard/projects",
                icon: <LuSchool2 className="w-6 h-6" />,
            },
            {
                label: "Samples",
                href: "/user/dashboard/sample",
                icon: <LuShieldCheck className="w-6 h-6" />,
            },
            {
                label: "Leads",
                href: "/user/dashboard/leads",
                icon: <LuUser className="" />,
            },
            {
                label: "Reports",
                href: "/user/dashboard/reports",
                icon: <LuClipboardCheck className="w-6 h-6" />,
            },
            {
                label: "Estimation",
                href: "/user/dashboard/invoices",
                icon: <LuCalculator className="w-6 h-6" />,
            },
        ]
    },
    {
        section: "Business Management",
        links: [
           
            // {
            //     label: "Quotation",
            //     href: "/vendor/dashboard/quotation",
            //     icon: <LuSchool2 className="" />,
            // },
            {
                label: "Add product",
                href: "/user/dashboard/settings/products",
                icon: <LuFlaskConical className="" />
            },
            {
                label: "Add Events",
                href: "/user/dashboard/event",
                icon: <LuFolderPlus className="" />,
            },
        ]
    },
    {
        section: "Grievances",
        links: [
            {
                label: "Customer Support",
                href: "/user/dashboard/support",
                icon: <LuHeadphones className="w-6 h-6" />,
            },
        ]
    },
    {
        section: "Market ",
        links: [
            {
                label: "Market",
                href: "/admin/dashboard/settings/products",
                icon: <LuFlaskConical className="" />,
            },
            {
                label: "Developer Resources",
                href: "/admin/dashboard/event",
                icon: <LuFolderPlus className="" />,
            }
            
        ]
    },
]