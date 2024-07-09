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

const GET_SUPPORT_TICKETS = `
query SupportTickets($options: SupportTicketOptions, $where: SupportTicketWhere) {
  supportTickets(options: $options, where: $where) {
      id
      ticket
      isViewed
    }
  }
`

// component
const Main = () => {
  //states
  const [currentSupportTicket, setCurrentSupportTicket] = React.useState<any>({
    ticket: "",
    id: ""
  });
  const [messages, setMessages] = React.useState<any>([]);
  const [data, setData] = React.useState<any>([]);
  const [query, setQuery] = React.useState('');



  //hooks 
  const client = useGqlClient();

  const [getTicketFn, getState] = useManualQuery(GET_SUPPORT_TICKETS, { client })

  // fetching data
  // const { data, loading, error } = useQuery(GET_SUPPORT_TICKETS, {
  //   client,
  //   variables: {
  //     options: {
  //       sort: [
  //         {
  //           createdAt: "DESC"
  //         }
  //       ]
  //     }

  //   }
  // });

  const getTickets = async (query: string = '') => {
    const { data } = await getTicketFn({
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
      setData(data?.supportTickets)
    }
  }

  //fetching data first time and after query change
  useEffect(() => {
    getTickets(query)
  }, [query]);


  // setting  the latest module as current module
  useEffect(() => {
    if (data?.length) {
      setCurrentSupportTicket(data?.ticket)
    }

  }, [data?.length]);


  // getting data based on current module
  useEffect(() => {

    if (currentSupportTicket) {
      getData()
    }
  }, [currentSupportTicket]);





  // creating chat in firebase if not exist
  const getData = async () => {
    const docRef = doc(db, "support", currentSupportTicket?.id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const unsubscribe = onSnapshot(doc(db, "support", currentSupportTicket?.id), (doc) => {

        if (doc.exists()) {
          setMessages(doc.data().messages)
        }

        return () => unsubscribe();
      });
    } else {
      await setDoc(doc(db, "support", currentSupportTicket?.id), { messages: [] });
    }

  }








  // if (getState ? loading) return <Loading />;

  // if (error) return <Error />

  return (
    <>
      <Sidebar data={data} setCurrentSupportTicket={setCurrentSupportTicket} setQuery={setQuery} />
      <ChatBody messages={messages} currentSupportTicket={currentSupportTicket} />

    </>
  );
};

export default Main;