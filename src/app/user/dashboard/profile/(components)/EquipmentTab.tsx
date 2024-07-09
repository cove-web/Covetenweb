import React from 'react';
import EquipmentModal from './EquipmentModal';
import AuthConfig from '@/firebase/oauth.config';
import { useGqlClient } from '@/hooks/UseGqlClient';







const EquipmentTab = ({ userInfo, setCurrentTab, getUser }: any) => {

    const [isModalOpen, setIsModalOpen] = React.useState(false);



    return (
        <>
            <div className='w-full flex items-center justify-end mt-8'>
                <button onClick={() => setIsModalOpen(true)} className='bg-primary px-4 py-2 rounded-md text-white'>
                    Add New
                </button>
            </div>
            <div className="flex flex-col mt-4 " >
                <div className="-m-1.5 overflow-x-auto">
                    <div className="p-1.5 min-w-full inline-block align-middle">
                        <div className="overflow-hidden">
                            <table className="min-w-full divide-y bg-gray-100 divide-gray-200 dark:divide-gray-700">
                                <thead>
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-800 uppercase">Name</th>
                                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-800 uppercase">Model</th>
                                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-800 uppercase">Make</th>
                                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-800 uppercase">CalibrationDetails</th>
                                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-800 uppercase">Warranty</th>
                                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-800 uppercase">Year Of Installation</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        userInfo?.equipments && userInfo?.equipments?.map((item: any, idx: number) =>
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
            <EquipmentModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} getUser={getUser} setCurrentTab={setCurrentTab} />
        </>
    );
};

export default EquipmentTab;