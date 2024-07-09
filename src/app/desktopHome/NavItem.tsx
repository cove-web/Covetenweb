// components/defaultNavItems.tsx
import React from "react";




import { LuAppWindow, LuCalculator, LuBellRing, LuVoicemail, LuUser, LuTerminalSquare, LuShieldCheck, LuReplaceAll, LuSchool2, LuQrCode, LuHeadphones, LuCopySlash, LuClipboardCheck, LuMail } from "react-icons/lu";
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
                href: "/desktopHome",
                icon: <LuAppWindow className="w-6 h-6" />,
            },
            {
                label: "Profile",
                href: "/desktopHome/profile",
                icon: <LuUser className="w-6 h-6" />,
            },
            {
                label: "Notifications",
                href: "/desktopHome/notification",
                icon: <LuBellRing className="w-6 h-6" />,
            }
        ]
    },
    {
        section: "Communication",
        links: [
            {
                label: "Internal Email",
                href: "/desktopHome/internal_email",
                icon: <LuCopySlash className="w-6 h-6" />,
            },
            {
                label: "Chats",
                href: "/desktopHome/chats",
                icon: <LuMail className="w-6 h-6" />,
            }
        ]
    },
    {
        section: "Services",
        links: [
            {
                label: "Projects",
                href: "/desktopHome/projects",
                icon: <LuSchool2 className="w-6 h-6" />,
            },
            {
                label: "Samples",
                href: "/desktopHome/sample",
                icon: <LuShieldCheck className="w-6 h-6" />,
            },
            {
                label: "Reports",
                href: "/desktopHome/reports",
                icon: <LuClipboardCheck className="w-6 h-6" />,
            },
            {
                label: "Estimation",
                href: "/desktopHome/invoices",
                icon: <LuCalculator className="w-6 h-6" />,
            },
        ]
    },
    {
        section: "Grievances",
        links: [
            {
                label: "Customer Support",
                href: "/desktopHome/support",
                icon: <LuHeadphones className="w-6 h-6" />,
            },
        ]
    },
]