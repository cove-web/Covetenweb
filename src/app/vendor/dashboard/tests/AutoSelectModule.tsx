'use client'
import { Fragment, useEffect, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { useGqlClient } from '@/hooks/UseGqlClient'
import { useManualQuery, useQuery } from 'graphql-hooks'
import AuthConfig from '@/firebase/oauth.config'
import { getEmployerEmail } from '@/shared/getEmployerEmail'



const GET_ticketS = `
query ModuleTickets($where: ModuleTicketWhere, $options: ModuleTicketOptions) {
    moduleTickets(where: $where, options: $options) {
      ticket
      id
    }
  }
`



const AutoSelectModule = ({ selected, setSelected }: any) => {

    const [query, setQuery] = useState('')
    const [ticketData, setticketData] = useState<any>([])
    const [labEmail, setLabEmail] = useState('')

    //hooks
    const client = useGqlClient()
    const { user } = AuthConfig()

    // query
    const [getticketFn, state] = useManualQuery(GET_ticketS, { client })



    // refetching data based on  query

    useEffect(() => {
        getticketData(query.toUpperCase(), user?.email)
    }, [query])


    useEffect(() => {
        getLabEmail()
        getticketData('', user?.email)
    }, [user?.email])



    // getting lab email if employee is logged in
    const getLabEmail = async () => {
        if (user?.email) {
            const email = await getEmployerEmail(user?.email)
            setLabEmail(email)
        }
    }



    const getticketData = async (query = '', email: string) => {
        const { data } = await getticketFn({
            variables: {
                "where": {
                    "ticket_CONTAINS": query,
                    "status": "ACCEPTED",
                    "vendorHas": {
                        "userIs": {
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


        if (data?.moduleTickets?.length) {

            // console.log(data.moduleTickets, 'this is ticket data')
            setticketData(data.moduleTickets?.map((item: any) => item))
        }
    }




    return (
        <div className="absolute top-0 w-full">
            <Combobox value={selected} onChange={setSelected}>
                <div className="relative mt-1">
                    <div className="relative w-full cursor-default overflow-hidden rounded bg-white text-left border border-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-primary sm:text-sm">
                        <Combobox.Input
                            className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                            required
                            displayValue={(data: any) => data?.ticket || ''}
                            onChange={(event) => setQuery(event.target.value)}
                        />
                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                        </Combobox.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQuery('')}
                    >
                        <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {
                                state.loading && (
                                    <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                        Loading...
                                    </div>
                                )
                            }


                            {ticketData?.length === 0 && query !== '' ? (
                                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                    Nothing found.
                                </div>
                            ) : (
                                ticketData?.map((ticket: any, i: number) => (
                                    <Combobox.Option
                                        key={ticket?.id || i}
                                        className={({ active }) =>
                                            `relative cursor-default  select-none py-2 pl-10 pr-4 ${active ? 'bg-primary text-white' : 'text-gray-900'
                                            }`
                                        }
                                        value={ticket}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <span
                                                    className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                        }`}
                                                >
                                                    {ticket?.ticket || 'N/A'}
                                                </span>
                                                {selected ? (
                                                    <span
                                                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-primary'
                                                            }`}
                                                    >
                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Combobox.Option>
                                ))
                            )}
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox>
        </div>
    )
}

export default AutoSelectModule;