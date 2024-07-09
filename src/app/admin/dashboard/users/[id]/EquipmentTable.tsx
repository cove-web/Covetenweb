import React from 'react';

const EquipmentTable = ({ data }: any) => {



    return (
        <div className="flex flex-col" >
            <div className="-m-1.5 overflow-x-auto">
                <div className="p-1.5 min-w-full inline-block align-middle">
                    <div className="overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead>
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Name</th>
                                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Model</th>
                                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Make</th>
                                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Calibration Details</th>
                                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Warranty</th>
                                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Year Of Installation</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data && data?.map((item: any, idx: number) =>
                                        <tr key={idx} className="odd:bg-white even:bg-gray-100 dark:odd:bg-slate-900 dark:even:bg-slate-800">

                                            <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-800 dark:text-gray-200">
                                                {item?.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-800 dark:text-gray-200">
                                                {item?.model}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-800 dark:text-gray-200">
                                                {item?.make}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-800 dark:text-gray-200">
                                                {item?.calibrationDetails}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-800 dark:text-gray-200">
                                                {item?.warranty}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-800 dark:text-gray-200">
                                                {item?.yearOfInstallation}
                                            </td>


                                        </tr>

                                    )
                                }




                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default EquipmentTable;