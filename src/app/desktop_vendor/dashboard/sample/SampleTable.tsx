import React, { useEffect } from 'react';


interface Props {
    data: any;
    updateModuleStatus: (id: string, status: string) => void;

}

const SampleTable = ({ data, updateModuleStatus }: Props) => {




    const handleChange = (e: any, id: string) => {
        updateModuleStatus(id, e.target.value)
    }

    return (
        <table className="min-w-full leading-normal uppercase">
            <thead>
                <tr className='border-b border-gray-200'>
                    <th
                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-dimText dark:text-darkDimText uppercase tracking-wider dark:bg-darkBg dark:border-darkBorder">
                        Serial
                    </th>
                    <th
                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-dimText dark:text-darkDimText uppercase tracking-wider dark:bg-darkBg dark:border-darkBorder">
                        Ticket
                    </th>
                    <th
                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-dimText dark:text-darkDimText uppercase tracking-wider dark:bg-darkBg dark:border-darkBorder">
                        Module Name
                    </th>
                    <th
                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-dimText dark:text-darkDimText uppercase tracking-wider dark:bg-darkBg dark:border-darkBorder">
                        Received By
                    </th>

                    <th
                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-dimText dark:text-darkDimText uppercase tracking-wider dark:bg-darkBg dark:border-darkBorder">
                        Sample Status
                    </th>


                </tr>
            </thead>
            <tbody>

                {
                    data && data.map((module: any, index: any) =>
                        <tr key={module?.id} className='border-b border-gray-200'>
                            <td className="px-5 py-5  bg-white text-xs dark:bg-darkBg dark:border-darkBorder">
                                <p className=" whitespace-no-wrap">{index + 1}</p>
                            </td>

                            <td className="px-5 py-5  bg-white text-xs dark:bg-darkBg dark:border-darkBorder">
                                <p className=" whitespace-no-wrap">{module?.moduleticketFor?.ticket}</p>
                            </td>

                            <td className="px-5 py-5  bg-white text-xs dark:bg-darkBg dark:border-darkBorder">
                                <p className=" whitespace-no-wrap">
                                    {module?.title?.slice(0, 70)}
                                </p>
                            </td>
                            <td className="px-5 py-5  bg-white text-xs dark:bg-darkBg dark:border-darkBorder">
                                <p className=" whitespace-no-wrap">
                                    {module?.receivedBy || 'n/a'}
                                </p>
                            </td>

                            <td className="px-5 py-5  bg-white text-xs dark:bg-darkBg dark:border-darkBorder">
                                <div className=" whitespace-no-wrap">
                                    <div className="flex flex-row mb-1 sm:mb-0">

                                        <div className="relative">
                                            <select
                                                value={module?.sampleStatus}
                                                onChange={(e) => handleChange(e, module?.id as string)}
                                                className=" h-full rounded-r block  w-full bg-white border text-sm pr-8 border-gray-300  py-1 px-3  leading-tight focus:outline-none  dark:bg-darkBg dark:border-darkBorder">
                                                <option value='NOT_SENT'>NOT SENT</option>
                                                <option value='ON_WAY'>NOT RECEIVED</option>
                                                <option value='RECEIVED'>RECEIVED</option>
                                            </select>

                                        </div>
                                    </div>
                                </div>
                            </td>



                        </tr>

                    )
                }




            </tbody>
        </table>
    );
};

export default SampleTable;