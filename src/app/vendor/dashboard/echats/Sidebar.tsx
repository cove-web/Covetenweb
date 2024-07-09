'use client'
import { log } from 'console';
import React from 'react';

const Sidebar = ({ data, setEmpemail }: { data: any, setEmpemail: any }) => {
    console.log(data)
    return (
        <div className="flex flex-col py-8 pl-6 pr-2 w-80 rounded-lg bg-white flex-shrink-0"      style={{backgroundColor:'#e8e8e880'}}>
            <div className="flex flex-row items-center  h-12 w-full">
                <div
                    className="flex items-center justify-center rounded-2xl text-primary bg-primary/30 h-10 w-10"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                        ></path>
                    </svg>
                </div>
                <div className="ml-2 font-bold text-2xl">All Employee</div>
            </div>


            <div className="flex flex-col mt-8 max-h-screen overflow-hidden">
                <div className="flex flex-row items-center justify-between text-xs">
                    <span className="font-bold">All Conversations</span>
                    <span
                        className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full"
                    >{data?.length}</span
                    >
                </div>
                <div className="flex flex-col max-h-screen space-y-1 mt-4 -mx-2 h-full overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">


                    {
                        data && data?.map((item: any) =>

                            <button onClick={() => setEmpemail(item.email)} key={data.id}
                                className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2 border-b"
                            >

                                <div>

                                    <div className="ml-2  ">
                                        <p className='text-primary  text-sm text-left'>{item.email}</p>
                                        <div>
                                            <span className='text-sm font-semibold text-left' style={{textAlign:'left'}}> {item?.name.slice(0, 30)}</span>
                                            {/* <span className='text-sm font-semibold text-left'> {item?.email}</span> */}

                                        </div>

                                    </div>

                                </div>

                            </button>

                        )
                    }


                    {!data &&
                        <button
                            className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2 border-b"
                        >


                            <div className="ml-2  ">
                                <div>
                                    <span className='text-sm font-semibold '> No Chat Available</span>

                                </div>

                            </div>



                        </button>
                    }




                </div>


            </div>
            {/* side bar end */}
        </div >
    );
};

export default Sidebar;