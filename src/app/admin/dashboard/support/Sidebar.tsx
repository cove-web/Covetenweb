'use client'
import React from 'react';
import { useCounterData } from '../../CounterProvider';

const Sidebar = ({ data, setCurrentSupportTicket, setQuery }: { data: any, setCurrentSupportTicket: any, setQuery: any }) => {



    const counterData = useCounterData()

    return (
        <div className="flex flex-col py-8 pl-6 pr-2 w-80 rounded-lg bg-white flex-shrink-0"                                 style={{backgroundColor:'#e8e8e880'}}
        >
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
                <div className="ml-2 font-bold text-2xl">All Tickets</div>
            </div>


            <div className="flex flex-col mt-8 max-h-screen overflow-hidden">
                <div className='w-full'>
                    <input onChange={(e) => setQuery(e.target.value)} type="text" placeholder='search' className='py-1 rounded-md w-full px-4 border border-gray-300'                                 style={{backgroundColor:'#e8e8e880'}}
/>
                </div>
                <div className="flex flex-col max-h-screen space-y-1 mt-4 -mx-2 h-full overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">


                    {
                        data && data?.map((item: any) =>

                            <button

                                onClick={
                                    () => {
                                        setCurrentSupportTicket({
                                            ticket: item.ticket,
                                            id: item.id,
                                        })
                                        counterData?.handleUpdateView(item.id, "support")
                                        counterData?.newUserRefetch()
                                    }

                                }
                                key={data.id}
                                className={`${item?.isViewed ? 'bg-white' : 'bg-gray-200'}  flex flex-row items-center hover:bg-gray-100 rounded-xl p-2 border-b`}
                                style={{backgroundColor:'#e8e8e880'}}

                            >

                                <div>

                                    <div className=" flex items-center space-x-2 py-2 ">
                                        <p className='text-primaryText font-semibold  text-xs text-left'>Ticket Id:</p>
                                        <p className='text-primary  text-xs text-left'>#{item.ticket}</p>


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