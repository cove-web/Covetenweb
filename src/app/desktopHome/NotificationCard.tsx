import { Notification } from '@/gql/graphql';
import React from 'react';

const NotificationCard = ({ data }: { data: Notification }) => {
    return (
        <div className='min-h-20 xl:min-h-28 h-full p-2 flex flex-col justify-between border' >
            <h1 className=' text-sm xl:text-lg font-semibold text-desktopPrimary'>{data?.title}</h1>
            <div>
                <div className='flex items-center text-[10px] xl:text-sm justify-between text-desktopText mb-2'>
                    <p>{data.createdAt.slice(0, 10)}</p>
                    <p className='bg-yellow-100 text-yellow-500 font-normal px-2 py-1 rounded-full'>New</p>

                </div>
                <p className='text-[10px] xl:text-sm text-desktopTextLight'>{data?.description}</p>
            </div>

        </div>
    );
};

export default NotificationCard;