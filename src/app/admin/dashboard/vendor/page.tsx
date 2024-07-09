'use client'
import Button from '@/components/Button';
import React, { useState } from 'react';
import VendorModal from './VendorModal';
import Main from './Main';

const VendorPage = () => {
    const [expandedIndex, setExpandedIndex] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAccordionClick = (index: any) => {
        setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
    };




    return (
        <>
            <div className="w-full  bg-white min-h-[400px] rounded-lg py-4 md:py-7 px-4 md:px-8 xl:px-10 "                                 style={{backgroundColor:'#e8e8e880'}}
>
                <div className=" py-4 md:py-7">
                    <div className="flex items-center justify-between">
                        <p className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">Vendors</p>

                    </div>



                    <Main />
                </div>
            </div >
            <VendorModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        </>
    );
};

export default VendorPage;