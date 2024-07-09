
import React from 'react';
import Main from './Main';

const page = () => {
    return (
        <>
            <div className="w-full  bg-white min-h-[400px] rounded-lg py-4 md:py-7 px-4 md:px-8 xl:px-10 ">
                <div className=" py-4 md:py-7">
                    <div className="flex items-center mb-8 justify-between">
                        <p className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">Create user</p>

                    </div>
                    <div className=" grid  overflow-auto mt-12  w-full">
                        <Main />
                    </div>
                </div>
            </div >

        </>
    );
};

export default page;