'use client'
import { useGqlClient } from '@/hooks/UseGqlClient';
import { useMutation, useQuery } from 'graphql-hooks';
import React from 'react';
import Tabs from './Tabs';
import Loading from '@/app/loading';
import { toast } from 'react-hot-toast';
import createLog from '@/shared/graphQl/mutations/createLog';
import AuthConfig from '@/firebase/oauth.config';

const GET_EMPLOYEES = `
query Users($where: UserWhere) {
    users(where: $where) {
        id
      name
      email
      status
      hasRole {
        name
      }
    }
  }
`

const UPDATE_EMPLOYEE_STATUS = `
mutation UpdateUsers($where: UserWhere, $update: UserUpdateInput) {
    updateUsers(where: $where, update: $update) {
      info {
        bookmark
      }
    }
  }
`
const CREATE_ROLE = `
mutation Mutation($input: [RoleCreateInput!]!) {
    createRoles(input: $input) {
      roles {
        id
      }
    }
  }
`
const GET_ROLE = `
query Query {
    roles {
        id
      name
      createdAt
      permissions
    }
  }
`
const DELETE_ROLE = `
mutation Mutation($where: RoleWhere) {
    deleteRoles(where: $where) {
      nodesDeleted
    }
  }
`




// COMPONENT
const Main = () => {

    // states 
    const [openCreateRoleModal, setOpenCreateRoleModal] = React.useState(false);

    // hooks
    const client = useGqlClient()
    const { user } = AuthConfig()


    //getting all employees
    const { data: employeeList, loading: employeeLoading, error, refetch } = useQuery(GET_EMPLOYEES, {
        client,
        variables: {
            where: {
                user_type: "COVENTEN_EMPLOYEE"
            },
            "options": {
                "sort": [
                    {
                        "createdAt": "DESC"
                    }
                ]
            }
        }
    })
    const { data: rolesData, loading: roleLoading, error: roleError, refetch: refetchRoles } = useQuery(GET_ROLE, { client })

    // mutations
    const [updateEmployeeStatusFn, updateEmployeeState] = useMutation(UPDATE_EMPLOYEE_STATUS, {
        client
    })
    const [createRoleFn, createRoleStatus] = useMutation(CREATE_ROLE, {
        client
    })
    const [deleteRoleFn, deleteRoleStatus] = useMutation(DELETE_ROLE, {
        client
    })




    // functions


    // updating employee status

    const updateEmployeeStatus = async (id: string, status: string) => {
        const { data } = await updateEmployeeStatusFn({
            variables: {
                where: {
                    id: id || 'no id'
                },
                update: {
                    status: status
                }
            }
        })

        if (data) {
            toast.success("Employee status updated successfully")
            setOpenCreateRoleModal(false)
            refetch()
            createLog(
                `Employee `,
                `Employee status updated by ${user?.name}`,
            )
        }
    }

    // creating role
    const createRole = async (name: string, permissions: string[]) => {
        const dateTime = new Date().toISOString()
        const { data } = await createRoleFn({
            variables:
            {
                input: [
                    {
                        createdAt: dateTime,
                        permissions: permissions,
                        name: name
                    }
                ]
            }

        })

        if (data.createRoles.roles.length) {
            toast.success("Role created successfully")
            setOpenCreateRoleModal(false)
            refetchRoles()
            createLog(
                `Roles`,
                `new role created by ${user?.name}`,
            )
        }
    }

    const deleteRole = async (id: string) => {
        const { data } = await deleteRoleFn({
            variables: {
                where: {
                    id: id
                }
            }
        })

        if (data.deleteRoles.nodesDeleted) {
            toast.success("Role deleted successfully")
            refetchRoles()
            createLog(
                `Roles`,
                `role deleted by ${user?.name}`,
            )
        }
    }




    if (employeeLoading || roleLoading || updateEmployeeState.loading || createRoleStatus.loading) return <Loading />

    return (
        <>
            <Tabs employeeList={employeeList?.users} deleteRole={deleteRole} updateEmployeeStatus={updateEmployeeStatus} createRole={createRole} rolesData={rolesData?.roles} setOpenCreateRoleModal={setOpenCreateRoleModal} openCreateRoleModal={openCreateRoleModal} />
        </>
    );
};

export default Main;