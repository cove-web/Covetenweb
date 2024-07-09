'use client'
import { useGqlClient } from '@/hooks/UseGqlClient';
import { useManualQuery, useQuery } from 'graphql-hooks';
import React, { useEffect } from 'react';
import Sidebar from './Sidebar';
import ChatBody from './ChatBody';
import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, setDoc } from "firebase/firestore";
import { db } from '@/firebase/fireabase.config';
import AuthConfig from '@/firebase/oauth.config';
import Loading from '@/app/loading';
import Error from '@/components/Error';

type CurrentModule = {
  ticket: string,
  id: string
}


const GET_MODULE_TICKETS = `
query ModuleTickets($where: ModuleTicketWhere, $options: ModuleTicketOptions) {
  moduleTickets(where: $where, options: $options) {
    ticket
    forModule {
      title
    }
  }
}
`

// component
const Main = () => {
  //states
  const [currentModule, setCurrentModule] = React.useState('');
  const [messages, setMessages] = React.useState<any>([]);
  const [data, setData] = React.useState<any>([]);
  const [query, setQuery] = React.useState('');



  //hooks 
  const client = useGqlClient();
  const { user } = AuthConfig();


  // fetching data
  const [getModuleTicketFn, getState] = useManualQuery(GET_MODULE_TICKETS, { client })



  //getting data
  const getTickets = async (query: string = '') => {
    const { data } = await getModuleTicketFn({
      variables: {
        "where": {
          "ticket_CONTAINS": query ? query.toUpperCase() : ''
        },
        "options": {
          "sort": [
            {
              "createdAt": "DESC"
            }
          ]
        },
      }
    })
    if (data) {
      setData(data?.moduleTickets)
    }
  }



  //fetching data first time and after query change
  useEffect(() => {
    getTickets(query)
  }, [query]);




  // setting  the latest module as current module
  useEffect(() => {
    if (data) {
      setCurrentModule(data[0]?.ticket)
    }

  }, [data?.length]);


  // getting data based on current module
  useEffect(() => {

    if (currentModule) {
      getData()
    }
  }, [currentModule]);





  // creating chat in firebase if not exist
  const getData = async () => {
    const docRef = doc(db, "chats", currentModule);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const unsubscribe = onSnapshot(doc(db, "chats", currentModule), (doc) => {

        if (doc.exists()) {
          setMessages(doc.data().messages)
        }

        return () => unsubscribe();
      });
    } else {
      await setDoc(doc(db, "chats", currentModule), { messages: [] });
    }

  }








  // if (getState.loading) return <Loading />;

  if (getState.error) return <Error />

  return (
    <>
      <Sidebar data={data} setCurrentModule={setCurrentModule} setQuery={setQuery} />
      <ChatBody messages={messages} currentModule={currentModule} />

    </>
  );
};

export default Main;