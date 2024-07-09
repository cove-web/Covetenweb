
'use client'


import AuthConfig from '@/firebase/oauth.config';
// Import required modules and components
import { useGqlClient } from '@/hooks/UseGqlClient';
import getNotifications from '@/shared/graphQl/queries/getNotifications';
import { useQuery } from 'graphql-hooks';
import React, { useEffect, useState } from 'react';

interface Props {
    setSlideOverOpen: (value: boolean) => void;
}



//component
const CheckPushNotification = () => {

    const [data, setData] = useState<any>([])
    const { user, authLoading } = AuthConfig()


    useEffect(() => {
        getClinetNotification()
    }, [authLoading, user?.email, authLoading]) //eslint-disable-line


    // Access Electron APIs and custom functions exposed by the preload script
    // const electron = (window as any).electron;
    const ipcRenderer = (window as any).ipcRenderer;
    const localDataStorage = (window as any).localDataStorage;






    const getClinetNotification = async () => {
        const variables = {
            "where": {
                "notificationFor_IN": ["GENERAL"],
                "createdAt_GTE": fiveDaysAgo(),
                "isViewed": false,
                "OR": [
                    {
                        "notificationFor": "CLIENT",
                        "clientHas": {
                            "userIs": {
                                "email": user?.email || 'no email'
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
        };

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
        if (!localDataStorage) return;
        const previousData = localDataStorage.getSavedData('viewedNotification');

        const data = {
            key: 'viewedNotification',
            value: previousData ? [...previousData, id] : [id],
        };

        if (ipcRenderer) {
            ipcRenderer.send('save:data', data);
        }
    };

    useEffect(() => {
        if (!localDataStorage) return;
        // Retrieve viewed notification IDs from local storage
        const viewedNotification = localDataStorage.getSavedData('viewedNotification');
        if (data?.length) {
            data?.forEach((item: any) => {
                if (viewedNotification?.includes(item?.id)) {
                    return;
                }

                handleNotify(item?.title, item?.description, item?.image);
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




    //render

    return (
        <div>

        </div>
    );
};

export default CheckPushNotification;