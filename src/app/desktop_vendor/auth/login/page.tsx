import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import LoginFrom from './LoginFrom';

const page = () => {
    return (

        <div className="absolute top-0 left-0 z-[91111111111111111] w-full  min-h-screen max-h-screen overflow-hidden bg-white">
            <div className="bg-gray-100 text-gray-500  w-full overflow-hidden" >
                <div className="md:flex w-full">
                    <div className="hidden md:block w-1/2 bg-white py-10 px-10">
                        <Image src='/assets/login.png' width={800} height={900} alt='login' />
                    </div>
                    <div className="w-full md:w-1/2 h-screen flex flex-col  items-center justify-center space-y-9 py-10 px-5 md:px-10">
                        <div className="text-center mb-10">
                            <h1 className="font-bold text-4xl text-desktopPrimary">Welcome Back!</h1>

                        </div>
                        <div className='w-full lg:px-10'>
                            <LoginFrom />

                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
};

export default page;