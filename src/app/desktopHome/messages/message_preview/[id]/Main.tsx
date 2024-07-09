'use client'
import AuthConfig from '@/firebase/oauth.config';
import { useGqlClient } from '@/hooks/UseGqlClient';
import { useMutation, useQuery } from 'graphql-hooks';
import React, { useState } from 'react';
import MessageContent from './MessageContent';

import Button from '@/components/Button';

import { toast } from 'react-hot-toast';
import Loading from '@/app/loading';
import Error from '@/components/Error';

const GET_REPLY = `
query Replies($where: ReplyWhere) {
    replies(where: $where) {
      replyMessage
    }
  }
`
const CREATE_REPLY = `
mutation Mutation($input: [ReplyCreateInput!]!) {
    createReplies(input: $input) {
      info {
        nodesCreated
        relationshipsCreated
      }
    }
  }
`

// component
const Main = ({ ticketId }: { ticketId: string }) => {

    //states
    const [isReply, setIsReply] = useState(false)
    const [replyMessage, setReplyMessage] = useState("")
    const [editorState, setEditorState] = useState("")

    //hooks
    const client = useGqlClient()
    const { user } = AuthConfig()



    // query replies
    const { data, error, loading, refetch } = useQuery(GET_REPLY, {
        client: client,
        variables: {
            where: {
                clientHas: {
                    userIs: {
                        email: user?.email
                    }
                },
                communicationticketHas: {
                    id: ticketId
                }
            }
        }
    })

    // mutation create reply
    const [createReplyFn, createReplyState] = useMutation(CREATE_REPLY, { client })


    // initializing the reply creation

    const createReply = async () => {
        const { data } = await createReplyFn({
            variables: {
                "input": [
                    {
                        "replyMessage": replyMessage,
                        senderEmail: user?.email,
                        "communicationticketHas": {
                            "connect": {
                                "where": {
                                    "node": {
                                        "id": ticketId
                                    }
                                }
                            }
                        },
                        "clientHas": {
                            "connect": {
                                "where": {
                                    "node": {
                                        "userIs": {
                                            "email": user?.email
                                        }
                                    }
                                }
                            }
                        }
                    }
                ]
            }
        })

        if (data.createReplies.info.nodesCreated) {
            setIsReply(false)
            toast.success('Reply sent successfully')
            refetch()
        }
    }







    if (loading || createReplyState.loading) return <Loading />

    if (error || createReplyState.error) return <Error />


    // render
    return (
        <>
            {
                data?.replies.length ?
                    <>
                        <div className="mt-2 leading-loose text-gray-600 dark:text-gray-300">
                            <div className="col-span-full">
                                <label htmlFor="Reply" className="text-sm">Replied Message</label>
                                <textarea value={data?.replies[0]?.replyMessage} id="Reply" rows={5} placeholder="" className="w-full rounded-sm border border-gray-300 ring-primary dark:border-gray-700 dark:text-gray-900"></textarea>
                            </div>
                        </div>
                    </>
                    :
                    <>
                        {
                            !isReply && (
                                <div onClick={() => setIsReply(!isReply)} className="mt-6">
                                    <Button title='Reply' />
                                </div>
                            )
                        }
                        {
                            isReply && (
                                <div className={`mt-20 `}>
                                    <div className="col-span-full">
                                        <label htmlFor="Reply" className="text-sm">Reply</label>
                                        <textarea onChange={(e) => setReplyMessage(e.target.value)} id="Reply" rows={5} placeholder="" className="w-full rounded-sm border border-gray-300 ring-primary dark:border-gray-700 dark:text-gray-900"></textarea>
                                    </div>
                                    <div onClick={createReply} className='mt-6 text-right'>
                                        <Button title='Reply' />
                                    </div>
                                </div>
                            )
                        }
                    </>
            }

        </>
    );
};

export default Main;