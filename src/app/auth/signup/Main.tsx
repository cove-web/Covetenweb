'use client'

import { useGqlClient } from '@/hooks/UseGqlClient';
import { useMutation } from 'graphql-hooks';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import SignUpFrom from './SignUpFrom';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import createLog from '@/shared/graphQl/mutations/createLog';

const CREATE_USER = `
mutation Mutation($email: String!, $name: String!, $userType: String!) {
    signUp(email: $email, name: $name, user_type: $userType)
  }
  
`
const UPDATE_USER = `
mutation UpdateUsers($where: UserWhere, $update: UserUpdateInput) {
    updateUsers(where: $where, update: $update) {
      info {
        nodesCreated
      }
    }
  }
  
`

const Main = () => {

    //states
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = useState('');

    // hooks
    const router = useRouter()
    const client = useGqlClient()

    // saving  user to database
    const [createUserFn, state] = useMutation(CREATE_USER, { client });
    const [updateUserFn, updateState] = useMutation(UPDATE_USER, { client });




    // initializing user creation function
    const createUser = async (name: string, email: string, user_type: string, sub_type: string, selectedIndustries: any[], selectedVendor: string) => {


        const { data } = await createUserFn({
            variables: {
                email,
                name,
                userType: user_type === "SERVICE PROVIDER" ? "SERVICE_PROVIDER" : user_type === 'COVETEN_EMPLOYEE' ? "COVENTEN_EMPLOYEE" : user_type,
            }
        })

        if (data?.signUp) {
            // saving token to cookie
            Cookies.set('conventenToken', data.signUp)
            // updating user
            let updateVariables

            // updating user variables
            if (user_type === "SERVICE_PROVIDER") {
                updateVariables = {
                    where: {
                        email
                    },
                    update: {
                        isVendor: {
                            create: {
                                node: {
                                    industry: selectedIndustries.map((industry) => industry.title),
                                    // sub_type: sub_type
                                }
                            }
                        }
                    }
                }

            } else if (user_type === "CONSUMER") {
                updateVariables = {
                    where: {
                        email
                    },
                    update: {
                        isClient: {
                            create: {
                                node: {
                                    sub_type: sub_type,
                                    industry: [],
                                    service: [],
                                    equipmentDocs: [],
                                }
                            }
                        }
                    }
                }
            } else if (user_type === "LAB_ASSISTANT") {
                updateVariables = {
                    update: {
                        hasEmployee: {
                            create: {
                                node: {
                                    employerEmail: selectedVendor,
                                }
                            }
                        }
                    },
                    where: {
                        email: email
                    }
                }
            } else {
                setLoading(false)
                toast.success('Account created successfully')
                router.push('/')
                createLog(
                    `New User Joined`,
                    `New User with email ${email} joined as ${user_type}`
                )
            }

            // updating user

            const { data: updateData } = await updateUserFn({
                variables: updateVariables
            })

            if (updateData?.updateUsers.info.nodesCreated) {
                setLoading(false)
                toast.success('Account created successfully')
                if (user_type === "SERVICE_PROVIDER" || user_type === "CONSUMER" || user_type === "LAB_ASSISTANT" || user_type === "COVETEN_EMPLOYEE") {
                    router.push('/auth/verify')
                } else {
                    router.push('/')
                }

            }


        }





    }


    //handle error
    if (state.error || updateState.error) {
        <p className='text-red-600 font-semibold text-sm'>Sorry something went wrong</p>
    }
    if (error) {
        <p className='text-red-600 font-semibold text-sm'>{error.substring(10)}</p>
    }


    return (
        <>
            <SignUpFrom createUser={createUser} loading={loading} setLoading={setLoading} setError={setError} error={error} />
        </>
    );
};

export default Main;