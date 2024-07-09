import React from 'react';
import Main from './Main';

const page = () => {
    return (
        <section className='bg-white p-5'>
            <div className="flex items-center justify-between h-full">
                <div className=" py-4 md:py-7">
                    <div className="flex items-center justify-between">
                        <p className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal ">Home Clients Settings</p>

                    </div>
                </div>
            </div>
            <Main />
        </section>
    );
};

export default page;