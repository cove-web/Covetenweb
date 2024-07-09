
import Link from 'next/link';
import React from 'react';
import Sidebar from './Sidebar';

const layout = ({ children }: { children: any }) => {

    return (
        <div className="w-full bg-white shadow-xl rounded-lg h-full min-h-screen flex overflow-x-auto p-6"      style={{backgroundColor:'#e8e8e880'}}>
            <Sidebar />
            {/* sidebar end */}
            <div className='ml-5 w-full'>
                {children}
            </div>
        </div>
    );
};

export default layout;