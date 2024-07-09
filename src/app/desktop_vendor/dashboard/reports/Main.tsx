'use client'
import { useGqlClient } from '@/hooks/UseGqlClient';
import { useManualQuery, useMutation, useQuery } from 'graphql-hooks';
import React, { useEffect } from 'react';
import Sidebar from './Sidebar';

import AuthConfig from '@/firebase/oauth.config';
import DocCards from './DocCards';
import Loading from '@/app/loading';
import ComplainModal from './ComplainModal';
import { toast } from 'react-hot-toast';
import createLog from '@/shared/graphQl/mutations/createLog';
import { getEmployerEmail } from '@/shared/getEmployerEmail';


const GET_TEST = `
query Modules($options: ModuleOptions, $where: ModuleWhere) {
  modules(options: $options, where: $where) {
    id
    files
    ticket
    status
    type
    title
    reports
  }
}
`
const UPDATE_TEST_MODULE = `
mutation UpdateModules($where: ModuleWhere, $update: ModuleUpdateInput, $disconnect: ModuleDisconnectInput) {
    updateModules(where: $where, update: $update, disconnect: $disconnect) {
      info {
        nodesCreated
        relationshipsCreated
      }
    }
  }
  `

const SEND_NOTIFICATION = `
  mutation CreateNotifications($input: [NotificationCreateInput!]!) {
      createNotifications(input: $input) {
        info {
          nodesCreated
        }
      }
    }`


const Main = () => {
  //states
  const [currentModule, setCurrentModule] = React.useState('');
  const [messages, setMessages] = React.useState<any>([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const [vendorId, setVendorId] = React.useState('')
  const [labEmail, setLabEmail] = React.useState('');
  const [reportData, setReportData] = React.useState<any>([]);
  //hooks 
  const client = useGqlClient();
  const { user } = AuthConfig()



  //quires 
  const [getReportsFn, dataState] = useManualQuery(GET_TEST, { client })

  // mutations
  const [addComplainFn, state] = useMutation(UPDATE_TEST_MODULE, { client });
  const [sendNotificationFn, notificationState] = useMutation(SEND_NOTIFICATION, { client })




  // initializing add complain function
  const addComplain = async (complain: string) => {

    const { data } = await addComplainFn({
      variables: {
        where: {
          id: currentModule
        },
        update: {
          status: "COMPLAINED",
          complain: complain
        }
      }
    })

    if (data.updateModules) {
      setIsOpen(false)

      // sendNotification('commented')
      toast.success('Complain Added Successfully')
      // createLog(
      //   `Module Report`,
      //   `Report added to  A module`
      // )
    }

  }
  const confirmComplete = async () => {
    const { data } = await addComplainFn({
      variables: {
        where: {
          id: currentModule
        },
        update: {
          status: "COMPLETED",
        }
      }
    })

    if (data.updateModules) {
      setIsOpen(false)

      toast.success('Complain Added Successfully')
      // sendNotification('confirmed')
      // createLog(
      //   `Module Report`,
      //   `Report confirmed ${data?.updateModuleTickets?.moduleTickets[0]?.forModule?.title} module`
      // )
    }

  }


  // getting lab email if employee is logged in
  const getLabEmail = async () => {
    if (user?.email) {
      const email = await getEmployerEmail(user?.email)
      setLabEmail(email)
    }
  }



  const getReports = async (email: string) => {
    if (email) {
      const { data } = await getReportsFn({
        variables: {
          variables: {
            "where": {
              "status": "COMPLETED",
              "userHas": {
                "email": email || 'no email'
              }
            }
          },
          "options": {
            "sort": [
              {
                "createdAt": "ASC"
              }
            ]
          }
        }
      })
      if (data?.modules?.length > 0) {
        setReportData(data?.modules)
      }
    }
  }






  // useEffect(() => { }, [reportData])

  useEffect(() => {
    getLabEmail()
    if (user?.email) {

      getReports(user?.email)
    }
  }, [user?.email])




  const sendNotification = async (type: string) => {

    const { data: adminData } = await sendNotificationFn({
      variables: {
        "input": [
          {
            "title": `A user has ${type} a report`,
            "description": `A user has created a new project with ticket ${type}`,
            "createdAt": new Date().toISOString(),
            "notificationFor": "VENDOR",
            "vendorHas": {
              "connect": {
                "where": {
                  "node": {
                    "userIs": {
                      "id": vendorId
                    }
                  }
                }
              }
            }
          }
        ]
      }
    })
  }



  // if (dataState || state.loading) return <Loading />

  return (
    <div className='flex flex-row h-full  lg:max-h-[85vh] w-full overflow-x-hidden'>
      <Sidebar data={reportData} setCurrentModule={setCurrentModule} />
      <div className='w-full'>

        <DocCards currentModule={currentModule} setIsOpen={setIsOpen} confirmComplete={confirmComplete} setVendorId={setVendorId} />
      </div>
      <ComplainModal isOpen={isOpen} setIsOpen={setIsOpen} addComplain={addComplain} />
    </div>
  );
};

export default Main;