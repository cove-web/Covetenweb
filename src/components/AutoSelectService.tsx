'use client'
import { Fragment, useEffect, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { useGqlClient } from '@/hooks/UseGqlClient'
import { useManualQuery, useQuery } from 'graphql-hooks'



const GET_SERVICE = `
query Services($where: ServiceWhere, $options: ServiceOptions) {
    services(where: $where, options: $options) {
      id
      title
    }
  }
`



const AutoSelectService = ({ selected, setSelected }: any) => {

    const [query, setQuery] = useState('')
    const [serviceData, setServiceData] = useState<any>([])

    //hooks
    const client = useGqlClient();

    // query
    const [getserviceFn, state] = useManualQuery(GET_SERVICE, { client })






    // refetching data based on  query

    useEffect(() => {
        getServiceData(query)
    }, [query])



    const getServiceData = async (query = '') => {
        const { data } = await getserviceFn({
            variables: {
                "where": {
                    "title_CONTAINS": query.toLowerCase(),
                    "isService": true
                },
                "options": {
                    "limit": 6
                }
            }
        })

        if (data?.services?.length) {

            setServiceData(data.services?.map((item: any) => item))
        }
    }




    const handleChange = (e: any) => {




        setQuery(e.target.value)
    }



    return (
        <div className="absolute top-0 w-full">
            <Combobox value={selected} onChange={setSelected}>
                <div className="relative mt-1">
                    <div className="relative w-full cursor-default overflow-hidden rounded bg-white text-left border border-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-primary sm:text-sm">
                        <Combobox.Input
                            className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                            displayValue={(service: any) => service?.title}
                            onChange={handleChange}
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


                            {serviceData?.length === 0 && query !== '' ? (
                                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                    Nothing found.
                                </div>
                            ) : (
                                serviceData?.map((service: any, i: number) => (
                                    <Combobox.Option
                                        key={service?.id || i}
                                        className={({ active }) =>
                                            `relative cursor-default  select-none py-2 pl-10 pr-4 ${active ? 'bg-primary text-white' : 'text-gray-900'
                                            }`
                                        }
                                        value={service}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <span
                                                    className={`block uppercase  truncate ${selected ? 'font-medium' : 'font-normal'
                                                        }`}
                                                >
                                                    {service?.title || 'N/A'}
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

export default AutoSelectService;