'use client'
import { useGqlClient } from '@/hooks/UseGqlClient';
import { useQuery } from 'graphql-hooks';
import React, { useEffect } from 'react';
import Sidebar from './Sidebar';
import ChatBody from './ChatBody';
import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, setDoc } from "firebase/firestore";
import { db } from '@/firebase/fireabase.config';
import AuthConfig from '@/firebase/oauth.config';
import Loading from '@/app/loading';
import Error from '@/components/Error';
import { getEmployerEmail } from '@/shared/getEmployerEmail';



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
  const [labEmail, setLabEmail] = React.useState('')



  //hooks 
  const client = useGqlClient();
  const { user } = AuthConfig();


  // fetching data
  const { data, loading, error } = useQuery(GET_MODULE_TICKETS, {
    client,
    variables: {
      where: {
        vendorHas: {
          userIs: {
            email: labEmail || 'no email'
          }
        }
      },
      options: {
        sort: [
          {
            createdAt: "DESC"
          }
        ]
      }

    }
  });






  // setting  the latest module as current module
  useEffect(() => {
    getLabEmail()
    if (data?.moduleTickets) {
      setCurrentModule(data?.moduleTickets[0]?.ticket)
    }


  }, [data?.moduleTickets, user?.email]);


  // getting data based on current module
  useEffect(() => {

    if (currentModule) {
      getData()
    }
  }, [currentModule]);



  // getting lab email if employee is logged in
  const getLabEmail = async () => {
    if (user?.email) {
      const email = await getEmployerEmail(user?.email)
      setLabEmail(email)
    }


  }



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








  if (loading) return <Loading />;

  if (error) return <Error />

  return (
    <>
      <Sidebar data={data?.moduleTickets} setCurrentModule={setCurrentModule} />
      <ChatBody messages={messages} currentModule={currentModule} />

    </>
  );
};

export default Main;