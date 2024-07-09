'use client'
import React, { useState } from 'react';
import InvoiceTable from './InvoiceTable';
import Link from 'next/link';
import Main from './Main';








const InvoicePage = () => {



    return (
        <>
            <div className="w-full  bg-white rounded-lg py-4 md:py-7 px-4 md:px-8 xl:px-10 min-h-[80vh]"                         style={{backgroundColor:'#e8e8e880'}}
>
                <div className=" py-4 md:py-7">
                    <div className="flex items-center justify-between">
                        <p className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">Quotation</p>

                    </div>
                </div>
                <div className='flex items-center justify-end' 
                >
                    <div >
                        <Link href='/admin/dashboard/quotation/create_quotation' className="focus:ring-2 focus:ring-offset-2 focus:ring-primary mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-primary hover:bg-primary focus:outline-none  "                 style={{backgroundColor:'#14bfd5',borderRadius:'16px'}}
>
                            <p className="text-sm font-medium leading-none text-white">Create new Quotation</p>
                        </Link>
                    </div>
                </div>
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full  rounded-sm overflow-hidden">

                        <Main />
                    </div>
                </div>



            </div>

        </>
    );
};

export default InvoicePage;