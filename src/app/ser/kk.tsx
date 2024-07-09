'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const fetchAPI = async (query, variables) => {
    const res = await fetch('http://localhost:25000/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query, variables }),
        next: { revalidate: 10 }
    });

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    const { data } = await res.json();
    return data;
};

const subServiceDetails = async (slug) => {
    const query = `
        query Services($where: ServiceWhere) {
            services(where: $where) {
                id
                title
                coverImageUrl
                thumbnailUrl
                pageContent
                slug
            }
        }
    `;
    const variables = { where: { slug } };
    const data = await fetchAPI(query, variables);
    return data?.services[0];
};

const popularServices = async () => {
    const query = `
        query Services($where: ServiceWhere, $options: ServiceOptions) {
            services(where: $where, options: $options) {
                id
                title
                slug
                description
                thumbnailUrl
            }
        }
    `;
    const variables = { where: { isPopular: true }, options: { limit: 6 } };
    const data = await fetchAPI(query, variables);
    return data.services;
};

const Page = async ({ params }) => {
    const [details, services] = await Promise.all([
        subServiceDetails(params.slug || 'no slug'),
        popularServices()
    ]);

    return (
        <>
            <div className="page-heading">
                <Carousel
                    autoPlay
                    infiniteLoop
                    showThumbs={false}
                    showStatus={false}
                    interval={5000}
                    dynamicHeight={false}
                >
                    <div style={{
                        backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5) ), url('https://images.unsplash.com/photo-1600267147646-33cf514b5f3e?q=80&w=2647&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                        className="h-[500px] flex items-center justify-center text-white">
                        <div className="-mx-4 flex flex-wrap w-full">
                            <div className="w-full px-4">
                                <div className="mx-auto mb-[60px] max-w-[680px] text-center lg:mb-20">
                                    <h2 className="mb-4 leading-3 font-bold text-dark sm:text-3xl ">
                                        Automotive Testing
                                    </h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{
                        backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5) ), url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2647&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                        className="h-[500px] flex items-center justify-center text-white">
                        <div className="-mx-4 flex flex-wrap w-full">
                            <div className="w-full px-4">
                                <div className="mx-auto mb-[60px] max-w-[680px] text-center lg:mb-20">
                                    <h2 className="mb-4 leading-3 font-bold text-dark sm:text-3xl ">
                                        Vehicle Inspections
                                    </h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{
                        backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5) ), url('https://images.unsplash.com/photo-1523301343968-6a6efca303d0?q=80&w=2647&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                        className="h-[500px] flex items-center justify-center text-white">
                        <div className="-mx-4 flex flex-wrap w-full">
                            <div className="w-full px-4">
                                <div className="mx-auto mb-[60px] max-w-[680px] text-center lg:mb-20">
                                    <h2 className="mb-4 leading-3 font-bold text-dark sm:text-3xl ">
                                        Emissions Testing
                                    </h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </Carousel>
                <div className="container">
                    <div className="container--wrapper wysiwyg field__item">
                        {/* <p><Content content={JSON.parse(details?.description)} /></p> */}
                    </div>
                </div>
            </div>
{/* <div className="sidebar-page-container hidden lg:block">
                    <div className="auto-container">
                        <div className="row clearfix">
                            <aside className="sidebar">
                                <div className="sidebar-widget category-widget">
                                    <ul className="space-y-2 mb-4">
                                        <Link href={`/services/${services[0]?.slug}`} className="bg-primary border-l-4 border-[#08d9ff] block text-xs uppercase text-white font-bold px-5 py-3">
                                            {services[0]?.title}
                                        </Link>
                                        {
                                            services.slice(1).map(service => (
                                                <Link href={`/services/${service?.slug}`} key={service?.id} className="bg-gray-200 block w-full border-l-4 text-gray-700 font-bold px-5 py-3 hover:bg-primary hover:border-[#08d9ff] duration-500 text-xs uppercase transition-all hover:text-white">
                                                    {service?.title}
                                                </Link>
                                            ))
                                        }
                                    </ul>
                                </div>
                            </aside>
                        </div>
                    </div>
                </div> */}
          <section className='grid grid-cols-1 lg:grid-cols-3 gap-7 lg:px-16 max-w-screen-2xl mx-auto p-3 lg:p-8'>
    <div className="col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
        {services.map(service => (
            <motion.div
                key={service.id}
                className="box relative overflow-hidden shadow-lg "
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <Link href={`/services/${service.slug}`}>
                    <div className="imgBx">
                        <img src={service.thumbnailUrl} alt={service.title} className="w-full h-64 object-cover" />
                    </div>
                    <div className="content p-5 bg-white" style={{textAlign:'center'}}>
                        <h2 className="text-xl font-bold" style={{ textTransform: 'capitalize' ,textAlign:'center'}}>{service.title}</h2>
                        {/* <p className="text-sm text-gray-700">{service.description}</p> */}
                    </div>
                </Link>
            </motion.div>
        ))}
    </div>
</section>
<section >
<div className="container text-center mt-12 flex items-center justify-center" style={{ backgroundColor: '#3c515b', height: '300px', color: 'white',marginBottom:'2rem' }}>
    <div>
        <h3 className="text-lg font-semibold mb-2 mt-8">Looking for something specific?</h3>
        <p className="text-md mb-4">Search within Services</p>
        <input
            type="text"
            className="p-2 border border-gray-300 rounded w-2/3 md:w-1/2 lg:w-1/3"
            placeholder="Search"
        />
    </div>
</div>

</section>


        </>
    );
};

export default Page;
