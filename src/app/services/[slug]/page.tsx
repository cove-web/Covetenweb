'use client'
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Ads from '@/components/Home/Ads';
import Companies from '@/components/Home/Companies';

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

const subServiceDetails = async (id) => {
    console.log("serid",id);
    const query = `
    query Categories($where: CategoryWhere) {
        categories(where: $where) {
          id
          name
          hasService {
            id
            title
            slug
            coverImageUrl
            category
            description
            thumbnailUrl
          }
        }
      }
    `;
    const variables = { where: {id: id } };
    const data = await fetchAPI(query, variables);
    console.log("megha",data)
    return data?.categories[0]?.hasService;
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
    const variables = { where: { isPopular: true }, options: { limit: 9 } };
    const data = await fetchAPI(query, variables);
    return data.services;
};

const Page = ({ params }) => {
    const [details, setDetails] = useState(null);
    const [services, setServices] = useState([]);
    const [projectCount, setProjectCount] = useState(0);
    const [clientCount, setClientCount] = useState(0);
    const [coffeeCount, setCoffeeCount] = useState(0);
    const [photoCount, setPhotoCount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const detailsData = await subServiceDetails(params.slug || 'no slug');
            const popularServicesData = await popularServices();

            console.log("detais",detailsData)
            setDetails(detailsData);
            setServices(popularServicesData);
        };

        fetchData();

        const animateCounters = () => {
            const targetProjects = 55;
            const targetClients = 359;
            const targetCoffee = 246;
            const targetPhotos = 300;
            
            let projects = 0;
            let clients = 0;
            let coffee = 0;
            let photos = 0;

            const interval = setInterval(() => {
                if (projects < targetProjects) {
                    projects += 1;
                    setProjectCount(projects);
                }
                if (clients < targetClients) {
                    clients += 1;
                    setClientCount(clients);
                }
                if (coffee < targetCoffee) {
                    coffee += 1;
                    setCoffeeCount(coffee);
                }
                if (photos < targetPhotos) {
                    photos += 1;
                    setPhotoCount(photos);
                }

                if (projects >= targetProjects && clients >= targetClients && coffee >= targetCoffee && photos >= targetPhotos) {
                    clearInterval(interval);
                }
            }, 20);
        };

        animateCounters();
    }, [params.slug]);

    console.log("serde",details)
    return (
        <>
            {/* <!-- Page Title --> */}
            <section className="w-full h-[190px] lg:h-[450px] flex items-center justify-center flex-col"
                style={{
                    background: `linear-gradient( rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.5) ), url(${details?.coverImageUrl || '/assets/services.jpg'})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}>
                <div className="text-white ml-1"  >
                    <h2 className='text-4xl lg:text-5xl font-bold'>Service Detail</h2>
                    <ul className="flex items-center text-xs lg:text-base justify-center space-x-3">
                        <li><Link href="/">HOME</Link></li>
                        <li>&#62;</li>
                        <Link href={`/services/${details?.slug}`} className='uppercase'>{details?.title}</Link>
                    </ul>
                </div>
            </section>
            {/* <!-- End Page Title --> */}

            {/* <!-- Counters Section --> */}
            <section className="flex justify-around items-center text-center bg-gray-100 py-8">
                <motion.div className="counter" animate={{ opacity: 1 }} initial={{ opacity: 0 }} transition={{ duration: 1 }}>
                    <i className="fas fa-project-diagram text-4xl mb-2"></i>
                    {/* <h3 className="text-3xl font-bold">{details?.sercount}</h3> */}
                    {/* <h3 className="text-3xl font-bold">{counts.projectCount}</h3> */}
                    <h3 className="text-3xl font-bold">14 +</h3>


                    <p className="text-lg">Projects Done </p>
                </motion.div>
                <motion.div className="counter" animate={{ opacity: 1 }} initial={{ opacity: 0 }} transition={{ duration: 1 }}>
                    <i className="fas fa-smile text-4xl mb-2"></i>
                    {/* <h3 className="text-3xl font-bold">                    {counts.moduleCount}
</h3> */}

<h3 className="text-3xl font-bold">25 +</h3>

                    <p className="text-lg">Modules </p>
                </motion.div>
                <motion.div className="counter" animate={{ opacity: 1 }} initial={{ opacity: 0 }} transition={{ duration: 1 }}>
                    <i className="fas fa-coffee text-4xl mb-2"></i>
                    {/* <h3 className="text-3xl font-bold">{counts.userCount}</h3> */}
                    <h3 className="text-3xl font-bold">22 +</h3>

                    <p className="text-lg">Clients </p>
                </motion.div>
                <motion.div className="counter" animate={{ opacity: 1 }} initial={{ opacity: 0 }} transition={{ duration: 1 }}>
                    <i className="fas fa-camera text-4xl mb-2"></i>
                    <h3 className="text-3xl font-bold">{details?.photostak}</h3>
                    <p className="text-lg">Photos Taken +</p>
                </motion.div>
            </section>
            {/* <!-- End Counters Section --> */}
{/*  */}
<div className="max-w-screen-2xl mx-auto px-2 lg:px-12">
                <section className="relative  bg-blueGray-100 overflow-hidden">
                    <img className="absolute top-0 left-0" src="flaro-assets/images/logos/gradient3.svg" alt="" />
                    <div className="relative z-10 container px-4 mx-auto">
                        <p className="mb-14 text-base  text-center font-semibold uppercase tracking-px">Certifications</p>
                        <section>
                <div className="serslider">
                    <div className="servicesitem"><a href=""><img alt="logo" src="https://images.unsplash.com/photo-1719206835965-088ed79e95e2?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/></a></div>
                    ` <div className="servicesitem"><a href=""><img alt="logo" src="https://images.unsplash.com/photo-1719206835965-088ed79e95e2?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/></a></div>
                    <div className="servicesitem"><a href=""><img alt="logo" src="https://images.unsplash.com/photo-1719206835965-088ed79e95e2?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/></a></div>
                    <div className="servicesitem"><a href=""><img alt="logo" src="https://images.unsplash.com/photo-1719206835965-088ed79e95e2?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/></a></div>
                    <div className="servicesitem"><a href=""><img alt="logo" src="https://images.unsplash.com/photo-1719206835965-088ed79e95e2?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/></a></div>
                    <div className="servicesitem"><a href=""><img alt="logo" src="https://images.unsplash.com/photo-1719206835965-088ed79e95e2?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/></a></div>
                    <div className="servicesitem"><a href=""><img alt="logo" src="https://images.unsplash.com/photo-1719206835965-088ed79e95e2?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/></a></div>
                    <div className="servicesitem"><a href=""><img alt="logo" src="https://images.unsplash.com/photo-1719206835965-088ed79e95e2?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/></a></div>
                    <div className="servicesitem"><a href=""><img alt="logo" src="https://images.unsplash.com/photo-1719206835965-088ed79e95e2?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/></a></div>
                    <div className="servicesitem"><a href=""><img alt="logo" src="https://images.unsplash.com/photo-1719206835965-088ed79e95e2?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/></a></div>
                    <div className="servicesitem"><a href=""><img alt="logo" src="https://images.unsplash.com/photo-1719206835965-088ed79e95e2?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/></a></div>
                    <div className="servicesitem"><a href=""><img alt="logo" src="https://images.unsplash.com/photo-1719206835965-088ed79e95e2?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/></a></div>
                    <div className="servicesitem"><a href=""><img alt="logo" src="https://images.unsplash.com/photo-1719206835965-088ed79e95e2?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/></a></div>
                    <div className="servicesitem"><a href=""><img alt="logo" src="https://images.unsplash.com/photo-1719206835965-088ed79e95e2?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/></a></div>
                    <div className="servicesitem"><a href=""><img alt="logo" src="https://images.unsplash.com/photo-1719206835965-088ed79e95e2?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/></a></div>
                    <div className="servicesitem"><a href=""><img alt="logo" src="https://images.unsplash.com/photo-1719206835965-088ed79e95e2?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/></a></div>
                    <div className="servicesitem"><a href=""><img alt="logo" src="https://images.unsplash.com/photo-1719206835965-088ed79e95e2?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/></a></div>
                    <div className="servicesitem"><a href=""><img alt="logo" src="https://images.unsplash.com/photo-1719206835965-088ed79e95e2?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/></a></div>
                    <div className="servicesitem"><a href=""><img alt="logo" src="https://images.unsplash.com/photo-1719206835965-088ed79e95e2?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/></a></div>
                    <div className="servicesitem"><a href=""><img alt="logo" src="https://images.unsplash.com/photo-1719206835965-088ed79e95e2?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/></a></div>
                    <div className="servicesitem"><a href=""><img alt="logo" src="https://images.unsplash.com/photo-1719206835965-088ed79e95e2?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/></a></div>
                    <div className="servicesitem"><a href=""><img alt="logo" src="https://images.unsplash.com/photo-1719206835965-088ed79e95e2?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/></a></div>
                    <div className="servicesitem"><a href=""><img alt="logo" src="https://images.unsplash.com/photo-1719206835965-088ed79e95e2?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/></a></div>
                    <div className="servicesitem"><a href=""><img alt="logo" src="https://images.unsplash.com/photo-1719206835965-088ed79e95e2?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/></a></div>
                    <div className="servicesitem"><a href=""><img alt="logo" src="https://images.unsplash.com/photo-1719206835965-088ed79e95e2?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/></a></div>
                    <div className="servicesitem"><a href=""><img alt="logo" src="https://images.unsplash.com/photo-1719206835965-088ed79e95e2?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/></a></div>
                    <div className="servicesitem"><a href=""><img alt="logo" src="https://images.unsplash.com/photo-1719206835965-088ed79e95e2?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/></a></div>
                    <div className="servicesitem"><a href=""><img alt="logo" src="https://images.unsplash.com/photo-1719206835965-088ed79e95e2?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/></a></div>
                    <div className="servicesitem"><a href=""><img alt="logo" src="https://images.unsplash.com/photo-1719206835965-088ed79e95e2?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/></a></div>
                    <div className="servicesitem"><a href=""><img alt="logo" src="https://images.unsplash.com/photo-1719206835965-088ed79e95e2?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/></a></div>
                    <div className="servicesitem"><a href=""><img alt="logo" src="https://images.unsplash.com/photo-1719206835965-088ed79e95e2?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/></a></div>
                    <div className="servicesitem"><a href=""><img alt="logo" src="https://images.unsplash.com/photo-1719206835965-088ed79e95e2?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/></a></div>
                    <div className="servicesitem"><a href=""><img alt="logo" src="https://images.unsplash.com/photo-1719206835965-088ed79e95e2?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/></a></div>
                    <div className="servicesitem"><a href=""><img alt="logo" src="https://images.unsplash.com/photo-1719206835965-088ed79e95e2?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/></a></div>
                    <div className="servicesitem"><a href=""><img alt="logo" src="https://images.unsplash.com/photo-1719206835965-088ed79e95e2?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/></a></div>
                    <div className="servicesitem"><a href=""><img alt="logo" src="https://images.unsplash.com/photo-1719206835965-088ed79e95e2?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/></a></div>
                    <div className="servicesitem"><a href=""><img alt="logo" src="https://images.unsplash.com/photo-1719206835965-088ed79e95e2?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/></a></div>
                    <div className="servicesitem"><a href=""><img alt="logo" src="https://images.unsplash.com/photo-1719206835965-088ed79e95e2?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/></a></div>
                    <div className="servicesitem"><a href=""><img alt="logo" src="https://images.unsplash.com/photo-1719206835965-088ed79e95e2?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/></a></div>
                    <div className="servicesitem"><a href=""><img alt="logo" src="https://images.unsplash.com/photo-1719206835965-088ed79e95e2?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/></a></div>
                    <div className="servicesitem"><a href=""><img alt="logo" src="https://images.unsplash.com/photo-1719206835965-088ed79e95e2?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/></a></div>
               
                </div>
              
            </section>
                    </div>
                </section>
            </div>
            <section className="max-w-screen-2xl mx-auto p-3 lg:p-8">
            <button style={{color:'black',textTransform:'capitalize'}}>materials engineering  </button> <button style={{color:'black',textTransform:'capitalize'}}>discovery services</button><button style={{color:'black',textTransform:'capitalize'}}>non destructive testing</button><button style={{color:'black',textTransform:'capitalize'}}>design engineering </button><button style={{color:'black',textTransform:'capitalize'}}>spectral & microscopic studies </button><button style={{color:'black',textTransform:'capitalize'}}>fire, safety & reliability</button><button style={{color:'black',textTransform:'capitalize'}}>mechanical testings</button><button style={{color:'black',textTransform:'capitalize'}}>functional testings</button><button style={{color:'black',textTransform:'capitalize'}}>calibration services</button><button style={{color:'black',textTransform:'capitalize'}}>manufacturing services </button><button style={{color:'black',textTransform:'capitalize'}}>software as a service </button>

           
            </section>

            <section className="max-w-screen-2xl mx-auto p-3 lg:p-8">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {details?.map((service) => (
      <div
        key={service.id}
        className="outer-card"
        style={{
          boxShadow: '0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)',
          padding: '10px',
          borderRadius: '10px',
          overflow: 'hidden', // Ensure overflow is hidden to contain shadow
        }}
      >
        <motion.div
          className="box relative overflow-hidden flex"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            width: '360px',
            height: '90px',
            border: '1px solid rgba(73, 115, 139, 0.5)',
            boxShadow:
              '0px 50px 100px -20px rgba(0, 123, 255, 0.25), 0px 30px 60px -30px rgba(0, 123, 255, 0.3), 0px -2px 6px 0px inset rgba(0, 123, 255, 0.35)',
          }}
        >
          <Link href={`/services/${service.slug}`}>
            <div>
              <div className="imgBx flex-shrink-0">
                <img
                  src={service.coverImageUrl}
                  alt={service.title}
                  className="w-20 h-24 object-cover"
                />
              </div>
              <div className="content p-6 bg-white flex flex-col justify-center ml-12">
                <h2 className="text-xl font-bold" style={{ textTransform: 'capitalize',marginTop:'-8rem',marginLeft:'5rem' }}>
                  {service.title}
                </h2>
                <i className="bi bi-arrow-right-short"></i>
                {/* <p className="text-sm text-gray-700">{service.description}</p> */}
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    ))}
  </div>
</section>

            {/* <div className="sticky_bottom">
<div className="ads_sticky_bottom" >
Add a bar at the bottom of the site for ads    
<a href="#" ><img  data-original-height="129" data-original-width="1024" height="80" src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiemnIKcQNgpCAr8FkQ98KqWewgvX4yCO5AbE77FbQxCCjtcKfUAMsQPpnvDxfPuyQxvyl9vz6qMUIsPRxb1E3ybA6djfLevmsl3VHnaMFfuhtI4ieNlZUv7rn2DqzMouR6q_Rra0pwEm0Etkno3qTiQU6BxOfNnreoj_r4UUg4eRbj9dwRWTGCA4tN/w640-h80/How%20to%20Explain%20Banner%20Ads%20to%20Anyone-5.webp" width="640" /></a></div>
</div> */}
<Ads/>

            <div className="paragraph paragraph--type--video paragraph--view-mode--default">

<div className="layer-media container">

    <div className="layer-media--container">

        <div
            className="layer-media--media field field--name-field-youtube-video field--type-video-embed-field field--label-hidden field__items">
            <div
                className="video-embed-field-provider-youtube video-embed-field-responsive-video">
                <iframe width="854" height="485" src="https://www.youtube.com/embed/oNrEHazY20Q?si=Xc-yDGXn5jRM8oXy" title="YouTube video player" frameborder="0" allow="accelerometer;; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>

        </div>
    </div>

</div>

</div>

<section className='reelservice'>
  <span>ads</span>
  {/* <h2>Team</h2> */}
  {/* <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi, praesentium veritatis voluptatibus ut consequuntur quas consequatur omnis id rem obcaecati.</p> */}
  <span className="bg-watermark">team</span>
  <div className="reelscards">
  <div className="reelscard">
  <div className="reelsvideo-container">
  <iframe
    width="100%"
    height="600px"
    src="https://www.youtube.com/embed/PyVkSUVwTb0?rel=0&autoplay=1"
    title="YouTube video player"
    allow="accelerometer;; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>
</div>


</div>

<div className="reelscard">
  <div className="reelsvideo-container">
  <iframe
    width="100%"
    height="600px"
    src="https://www.youtube.com/embed/PyVkSUVwTb0?rel=0&autoplay=1"
    title="YouTube video player"
    allow="accelerometer;  clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>
</div>


</div>
<div className="reelscard">
  <div className="reelsvideo-container">
  <iframe
    width="100%"
    height="600px"
    src="https://www.youtube.com/embed/PyVkSUVwTb0?rel=0&autoplay=1"
    title="YouTube video player"
    allow="accelerometer; ; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>
</div>


</div>
  </div>
</section>

            <section>
                <div className="serslider">
                    <div className="servicesitem"><a href=""><img alt="logo" src="https://images.unsplash.com/photo-1719206835965-088ed79e95e2?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/></a></div>
                    <div className="servicesitem"><a href=""><img alt="logo" src="https://images.unsplash.com/photo-1719206835965-088ed79e95e2?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/></a></div>
                    <div className="servicesitem"><a href=""><img alt="logo" src="https://images.unsplash.com/photo-1719206835965-088ed79e95e2?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/></a></div>
                    <div className="servicesitem"><a href=""><img alt="logo" src="https://images.unsplash.com/photo-1719206835965-088ed79e95e2?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/></a></div>
                    <div className="servicesitem"><a href=""><img alt="logo" src="https://images.unsplash.com/photo-1719206835965-088ed79e95e2?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/></a></div>
                    <div className="servicesitem"><a href=""><img alt="logo" src="https://images.unsplash.com/photo-1719206835965-088ed79e95e2?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/></a></div>
                    <div className="servicesitem"><a href=""><img alt="logo" src="https://images.unsplash.com/photo-1719206835965-088ed79e95e2?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/></a></div>
                    <div className="servicesitem"><a href=""><img alt="logo" src="https://images.unsplash.com/photo-1719206835965-088ed79e95e2?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/></a></div>
                    <div className="servicesitem"><a href=""><img alt="logo" src="https://images.unsplash.com/photo-1719206835965-088ed79e95e2?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/></a></div>
                    <div className="servicesitem"><a href=""><img alt="logo" src="https://images.unsplash.com/photo-1719206835965-088ed79e95e2?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/></a></div>
                    <div className="servicesitem"><a href=""><img alt="logo" src="https://images.unsplash.com/photo-1719206835965-088ed79e95e2?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/></a></div>
                    <div className="servicesitem"><a href=""><img alt="logo" src="https://images.unsplash.com/photo-1719206835965-088ed79e95e2?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/></a></div>
                </div>
            </section>
            
        </>
    );
};

export default Page;
