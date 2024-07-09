
'use client'

import Loading from '@/app/loading';
import AuthConfig from '@/firebase/oauth.config';
import { getEmployerEmail } from '@/shared/getEmployerEmail';
// Import required modules and components
import getNotifications from '@/shared/graphQl/queries/getNotifications';
import React, { useEffect, useState } from 'react';

interface Props {
    setSlideOverOpen: (value: boolean) => void;
}



//component
const CheckNotification = ({ setNewNotificationCount }: any) => {

    const [data, setData] = useState<any>([])
    const [labEmail, setLabEmail] = useState('')

    const { user, authLoading } = AuthConfig()


    useEffect(() => {
        getClinetNotification()
        getLabEmail()
    }, [labEmail, , authLoading])


    const getClinetNotification = async () => {
        const variables = {

            "where": {
                "notificationFor_IN": ["VENDOR", "GENERAL"],
                "createdAt_GTE": fiveDaysAgo(),
                "isViewed": false,
                "OR": [
                    {
                        "notificationFor": "VENDOR",
                        "vendorHas": {
                            "userIs": {
                                "email": labEmail || 'no email'
                            }
                        }
                    },
                    {
                        "notificationFor": "GENERAL",
                    },
                ]

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



    // getting lab email if employee is logged in
    const getLabEmail = async () => {
        if (user?.email) {
            const email = await getEmployerEmail(user?.email)
            setLabEmail(email)
        }


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

        // localStorage.setItem(data.key, JSON.stringify(data.value));

    };

    useEffect(() => {
        // Retrieve viewed notification IDs from local storage
        const viewedNotification = localStorage.getItem("ViewedNotificationIds");
        if (data?.length) {
            setNewNotificationCount(data?.length)
            data?.forEach((item: any) => {
                if (viewedNotification?.includes(item?.id)) {
                    return;
                } else {
                    // handleNotify(item?.title, item?.description, item?.image);
                    handleNotificationView(item?.id);
                }

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