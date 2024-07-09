
'use client'
import React, { useEffect, useState } from 'react';
import Loading from '@/app/loading';
import AuthConfig from '@/firebase/oauth.config';
import getNotifications from '@/shared/graphQl/queries/getNotifications';

interface Props {
    setNewNotificationCount: (count: number) => void;
}

const CheckNotification = ({ setNewNotificationCount }: Props) => {
    const [data, setData] = useState<any[]>([]);
    const { user, authLoading } = AuthConfig();

    useEffect(() => {
        if (!authLoading && user?.email) {
            getClinetNotification();
        }
    }, [authLoading, user?.email]);

    const getClinetNotification = async () => {
        const variables = {
            "where": {
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
                limit: 8,
                "sort": [
                    {
                        "createdAt": "DESC"
                    }
                ]
            }
        };

        const fetchedData = await getNotifications(variables);
        setData(fetchedData);
    };

    const handleNotify = (title: string, description: string, image: string) => {
        Notification.requestPermission().then((result) => {
            new Notification(title, {
                body: description,
                icon: image,
            });
        });
    };

    const handleNotificationView = (id: string) => {
        const previousData = localStorage.getItem("ViewedNotificationIds");
        const data = {
            key: 'ViewedNotificationIds',
            value: previousData ? JSON.parse(previousData).concat(id) : [id],
        };
        // localStorage.setItem(data.key, JSON.stringify(data.value));
    };

    useEffect(() => {
        const viewedNotification = localStorage.getItem("ViewedNotificationIds");
        if (data?.length) {
            setNewNotificationCount(data?.length);
            data?.forEach((item: any) => {
                if (!viewedNotification || !viewedNotification.includes(item?.id)) {
                    // handleNotify(item?.title, item?.description, item?.image);
                    handleNotificationView(item?.id);
                }
            });
        }
    }, [data?.length]);

    function fiveDaysAgo() {
        const currentDate = new Date();
        const tenDaysAgo = new Date(currentDate);
        tenDaysAgo.setDate(currentDate.getDate() - 5);
        return tenDaysAgo.toISOString();
    }

    if (authLoading) return <Loading />;

    // You can add your JSX content here to render notifications or other UI elements based on the fetched data.

    return (
        <div>
            {/* Add your content here */}
        </div>
    );
};

export default CheckNotification;
