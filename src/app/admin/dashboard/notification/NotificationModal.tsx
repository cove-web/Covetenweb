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

//props interface
interface INotificationModal {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    setNewNotification: (value: boolean) => void;
}

// GraphQL Mutation for creating notification
const CREATE_NOTIFICATION = `
mutation CreateNotifications($input: [NotificationCreateInput!]!) {
    createNotifications(input: $input) {
      notifications {
        title
      }
    }
  }
  `

//component
function NotificationModal({ isOpen, setIsOpen, setNewNotification }: INotificationModal) {




    //states
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [uploading, setUploading] = useState(false);
    // const [selectedOption, setSelectedOption] = useState('GENAREL');

    // hooks
    const client = useGqlClient()
    const { uploadFile } = HandleFileUpload()
    const { user } = AuthConfig()


    // GraphQL Mutations for creating notification
    const [createNotification, state, resetFn] = useMutation(CREATE_NOTIFICATION, { client })

    // Options for select
    const options = [
        "GENERAL",
        "CLIENT",
        "VENDOR"
    ];



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
        event.preventDefault();
        const title = event.target.title.value;
        const description = event.target.description.value;
        const image = event.target.image.files[0];
        let imageUrl

        if (image) {
            setUploading(true)
            imageUrl = await handleImageUpload(image);
            setUploading(false)
        } else {
            imageUrl = ""
        }

        const date = new Date();
        let isoDate = date.toISOString();

        const { data } = await createNotification({
            variables: {
                input: [
                    {
                        title: title,
                        description: description,
                        notificationFor: "GENERAL",
                        image: imageUrl,
                        createdAt: isoDate,
                    }
                ]
            }
        })

        if (data) {
            toast.success('Notification Created Successfully')
            setNewNotification(true)
            createLog(
                `Notification`,
                `Notification Send by ${user?.email}`
            )
        }
        closeModal();
    }


    //handle image upload to firebase
    async function handleImageUpload(file: any) {
        const res = await uploadFile(file, `notification-${uuidv4()}`, "notification_images");
        return res;
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
                    <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0" style={{backgroundColor:'#f9fafb'}}>
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
                                <p className="focus:outline-none pt-4 pb-8 text-base text-center sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-white-800">Notifications</p>
                                <form onSubmit={handleSubmit} className=''>
                                    <div className="mb-5">
                                        <label htmlFor="title" className="block  text-white-700 text-sm mb-1">
                                            Title
                                        </label>
                                        <input
                                            id="title"
                                            name="title"
                                            type="text"
                                            className="mt-1 px-4 py-2 border border-gray-200 rounded-md w-full"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                        />
                                    </div>
                                    {/* <div className="mb-5">
                                        <label className="block  text-white-700 text-sm mb-1">
                                            Notification Type
                                        </label>
                                        <div className="relative inline-flex w-full">
                                            <select
                                                name='notificationFor'
                                                value={selectedOption}
                                                onChange={handleSelect}
                                                className="mt-1 px-4 py-2 border border-gray-200 rounded-md w-full"
                                            >
                                                <option value="" disabled>Select an option</option>
                                                {options.map((option) => (
                                                    <option key={option} value={option}>
                                                        {option}
                                                    </option>
                                                ))}
                                            </select>

                                        </div>
                                    </div> */}

                                    <div className="mb-5">
                                        <div>
                                            <label htmlFor="image" className="block  text-white-700 text-sm mb-1">Image</label>

                                            <input type="file" name='image' className="mt-1 px-4 py-2 border border-gray-200 rounded-md w-full" accept="image/*" />
                                        </div>
                                    </div>
                                    <div className="mb-5">
                                        <label htmlFor="description" className="block  text-white-700 text-sm mb-1">
                                            Description
                                        </label>
                                        <textarea
                                            id="description"
                                            name="description"
                                            rows={7}
                                            className="mt-1 px-4 py-2 border border-gray-200 rounded-md w-full"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </div>


                                    {/* <div className="mb-5">
                                        <label htmlFor="image" className="block  text-white-700 text-sm mb-1">
                                            Image Upload
                                        </label>
                                        <input
                                            id="image"
                                            name="image"
                                            type="file"
                                            className="mt-1"
                                            onChange={handleImageUpload}
                                        />
                                    </div> */}

                                    <div className="mt-10">
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-primary text-white hover:bg-blue-600"
                                        >
                                            {state?.loading ? 'Sending...' : 'Send'}
                                        </button>
                                        <button
                                            type="button"
                                            className="ml-2 px-4 py-2 text-white-500  hover:bg-gray-200"
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
        </div>
    );
}

export default NotificationModal;
