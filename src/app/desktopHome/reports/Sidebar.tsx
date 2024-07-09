import { ModuleTicket } from '@/gql/graphql';
import React from 'react';
import { useCounterData } from '../CounterProvider';
interface ISidebar {

    data: any[]
    setCurrentModule: React.Dispatch<React.SetStateAction<string>>
}

const Sidebar = ({ data, setCurrentModule }: ISidebar) => {


    const counterData = useCounterData()

    const handleClick = async (id: string, isViewed: boolean) => {


        if (!isViewed) {

            await counterData?.handleUpdateView(id, "Module")
            counterData?.moduleRefetch()
        }
    }



    return (
        <div className="flex  flex-col py-8 pl-6 pr-2 relative w-80 rounded-lg bg-white flex-shrink-0">
            <div>


                <div className="flex flex-row items-center  h-12 w-full">

                    <div className="ml-2 font-bold text-2xl">All Reports</div>
                </div>


                <div className="flex flex-col mt-8">

                    <div className="flex flex-col space-y-1 mt-4 -mx-2 h-full overflow-y-auto">
                        {
                            data && data?.map((item, index) =>

                                <button
                                    key={item.id}
                                    onClick={() => {
                                        setCurrentModule(item?.id)
                                        handleClick(item?.id, item.isViewedByClient)
                                    }}
                                    className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2 border-b"
                                >
                                    <div
                                        className="flex items-center justify-center mr-1 h-10 w-10 bg-primary/20 text-primary font-bold rounded-lg"
                                    >
                                        M
                                    </div>
                                    <div>

                                        <div className=" ">
                                            <div>
                                                <span className='text-sm font-semibold text-left capitalize'> {item.forModule?.title?.slice(0, 20)}...</span>

                                            </div>

                                        </div>
                                        <div className=" flex text-[10px] text-gray-600">
                                            <p className='text-primary text-xs ml-2'>#{item?.ticket}</p>

                                        </div>
                                    </div>

                                </button>

                            )
                        }






                    </div>


                </div>
                {/* side bar end */}
            </div>
        </div>
    );
};

export default Sidebar;