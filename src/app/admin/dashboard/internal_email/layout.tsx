
import Link from 'next/link';
import React from 'react';
import Sidebar from './Sidebar';

const layout = ({ children }: { children: any }) => {

    return (
        <div className="w-full  shadow-xl rounded-lg h-full min-h-screen flex overflow-x-auto p-6"
        // style={{ backgroundImage: ' url(https://b24-0txa1s.bitrix24.in/bitrix/templates/bitrix24/themes/light/contrast-horizon/contrast-horizon.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
            <Sidebar />
            {/* sidebar end */}
            <div className='ml-5 w-full'>
                {children}
            </div>
        </div>
    );
};

export default layout;