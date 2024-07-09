import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react';
import { getStorage, ref, uploadString, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import { useMutation, useQuery } from 'graphql-hooks';
import Image from 'next/image';
import { AiFillCloseCircle } from 'react-icons/ai';
import { useGqlClient } from '@/hooks/UseGqlClient';


interface Props {
    setOpenPreviewModal: any;
    openPreviewModal: any;
    id: string;

}



const FIND_EVENT = `
query Events($where: EventWhere) {
    events(where: $where) {
      name
      startAt
      location
      image
      endAt
      description
      id
    }
  }
`;


const PreviewModal: React.FC<Props> = ({
    setOpenPreviewModal,
    openPreviewModal,
    id

}) => {
    const [input, setInput] = useState({
        name: '',
        price: "",
        startAt: '',
        endAt: '',
        image: '',
        description: '',
        location: '',
    });

    const client = useGqlClient();
    function closeModal() {
        setOpenPreviewModal(false);
    }

    const { loading: eventLoading, error, data } = useQuery(FIND_EVENT, {
        client,
        variables: {
            where: {
                id_CONTAINS: id
            }
        }
    });



    const convertToStandardDate = (date: string) => {
        const dateObject = new Date(date);
        const year = dateObject.getFullYear();
        const month = dateObject.getMonth() + 1;
        const day = dateObject.getDate();
        const standardDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        return standardDate
    }

    useEffect(() => {
        if (data) {
            const event = data.events[0]
            setInput({
                name: event?.name,
                price: event?.price,
                startAt: event?.startAt,
                endAt: event?.endAt,
                description: event?.description,
                location: event?.location,
                image: event?.image
            });
        }
    }, [data])


    if (eventLoading) return <div>Loading...</div>


    return (
        <>
            <Transition appear show={openPreviewModal} as={Fragment}>
                <Dialog as="div" className="relative z-[9000000]" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto ">
                        <div className="flex min-h-full items-center justify-center p-4 text-center relative">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full  py-12 flex items-center justify-center flex-col transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">

                                    <div className="min-h-screen px-14 ">
                                        <div className="grid grid-cols-1 lg:grid-cols-8 gap-0">
                                            <div className="col-span-1 lg:col-span-6 p-4">
                                                <div className="rounded-lg overflow-hidden">
                                                    <Image
                                                        src={input.image ? input.image : '/assets/noImage.jpg'}
                                                        width="1000"
                                                        height="500"
                                                        alt="/"
                                                        className="rounded-lg w-full h-[500px]"
                                                    />
                                                </div>
                                                <p
                                                    className="text-dimText py-4 leading-8"


                                                >
                                                    {input.description}
                                                </p>
                                                {/* <h2
                                                    className="text-dimText font-semibold mb-5"

                                                >
                                                    Event Sponsors
                                                </h2>
                                                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 p-2">
                                                    {[1, 2, 3, 4, 5, 6].map((item) => (
                                                        <div
                                                            key={item}
                                                            className="bg-bg_color-light p-1.5 mr-1 mb-1 rounded-md"
                                                        >
                                                            <img   // eslint-disable-line @next/next/no-img-element
                                                                src="/assets/company1.png"
                                                                width="150"
                                                                height="200"
                                                                alt="/"
                                                                className="rounded-md"
                                                            />
                                                        </div>
                                                    ))}
                                                </div> */}
                                            </div>

                                            <div className="col-span-1 lg:col-span-2 p-4">
                                                <div className="flex items-center">
                                                    <button
                                                        className="py-2 px-6 bg-primary text-white rounded-lg"
                                                        type="button"
                                                    >
                                                        Book Your Ticket
                                                    </button>
                                                    <h2
                                                        className="text-primary font-semibold ml-3"

                                                    >
                                                        {input.price ? input.price : 'Free'}
                                                    </h2>
                                                </div>
                                                {/* <h3
            className="text-dimText font-semibold "
            
          >
            Details
          </h3> */}
                                                <div className="border-b border-gray-300 pb-1 mt-7">
                                                    <p
                                                        className="text-primary font-semibold"

                                                    >
                                                        Start:
                                                    </p>
                                                    <p
                                                        className="text-dimText"


                                                    >
                                                        {input.startAt ? convertToStandardDate(input.startAt) : 'Not Specified'}
                                                    </p>
                                                </div>
                                                <div className="border-b border-gray-300 pb-1">
                                                    <p
                                                        className="text-primary font-semibold"

                                                    >
                                                        End:
                                                    </p>
                                                    <p
                                                        className="text-dimText"


                                                    >
                                                        {input.endAt ? convertToStandardDate(input.endAt) : 'Not Specified'}
                                                    </p>
                                                </div>
                                                <div className="border-b border-gray-300 pb-1">
                                                    <p
                                                        className="text-primary font-semibold"

                                                    >
                                                        Location:
                                                    </p>
                                                    <p
                                                        className="text-dimText"


                                                    >
                                                        {input.location ? input.location : 'Not Specified'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            onClick={() => setOpenPreviewModal(false)}
                                            className="text-gray-700 text-2xl absolute top-3 right-6  mt-2">
                                            <AiFillCloseCircle />
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default PreviewModal;