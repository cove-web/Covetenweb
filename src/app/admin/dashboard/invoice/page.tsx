'use client'
import React, { useState } from 'react';
import InvoiceTable from './InvoiceTable';
import Link from 'next/link';
import Main from './Main';








const InvoicePage = () => {



    return (
        <>
            <div className="w-full  bg-white rounded-lg py-4 md:py-7 px-4 md:px-8 xl:px-10 min-h-[80vh]"                 style={{backgroundColor:'#e8e8e880'}}
>
                <div className=" py-4 md:py-7">
                    <div className="flex items-center justify-between">
                        <p className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">Invoice List</p>
                        <div className='flex items-center justify-end' 
                // style={{}
                >
                    <div style={{cursor:'pointer',backgroundColor:"#14bfd5",borderRadius:'16px'}}>
                    <Link href='/admin/dashboard/invoice/create_invoice' 
                    className="dt-button btn btn-primary"
                    // className="focus:ring-2 focus:ring-offset-2 focus:ring-primary mt-4 sm:mt-0 inline-flex items-center justify-center px-6 py-3 bg-primary hover:bg-primary focus:outline-none"
                     style={{backgroundColor:'#696cff'}}>
  {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#fff" width="16" height="16" className="mr-2">
    <path fill-rule="evenodd" d="M10 18a1 1 0 01-1-1v-6H3a1 1 0 110-2h6V3a1 1 0 112 0v6h6a1 1 0 010 2h-6v6a1 1 0 01-1 1z" clip-rule="evenodd" />
  </svg> */}
  <p className="text-sm font-medium leading-none text-white" style={{padding:'1rem'}}>Create new Invoice</p>
</Link>
             </div>
                </div>
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