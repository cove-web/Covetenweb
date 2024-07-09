import React from 'react';
import Main from './Main';

const page = () => {
    return (
        <>
            <div className="antialiased rounded-md bg-white dark:bg-darkBgLight h-full min-h-[80vh]">
                <div className="container mx-auto px-4 sm:px-8">
                    <div className="py-8">
                        <div>
                            <h2 className="text-2xl font-semibold leading-tight">Employees</h2>
                        </div>

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