'use client'
import Loading from '@/app/loading';
import { useGqlClient } from '@/hooks/UseGqlClient';
import HandleFileUpload from '@/shared/HandleFileUpload';
import deleteImage from '@/shared/deleteImage';
import { useMutation, useQuery } from 'graphql-hooks';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { v4 as uuid } from 'uuid'



const UPDATE_client = `
mutation DeleteHomeClients($where: HomeClientWhere, $update: HomeClientUpdateInput) {
  updateHomeClients(where: $where, update: $update) {
    homeClients {
      id
    }
  }
}
`

const GET_client = `
query HomeClients {
  homeClients {
    id
    name
    logo
  }
}

`
const DELETE_client = `
mutation DeleteHomeClients($where: HomeClientWhere) {
  deleteHomeClients(where: $where) {
    nodesDeleted
  }
}
`


const Main = () => {

  //states

  const [clientData, setClientData] = useState<any>({
    client1: {
      id: '',
      name: '',
      logo: null
    },
    client2: {
      id: '',
      name: '',
      logo: null
    },
    client3: {
      id: '',
      name: '',
      logo: null
    },
    client4: {
      id: '',
      name: '',
      logo: null
    },
    client5: {
      id: '',
      name: '',
      logo: null
    },
    client6: {
      id: '',
      name: '',
      logo: null
    },
    client7: {
      id: '',
      name: '',
      logo: null
    },
    client8: {
      id: '',
      name: '',
      logo: null
    },

  })

  //hooks 
  const client = useGqlClient()
  const { uploadFile } = HandleFileUpload()



  //query
  const { data, loading: loadingQuery, error: errorQuery, refetch } = useQuery(GET_client, { client })
  //mutation
  const [updateHomePageFn, { loading, error }] = useMutation(UPDATE_client, { client })





  // setting data to state
  useEffect(() => {
    if (data?.homeClients.length) {
      data?.homeClients?.map((client: any, i: number) => {
        setClientData((prev: any) => ({
          ...prev,
          [`client${i + 1}`]: {
            id: client.id,
            name: client.name,
            logo: client.logo
          }
        }))
      })
    }
  }, [data?.homeclients?.length, loadingQuery])



  // initializing mutation  and query

  const updateHomePage = async (id: string, name: string, logo: string) => {

    const { data: updateData } = await updateHomePageFn({
      variables: {
        "where": {
          "id": id
        },
        "update": {
          "name": name,
          "logo": logo
        }
      }
    })

    if (updateData?.updateHomeClients?.homeClients?.length) {
      // toast.success('Updated')
      refetch()
    }

  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    Object.keys(clientData).map(async (key: any) => {
      const { id, name, logo } = clientData[key]
      if (logo && typeof logo !== 'string') {
        const newLogoLink = await uploadFile(logo, `client-${uuid()}`, 'home_Client_images')
        if (newLogoLink) {
          const oldLogo = data?.homeClients?.find((client: any) => client.id === id)?.logo
          deleteImage(oldLogo)
          updateHomePage(id, name, newLogoLink)
        }
      }
      else if (id) {
        const oldLogo = data?.homeClients?.find((client: any) => client.id === id)?.logo
        updateHomePage(id, name, oldLogo)
      }
    })

  }





  if (loading || loadingQuery) return <Loading />






  // render 

  return (
    <form onSubmit={handleSubmit} className='bg-white rounded p-5 min-h-[70vh]'>



      {
        data?.homeClients?.length && data?.homeClients?.map((client: any, i: number) =>


          <div key={client?.id}  >

            <div className="mb-5 ">
              <p className='font-bold mb-4'>client-{i + 1}</p>
              <label htmlFor="title" className="block  text-gray-700 text-sm mb-1">
                Title
              </label>
              <input
                defaultValue={clientData[`client${i + 1}`]?.name}
                onChange={(e) => setClientData((prev: any) => {
                  return {
                    ...prev,
                    [`client${i + 1}`]: {
                      ...prev[`client${i + 1}`],
                      name: e.target.value
                    }
                  }
                })}
                className="mt-1 px-4 py-2 border border-gray-200 rounded-md w-full"
              />
            </div>
            <div className="mb-5 ">
              <label htmlFor="title" className="block  text-gray-700 text-sm mb-1">
                Logo
              </label>
              <input
                type='file'
                onChange={(e) => setClientData((prev: any) => {
                  const file = e.target.files?.[0];
                  return {
                    ...prev,
                    [`client${i + 1}`]: {
                      ...prev[`client${i + 1}`],
                      logo: file
                    }
                  }
                })}
                className="mt-1 px-4 py-2 border border-gray-200 rounded-md w-full"
              />
            </div>


          </div>

        )
      }








      <div>
        <button type='submit' className='px-4 py-2 bg-primary text-white font-semibold'>{loading ? 'loading..' : 'Update'}</button>
      </div>
    </form >
  );
};

export default Main;