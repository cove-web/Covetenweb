import React from 'react';
import Main from './(components)/Main';
import Link from 'next/link';

const page = () => {
    return (
        <div className="w-full  bg-white min-h-screen rounded-lg py-4 md:py-7 px-4 md:px-8 xl:px-10 "  style={{backgroundColor:'#e8e8e880'}}>
            <div className=" py-4 md:py-7">
                <div className="flex items-center justify-between">
                    {/* <p className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">Projects</p> */}
                    <h2 className='md:text-2xl xl:text-3xl font-semibold text-primaryText'></h2>
        <Link href='/vendor/dashboard/projects/create' className='bg-primary md:text-base xl:text-lg font-semibold text-white px-6 xl:px-8 py-2 xl:py-4 rounded-md flex items-center justify-center space-x-3'>
            <p>Create Project</p>
            {/* <span><FaPlusCircle /></span> */}
        </Link>
                </div>
            </div>
            <Main />

        </div>
    );
};

export default page;