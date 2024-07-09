import React, { useState } from "react";
import { LuBellRing, LuUser, LuMessagesSquare, LuHelpCircle, LuSearch } from "react-icons/lu";
import Link from "next/link";

const RightSidebar = () => {
    const [newNotificationCount, setNewNotificationCount] = useState(0);

    return (
        <div className="right-sidebar">
            <div className="icon question-icon">
                <LuHelpCircle size={28} />
            </div>
            <div className="icon">
                <Link href="/vendor/dashboard/notification" className="relative m-auto h-5 w-5 text-sm text-gray-600 dark:text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="white" viewBox="0 0 16 16">
                        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
                    </svg>
                    <span className="absolute top-0 right-0 inline-flex items-center py-0.5 px-1.5 rounded-full text-xs font-medium transform -translate-y-1/2 translate-x-1/2 bg-rose-500 text-white">{newNotificationCount}</span>
                </Link>
            </div>
            <div className="icon">
                <Link href="/vendor/dashboard/profile">
                    <LuUser size={28} />
                </Link>
            </div>
            <div className="icon" >
                <Link href="/vendor/dashboard/internal_email">
                <LuMessagesSquare size={28} />
                </Link>
            </div>
            {/* <div className="icon">
                <LuSearch size={28} />
            </div> */}
            <div className="icon">
                {/* <LuPilot size={28} /> */}
            </div>
        </div>
    );
};

export default RightSidebar;
