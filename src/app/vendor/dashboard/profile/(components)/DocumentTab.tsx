import Link from 'next/link';
import React from 'react';
import AttachmentModal from './AttachmentModal';

const DocumentTab = ({ userInfo, setCurrentTab, getUser }: any) => {

    //states
    const [isModalOpen, setIsModalOpen] = React.useState(false)


    return (
        <div className="space-y-4 text-gray-800 mt-2 relative top-10 ">
            <div className="my-2 space-y-1">
                <h2 className="text-xl font-semibold sm:text-2xl">Documents</h2>
            </div>

            <div className='mt-3 grid grid-cols-2 lg:grid-cols-5 gap-2 lg:gap-6'>
                {
                    userInfo?.documents ?
                        userInfo?.documents?.map((item: any, index: number) =>
                            <Link target='_blank' href={item || '#'}
                                key={index}
                                style={{
                                    backgroundImage: `url(${'/assets/file.svg'})`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'center',

                                }}
                                className=' h-28 w-24 text-sm flex items-center justify-center text-gray-800 font-semibold'>
                                document-{index + 1}
                            </Link>

                        )
                        :

                        <p className='mt-3 text-xs col-span-full'>No Document Found</p>
                }


            </div>
            <div className='relative bg-white mb-20'>

                <div className="my-2 space-y-1 ">
                    <h2 className="text-xl font-semibold sm:text-2xl">Attachment</h2>
                </div>

                {/* add attachment button */}

                <div className='absolute top-0 right-0'>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-primary  px-4 py-2 text-sm rounded-md text-white ">
                        Add Attachment
                    </button>
                </div>

                <div className='mt-3 grid grid-cols-2 lg:grid-cols-5 gap-2 lg:gap-6'>
                    {
                        userInfo?.equipmentAttachments ?
                            userInfo?.equipmentAttachments?.map((item: any, index: number) =>
                                <Link target='_blank' href={item || '#'}
                                    key={index}
                                    style={{
                                        backgroundImage: `url(${'/assets/file.svg'})`,
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'center',

                                    }}
                                    className=' h-28 w-24 text-sm flex items-center justify-center text-gray-800 font-semibold'>
                                    document-{index + 1}
                                </Link>

                            )
                            :

                            <p className='mt-3 text-xs col-span-full'>No Document Found</p>
                    }


                </div>
            </div>
            <AttachmentModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} oldData={userInfo?.equipmentAttachments} getUser={getUser} />
        </div>


    );
};

export default DocumentTab;