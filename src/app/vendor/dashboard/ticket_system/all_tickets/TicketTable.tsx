'use client'

import React, { useState } from 'react';
import { AiTwotoneDelete } from 'react-icons/ai';
import { BiSolidEditAlt } from 'react-icons/bi';
import TicketModal from './TicketModal';

const TicketTable = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <table className="min-w-full leading-normal">
            <thead>
                <tr>
                    <th
                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        User
                    </th>
                    <th
                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Vendor
                    </th>
                    <th
                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Ticket Id
                    </th>
                    <th
                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Status
                    </th>
                    <th
                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 w-10 h-10">
                                <div
                                    className="flex items-center justify-center h-10 w-10 bg-gray-300 text-lg  font-bold rounded-lg"
                                >
                                    H
                                </div>
                            </div>
                            <div className="ml-3">
                                <p className="text-gray-700 font-bold whitespace-no-wrap">
                                    User Name
                                </p>
                                <p className="text-gray-700  text-[10px">
                                    Example  Company Name
                                </p>
                            </div>
                        </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
                        <div className="flex items-center">
                            {/* <div className="flex-shrink-0 w-10 h-10">
                            <div
                                className="flex items-center justify-center h-10 w-10 bg-gray-300 text-lg  font-bold rounded-lg"
                            >
                                H
                            </div>
                        </div> */}
                            <div className="">
                                <p className="text-gray-700 ">
                                    Vendor Name
                                </p>

                            </div>
                        </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
                        <p className="text-gray-700 whitespace-no-wrap font-bold">
                            H61235-01
                        </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
                        <span
                            className="relative inline-block px-3 py-1  leading-tight">
                            <span aria-hidden
                                className="absolute inset-0 opacity-50 rounded-full"></span>
                            <span className="relative bg-green-200 text-green-800 p-1 rounded-lg font-semibold">Accepted</span>
                        </span>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
                        <div className="relative flex items-center justify-around  space-x-3 px-8 ">

                            <button onClick={() => setIsOpen(true)} className="focus:ring-2 focus:ring-offset-2  text-sm leading-none text-green-600 py-2 px-2 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none"><BiSolidEditAlt /></button>
                            <button className="focus:ring-2 focus:ring-offset-2  text-sm leading-none text-red-600 py-2 px-2 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none"><AiTwotoneDelete /></button>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 w-10 h-10">
                                <div
                                    className="flex items-center justify-center h-10 w-10 bg-gray-300 text-lg  font-bold rounded-lg"
                                >
                                    H
                                </div>
                            </div>
                            <div className="ml-3">
                                <p className="text-gray-700 font-bold whitespace-no-wrap">
                                    User Name
                                </p>
                                <p className="text-gray-700  text-[10px">
                                    Example  Company Name
                                </p>
                            </div>
                        </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
                        <div className="flex items-center">
                            {/* <div className="flex-shrink-0 w-10 h-10">
                            <div
                                className="flex items-center justify-center h-10 w-10 bg-gray-300 text-lg  font-bold rounded-lg"
                            >
                                H
                            </div>
                        </div> */}
                            <div className="">
                                <p className="text-gray-700 ">
                                    Vendor Name
                                </p>

                            </div>
                        </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
                        <p className="text-gray-700 whitespace-no-wrap font-bold">
                            H61235-01
                        </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
                        <span
                            className="relative inline-block px-3 py-1  leading-tight">
                            <span aria-hidden
                                className="absolute inset-0 opacity-50 rounded-full"></span>
                            <span className="relative bg-green-200 text-green-800 p-1 rounded-lg font-semibold">Accepted</span>
                        </span>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
                        <div className="relative flex items-center justify-around  space-x-3 px-8 ">

                            <button className="focus:ring-2 focus:ring-offset-2  text-sm leading-none text-green-600 py-2 px-2 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none"><BiSolidEditAlt /></button>
                            <button className="focus:ring-2 focus:ring-offset-2  text-sm leading-none text-red-600 py-2 px-2 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none"><AiTwotoneDelete /></button>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 w-10 h-10">
                                <div
                                    className="flex items-center justify-center h-10 w-10 bg-gray-300 text-lg  font-bold rounded-lg"
                                >
                                    H
                                </div>
                            </div>
                            <div className="ml-3">
                                <p className="text-gray-700 font-bold whitespace-no-wrap">
                                    User Name
                                </p>
                                <p className="text-gray-700  text-[10px">
                                    Example  Company Name
                                </p>
                            </div>
                        </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
                        <div className="flex items-center">
                            {/* <div className="flex-shrink-0 w-10 h-10">
                            <div
                                className="flex items-center justify-center h-10 w-10 bg-gray-300 text-lg  font-bold rounded-lg"
                            >
                                H
                            </div>
                        </div> */}
                            <div className="">
                                <p className="text-gray-700 ">
                                    Vendor Name
                                </p>

                            </div>
                        </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
                        <p className="text-gray-700 whitespace-no-wrap font-bold">
                            H61235-01
                        </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
                        <span
                            className="relative inline-block px-3 py-1  leading-tight">
                            <span aria-hidden
                                className="absolute inset-0 opacity-50 rounded-full"></span>
                            <span className="relative bg-green-200 text-green-800 p-1 rounded-lg font-semibold">Accepted</span>
                        </span>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
                        <div className="relative flex items-center justify-around  space-x-3 px-8 ">

                            <button className="focus:ring-2 focus:ring-offset-2  text-sm leading-none text-green-600 py-2 px-2 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none"><BiSolidEditAlt /></button>
                            <button className="focus:ring-2 focus:ring-offset-2  text-sm leading-none text-red-600 py-2 px-2 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none"><AiTwotoneDelete /></button>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 w-10 h-10">
                                <div
                                    className="flex items-center justify-center h-10 w-10 bg-gray-300 text-lg  font-bold rounded-lg"
                                >
                                    H
                                </div>
                            </div>
                            <div className="ml-3">
                                <p className="text-gray-700 font-bold whitespace-no-wrap">
                                    User Name
                                </p>
                                <p className="text-gray-700  text-[10px">
                                    Example  Company Name
                                </p>
                            </div>
                        </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
                        <div className="flex items-center">
                            {/* <div className="flex-shrink-0 w-10 h-10">
                            <div
                                className="flex items-center justify-center h-10 w-10 bg-gray-300 text-lg  font-bold rounded-lg"
                            >
                                H
                            </div>
                        </div> */}
                            <div className="">
                                <p className="text-gray-700 ">
                                    Vendor Name
                                </p>

                            </div>
                        </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
                        <p className="text-gray-700 whitespace-no-wrap font-bold">
                            H61235-01
                        </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
                        <span
                            className="relative inline-block px-3 py-1  leading-tight">
                            <span aria-hidden
                                className="absolute inset-0 opacity-50 rounded-full"></span>
                            <span className="relative bg-green-200 text-green-800 p-1 rounded-lg font-semibold">Accepted</span>
                        </span>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
                        <div className="relative flex items-center justify-around  space-x-3 px-8 ">

                            <button className="focus:ring-2 focus:ring-offset-2  text-sm leading-none text-green-600 py-2 px-2 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none"><BiSolidEditAlt /></button>
                            <button className="focus:ring-2 focus:ring-offset-2  text-sm leading-none text-red-600 py-2 px-2 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none"><AiTwotoneDelete /></button>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 w-10 h-10">
                                <div
                                    className="flex items-center justify-center h-10 w-10 bg-gray-300 text-lg  font-bold rounded-lg"
                                >
                                    H
                                </div>
                            </div>
                            <div className="ml-3">
                                <p className="text-gray-700 font-bold whitespace-no-wrap">
                                    User Name
                                </p>
                                <p className="text-gray-700  text-[10px">
                                    Example  Company Name
                                </p>
                            </div>
                        </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
                        <div className="flex items-center">
                            {/* <div className="flex-shrink-0 w-10 h-10">
                            <div
                                className="flex items-center justify-center h-10 w-10 bg-gray-300 text-lg  font-bold rounded-lg"
                            >
                                H
                            </div>
                        </div> */}
                            <div className="">
                                <p className="text-gray-700 ">
                                    Vendor Name
                                </p>

                            </div>
                        </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
                        <p className="text-gray-700 whitespace-no-wrap font-bold">
                            H61235-01
                        </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
                        <span
                            className="relative inline-block px-3 py-1  leading-tight">
                            <span aria-hidden
                                className="absolute inset-0 opacity-50 rounded-full"></span>
                            <span className="relative bg-green-200 text-green-800 p-1 rounded-lg font-semibold">Accepted</span>
                        </span>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
                        <div className="relative flex items-center justify-around  space-x-3 px-8 ">

                            <button className="focus:ring-2 focus:ring-offset-2  text-sm leading-none text-green-600 py-2 px-2 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none"><BiSolidEditAlt /></button>
                            <button className="focus:ring-2 focus:ring-offset-2  text-sm leading-none text-red-600 py-2 px-2 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none"><AiTwotoneDelete /></button>
                        </div>
                    </td>
                </tr>



            </tbody>
            <TicketModal isOpen={isOpen} setIsOpen={setIsOpen} />
        </table>
    );
};

export default TicketTable;