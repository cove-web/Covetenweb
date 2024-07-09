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

const GET_LEARN_ITEM = `
query LearnItems {
    learnItems {
      id
      title
    }
  }
`

const GET_PRODUCTS = `
query Products {
    products {
      id
      title
    }
  }
`
const GET_EVENTS = `
query Events {
    events {
      id
      name
    }
  }
`


const AutoSelectModule = ({ selected, setSelected, type }: any) => {

    const [query, setQuery] = useState('')
    const [serviceData, setServiceData] = useState<any>([])

    //hooks
    const client = useGqlClient();

    // query
    const [getserviceFn, state] = useManualQuery(GET_SERVICE, { client })
    const [getLearnItemFn, learnItemState] = useManualQuery(GET_LEARN_ITEM, { client })
    const [getProductsFn, productState] = useManualQuery(GET_PRODUCTS, { client })
    const [getEventsFn, eventState] = useManualQuery(GET_EVENTS, { client })







    // refetching data based on  query

    useEffect(() => {
        setServiceData([])
        if (type === 'SERVICE') {
            getServiceData(query)
        } else if (type === 'LEARN') {
            getLearnData(query)
        } else if (type === 'PRODUCT') {

            getProductsData(query)
        } else if (type === 'EVENTS') {

            getEventsData(query)
        } else if (type === 'SOLUTION') {

            getSolution(query)
        } else {
            setServiceData([])
        }

        // else {
        //     getServiceData(query)
        // }

    }, [query, type])



    const getServiceData = async (query = '') => {
        const { data: serviceData } = await getserviceFn({
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

        if (serviceData?.services?.length) {
            setServiceData(serviceData.services?.map((item: any) => item))
        }
    }


    const getLearnData = async (query = '') => {
        const { data: learnData } = await getLearnItemFn({
            variables: {
                "where": {
                    "title_CONTAINS": query.toLowerCase(),
                },
                "options": {
                    "limit": 6
                }
            }
        })

        if (learnData?.learnItems?.length) {
            setServiceData(learnData.learnItems?.map((item: any) => item))
        }
    }

    const getProductsData = async (query = '') => {
        const { data: productData } = await getProductsFn({
            variables: {
                "where": {
                    "title_CONTAINS": query.toLowerCase(),
                },
                "options": {
                    "limit": 6
                }
            }
        })

        if (productData?.products?.length) {
            setServiceData(productData.products?.map((item: any) => item))
        }
    }

    const getEventsData = async (query = '') => {
        const { data: eventData } = await getEventsFn({
            variables: {
                "where": {
                    "name_CONTAINS": query.toLowerCase(),
                },
                "options": {
                    "limit": 6
                }
            }
        })

        if (eventData?.events?.length) {
            setServiceData(eventData.events?.map((item: any) => item))
        }
    }

    const getSolution = async (query = '') => {

        const { data: serviceData } = await getserviceFn({
            variables: {
                "where": {
                    "title_CONTAINS": query.toLowerCase(),
                    "isSolution": true
                },
                "options": {
                    "limit": 6
                }
            }
        })

        if (serviceData?.services?.length) {
            setServiceData(serviceData.services?.map((item: any) => item))
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
                                state.loading || productState.loading || eventState.loading || learnItemState.loading && (
                                    <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                        Loading...
                                    </div>
                                )
                            }


                            {serviceData?.length === 0 ? (
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

export default AutoSelectModule;