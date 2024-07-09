import React from 'react';

interface IrolesProps {
    rolesData: any
    deleteRole: (id: string) => void
}

const RolesTable = ({ rolesData, deleteRole }: IrolesProps) => {
    return (
        <div className="container mx-auto ">
            <div className="flex flex-col mt-10">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg dark:border-darkBorder">
                            <table className="min-w-full divide-y divide-gray-200 px-3 dark:divide-darkBorder "                                style={{backgroundColor:'#e8e8e880'}}
>
                                <thead className="bg-gray-50 dark:bg-darkBg "                                style={{backgroundColor:'#e8e8e880'}}
>
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-dimText dark:text-darkDimText uppercase tracking-wider"
                                        >
                                            Serial no.
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Name
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Status
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rolesData && rolesData.map((item: any, i: number) => (
                                        <tr key={item.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm ">{i + 1}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm ">
                                                    {item.name}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">

                                                    <div className="text-sm text-gray-500">{item?.createdAt.slice(0, 10)}</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">

                                                <button onClick={() => deleteRole(item.id)} className="text-red-600 bg-red-200 px-2 py-1 rounded hover:text-red-900">
                                                    <span>Delete</span>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default RolesTable;