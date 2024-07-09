import React from 'react';
import Main from './Main';
import Link from 'next/link';

const page = () => {
    return (
        <>
            <div className="antialiased rounded-md bg-white dark:bg-darkBgLight h-full min-h-[80vh]"               style={{backgroundColor:'#e8e8e880'}}
>
                <div className="container mx-auto px-4 sm:px-8">
                    <div className="py-8">
                        {/* table start */}
                        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                            <div className="inline-block min-w-full  rounded-sm overflow-hidden">
                                <Main />

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default page;