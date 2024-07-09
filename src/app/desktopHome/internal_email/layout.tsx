
import Link from 'next/link';
import React from 'react';
import Sidebar from './Sidebar';

const layout = ({ children }: { children: any }) => {

    return (
        <div className="w-full bg-white  rounded-lg min-h-[70vh]   flex  p-6">
            <Sidebar />
            {/* sidebar end */}
            <div className='ml-5 w-full h-full bg-white '>
                {children}
            </div>
        </div>
    );
};

export default layout;