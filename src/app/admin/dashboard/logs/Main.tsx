'use client'
import Loading from '@/app/loading';
import Error from '@/components/Error';
import { useGqlClient } from '@/hooks/UseGqlClient';
import { useManualQuery, useQuery } from 'graphql-hooks';
import React, { useEffect, useState } from 'react';
import LogTable from './LogTable';

const GET_LOGS = `
query Query($where: LogWhere, $options: LogOptions) {
  logs(where: $where, options: $options) {
    id
    title
    message
    createdAt
  }
}
`

const Main = () => {
  const [searchQuery, setSearchQuery] = useState('')
  // pagination states
  const [pageLimit, setPageLimit] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [totalLogs, setTotalLogs] = useState(0)
  const [LogsData, setLogsData] = useState<any>([])

  // hooks
  const client = useGqlClient()


  // queries
  const [getLogsFn, state] = useManualQuery(GET_LOGS, { client })



  // refetching data based on pagination and search query
  useEffect(() => {
    let where
    if (searchQuery) {
      where = {
        title_CONTAIN: searchQuery
      }
    }
    else {
      where = {}
    }
    getLogsCount()
    getLogsData(where)
  }, [currentPage, searchQuery]);


  // initializing query and mutations

  const getLogsCount = async () => {
    const { data } = await getLogsFn({
      variables: {
        where: {}
      }
    })
    if (data?.logs?.length) {
      setTotalLogs(data.logs.length)
      setTotalPages(Math.ceil(data.logs.length / pageLimit))
    }

  }

  const getLogsData = async (where: any) => {
    const { data } = await getLogsFn({
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



    if (data?.logs?.length) {
      setLogsData(data?.logs)
    }
  }







  if (state?.loading) return <Loading />
  if (state.error) return <Error />




  return (
    <div>
      <LogTable data={LogsData} />
    </div>
  );
};

export default Main;