'use client'

import React from 'react';
import Modal from './Modal';

const LeadCard = ({ interest }: { interest: string }) => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    return (
        <div className="px-5 h-[370px] flex items-center justify-center flex-col mt-8"
            style={{
                background: `linear-gradient( rgba(0, 0, 0, 0), rgba(0, 0, 0, 0) ), url(${'/assets/lead.jpg'})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>
            <div className="text-[#08d9ff]">Contact us now</div>
            <div className="text-white text-4xl font-semibold">If need help!</div>
            <a className="text-white text-4xl font-semibold border-t border-gray-200" href="tel:+7899558406">789-9558-406</a>
            <div className="text-white">or complete the contact form:</div>
            <div className="gradient-bg text-white font-semibold px-4 py-2 mt-6 rounded-md">
                <button className="button" onClick={() => setIsModalOpen(true)}>Reach out </button>
            </div>
            <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} interest={interest} />
        </div>
    );
};

export default LeadCard;