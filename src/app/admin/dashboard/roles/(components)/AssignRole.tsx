import { Fragment, useState } from 'react';
import { Dialog, Transition, Disclosure } from '@headlessui/react';
import { useGqlClient } from '@/hooks/UseGqlClient';
import { useMutation, useQuery } from 'graphql-hooks';
import { toast } from 'react-hot-toast';
interface ModalProps {
    openPeopleModal: boolean;
    setOpenPeopleModal: (open: boolean) => void;
    employeeList: any;
}

const GET_USER = `
query Users($where: UserWhere) {
    users(where: $where) {
      id
      name
      email
      hasRole {
        id
      }
    }
  }
`
const GET_ROLE = `
query Roles {
    roles {
      id
      name
    }
  }
`

const ASSIGN_ROLE = `
mutation UpdateUsers($where: UserWhere, $update: UserUpdateInput, $disconnect: UserDisconnectInput) {
    updateUsers(where: $where, update: $update, disconnect: $disconnect) {
      info {
        relationshipsCreated
        nodesCreated
      }
    }
  }
`



const AssignRole: React.FC<ModalProps> = ({
    openPeopleModal,
    setOpenPeopleModal,
    employeeList
}) => {
    const [role, setRole] = useState('');
    const [employeeEmail, setEmployeeEmail] = useState('');

    // hooks
    const client = useGqlClient()

    // query
    const { data: roleData, loading: roleLoading, error: roleError } = useQuery(GET_ROLE, { client })
    const { data: userData, loading, error } = useQuery(GET_USER, {
        client,
        variables: {
            where: {
                "status": "APPROVED",
                "user_type": "COVENTEN_EMPLOYEE"
            }
        }
    })

    // mutation
    const [assignRoleFn, assignRoleState] = useMutation(ASSIGN_ROLE, { client })




    // initializing  assignRole mutation
    const assignRoleToEmployee = async (e: any) => {
        e.preventDefault()

        const findUser = userData?.users.find((user: any) => user.email === employeeEmail)
        if (findUser?.hasRole?.id) {
            const removeRole = await removePreviousRole(userData?.hasRole?.id)
            if (removeRole) {

                const { data } = await assignRoleFn({
                    variables: {
                        "where": {
                            "email": employeeEmail
                        },
                        "update": {
                            "hasRole": {
                                "connect": {
                                    "where": {
                                        "node": {
                                            "id": role
                                        }
                                    }
                                }
                            }
                        }
                    }


                })

                if (data?.updateUsers?.info?.relationshipsCreated) {
                    handleClose()
                    toast.success('Role assigned successfully')
                }
            }
        } else {
            const { data } = await assignRoleFn({
                variables: {
                    "where": {
                        "email": employeeEmail
                    },
                    "update": {
                        "hasRole": {
                            "connect": {
                                "where": {
                                    "node": {
                                        "id": role
                                    }
                                }
                            }
                        }
                    }
                }


            })

            if (data?.updateUsers?.info?.relationshipsCreated) {
                handleClose()
                toast.success('Role assigned successfully')
            }
        }


    }




    const removePreviousRole = async (id: string) => {
        const { data } = await assignRoleFn({
            variables: {
                "where": {
                    "email": employeeEmail
                },
                "disconnect": {
                    "hasRole": {
                        "where": {
                            "node": {
                                "id": id
                            }
                        }
                    }
                }
            }
        })

        if (data) {
            return true

        } else {
            return false
        }
    }





    const handleClose = () => {
        setOpenPeopleModal(false);
    };

    const handleOpen = () => {
        setOpenPeopleModal(true);
    };



    return (
        <div>
            <Dialog open={openPeopleModal} onClose={handleClose}>
                <div className="fixed inset-0 z-[1000000000000] overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 opacity-75" />

                        <form onSubmit={(e) => assignRoleToEmployee(e)} className="relative bg-white rounded-lg max-w-lg mx-auto overflow-hidden shadow-xl sm:rounded-lg sm:w-full">
                            <div className="px-6 py-4">
                                <h2 className="text-lg font-medium text-gray-900">
                                    Add People
                                </h2>
                            </div>

                            <div className="px-6 py-4">
                                <div className="grid grid-cols-1 gap-6">
                                    <div>
                                        <label
                                            htmlFor="role"
                                            className="block text-sm font-medium text-dimText mb-1"
                                        >
                                            Role
                                        </label>
                                        <select
                                            id="role"
                                            name="role"
                                            defaultValue={role}
                                            onChange={(event) =>
                                                setRole(event.target.value as string)
                                            }
                                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none  focus:border-indigo-500 sm:text-sm rounded-md"
                                        ><option value={""}>Select Role</option>
                                            {
                                                roleData?.roles.map((role: any) => (
                                                    <option key={role.id} value={role.id}>{role.name}</option>
                                                ))
                                            }

                                        </select>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="employee"
                                            className="block text-sm font-medium text-dimText mb-1"
                                        >
                                            Employee
                                        </label>
                                        <select
                                            id="employee"
                                            name="employee"
                                            defaultValue={employeeEmail}
                                            onChange={(event) =>
                                                setEmployeeEmail(event.target.value as string)
                                            }
                                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none  focus:border-indigo-500 sm:text-sm rounded-md"
                                        ><option value={""}>Select Employee</option>
                                            {
                                                userData?.users.map((user: any) => (
                                                    <option key={user.id} value={user.email}>{user.name}</option>))
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="px-6 py-4 bg-gray-100 text-right">
                                <button
                                    onClick={handleClose}
                                    type="button"
                                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-dimText bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 "
                                >
                                    Cancel
                                </button>
                                <button

                                    type="submit"
                                    className="inline-flex justify-center ml-3 px-4 py-2 text-sm font-medium text-white bg-primary border border-transparent rounded-md hover:primary focus:outline-none focus:ring-2 focus:ring-offset-2 "
                                >
                                    {assignRoleState.loading ? 'Assigning...' : 'Assign'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

export default AssignRole;