'use client'
import { useGqlClient } from '@/hooks/UseGqlClient';
import { useManualQuery, useMutation, useQuery } from 'graphql-hooks';
import React, { useState, useEffect } from 'react';
import UserTable from './UserTable';
import UserModal from './UserModal';
import { toast } from 'react-hot-toast';
import Pagination from '@/components/Pagination';
import Error from '@/components/Error';
import Loading from '@/app/loading';
import createLog from '@/shared/graphQl/mutations/createLog';
import AuthConfig from '@/firebase/oauth.config';


const GET_USER = `
query Users($where: UserWhere, $options: UserOptions) {
  users(where: $where, options: $options) {
    id
    companyName
    companyEmail
    bio
    email
    createdAt
    gstNumber
    status
    userId
    isViewed
    user_type
    hasDocuments {
      hasFiles {
        id
        links
      }
    }
  }
}
`

const GET_USER_COUNT = `
query Counters {
  counters {
    userCount
  }
}
`

const UPDATE_USER = `
mutation UpdateUsers($where: UserWhere, $update: UserUpdateInput) {
  updateUsers(where: $where, update: $update) {
    info {
      nodesCreated
      nodesDeleted
      relationshipsCreated
    }
  }
}
`

const UPDATE_COUNTER = `
mutation UpdateCounters($update: CounterUpdateInput) {
  updateCounters(update: $update) {
    info {
      nodesCreated
    }
  }
}
`

const DELETE_USER = `
mutation DeleteUsers($where: UserWhere) {
  deleteUsers(where: $where) {
    nodesDeleted
  }
}
`


const Main = () => {

  //states
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [currentData, setCurrentData] = React.useState<any>(null)

  // search sates
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedUserType, setSelectedUserType] = useState('All')

  // pagination states
  const [pageLimit, setPageLimit] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [totalUser, setTotalUser] = useState(0)
  const [userData, setUserData] = useState<any>([])

  //HOOKS
  const client = useGqlClient()
  const { user } = AuthConfig()

  //quires 
  const { data: userCountData, loading, refetch } = useQuery(GET_USER_COUNT, { client })
  const [getUserFn, userDataState] = useManualQuery(GET_USER, { client })


  //mutations
  const [updateCounterFn, updateCounterState] = useMutation(UPDATE_COUNTER, { client })
  const [updateUserFn, updateUserState] = useMutation(UPDATE_USER, { client })
  const [deleteUserFn, deleteSate] = useMutation(DELETE_USER, { client })





  // refetching data based on pagination and search query
  useEffect(() => {
    // filtering using user type select
    let user_type: string[]
    if (selectedUserType !== 'All') {
      user_type = [selectedUserType]
    } else {
      user_type = ["CONSUMER", "SERVICE_PROVIDER","LAB_ASSISTANT","COVENTEN_EMPLOYEE","ADMIN","EMPLOYEE"]
    }


    // search variable
    let where: any = {
      user_type_IN: user_type
    }

    if (searchQuery) {
      where = {
        user_type_IN: user_type,
        userId_CONTAINS: searchQuery

      }
    }

    getUserData(where)
    getUserCount()
  }, [currentPage, searchQuery, selectedUserType]);


  const count = userCountData?.counters[0]?.userCount

  useEffect(() => { }, [count])


  // initializing query and mutations


  const getUserCount = async () => {
    const { data } = await getUserFn({
      variables: {
        where: {
          user_type_IN: ["CONSUMER", "SERVICE_PROVIDER","LAB_ASSISTANT","COVENTEN_EMPLOYEE","ADMIN","EMPLOYEE"]
        }
      }
    })
    if (data.users.length) {
      setTotalUser(data.users.length)
      setTotalPages(Math.ceil(data.users.length / pageLimit))
    }

  }

  const getUserData = async (where: any) => {
    const { data } = await getUserFn({
      variables: {
        where: where,
        options: {
          limit: pageLimit,
          offset: (currentPage - 1) * pageLimit,
          sort: [
            {
              createdAt: "DESC"
            }
          ]
        }
      }
    })



    if (data?.users?.length) {
      setUserData(data?.users)
    }
  }


  // initializing update user mutation

  const updateUser = async (email: string, status: string) => {
    let userCount: number

    if (userCountData?.counters[0]?.userCount == 1 || userCountData?.counters[0]?.userCount == null) {
      userCount = 100000
    } else {
      userCount = userCountData?.counters[0]?.userCount + 1
    }

    await updateUserCount(userCount)


//
    if (userCount) {
      const { data } = await updateUserFn({
        variables: {
          where: {
            email: email
          },
          update: {
            status: status,
            "userId": `${userCount}`
          }
        }
      })

      if (data) {
        getUserData({ user_type_IN: ["CONSUMER", "SERVICE_PROVIDER", "LAB_ASSISTANT", "COVENTEN_EMPLOYEE", "ADMIN", "EMPLOYEE"] });
        toast.success('User updated successfully')
        refetch()
        setIsModalOpen(false)
        createLog(
          `User Approval`,
          `User Approved by ${user?.email}`
        )

      }
    }

  }



  const updateUserCount = async (count: number) => {
    const { data } = await updateCounterFn({
      variables: {
        update: {
          userCount: count
        }
      }
    })




  }




  const deleteUser = async (id: string) => {
    const { data } = await deleteUserFn({
      variables: {
        "where": {
          "id": id
        }
      }

    })

    if (data) {
      toast.error('User deleted')
    }
  }


  if (userDataState?.error || updateUserState.error) return <Error />
  if (updateUserState.loading) return <Loading />


  return (
    <>
      <div className="my-2 flex justify-end sm:flex-row flex-col mb-5">
        <div className="flex flex-row mb-1 sm:mb-0">

          <div className="relative">
            <select
              value={selectedUserType}
              onChange={(e) => setSelectedUserType(e.target.value)}
              className=" h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block  w-full  bg-white border-gray-300  py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r text-xs  focus:border-gray-500  dark:bg-darkBg dark:border-darkBorder"
              style={{backgroundColor:'#e8e8e880'}}
              >
              <option value={"All"}>All</option>
              <option value={"SERVICE_PROVIDER"}>Service Provider</option>
              <option value={"CONSUMER"}>Consumer</option>
            </select>

          </div>
        </div>
        <div className="block relative">
          <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current text-gray-500">
              <path
                d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z">
              </path>
            </svg>
          </span>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search By Email and Name"
            style={{backgroundColor:'#e8e8e880'}}

            className="  sm:rounded-l-none border border-gray-300 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700  focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none dark:bg-darkBg dark:border-darkBorder" />
        </div>
      </div>
      {/* search */}
      <UserTable data={userData} setCurrentData={setCurrentData} setIsModalOpen={setIsModalOpen} loading={userDataState?.loading} />
      <div className='w-full flex items-center justify-center'>
        {totalUser! > pageLimit &&
          <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />}

      </div>
      <UserModal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} data={currentData} updateUser={updateUser} updateUserLoading={updateUserState?.loading} />
    </>
  );
};

export default Main;