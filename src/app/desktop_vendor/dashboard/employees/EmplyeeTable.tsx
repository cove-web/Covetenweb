import React from 'react';
import { Fragment } from 'react';

interface IRolesPeopleTableProps {
    employeeList: any
    updateEmployeeStatus: any
}

const EmployeeTable = ({ employeeList, updateEmployeeStatus }: IRolesPeopleTableProps) => {

    // update employee status

    const handleStatusChange = async (id: string, status: string) => {
        await updateEmployeeStatus(id, status)
    }




    return (
        <div className="container mx-auto">
            <table className="table-auto w-full">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            serial
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            email
                        </th>
                        <th className="px-6 py-3  text-xs text-center font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        !employeeList?.length && (
                            <tr className="border-b border-gray-200">
                                <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    No Employee found
                                </td>

                            </tr>

                        )
                    }
                    {employeeList?.length && employeeList?.map((item: any, i: number) => (
                        <tr key={item.userHas.id} className="border-b border-gray-200">
                            <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {i + 1}
                            </td>
                            <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {item.userHas.name}
                            </td>
                            <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {item.userHas.email}
                            </td>
                            <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <div className="flex justify-center space-x-4">
                                    {
                                        item?.userHas?.status === "PENDING" ?
                                            <>
                                                <button onClick={(e) => handleStatusChange(item?.userHas?.id, "APPROVED")} className="text-green-700 bg-green-200 px-3 py-2 rounded-md">
                                                    Approve
                                                </button>
                                                <button onClick={(e) => handleStatusChange(item?.userHas?.id, "REJECTED")} className="text-red-700 bg-red-300 px-3 py-2 rounded-md">
                                                    Reject
                                                </button>
                                            </>
                                            : item?.userHas?.status === "APPROVED" ?
                                                <button onClick={(e) => handleStatusChange(item?.userHas?.id, "REJECTED")} className="text-red-700 bg-red-300 px-3 py-2 rounded-md">
                                                    Remove
                                                </button>

                                                :
                                                <button onClick={(e) => handleStatusChange(item?.userHas?.id, "APPROVED")} className="text-green-700 bg-green-200 px-3 py-2 rounded-md">
                                                    Approve
                                                </button>
                                    }


                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeTable;