import React from "react";
import {
    LuAppWindow,
    LuBellRing,
    LuUser,
    LuFlaskConical,
    LuFolderPlus,
    LuSchool2,
    LuQrCode,
    LuHeadphones,
    LuMessagesSquare,
    LuBookKey,
    LuCopySlash,
    LuServer,
    LuStore,
    LuTrello,
    LuWallet,
    LuTable,
} from "react-icons/lu";
import { FaCalendar } from 'react-icons/fa';

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
                href: "/vendor/dashboard",
                icon: <LuAppWindow className="" />,
            },
            {
                label: "Feed",
                href: "/vendor/dashboard/feeds",
                icon: <LuBellRing className="" />,
            },
            {
                label: "Calendar",
                href: "/vendor/dashboard/cal",
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
];

export const controlledNavItems = [
    {
        section: "Services Management",
        links: [
            {
                label: "Projects",
                href: "/vendor/dashboard/projects",
                icon: <LuSchool2 className="" />,
            },
            {
                label: "Approve Projects",
                href: "/vendor/dashboard/approve_reports",
                icon: <LuSchool2 className="" />,
            },
            {
                label: "Project Samples",
                href: "/vendor/dashboard/project_samples",
                icon: <LuSchool2 className="" />,
            },
            {
                label: "Complaints",
                href: "/vendor/dashboard/complaints",
                icon: <LuSchool2 className="" />,
            },
            {
                label: "Leads",
                href: "/vendor/dashboard/leads",
                icon: <LuUser className="" />,
            },
            {
                label: "Samples",
                href: "/vendor/dashboard/samples",
                icon: <LuUser className="" />,
            },
        ]
    },
    {
        section: "Communication",
        links: [
            {
                label: "Internal Email",
                href: "/vendor/dashboard/internal_email",
                icon: <LuCopySlash />,
            },
            {
                label: "Ongoing Chats",
                href: "/vendor/dashboard/ongoing_chats",
                icon: <LuMessagesSquare className="" />,
            },
            {
                label: "Employee Chats",
                href: "/vendor/dashboard/employee_chats",
                icon: <LuMessagesSquare className="" />,
            },
        ]
    },

    {
        section: "Business Management",
        links: [
            {
                label: "Employees",
                href: "/vendor/dashboard/employees",
                icon: <LuSchool2 className="" />,
            },
            {
                label: "Quotation",
                href: "/vendor/dashboard/quotation",
                icon: <LuSchool2 className="" />,
            },
            {
                label: "Add product",
                href: "/vendor/dashboard/settings/products",
                icon: <LuFlaskConical className="" />
            },
            {
                label: "Add Events",
                href: "/vendor/dashboard/event",
                icon: <LuFolderPlus className="" />,
            },
        ]
    },
    {
        section: "Market",
        links: [
            {
                label: "Market",
                href: "/admin/dashboard/market",
                icon: <LuFlaskConical className="" />,
            },
            {
                label: "Developer Resources",
                href: "/admin/dashboard/developer_resources",
                icon: <LuFolderPlus className="" />,
            }
        ]
    },
    {
        section: "Grievances",
        links: [
            {
                label: "Support",
                href: "/vendor/dashboard/support",
                icon: <LuHeadphones className="" />,
            },
        ]
    },
];
