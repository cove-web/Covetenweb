'use client'
import AutoComplete from '@/components/AutoComplete';
import React, { useEffect } from 'react';
import ServicesFrom from './ServicesFrom';
import { Invoice, Service } from '@/gql/graphql';
import { BsPercent } from 'react-icons/bs';

interface IInvoiceForm {
    updateInvoice: (invoiceData: Invoice) => void
    invoiceData?: Invoice
}



const InvoiceForm = ({ updateInvoice, invoiceData }: IInvoiceForm) => {

    //states
    const [previousData, setPreviousData] = React.useState<any>({
        taxType: '',
        taxRate: '',
        hasPurchase: []
    })




    useEffect(() => {

        if (invoiceData) {
            setPreviousData({
                taxType: invoiceData?.taxType,
                taxRate: invoiceData?.taxRate,
                hasPurchase: invoiceData?.hasPurchase.map((service, idx) => ({
                    itemName: service.itemName,
                    price: service.price,
                    quantity: service.quantity
                })),
            });

        }

    }, [invoiceData])







    const handleSubmit = (e: any) => {
        e.preventDefault()
        updateInvoice(previousData)
    }



    return (

        <div className="">
            <div className="container max-w-screen-lg mx-auto">
                <div>

                    <div className="bg-white rounded p-4 px-4 md:p-8 mb-6">
                        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-2">


                            <div className="lg:col-span-2">
                                <form onSubmit={handleSubmit} className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">

                                    <div className='col-span-2'>
                                        <p >Tax</p>

                                        <div className="flex  sm:flex-row  ">
                                            <div className="flex flex-row mb-1 sm:mb-0">

                                                <div className="relative">
                                                    <select
                                                        defaultValue={previousData.taxType}
                                                        onChange={(e) => setPreviousData({ ...previousData, taxType: e.target.value })}
                                                        className=" h-full rounded-r border-t  rounded-l-md sm:rounded-r-none sm:border-r-0 border-r border-b block  w-full bg-white border-gray-300 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500" >
                                                        <option>GST</option>
                                                        <option>SGST</option>
                                                        <option>UGST</option>
                                                    </select>

                                                </div>
                                            </div>
                                            <div className="block relative">
                                                <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                                                    <BsPercent />
                                                </span>
                                                <input placeholder="Tax rate"
                                                    defaultValue={previousData.taxRate}
                                                    onChange={(e) => setPreviousData({ ...previousData, taxRate: e.target.value })}
                                                    type='number'
                                                    className="  sm:rounded-l-none rounded-r-md  border border-gray-300 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* services */}
                                    <div className="md:col-span-5 mt-8">
                                        <div>
                                            {/* service title */}
                                            <div className='flex  justify-between'>
                                                <p className='text-xl font-semibold text-gray-800'>
                                                    Services
                                                </p>



                                            </div>
                                            {/* service inputs */}
                                            <div className='space-y-5'>
                                                {
                                                    invoiceData?.hasPurchase?.map((purchaseItem: any, i: number) =>

                                                        <div key={i}>
                                                            <ServicesFrom index={i} data={purchaseItem} setPreviousData={setPreviousData} previousData={previousData} />
                                                        </div>
                                                    )
                                                }
                                            </div>


                                        </div>
                                    </div>

                                    <div className="md:col-span-5 text-right mt-8">
                                        <div className="inline-flex items-end">
                                            <button type='submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
                                        </div>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default InvoiceForm;