
'use client'
import Button from '@/components/Button';
import { useGqlClient } from '@/hooks/UseGqlClient';
import { useQuery } from 'graphql-hooks';
import React, { useEffect } from 'react';
import Modal from './Modal';
import PageTextEditor from '@/components/PageTextEditor';
import Content from './Content';
import { useParams } from 'next/navigation'
import { BsCurrencyRupee } from 'react-icons/bs';
import Link from 'next/link';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const GET_PRODUCTS = `
query Query($where: ProductWhere) {
    products(where: $where)  {
        title
        shortDescription
        price
        id
        file
        video
        image
        others
        features
        sideImage
    }
  }`


// component
const Main = () => {
    // states
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [features, setFeatures] = React.useState<any>(null)
    const [highlights, setHighlights] = React.useState<any>(null)

    // hooks
    const client = useGqlClient()
    const params = useParams()

    // quires
    const { data, loading } = useQuery(GET_PRODUCTS, {
        client,
        variables: {
            where: {
                id: params.slug
            }
        }

    })



    useEffect(() => {

        if (data?.products[0]?.features) {
            setFeatures(JSON.parse(data?.products[0]?.features))
        }
        if (data?.products[0]?.others) {
            setHighlights(JSON.parse(data?.products[0]?.others))
        }

    }, [data?.products[0]])





    return (
        <>
            <div className="lg:px-16 px-2  w-full py-10">
                <div className="w-full  rounded bg-white   text-gray-800 relative md:text-left">
                    <div className="md:flex w-full   lg:-mx-10">
                        <div className="w-full md:w-1/2  lg:px-10 mb-10 md:mb-0">
                            <div className="relative w-full overflow-hidden  ">
                                <Carousel className='w-full overflow-hidden'>
                                    <div className='w-full overflow-hidden'>
                                        <img src={data?.products[0].image || '/assets/no_image.png'} className='w-full' />

                                    </div>
                                    <div className='w-full overflow-hidden'>
                                        <img src={data?.products[0].sideImage || '/assets/no_image.png'} className='w-full' />

                                    </div>

                                </Carousel>

                            </div>
                        </div >
                        <div className="w-full md:w-1/2 mt-5" >
                            <div className="mb-10 ">
                                <h1 className="font-bold uppercase text-2xl mb-5 text-secondary">{data?.products[0].title}</h1>
                                <p className="text-sm">{data?.products[0].shortDescription}</p>
                                <div className='text-sm text-primary  space-x-2 mt-3'>
                                    {data?.products[0].video && <Link className='hover:underline' href={data?.products[0].video}>Watch</Link>}
                                    {data?.products[0].file && <Link className='hover:underline' href={data?.products[0].file}>Download</Link>}
                                </div>

                            </div>
                            <div className='flex items-center space-x-4'>
                                <div className="flex items-center space-x-2  mr-5">

                                    <span className="font-bold text-3xl leading-none align-baseline">Price: {data?.products[0].price}</span>

                                </div>
                                <div onClick={() => setIsModalOpen(true)} className="inline-block align-bottom">
                                    <Button title='Inquiry' />
                                </div>
                            </div>
                        </div >
                    </div >
                </div >
                <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} product={data?.products[0].title} />
            </div >

            {/* features */}
            < div className='w-full px-2 lg:px-16 py-10' >
                < div >
                    <h3 className="text-xl mb-4 font-bold text-secondary">Features</h3>


                </ div>

                <div className="mt-10 text-sm">
                    {features && <Content content={features} />}
                </div>

                <div className="mt-10">
                    {
                        highlights && (
                            <>
                                <h2 className="text-sm font-medium text-gray-900">Details</h2>
                                <Content content={highlights} />
                            </>
                        )
                    }

                </div>


            </div >
        </ >
    );
};

export default Main;