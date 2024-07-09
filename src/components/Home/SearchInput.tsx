'use client'
import { useGqlClient } from '@/hooks/UseGqlClient';
import { useManualQuery, useQuery } from 'graphql-hooks';
import Link from 'next/link';
import React, { useState, useEffect, Fragment } from 'react';





const GET_SERVICES = `
query Services($where: ServiceWhere) {
    services(where: $where) {
      title
      slug
    }
  }
`

const GET_PRODUCTS = `
query Products($where: ProductWhere) {
    products(where: $where) {
      title
      id
    }
  }
`
const GET_CALIBRATION = ``
const GET_TESTING = ``



// component
const SearchInput = () => {
    const [searchText, setSearchText] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const options = ['Testing', 'Calibration', 'Products', 'Solutions'];
    const [selectedValue, setSelectedValue] = useState(options[0]);
    const [isResultBoxOpen, setIsResultBoxOpen] = useState<boolean>(false)

    const [searchQueryType, setSearchQueryType] = useState<any>(GET_SERVICES)




    //hooks
    const client = useGqlClient()

    //query
    const [searchFn, { data, loading }] = useManualQuery(searchQueryType, {
        client,
    })




    useEffect(() => {
        searchData()

    }, [selectedValue, searchText])



    // initializing search 

    const searchData = async () => {
        if (selectedValue === 'Solutions') {
            setSearchQueryType(GET_SERVICES)
            const { data } = await searchFn({
                variables: {
                    "options": {
                        "limit": 4
                    },
                    "where": {
                        "title_CONTAINS": searchText.toLowerCase(),
                        "isSolution": true
                    }

                }
            })
            setSearchResult(data?.services)
        } else if (selectedValue === 'Products') {
            setSearchQueryType(GET_PRODUCTS)
            const { data } = await searchFn({
                variables: {
                    "options": {
                        "limit": 4
                    },
                    "where": {
                        "title_CONTAINS": searchText.toLowerCase(),
                    }

                }
            })
            setSearchResult(data?.products)
        }
        else if (selectedValue === 'Calibration' || selectedValue === 'Testing') {
            setSearchQueryType(GET_SERVICES)
            const { data } = await searchFn({
                variables: {
                    "options": {
                        "limit": 4
                    },
                    "where": {
                        "title_CONTAINS": searchText.toLowerCase(),
                        "isService": true
                    }

                }
            })
            setSearchResult(data?.services)
        }

    }






    const isSearchActive = searchText.trim() !== ''; // Check if there's text in the search input

    return (
        <div className="max-w-xl  lg:max-w-3xl mx-auto relative">
       <div className="relative flex p-1 rounded-full h-12 lg:h-20 shadow-md md:p-2 border border-white" style={{height:'4rem'}}>

                <select
                    className="w-24 lg:w-32 bg-transparent text-[10px] lg:text-base pl-5 py-2 border-none focus:ring-0 font-semibold rounded-l-md focus:outline-none focus:border-none"
                    value={selectedValue}
                    onChange={(e) => setSelectedValue(e.target.value)}
                    style={{color:"white"}}
                >
                    {options.map((option) => (
                        <option key={option}>{option}</option>
                    ))}
                </select>

                <input
    value={searchText}
    onChange={(e) => setSearchText(e.target.value)}
    placeholder="Search"
    className="w-full text-white text-xs lg:text-base p-4 border-none outline-none rounded-full bg-transparent dark:text-white dark:placeholder-white dark:placeholder-opacity-50 focus:ring-0"
    type="text"
    style={{backgroundColor:"none",background:"none"}}
/>


                <button
                    type="button"
                    title="Start buying"
                    className="ml-auto py-2  px-6 rounded-full text-center transition gradient-bg md:px-12"
                >
                    <span className="hidden text-white font-semibold md:block">Search</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-3 lg:w-5 mx-auto text-white md:hidden"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                    >
                        <path
                            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
                        />
                    </svg>
                </button>
            </div>

            {isSearchActive && ( // Conditionally render the result box when search is active
                <div className="absolute -bottom-48 z-10 w-full max-w-3xl overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-gray-900/5">
                    <div className="p-4 h-44">
                        <div className="w-full h-44 bg-white shadow-md rounded-md p-7">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">

                                {
                                    selectedValue === "Products" ?

                                        <>
                                            {searchResult?.length ?
                                                searchResult?.map((result: any) => (
                                                    <Link href={`/products/details/${result?.id}`} key={result?.id} className="text-dimText text-sm underline py-1 px-2">
                                                        {result?.title}
                                                    </Link>
                                                ))
                                                :
                                                <p className="text-dimText">No result found</p>
                                            }
                                        </>

                                        :
                                        selectedValue === "Solutions" ?
                                            <>
                                                {searchResult?.length ?
                                                    searchResult?.map((result: any) => (
                                                        <Link href={`/services/${result?.slug}`} key={result?.id} className="text-dimText text-sm underline py-1 px-2">
                                                            {result?.title}
                                                        </Link>
                                                    ))
                                                    :
                                                    <p className="text-dimText">No result found</p>
                                                }
                                            </>
                                            :
                                            <>
                                                {searchResult?.length ?
                                                    searchResult?.map((result: any) => (
                                                        <Link href={`/services/${result.slug}`} key={result?.id} className="text-dimText text-sm underline py-1 px-2">
                                                            {result?.title}
                                                        </Link>
                                                    ))
                                                    :
                                                    <p className="text-dimText">No result found</p>
                                                }
                                            </>
                                }


                                {/* {searchResult?.length ?
                                    searchResult?.map((result: any) => (
                                        <Link href={`/services/${result.slug}`} key={result?.id} className="text-dimText text-sm underline py-1 px-2">
                                            {result?.title}
                                        </Link>
                                    ))
                                    :
                                    <p className="text-dimText">No result found</p>
                                } */}

                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchInput;
