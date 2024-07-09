import Link from 'next/link';
import React from 'react';
import { FaPlus, FaMinus, FaArrowRight } from 'react-icons/fa';


interface IServiceCard {
    title: string;
}


const ServiceCard = ({ title }: IServiceCard) => {
    return (
        <div className="w-full mt-6 lg:mt-0 overflow-hidden p-2" >
            <div className="w-full flex  justify-between">
                <div>
                    <p className="font-medium ">{title}</p>
                    {/* <p className="text-xs text-gray-400 mt-2">Non-contact measurement systems are perfect</p> */}
                </div>
                <div>
                    <button

                        className="px-3 py-1 text-sm  font-medium text-primary flex items-center space-x-1 rounded-md hover:bg-blue-50 transition duration-300"
                    >
                        <span>More</span>
                        <FaArrowRight size={16} />
                    </button>
                </div>
            </div>


            <div className="flex flex-col mt-6">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="px-2 sm:px-6 py-2 align-middle inline-block min-w-full overflow-hidden">
                        {/* <Scrollbars style={{ width: '100%', height: 200 }}> */}
                        <table className="min-w-full">
                            {/* <thead>
                                <tr>
                                    <th className="text-left text-sm font-medium text-gray-500">Name</th>
                                    <th className="text-left text-sm font-medium text-gray-500">Desscription</th>
                                    <th className="hidden sm:block text-left text-sm font-medium text-gray-500">Chart</th>
                                </tr>
                            </thead> */}

                            <tbody>
                                {['3D to Print ', '3D inspection', '3D to Cad', '3D validation'].map(item =>

                                    <tr key={item} className="border-b border-gray-200 dark:border-darkBorder">
                                        <td className="py-4 whitespace-nowrap">
                                            <div className="flex items-center space-x-2">
                                                <div
                                                    className="flex items-center justify-center h-7 w-7 bg-gray-300  text-sm  font-bold rounded-lg dark:bg-primary dark:text-white"
                                                >
                                                    H
                                                </div>
                                                <span className='text-sm font-medium '>
                                                    {item}
                                                </span>
                                            </div>
                                        </td>
                                        {/* <td className="py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <FaMinus size={14} className="text-red-500" />
                                        </div>
                                    </td>
                                    <td className="hidden sm:block whitespace-nowrap">
                                        <div>
                                            <LineChart className="w-28 h-12 -mx-2" datasets={data.data} increase={data.increase} />
                                            chart
                                        </div>
                                    </td> */}
                                    </tr>

                                )}

                            </tbody>
                        </table>
                        {/* </Scrollbars> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;