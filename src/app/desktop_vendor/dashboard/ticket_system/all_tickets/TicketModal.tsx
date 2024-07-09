'use client'
import { Fragment, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Dialog, Transition } from '@headlessui/react';
import { useGqlClient } from '@/hooks/UseGqlClient';
import { useMutation } from 'graphql-hooks';
import { toast } from 'react-hot-toast';
import AutoComplete from '@/components/AutoComplete';

//props interface
interface INotificationModal {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;

}



//component
function TicketModal({ isOpen, setIsOpen }: INotificationModal) {
    const [selected, setSelected] = useState(null);

    const [selectedOption, setSelectedOption] = useState("GENAREL");

    // Options for select
    const options = [
        "GENAREL",
        "PERSONALIZED"
    ];

    //handle select option
    const handleSelect = (e: any) => {
        setSelectedOption(e.target.value);
    };

    //handle close modal
    function closeModal() {
        setIsOpen(false);
    }

    //handle open modal
    function openModal() {
        setIsOpen(true);
    }





    //render
    return (
        <div>


            <Transition.Root show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed z-10 inset-0 overflow-y-auto"
                    onClose={closeModal}
                >
                    <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />
                        </Transition.Child>

                        <span
                            className="hidden sm:inline-block sm:align-middle sm:h-screen"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>

                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >

                            <div className="inline-block  align-bottom bg-white rounded-lg px-4 pt-5 pb-7 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-8">
                                <p className="focus:outline-none pt-4 pb-8 text-base text-center sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800 border-b mb-7">Update Assigned Ticket</p>
                                <div>
                                    <div className="flex flex-col space-y-3 w-full">
                                        <h2 className='text-base font-semibold text-gray-800 '>Module Name  - Lorem, ipsum dolor.</h2>
                                        <p className='text-sm text-gray-700'>Company : Example Company Name</p>
                                        <p className='text-sm text-gray-700'>Ticket Id : H4569-01</p>

                                        <div className='w-full pb-20'>
                                            <p className='text-sm text-gray-700'>Select Vendor</p>
                                            <div className='relative w-full'>
                                                <AutoComplete setSelected={setSelected} selected={selected} />
                                            </div>
                                        </div>

                                    </div>
                                    <div className="mt-10">
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-600"
                                        >
                                            Submit
                                        </button>
                                        <button
                                            type="button"
                                            className="ml-2 px-4 py-2 text-gray-700 rounded-md hover:bg-gray-200"
                                            onClick={closeModal}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        </div>
    );
}

export default TicketModal;
