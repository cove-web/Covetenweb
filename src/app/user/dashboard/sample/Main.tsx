'use client'
import AuthConfig from '@/firebase/oauth.config';
import { useGqlClient } from '@/hooks/UseGqlClient';
import { useMutation, useQuery } from 'graphql-hooks';
import React, { useEffect } from 'react';
import SampleTable from './SampleTable';
import { toast } from 'react-hot-toast';
import Loading from '@/app/loading';
import createLog from '@/shared/graphQl/mutations/createLog';

const GET_MODULES = `
query Modules($where: ModuleWhere) {
    modules(where: $where) {
        id
      title
      sampleStatus
      projectHas {
        title
      }
      moduleticketFor {
        ticket
      }
    }
  }
`
const UPDATE_MODULE = `
mutation Mutation($where: ModuleWhere, $update: ModuleUpdateInput) {
    updateModules(where: $where, update: $update) {
  
      modules {
        id
      }
    }
  }
`


const Main = () => {
    // states 
    // ['ON_WAY', 'RECEIVED', 'NOT_SENT'

    // HOOKS 
    const client = useGqlClient()
    const { user } = AuthConfig()

    // mutations
    const [updateModule, updateState] = useMutation(UPDATE_MODULE, { client })


    // QUERIES
    const { data, error, loading, refetch } = useQuery(GET_MODULES, {
        client,
        variables: {
            where: {
                projectHas: {
                    clientOrdered: {
                        userIs: {
                            email: user?.email || 'no user'
                        }
                    }
                },
                "moduleticketFor": {
                    "status_IN": ["ACCEPTED", "ASSIGNED"]
                }
            }
        }
    })



    // initializing update module

    const updateModuleStatus = async (id: string, status: string) => {

        const { data } = await updateModule({
            variables: {
                where: {
                    id: id
                },
                update: {
                    sampleStatus: status
                }
            }
        })


        if (data.updateModules?.modules?.length) {
            toast.success('Updated')
            refetch()
            createLog(
                `Module Sample`,
                `Module sample sent updated by ${user?.email}`
            )

        }
    }


    if (loading || updateState.loading) return <div><Loading /></div>




    return (
        <div>
            <SampleTable data={data?.modules} updateModuleStatus={updateModuleStatus} />
        </div>
    );
};

export default Main;