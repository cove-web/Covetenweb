'use client';

import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'graphql-hooks';
import { toast } from 'react-hot-toast';
import EventModal from './EventModal';
import EventTable from './EventTable';
import UpdateModal from './UpdateModal';
import PreviewModal from './PreviewModal';
import { useGqlClient } from '@/hooks/UseGqlClient';
import Loading from '@/app/loading';
import HandleFileUpload from '@/shared/HandleFileUpload';
import slugify from 'slugify';


const CREATE_EVENT = `
mutation CreateEvents($input: [EventCreateInput!]!) {
    createEvents(input: $input) {
      info {
        nodesCreated
      }
    }
  }`;

const GET_EVENT = `
query Events {
    events {
        id
      name
      location
      startAt
      endAt
      IsApproved
    }
  }
`;
const GET_CATEGORY = `
query Categories($where: CategoryWhere) {
    categories(where: $where) {
      name
      id
    }
  }
`;
const DELETE_EVENT = `
mutation DeleteEvents($where: EventWhere) {
    deleteEvents(where: $where) {
      nodesDeleted
    }
  }
`;

const UPDATE_EVENT = `
mutation UpdateEvents($update: EventUpdateInput, $where: EventWhere) {
  updateEvents(update: $update, where: $where) {
    info {
      nodesCreated
      nodesDeleted
      relationshipsCreated
      relationshipsDeleted
    }
  }
} 
`;



const Main = () => {
    const [openModal, setOpenModal] = useState(false);
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const [openPreviewModal, setOpenPreviewModal] = useState(false);
    const [currentEvent, setCurrentEvent] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [deleteId, setDeleteId] = useState('');
   


    // HOOKS
    const client = useGqlClient()


    // QUERY
    const [updateEventFn, updateEventState] = useMutation(UPDATE_EVENT, { client })
    const { data: eventData, loading, error, refetch } = useQuery(GET_EVENT, { client })
    const { data: category, loading: catLoading } = useQuery(GET_CATEGORY, {
        client,
        variables: {
            "where": {
                "type": "EVENT"
            }
        }
    })

    // MUTATION
    const [createEventFn, createEventState] = useMutation(CREATE_EVENT, { client })
    const [deleteEventFn, deleteEventState] = useMutation(DELETE_EVENT, { client, })
    const [updateFn, updateState] = useMutation(UPDATE_EVENT, { client, })


    // initialize the query and mutations

    // create event
    const createEvent = async (input: any) => {

        const { data } = await createEventFn({
            variables: {
                "input": [
                    {
                        name: input.name,
                        "image": input.image,
                        "description": input.description,
                        "location": input.location,
                        "endAt": input.endAt,
                        registrationUrl: input.regUrl,
                        category: selectedCategory,
                        IsApproved:true,
                        slug: slugify(input.name, { replacement: '_', remove: /[*+~.()'"!:@]/g }),
                        "startAt": input.startAt,
                    }
                ]
            }
        })

        if (data.createEvents.info.nodesCreated) {
            toast.success('event added successfully')
            setOpenModal(false)
            refetch()
        }
    }


    const updateEvent = async (input: any, id: string) => {

        const { data } = await updateFn({
            variables: {
                update: {
                    name: input.name,
                    location: input.location,
                    image: input.image,
                    endAt: input.endAt,
                    startAt: input.startAt,
                    description: input.description,
                    IsApproved:true,
                    registrationUrl: input.regUrl,
                },
                // where: {
                //     id_CONTAINS: id,
                //     IsApproved:true
                // }
                variables: {
                    where: {
                        id: id
                    },
                    update: {
                        IsApproved: true
                    }
                }
                
            },
        })

        if (data) {
            setOpenUpdateModal(false)
            refetch()
        }
    }

    const deleteEvent = async (id: string) => {
        const { data } = await deleteEventFn({
            variables: {
                where: {
                    id
                }
            }
        })

        if (data.deleteEvents.nodesDeleted) {
            toast.error('event deleted successfully')
            refetch()

        }
    }


    useEffect(() => {
        setSelectedCategory(category?.categories[0]?.name)
    }, [category?.categories])



    if (loading || deleteEventState.loading || createEventState.loading || catLoading || updateState.loading) return <Loading />







    return (
        <>
            <div className="w-full overflow-hidden bg-white p-4 min-h-[70vh] lg:p-8">
                <div className="flex items-center justify-between">
                    <div className="mb-3">
                        <h4 className="text-primaryText font-bold text-xl">Events</h4>

                    </div>
                    <p
                        onClick={() => setOpenModal(true)}
                        className="bg-primary text-white font-semibold px-4 py-2 cursor-pointer flex items-center "
                    >
                        <span className="mr-1">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                />
                            </svg>
                        </span>
                        Add New
                    </p>
                </div>

                <div className="w-full bg-white rounded-lg mt-5 py-3 ">
                    <EventTable
                        data={eventData?.events}
                        loading={loading}
                        setCurrentEvent={setCurrentEvent}
                        setOpenUpdateModal={setOpenUpdateModal}
                        setOpenPreviewModal={setOpenPreviewModal}
                        setDeleteId={setDeleteId}
                        deleteEvent={deleteEvent}
                        updateEvent={updateEvent}
                    />
                </div>
            </div>

            <EventModal
                setOpenModal={setOpenModal}
                openModal={openModal}
                createEventFn={createEvent}
                loading={loading}
                setSelectedCategory={setSelectedCategory}
                selectedCategory={selectedCategory}
                category={category?.categories}
            />
            <UpdateModal
                id={currentEvent}
                setOpenUpdateModal={setOpenUpdateModal}
                openUpdateModal={openUpdateModal}
                setSelectedCategory={setSelectedCategory}
                selectedCategory={selectedCategory}
                category={category?.categories}
                updateEvent={updateEvent}
            />

        </>
    );
};

export default Main;