import Link from 'next/link';
import React from 'react';

const page = ({ params, searchParams }: any) => {

    const success = searchParams.success;
    const message = searchParams.message;



    if (success === 'true') {

        return (
            <div className='w-full min-h-screen bg-gray-50 z-[99999999999999999999] absolute top-0 bottom-0 flex items-center justify-center'>
                <div className="w-full md:w-1/3 mx-auto">
                    <div className="flex flex-col p-5 rounded-lg shadow bg-white ">
                        <div className="flex flex-col items-center text-center">
                            <div className="inline-block p-4 bg-green-50 rounded-full">
                                <svg className="w-12 h-12 fill-current text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z" /></svg>
                            </div>
                            <h2 className="mt-2 font-semibold text-gray-800">Password Reset Email Sent</h2>
                            <p className="mt-2 text-sm text-gray-600 leading-relaxed">{`We've sent you an email with instructions to reset your password. Please check your inbox, and if you don't see it there, kindly check your spam folder.`}</p>
                        </div>

                        <div className="flex items-center justify-center mt-3">

                            <Link href='/' className="flex items-center justify-center px-4 py-2 ml-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium ">
                                Go Back
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    else {
        return (
            <div className='w-full min-h-screen bg-gray-50  absolute top-0 bottom-0 flex items-center justify-center'>
                <div className="w-full md:w-1/3 mx-auto">
                    <div className="flex flex-col p-5 rounded-lg shadow bg-white ">
                        <div className="flex flex-col items-center text-center ">
                            <div className="inline-block p-4 bg-red-50 rounded-full">
                                <svg className="w-12 h-12 fill-current text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z" /></svg>
                            </div>
                            <h2 className="mt-2 text-lg font-semibold text-gray-800">Error!</h2>
                            <p className="mt-2 text-md text-gray-600 leading-relaxed">{message.split("(")[1].slice(0, -2)}</p>
                        </div>

                        <div className="flex items-center justify-center mt-3">
                            <Link href='/' className="flex items-center justify-center px-8 py-2 ml-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium  ">
                                Go Back
                            </Link>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default page;