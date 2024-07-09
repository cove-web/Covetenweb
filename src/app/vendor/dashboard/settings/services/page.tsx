import React from 'react';
import Main from './Main';
import Link from 'next/link';

const page = () => {
    return (
        <div className="w-full  bg-white rounded-lg py-4 md:py-7 px-4 md:px-8 xl:px-10 min-h-[80vh]">
            <div className=" py-4 md:py-7">
                <div className="flex items-center justify-between">
                    <p className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">Services</p>

                </div>
            </div>
            <Main />



        </div>
    );
};

export default page;