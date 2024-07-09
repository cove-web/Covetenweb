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
query Users($where: UserWhere) {
  users(where: $where) {
    name
    email
    companyEmail
  }
}
`

// component
const Main = () => {
  //states
  // const [empemail, setEmpemail] = React.useState('');
  const [empemail,setEmpemail] = React.useState('');
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
        user_type: "LAB_ASSISTANT",
        
        // companyEmail: labEmail
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
console.log(data);

console.log(empemail)




  // setting  the latest module as current module
  useEffect(() => {
    getLabEmail()
    if (data?.moduleTickets) {
      setEmpemail(data?.moduleTickets[0]?.ticket)
    }


  }, [data?.moduleTickets, user?.email]);


  // getting data based on current module
  useEffect(() => {

    if (empemail) {
      getData()
    }
  }, [empemail]);



  // getting lab email if employee is logged in
  const getLabEmail = async () => {
    if (user?.email) {
      const email = await getEmployerEmail(user?.email)
      setLabEmail(email)
    }


  }



  // creating chat in firebase if not exist
  const getData = async () => {
    const docRef = doc(db, "empchats", empemail);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const unsubscribe = onSnapshot(doc(db, "empchats", empemail), (doc) => {

        if (doc.exists()) {
          setMessages(doc.data().messages)
        }

        return () => unsubscribe();
      });
    } else {
      await setDoc(doc(db, "empchats", empemail), { messages: [] });
    }

  }








  if (loading) return <Loading />;

  if (error) return <Error />

  return (
    <>
      <Sidebar data={data?.users} setEmpemail={setEmpemail} />
      <ChatBody messages={messages} empemail={empemail} />

    </>
  );
};

export default Main;