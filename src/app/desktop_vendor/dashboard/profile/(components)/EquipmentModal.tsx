'use client'
import React, { Fragment } from 'react';
import { BiMessageSquareEdit } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import { useGqlClient } from '@/hooks/UseGqlClient';
import { useMutation } from 'graphql-hooks';
import AuthConfig from '@/firebase/oauth.config';
import { toast } from 'react-hot-toast';
import Loading from '@/app/loading';
import { useAuth } from '@/firebase/AuthProvider';
import { Dialog, Transition } from '@headlessui/react';


const UPDATE_USER = `mutation UpdateVendors($where: VendorWhere, $update: VendorUpdateInput) {
    updateVendors(where: $where, update: $update) {
      info {
        nodesCreated
      }
    }
  }`



// component
const EquipmentModal = ({ isModalOpen, setIsModalOpen, getUser }: any) => {
    // states


    // hooks
    const client = useGqlClient()
    const { user } = useAuth()


    const [updateUserFn, updateUserState] = useMutation(UPDATE_USER, { client })


    const addEquipment = async (e: any) => {

        e.preventDefault()

        const { name, model, make, calibrationDetails, yearOfInstallation, warranty } = e.target


        const { data: updateDta } = await updateUserFn({
            variables: {
                "where": {
                    "userIs": {
                        "email": user?.email
                    }
                },
                "update": {
                    "hasManyEquipment": [
                        {
                            "create": [
                                {
                                    "node": {
                                        "name": name.value,
                                        "model": model.value,
                                        "make": make.value,
                                        "yearOfInstallation": yearOfInstallation.value,
                                        "calibrationDetails": calibrationDetails.value,
                                        "warranty": warranty.value
                                    }
                                }
                            ]
                        }
                    ]
                }
            }
        })



        if (updateDta?.updateVendors) {
            toast.success('Industry added')
            getUser()
            setIsModalOpen(false)



        }
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    if (updateUserState.loading) {
        return <Loading />
    }

    // render
    return (
        <Transition.Root show={isModalOpen} as={Fragment}>
            <Dialog
                as="div"
                className="fixed z-[1000000000000005] inset-0 overflow-y-auto"
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
                            <p className="focus:outline-none pt-4 pb-8 text-base text-center sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800 border-b mb-7">Add New Equipment</p>
                            <form onSubmit={addEquipment}>
                                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6'>
                                    <div className="">
                                        <label htmlFor="address">Name</label>

                                        <input
                                            type="text" className="h-10 border border-gray-300 mt-1 rounded px-4 w-full " name='name' placeholder="" />
                                    </div>
                                    <div className="">
                                        <label htmlFor="address">Model</label>

                                        <input
                                            type="text" name='model' className="h-10 border border-gray-300 mt-1 rounded px-4 w-full " placeholder="" />
                                    </div>
                                    <div className="">
                                        <label htmlFor="address">Make</label>

                                        <input
                                            type="text" className="h-10 border border-gray-300 mt-1 rounded px-4 w-full " name='make' placeholder="" />
                                    </div>
                                    <div className="">
                                        <label htmlFor="address">Calibration Details</label>

                                        <input
                                            type="text" name='calibrationDetails' className="h-10 border border-gray-300 mt-1 rounded px-4 w-full " placeholder="" />
                                    </div>
                                    <div className="">
                                        <label htmlFor="address">Year Of Installation</label>

                                        <input

                                            type="text" name='yearOfInstallation' className="h-10 border border-gray-300 mt-1 rounded px-4 w-full " placeholder="" />
                                    </div>
                                    <div className="">
                                        <label htmlFor="address">Warranty</label>

                                        <input

                                            type="text" name='warranty' className="h-10 border border-gray-300 mt-1 rounded px-4 w-full " placeholder="" />
                                    </div>
                                    <div className="col-span-full mt-6">
                                        <button type='submit' className=' bg-primary text-white px-4 py-2'>
                                            Add Equipment
                                        </button>
                                    </div>
                                </div>


                            </form>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default EquipmentModal;