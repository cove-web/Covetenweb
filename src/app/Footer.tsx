'use client'

import { useGqlClient } from '@/hooks/UseGqlClient';
import { useQuery } from 'graphql-hooks';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { AiFillTwitterCircle } from 'react-icons/ai';
import { BiLogoInstagramAlt } from 'react-icons/bi';
import { BsPinterest, BsYoutube } from 'react-icons/bs';
import { FaFacebook, FaLinkedin, FaReddit } from 'react-icons/fa';


const GET_TERMS = `
query TermsPages($where: TermsPageWhere) {
    termsPages(where: $where) {
        slug
        title
    }
  }
`


// component
const Footer = () => {

    // states
    const [terms, setTerms] = React.useState<any>([])


    // hooks
    const client = useGqlClient()

    // QUERY
    const { data, error, loading } = useQuery(GET_TERMS, {
        client,
        variables: {
            "where": {
                "forInvoice": false
            }
        }
    })




    useEffect(() => {
        if (data?.termsPages) {
            const chunked = splitArrayIntoChunks(data?.termsPages, 4)
            setTerms(chunked)
        }
    }, [data?.termsPages])




    function splitArrayIntoChunks(array: any, chunkSize: number) {
        return Array.from({ length: Math.ceil(array.length / chunkSize) }, (v, index) =>
            array.slice(index * chunkSize, index * chunkSize + chunkSize)
        );
    }



    return (


        <footer className="relative  pt-8 pb-6 " style={{backgroundColor:'#000000'}}>
            <div className="container mx-auto px-3 lg:px-4">
                <div className="flex flex-wrap text-left lg:text-left">
                    <div className="w-full lg:w-[40%] px-4 mb-8 lg:mb-0">
                        <img src="/assets/log.png" alt=" " className='w-40' />
                        <h5 className="text-sm mt-0 mb-2 text-white">
                            Engineering Inspired by Life
                        </h5>
                        <div className='flex items-center mt-5 space-x-3 text-xl'>
                            <Link href='https://www.facebook.com/profile.php?id=61553710623584&mibextid=ZbWKwL' className='text-white '><FaFacebook /></Link>
                            <Link href='https://twitter.com/Xcoveten' className='text-white'><AiFillTwitterCircle /></Link>
                            <Link href=' https://instagram.com/covetenqbees?igshid=OGQ5ZDc2ODk2ZA==' className='text-white  text-[25px]'><BiLogoInstagramAlt /></Link>
                            <Link href='https://in.pinterest.com/pcoveten/' className='text-white ' ><BsPinterest /></Link>
                            <Link href='https://www.youtube.com/@Coveten' className='text-white ' ><BsYoutube /></Link>
                            <Link href=' https://www.linkedin.com/company/coveten-industrial-solutions/' className='text-white ' ><FaLinkedin /></Link>

                        </div>

                    </div>
                    <div className="w-full lg:w-[60%] lg:px-4  ">
                        <div className="flex flex-wrap items-top ">
                            <div className="w-full lg:w-[25%] px-4  ">
                                <ul className="list-unstyled">
                                    <li>
                                        <Link className="text-white hover:underline cursor-pointer block pb-2 text-sm" href="/about_us">About Us</Link>
                                    </li>
                                    <li>
                                        <Link className="text-white cursor-pointer hover:underline block pb-2 text-sm" href="/products">Products</Link>
                                    </li>
                                    <li>
                                        <Link className="text-white cursor-pointer  hover:underline  block pb-2 text-sm" href="/learn">Learn</Link>
                                    </li>
                                    <li>
                                        <Link className="text-white cursor-pointer  hover:underline  block pb-2 text-sm" href="/events">Events</Link>
                                    </li>

                                </ul>
                            </div>
                            {
                                terms?.map((term: any, index: number) =>
                                    <div key={index} className="w-full lg:w-[25%] px-4  mb-5">
                                        <ul className="list-unstyled">

                                            {
                                                term?.map((item: any, index: number) =>
                                                    <li key={index}>
                                                        <Link className="text-white capitalize cursor-pointer  hover:underline  block pb-2 text-sm" href={`/terms/${item?.slug}`}>{item?.title}</Link>
                                                    </li>

                                                )
                                            }
                                        </ul>
                                    </div>

                                )
                            }
                        </div>
                    </div>
                </div>
                <hr className="my-6 border-gray-400" />
                <div className="flex flex-wrap items-center md:justify-between justify-center">
                    <div className="w-full md:w-4/12 px-4 mx-auto text-center">
                        <div className="text-sm text-white font-semibold py-1">
                            Copyright © <span id="get-current-year">2023 Coveten All rights reserved.</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;