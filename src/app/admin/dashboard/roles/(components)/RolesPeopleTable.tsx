import React from 'react';
import { Fragment } from 'react';

interface IRolesPeopleTableProps {
    employeeList: any
    updateEmployeeStatus: any
}

const RolesPeopleTable = ({ employeeList, updateEmployeeStatus }: IRolesPeopleTableProps) => {

    // update employee status

    const handleStatusChange = async (id: string, status: string) => {
        await updateEmployeeStatus(id, status)
    }






    return (
        <div className="container mx-auto">
            <table className="table-auto w-full"                                 style={{backgroundColor:'#e8e8e880'}}
>
                <thead className="bg-gray-50"                                 style={{backgroundColor:'#e8e8e880'}}
>
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-dimText lowercase tracking-wider">
                            serial
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-dimText lowercase tracking-wider">
                            Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-dimText lowercase tracking-wider">
                            email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-dimText lowercase tracking-wider">
                            role
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-dimText lowercase tracking-wider">
                            Status
                        </th>
                        <th className="px-6 py-3  text-xs text-center font-medium text-dimText lowercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {employeeList?.map((item: any, i: number) => (
                        <tr key={i} className="border-b border-gray-200">
                            <td className="px-6 py-3 text-left text-xs font-medium text-dimText lowercase tracking-wider">
                                {i + 1}
                            </td>
                            <td className="px-6 py-3 text-left text-xs font-medium text-dimText lowercase tracking-wider">
                                {item?.name}
                            </td>
                            <td className="px-6 py-3 text-left text-xs font-medium text-dimText lowercase tracking-wider">
                                {item?.email}
                            </td>
                            <td className="px-6 py-3 text-left text-xs font-medium text-dimText lowercase tracking-wider">
                                {item?.hasRole?.name || "N/A"}
                            </td>
                            <td className="px-6 py-3 text-left text-xs font-medium text-dimText lowercase tracking-wider">
                                {item?.status || "N/A"}
                            </td>
                            <td className="px-6 py-3 text-left text-xs font-medium text-dimText lowercase tracking-wider">
                                <div className="flex justify-center space-x-4">
                                    {
                                        item.status === "PENDING" ?
                                            <>
                                                <button onClick={(e) => handleStatusChange(item.id, "APPROVED")} className="text-green-700 bg-green-200 px-3 py-2 rounded-md">
                                                    Approve
                                                </button>
                                                <button onClick={(e) => handleStatusChange(item.id, "REJECTED")} className="text-red-700 bg-red-300 px-3 py-2 rounded-md">
                                                    Reject
                                                </button>
                                            </>
                                            : item.status === "APPROVED" ?
                                                <button onClick={(e) => handleStatusChange(item.id, "REJECTED")} className="text-red-700 bg-red-300 px-3 py-2 rounded-md">
                                                    Remove
                                                </button>

                                                :
                                                <button onClick={(e) => handleStatusChange(item.id, "APPROVED")} className="text-green-700 bg-green-200 px-3 py-2 rounded-md">
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

export default RolesPeopleTable;