import Link from 'next/link';
import React from 'react';

const page = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full max-w-screen-2xl mx-auto h-screen gap-12 py-8 ">
            <img src="/assets/403.png" alt="" />
            <div className="flex flex-col items-center gap-4">
                <h1 className="text-3xl font-medium text-center">
                    You are not authorized
                </h1>
                <p className="text-xl text-center ">
                    Please Wait For Admin Approval
                </p>
                <Link href="/" className='bg-primary font-semibold text-white px-5 py-2' >Go to Home</Link>
            </div>
        </div>
    );
};

export default page;