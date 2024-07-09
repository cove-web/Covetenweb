'use client'
import { Fragment, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Dialog, Transition } from '@headlessui/react';
import { useGqlClient } from '@/hooks/UseGqlClient';
import { useMutation } from 'graphql-hooks';
import { toast } from 'react-hot-toast';
import HandleFileUpload from '@/shared/HandleFileUpload';
import createLog from '@/shared/graphQl/mutations/createLog';
import AuthConfig from '@/firebase/oauth.config';
import { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

//props interface
interface INotificationModal {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
}



//component
function ForgotPassModal({ isOpen, setIsOpen }: INotificationModal) {
    // state
    const [loading, setLoading] = useState(false);

    // hooks
    const { resetPassword } = AuthConfig()
    const router = useRouter()

    //handle close modal
    function closeModal() {
        setIsOpen(false);
    }

    //handle open modal
    function openModal() {
        setIsOpen(true);
    }


    //creating notification
    async function handleSubmit(event: any) {
        setLoading(true)
        event.preventDefault();
        const email = event.target.email.value;

        resetPassword(email).then(() => {
            router.push('/auth/reset_password?success=true')
            closeModal();
            setLoading(false)
        }).catch((error) => {
            router.push(`/auth/reset_password?success=false&message=${error.message}`)
            setLoading(false)
        });

    }






    //render
    return (
        <div>


            <Transition.Root show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed z-[120000000000] inset-0 overflow-y-auto"
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

                            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                                <p className="focus:outline-none pt-4 pb-8 text-base text-center sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">Forgot Password</p>
                                <form onSubmit={handleSubmit} className=''>
                                    <div className="mb-5">
                                        <label htmlFor="title" className="block  text-gray-700 text-sm mb-1">
                                            Enter Your Email
                                        </label>
                                        <input
                                            id="title"
                                            name="email"
                                            type="email"
                                            className="mt-1 px-4 py-2 border border-gray-200 rounded-md w-full"
                                        />
                                    </div>




                                    <div className="mt-10">
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-600"
                                        >
                                            {loading ? 'Loading...' : 'Send Email'}
                                        </button>
                                        <button
                                            type="button"
                                            className="ml-2 px-4 py-2 text-gray-500 rounded-md hover:bg-gray-200"
                                            onClick={closeModal}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
            <Toaster
                position="bottom-right"
                containerStyle={{}}
                toastOptions={{
                    duration: 7000,
                }}
            />
        </div>
    );
}

export default ForgotPassModal;
