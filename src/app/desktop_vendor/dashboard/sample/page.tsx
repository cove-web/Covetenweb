import React from 'react';
import Main from './Main';



const page = () => {
    return (
        <>
            <div className="antialiased rounded-md bg-white dark:bg-darkBgLight h-full min-h-[80vh]">
                <div className="container mx-auto px-4 sm:px-8">
                    <div className="py-8">
                        <div>
                            <h2 className="text-2xl font-semibold leading-tight">Samples</h2>
                        </div>
                        {/* <div className="my-2 flex justify-end sm:flex-row flex-col">
                            <div className="flex flex-row mb-1 sm:mb-0">

                                <div className="relative">
                                    <select
                                        className=" h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block  w-full bg-white border-gray-300  py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r  focus:border-gray-500  dark:bg-darkBg dark:border-darkBorder">
                                        <option>All</option>
                                        <option>Active</option>
                                        <option>Inactive</option>
                                    </select>

                                </div>
                            </div>
                            <div className="block relative">
                                <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                                    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current text-gray-500">
                                        <path
                                            d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z">
                                        </path>
                                    </svg>
                                </span>
                                <input placeholder="Search"
                                    className="  sm:rounded-l-none border border-gray-300 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700  focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none dark:bg-darkBg dark:border-darkBorder" />
                            </div>
                        </div> */}
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