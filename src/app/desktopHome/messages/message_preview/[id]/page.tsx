import React from 'react';
import MessageContent from './MessageContent';
import Main from './Main';
import Cookies from 'js-cookie';

const getMessageDetails = async (id: string) => {

    const token = Cookies.get('conventenToken');

    const res = fetch('http://localhost:25000/', {
        method: 'POST',
        headers: {
            "authorization": `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: `query CommunicationTickets($where: CommunicationTicketWhere) {
                communicationTickets(where: $where) {
                  id
                  sub
                  date
                  files
                  message
                }
              }
              `,
            variables: {
                where: {
                    id: id
                }
            },

        })
    })

    const { data } = await res.then(res => res.json())




    return data.communicationTickets[0]
}




const page = async ({ params, searchParams }: any) => {


    const { id } = params
    const details = await getMessageDetails(id)


    return (
        <section className="max-w-2xl px-6 py-8 mx-auto bg-white dark:bg-gray-900">


            <main className="mt-8">
                <h2 className="text-gray-700 text-xl font-bold dark:text-gray-200">Sub: {details?.sub}</h2>

                <div className="mt-2 leading-loose text-gray-600 dark:text-gray-300">
                    <MessageContent content={details?.message} />
                </div>

            </main>
            <Main ticketId={id} />


        </section>
    );
};

export default page; 