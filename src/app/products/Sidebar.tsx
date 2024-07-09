'use client'

import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Link from 'next/link';
import { HiXMark } from 'react-icons/hi2';
import { useGqlClient } from '@/hooks/UseGqlClient';
import { useQuery } from 'graphql-hooks';
import Loading from '../loading';
import { FunnelIcon } from '@heroicons/react/20/solid';
import Eads from '@/components/Home/Eads';

const GET_CATEGORY = `
query Categories($where: CategoryWhere) {
   categories(where: $where) {
     id
     name
     type
     categoryHasChild {
       id
       name
       type
     }
   }
 }
`;

function classNames(...classes: string[]) {
   return classes.filter(Boolean).join(' ');
}

// component
export default function Sidebar({ children }: { children: React.ReactNode }) {
   // STATES
   const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

   // HOOKS
   const client = useGqlClient();

   // QUERIES
   const { data, error, loading } = useQuery(GET_CATEGORY, {
       client,
       variables: {
           where: {
               type: 'PRODUCT',
           },
       },
   });

   if (loading) return <Loading />;

   return (
       <>
           <div className="bg-white">
               <div>
                   {/* Mobile filter dialog */}
                   <Transition.Root show={mobileFiltersOpen} as={Fragment}>
                       <Dialog
                           as="div"
                           className="relative z-40 lg:hidden"
                           onClose={setMobileFiltersOpen}
                       >
                           <Transition.Child
                               as={Fragment}
                               enter="transition-opacity ease-linear duration-300"
                               enterFrom="opacity-0"
                               enterTo="opacity-100"
                               leave="transition-opacity ease-linear duration-300"
                               leaveFrom="opacity-100"
                               leaveTo="opacity-0"
                           >
                               <div className="fixed inset-0 bg-black bg-opacity-25" />
                           </Transition.Child>

                           <div className="fixed inset-0 z-40 flex">
                               <Transition.Child
                                   as={Fragment}
                                   enter="transition ease-in-out duration-300 transform"
                                   enterFrom="translate-x-full"
                                   enterTo="translate-x-0"
                                   leave="transition ease-in-out duration-300 transform"
                                   leaveFrom="translate-x-0"
                                   leaveTo="translate-x-full"
                               >
                                   <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                                       <div className="flex items-center justify-between px-4">
                                           <h2 className="text-lg font-medium text-gray-900">
                                               Filters
                                           </h2>
                                           <button
                                               type="button"
                                               className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-primary p-2 text-gray-900"
                                               onClick={() => setMobileFiltersOpen(false)}
                                               style={{border:'none'}}
                                           >
           
                                               <span className="sr-only">Close menu</span>
                                               <HiXMark className="h-6 w-6" aria-hidden="true" />
                                           </button>
                                       </div>

                                       {/* Filters */}
                                       <form className="mt-4 border-t border-gray-200">
                                           {data?.categories?.map((section: any) => (
                                               <div key={section.id} className="border-t border-gray-200 px-4 ">
                                                   <h3 className="-mx-2 -my-3 flow-root">
                                                       <span className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500 cursor-pointer" style={{border:'1px solid blue'}}>
                                                           <span className="font-medium text-gray-900 capitalize">
                                                               {section.name}
                                                           </span>
                                                       </span>
                                                   </h3>
                                                   <div className="pt-6">
                                                       <div className="space-y-6">
                                                           {section?.categoryHasChild?.map(
                                                               (option: any, optionIdx: number) => (
                                                                   <div key={option.id} className="flex items-center">
                                                                       <input
                                                                           id={`filter-mobile-${section.id}-${optionIdx}`}
                                                                           name={`${section.id}[]`}
                                                                           type="checkbox"
                                                                           className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                                                       />
                                                                       <label
                                                                           htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                                                           className="ml-3 text-sm text-gray-500 cursor-pointer capitalize"
                                                                       >
                                                                           {option.name}
                                                                       </label>
                                                                   </div>
                                                               )
                                                           )}
                                                       </div>
                                                   </div>
                                               </div>
                                           ))}
                                       </form>
                                   </Dialog.Panel>
                               </Transition.Child>
                           </div>
                       </Dialog>
                   </Transition.Root>

                   <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                       <>
                           <div className="flex items-center">
                               <button
                                   type="button"
                                   className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                                   onClick={() => setMobileFiltersOpen(true)}
                                   style={{border:'none'}}
                               >
                                   <span className="sr-only">Filters</span>
                                   <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                               </button>
                           </div>
                       </>

                       <section aria-labelledby="products-heading">
                           <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                               {/* to categories */}
                               <form className="hidden lg:block">
                                   {/* this is filters */}
                                   {data?.categories?.map((section: any) => (
                                       <div key={section.id} className="border-b border-gray-200 ">
                                           <h3 className="-my-3 flow-root">
                                               <span className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500" style={{border:'none'}}>
                                                   <span className="font-medium text-gray-900 capitalize" style={{marginTop:'3rem'}}>
                                                       {section.name}
                                                   </span>
                                               </span>
                                           </h3>
                                           <div className="pt-6">
                                               <div className="space-y-4">
                                                   {section?.categoryHasChild?.map(
                                                       (option: any, optionIdx: number) => (
                                                           <div key={option.id} className="flex items-center">
                                                               <input
                                                                   id={`filter-${section.id}-${optionIdx}`}
                                                                   name={`${section.id}[]`}
                                                                   type="checkbox"
                                                                   className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                                               />
                                                               <label
                                                                   htmlFor={`filter-${section.id}-${optionIdx}`}
                                                                   className="ml-3 text-sm text-gray-600 cursor-pointer capitalize"
                                                               >
                                                                   {option.name}
                                                               </label>
                                                           </div>
                                                       )
                                                   )}
                                               </div>
                                           </div>
                                       </div>
                                   ))}
                                   <Eads />
                                   <div className="advertisements" style={{}}>
                <Link href={`/events/adsdetailed`}>
                    <div className="advertisement" style={{width:'250px'}}>
                        <img src="https://www.eventindustrynews.com/wp-content/uploads/2024/04/BMA-House-Banner-Adverts-for-our-Venue-Spotlight-395-x-250.jpg" alt="Advertisement 1" />
                    </div>
                    </Link>
                    <div className="advertisement" style={{width:'250px'}}>
                        <img src="https://www.eventindustrynews.com/wp-content/uploads/2024/06/banner-eventscase-eva-EN.gif" alt="Advertisement 2" />
                    </div>
                    {/* <div className="advertisement">
                        <img src="https://www.eventindustrynews.com/wp-content/uploads/2024/07/EIN-Side-Banner-Ad-2024-FLLS-1.gif" alt="Advertisement 2" />
                    </div> */}
                    {/* <div className="advertisement">
                        <img src="https://www.eventindustrynews.com/wp-content/uploads/2024/06/LiveForce-EventTechNews-395x250-2.jpg" alt="Advertisement 2" />
                    </div> */}
                  
                </div>
                               </form>

                               {/* Product grid */}
                               <div className="lg:col-span-3 min-h-screen">{children}</div>
                           </div>
                       </section>
                   </main>
                  
               </div>
           </div>
       </>
   );
}
