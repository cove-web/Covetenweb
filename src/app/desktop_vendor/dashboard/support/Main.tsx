import AuthConfig from '@/firebase/oauth.config';
import { useGqlClient } from '@/hooks/UseGqlClient';
import { useMutation, useQuery } from 'graphql-hooks';
import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'
import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, setDoc } from "firebase/firestore";
import { db } from '@/firebase/fireabase.config';
import ChatBody from './ChatBody';
import Loading from '@/app/loading';
import Error from '@/components/Error';
import { getEmployerEmail } from '@/shared/getEmployerEmail';




const GET_SUPPORT_TICKETS = `
query SupportTickets($where: SupportTicketWhere) {
    supportTickets(where: $where) {
      id
      ticket
    }
  }
`

const CREATE_SUPPORT_TICKET = `
mutation CreateSupportTickets($input: [SupportTicketCreateInput!]!) {
    createSupportTickets(input: $input) {
      info {
        nodesCreated
        relationshipsCreated
      }
    }
  }
`
const UPDATE_SUPPORT_TICKET = `
mutation UpdateSupportTickets($where: SupportTicketWhere, $update: SupportTicketUpdateInput) {
    updateSupportTickets(where: $where, update: $update) {
      info {
        nodesCreated
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

const GET_USER_COUNT = `
query Counters {
  counters {
    supportCount
  }
}
`
// component
const Main = () => {
    //states
    const [messages, setMessages] = React.useState<any>([]);
    const [labEmail, setLabEmail] = React.useState('')

    //hooks
    const { user } = AuthConfig()
    const client = useGqlClient()



    useEffect(() => {
        if (user?.email) {
            getLabEmail(user?.email)
        }

    }, [user?.email])



    // getting lab email if employee is logged in
    const getLabEmail = async (em: string) => {
        const email = await getEmployerEmail(em)
        setLabEmail(email)
        refetch()
    }





    // queries
    const { data: countData, loading: counterLoading } = useQuery(GET_USER_COUNT, { client })
    const { data: supportTicketData, error, loading, refetch } = useQuery(GET_SUPPORT_TICKETS, {
        client,
        variables: {
            where: {
                vendorHas: {
                    userIs: {
                        email: labEmail || 'no email'
                    }
                }
            }
        }

    })

    // mutations
    const [updateCounterFn, updateCounterState] = useMutation(UPDATE_COUNTER, { client })
    const [createSupportTicketFn, createState] = useMutation(CREATE_SUPPORT_TICKET, { client })
    const [updateSupportTicketFn, updateState] = useMutation(UPDATE_SUPPORT_TICKET, { client })



    // checking if user has a support ticket
    useEffect(() => {
        if (supportTicketData?.supportTickets[0]?.id) {
            getData()
        }
    }, [supportTicketData?.supportTickets, labEmail]);



    // checking if user has a support ticket and if not create one or update the date
    const handleSupportTicket = async () => {
        updateTicket()
    }

    // CREATES A SUPPORT TICKET
    const createTicket = async () => {

        let supportCount: number

        if (countData?.counters[0]?.supportCount == 1 || countData?.counters[0]?.supportCount == null) {
            supportCount = 1001
        } else {
            supportCount = countData?.counters[0]?.supportCount + 1
        }

        await updateCount(supportCount)


        const { data } = await createSupportTicketFn({
            variables: {
                input: [
                    {
                        ticket: `S-${supportCount}`,
                        createdAt: new Date().toISOString(),
                        vendorHas: {
                            connect: {
                                where: {
                                    node: {
                                        userIs: {
                                            email: labEmail
                                        }
                                    }
                                }
                            }
                        }
                    }
                ]
            }
        })

        if (data?.createSupportTickets?.info?.nodesCreated) {
            refetch()
        }
    }

    // UPDATE SUPPORT TICKET DATE
    const updateTicket = async () => {
        const { data } = await updateSupportTicketFn({
            variables: {
                where: {
                    id: supportTicketData?.supportTickets[0]?.id
                },
                update: {
                    createdAt: new Date().toISOString()
                }
            }
        })
    }


    const updateCount = async (count: number) => {
        const { data } = await updateCounterFn({
            variables: {
                update: {
                    supportCount: count
                }
            }
        })
    }


    if (createState.loading || loading) return <Loading />

    if (error || updateState.error || createState.error) return <Error />




    // creating chat in firebase if not exist
    const getData = async () => {
        const docRef = doc(db, "support", supportTicketData?.supportTickets[0]?.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const unsubscribe = onSnapshot(doc(db, "support", supportTicketData?.supportTickets[0]?.id), (doc) => {

                if (doc.exists()) {
                    setMessages(doc.data().messages)
                }

                return () => unsubscribe();
            });
        } else {
            await setDoc(doc(db, "support", supportTicketData?.supportTickets[0]?.id), { messages: [] });
        }

    }




    return (

        <>
            {
                !loading && supportTicketData?.supportTickets[0]?.id ?
                    <ChatBody
                        messages={messages}
                        supportTicket={supportTicketData?.supportTickets[0]?.id} getData={getData} handleSupportTicket={handleSupportTicket}
                    />
                    :
                    <div className="flex justify-center items-center w-full h-screen">
                        <button onClick={createTicket} className='gradient-bg rounded-md text-white px-10 py-2 font-semibold'>
                            Continue
                        </button>
                    </div>

            }


        </>
    );
};

export default Main;