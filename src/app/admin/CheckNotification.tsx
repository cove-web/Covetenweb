
'use client'

import Loading from '@/app/loading';
import AuthConfig from '@/firebase/oauth.config';
import getNotifications from '@/shared/graphQl/queries/getNotifications';
import React, { useEffect, useState } from 'react';

interface Props {
    setSlideOverOpen: (value: boolean) => void;
}



//component
const CheckNotification = ({ setNewNotificationCount }: any) => {

    const [data, setData] = useState<any>([])
    const { user, authLoading } = AuthConfig()


    useEffect(() => {
        getClinetNotification()
    }, [authLoading, user?.email, authLoading]) //eslint-disable-line


    const getClinetNotification = async () => {
        const variables = {

            "where": {
                "notificationFor_IN": ["ADMIN"],
                "createdAt_GTE": fiveDaysAgo(),
                "isViewed": false,
            },
            "options": {
                limit: 3,
                "sort": [
                    {
                        "createdAt": "DESC"
                    }
                ]
            }
        }

        const data = await getNotifications(variables)
        setData(data)
    }




    // Handle displaying a notification
    const handleNotify = (title: string, description: string, image: string) => {
        Notification.requestPermission().then((result) => {
            new Notification(title, {
                body: description,
                icon: image,
            });
        });
    };

    // Handle saving notification ID in local storage
    const handleNotificationView = (id: string) => {

        const previousData = localStorage.getItem("ViewedNotificationIds");

        const data = {
            key: 'ViewedNotificationIds',
            value: previousData ? [...previousData, id] : [id],
        };
        if (previousData) {
            localStorage.removeItem(data.key)
        }

        // localStorage.setItem(data.key, JSON.stringify(""));

    };

    useEffect(() => {
        // Retrieve viewed notification IDs from local storage
        const viewedNotification = localStorage.getItem("ViewedNotificationIds");
        if (data?.length) {
            setNewNotificationCount(data?.length)
            data?.forEach((item: any) => {
                if (viewedNotification?.includes(item?.id)) {
                    return;
                }

                // handleNotify(item?.title, item?.description, item?.image);
                handleNotificationView(item?.id);

            });
        }
    }, [data?.length]); //eslint-disable-line



    // Calculate the date that is five days before the current date

    function fiveDaysAgo() {
        const currentDate = new Date();
        const tenDaysAgo = new Date(currentDate);
        tenDaysAgo.setDate(currentDate.getDate() - 5);
        return tenDaysAgo.toISOString();
    }


    if (authLoading) return <Loading />


    //render

    return (
        <div>

        </div>
    );
};

export default CheckNotification;