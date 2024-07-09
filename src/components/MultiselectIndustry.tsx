'use client'

import { Fragment, useState } from 'react';
import { Transition } from '@headlessui/react';
import { HiCheck, HiSelector } from 'react-icons/hi';

interface Option {
    id: number | string;
    title: string;
    description?: string;
}

interface Props {
    selectedOptions: any[];
    setSelectedOptions: (options: any[]) => void;
    options: Option[];
    loading?: any
}



function MultiselectIndustry({ selectedOptions, setSelectedOptions, options, loading }: Props) {

    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredOptions = options?.filter((option) =>
        option?.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );



    const toggleOption = (option: Option) => {
        if (selectedOptions?.find((item) => item?.id === option?.id)) {
            setSelectedOptions(selectedOptions.filter((item) => item.id !== option.id));
        } else {
            setSelectedOptions([...selectedOptions, option]);
        }
    };

    return (
        <div className="relative w-full">

            <input
                type="text"
                className="w-full py-2 pl-3 pr-10 text-left bg-white border border-gray-300 rounded-md shadow-sm cursor-default focus:outline-none focus:ring-1  focus:border-primary sm:text-sm"
                placeholder="Search options"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onClick={() => setIsOpen(true)}
            />
            <div>

            </div>

            <Transition
                show={isOpen}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <div className="absolute z-[80000000000000000] mt-1 w-full bg-white shadow-lg rounded-md py-1 text-base ring-1 ring-black ring-opacity-5  focus:outline-none sm:text-sm h-48 ">
                    <div className='h-full relative'>
                        <div className='h-full mb-12 overflow-scroll'>
                            {
                                loading && <p>loading ....</p>
                            }

                            {filteredOptions && filteredOptions?.slice(0, 10)?.map((option: any) => (
                                <div
                                    key={option.id}
                                    className={`${selectedOptions.find((item: any) => item.id === option.id)
                                        ? 'text-amber-900 bg-amber-100'
                                        : 'text-gray-900'
                                        } cursor-default select-none relative py-2 pl-8 pr-4 `}
                                    onClick={() => toggleOption(option)}
                                >
                                    <span className="block truncate uppercase">{option?.title}</span>
                                    {selectedOptions.find((item) => item?.id === option?.id) && (
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                            <HiCheck className="w-5 h-5" />
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-center absolute bottom-0 w-full py-2 bg-gray-100 text-primary cursor-pointer">
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>



                </div>
            </Transition>


            <div className='grid grid-cols-1 lg:grid-cols-3 gap-2 w-full'>
                {selectedOptions.length > 0 && (
                    selectedOptions.map((option: any, i: number) => (
                        <div key={i} className=" mr-2 flex uppercase  items-center justify-center text-xs pointer-events-none  mt-3  border border-gray-300 px-4 py-1 ">
                            {option.title}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default MultiselectIndustry;
