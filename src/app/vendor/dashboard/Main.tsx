'use client'

import { useGqlClient } from '@/hooks/UseGqlClient';
import { useManualQuery, useQuery } from 'graphql-hooks';
import React, { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import { Notification } from '@/gql/graphql';
import AuthConfig from '@/firebase/oauth.config';
import NotificationCard from '@/components/NotificationCard';
import { FaProjectDiagram, FaTicketAlt, FaSpinner, FaTimesCircle, FaCheckCircle, FaFileInvoice, FaFileAlt, FaUserCircle, FaThumbsUp, FaShare, FaComment } from 'react-icons/fa';

import InfoCards from '@/components/InfoCards';
import NotificationBlock from '@/components/NotificationBlock';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const GET_NOTIFICATIONS = `
query Notifications($where: NotificationWhere, $options: NotificationOptions) {
    notifications(where: $where, options: $options) {
      title
      description
      createdAt
    }
  }
`

const GET_MODULE_TICKET = `
query ModuleTickets($where: ModuleTicketWhere, $options: ModuleTicketOptions) {
    moduleTickets(where: $where, options: $options) {
      id
      ticket
      status
      createdAt
    }
  }
`

const GET_INVOICES = `
query Query($where: InvoiceWhere, $options: InvoiceOptions) {
  invoices(where: $where, options: $options) {
      id
      isQuotation
      amount
  }
}`;


const Main = () => {

    // STATES
    const [activeTab, setActiveTab] = useState('Menu');
    const [totalTickets, setTotalTickets] = React.useState<any>(0);
    const [pendingTickets, setPendingTickets] = React.useState<any>(0);
    const [completedTickets, setCompletedTickets] = React.useState<any>(0);
    const [latestTickets, setLatestTickets] = React.useState<any>('');
    const [rejectionTickets, setRejectionTickets] = React.useState<any>(0);
    const [underReviewTickets, setUnderReviewTickets] = React.useState<any>(0);
    const [invoiceCount, setInvoiceCount] = React.useState<any>(0);
    const [quotationCount, setQuotationCount] = React.useState<any>(0);
    const [totalInvoiceAmount, setTotalInvoiceAmount] = React.useState(0);

    // HOOKS 
    const client = useGqlClient();
    const { user } = AuthConfig();

    // getting data based on user
    useEffect(() => {
        getModuleTicketCount();
        getUnderReviewTicket();
        getPendingTicket();
        getCompletedTicket();
        getLatestTicket();
        getRejectedTicket();
        getInvoicesCount();
        getQuotationCount();
    }, [user?.email]);

    // queries
    const [moduleTicketDataFn, state] = useManualQuery(GET_MODULE_TICKET, { client });
    const [invoiceDataFn] = useManualQuery(GET_INVOICES, { client });
    const [quotationDataFn, quotationState] = useManualQuery(GET_INVOICES, { client });

    const { data: notificationsData, error: notificationError, loading: notificationLoading } = useQuery(GET_NOTIFICATIONS, {
        client,
        revalidateOnMount: 3600,
        revalidateOnReconnect: 3600,
        revalidateOnFocus: false,
        variables: {
            "where": {
                "type_IN": ["VENDOR", "GENERAL"]
            },
            "options": {
                "limit": 100,
                "sort": [
                    {
                        "createdAt": "DESC"
                    }
                ]
            }
        }
    });

    // fetching functions
    const getModuleTicketCount = async () => {
        const { data } = await moduleTicketDataFn({
            variables: {
                "where": {
                    "vendorHas": {
                        "userIs": {
                            "email": user?.email || 'no email'
                        }
                    }
                }
            }
        });

        data.moduleTickets.length && setTotalTickets(data?.moduleTickets?.length);
    };

    const getPendingTicket = async () => {
        const { data } = await moduleTicketDataFn({
            variables: {
                "where": {
                    "status": "PENDING",
                    "vendorHas": {
                        "userIs": {
                            "email": user?.email || 'no email'
                        }
                    }
                }
            }
        });
        data.moduleTickets.length && setPendingTickets(data?.moduleTickets?.length);
    };

    const getUnderReviewTicket = async () => {
        const { data } = await moduleTicketDataFn({
            variables: {
                "where": {
                    "status": "UNDER_REVIEW",
                    "vendorHas": {
                        "userIs": {
                            "email": user?.email || 'no email'
                        }
                    }
                }
            }
        });
        data.moduleTickets.length && setUnderReviewTickets(data?.moduleTickets?.length);
    };

    const getCompletedTicket = async () => {
        const { data } = await moduleTicketDataFn({
            variables: {
                "where": {
                    status: "COMPLETED",
                    "vendorHas": {
                        "userIs": {
                            "email": user?.email || 'no email'
                        }
                    }
                }
            }
        });
        data.moduleTickets.length && setCompletedTickets(data?.moduleTickets?.length);
    };

    const getRejectedTicket = async () => {
        const { data } = await moduleTicketDataFn({
            variables: {
                "where": {
                    status: "REJECTED",
                }
            }
        });
        data.moduleTickets.length && setRejectionTickets(data?.moduleTickets?.length);
    };

    const getLatestTicket = async () => {
        const { data } = await moduleTicketDataFn({
            variables: {
                "where": {
                    "vendorHas": {
                        "userIs": {
                            "email": user?.email || 'no email'
                        }
                    }
                },
                "options": {
                    "sort": [
                        {
                            "createdAt": "DESC"
                        }
                    ],
                    "limit": 6
                }
            }
        });
        data.moduleTickets.length && setLatestTickets(data?.moduleTickets);
    };

    const getInvoicesCount = async () => {
        const { data } = await invoiceDataFn({
            variables: {
                "where": {
                    "vendorHas": {
                        "userIs": {
                            "email": user?.email || 'no email'
                        }
                    }
                }
            }
        });

        if (data.invoices.length) {
            setInvoiceCount(data?.invoices?.length);
            const totalAmount = data.invoices.reduce((acc, invoice) => acc + invoice.amount, 0);
            setTotalInvoiceAmount(totalAmount);
        }
    };

    const getQuotationCount = async () => {
        const { data } = await quotationDataFn({
            variables: {
                "where": {
                    "isQuotation": true,
                    "vendorHas": {
                        "userIs": {
                            "email": user?.email || 'no email'
                        }
                    }
                }
            }
        });
        data.invoices.length && setQuotationCount(data.invoices.length);
        console.log(data);
    };

    // chart data
    const projectData = {
        labels: ['Completed', 'Total'],
        datasets: [
            {
                label: 'Projects',
                data: [completedTickets, totalTickets - completedTickets],
                backgroundColor: ['#36A2EB', '#FF6384'],
                hoverBackgroundColor: ['#36A2EB', '#FF6384'],
            },
        ],
    };

    const invoiceData = {
        labels: ['Quotations', 'Invoices'],
        datasets: [
            {
                label: 'Quotations vs Invoices',
                data: [quotationCount, invoiceCount],
                backgroundColor: ['#FFCE56', '#FF6384'],
                hoverBackgroundColor: ['#FFCE56', '#FF6384'],
            },
        ],
    };

    const getGreeting = () => {
        const currentHour = new Date().getHours();
        if (currentHour < 12) {
            return 'Good Morning';
        } else if (currentHour < 18) {
            return 'Good Afternoon';
        } else {
            return 'Good Evening';
        }
    };

    const renderContent = () => {
        switch (activeTab) {
            case "Menu":
                return (
                    <>
                        <div className="flex justify-between items-start w-full ">
                            {/* Tab Bar */}
                            <nav className="flex-shrink-0 flex justify-around bg-gray-200 dark:bg-darkBgLight text-gray-700 dark:text-white py-2 rounded-xl " style={{ fontSize: '20px', width: '650px' }}>
                                {["Menu", "Task", "Event", "Poll", "More"].map((tab) => (
                                    <button
                                        key={tab}
                                        className={`px-4 py-2 mx-1 rounded ${activeTab === tab ? "bg-gray-400 dark:bg-gray-700" : ""}`}
                                        style={{ fontSize: '10px', textTransform: 'uppercase' }}
                                        onClick={() => setActiveTab(tab)}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </nav>

                            {/* Info Cards */}
                            <section className="flex-grow flex justify-end w-full">
                                <div className="space-y-6">
                                    {/* <InfoCards
                                        title="Total Projects"
                                        value={projectData?.projects?.length || "00"}
                                        icon={<FaProjectDiagram />}
                                        iconColor="royalblue"
                                    /> */}
                                    <InfoCards
                                        title="Tickets Created"
                                        value={`${totalTickets < 10 ? `0${totalTickets}` : totalTickets}` || "00"}
                                        icon={<FaTicketAlt />}
                                        iconColor="limegreen"
                                    />
                                    <InfoCards
                                        title="On Going"
                                        value={`${pendingTickets < 10 ? `0${pendingTickets}` : pendingTickets}` || "00"}
                                        icon={<FaSpinner />}
                                        iconColor="teal"
                                    />
                                    <InfoCards
                                        title="Rejected Tickets"
                                        value={`${rejectionTickets < 10 ? `0${rejectionTickets}` : rejectionTickets}` || "00"}
                                        icon={<FaTimesCircle />}
                                        iconColor="orange"
                                    />
                                    <InfoCards
                                        title="Completed"
                                        value={`${completedTickets < 10 ? `0${completedTickets}` : completedTickets}` || "00"}
                                        icon={<FaCheckCircle />}
                                        iconColor="green"
                                    />
                                    <InfoCards
                                        title="Invoices"
                                        value={`${invoiceCount < 10 ? `0${invoiceCount}` : invoiceCount}` || "00"}
                                        icon={<FaFileInvoice />}
                                        iconColor="purple"
                                    />
                                    <InfoCards
                                        title="Quotation"
                                        value={`${quotationCount < 10 ? `0${quotationCount}` : quotationCount}` || "00"}
                                        icon={<FaFileAlt />}
                                        iconColor="red"
                                    />
                                </div>
                            </section>
                        </div>
                        <h1 style={{ color: 'white' }}>Feed</h1>
                        <div className="banner flex items-center justify-between p-4 rounded-lg mb-16" style={{ backgroundColor: 'rgba(232, 232, 232, 0.5)', position: 'absolute', top: '10rem', width: '650px' }}>

                            <div className="flex items-center space-x-4">
                                <FaUserCircle size={40} />
                                <div>
                                    <h2 className="text-xl font-bold">{getGreeting()}, Welcome to Coveten</h2>
                                    <p className="text-sm">Like, Share, and Comment</p>
                                </div>
                            </div>
                        </div>

                        <section className="grid lg:grid-cols-2 gap-6 w-full my-8 rounded">
                            <div className="bg-white rounded shadow pb-6 dark:bg-darkBgLight dark:text-white overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch" style={{ backgroundColor: 'rgba(232, 232, 232, 0.5)' }}>
                                <p className="focus:outline-none px-5 pt-5 text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-700">
                                    Notifications
                                </p>
                                <NotificationBlock data={notificationsData?.notifications} />
                            </div>
                            <div className="bg-white rounded shadow dark:bg-darkBgLight dark:text-white" style={{ backgroundColor: 'rgba(232, 232, 232, 0.5)' }}>
                                <p className="focus:outline-none px-5 pb-3 pt-5 text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-700">
                                    Latest Tickets
                                </p>
                                <div className="space-y-3 mt-3">
                                    {latestTickets &&
                                        latestTickets?.map((item: any, i: number) => (
                                            <div
                                                key={i}
                                                className="w-full flex items-center justify-between px-3 py-2 border-b"
                                            >
                                                <div className="flex items-center space-x-3">
                                                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                                                    <div className="text-sm">
                                                        <p className="text-desktopText text-xs xl:text-base">
                                                            {item?.ticket}
                                                        </p>
                                                        <p className="text-desktopTextLight text-[10px] xl:text-sm">
                                                            {item?.createdAt?.slice(0, 10)}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-center space-x-3">
                                                    <button className="bg-primary/10 text-primary text-[10px] xl:text-sm px-4 py-1 rounded-2xl">
                                                        {item?.status}
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </section>
                    </>
                );
            case "Task":
                return <div>Task Content</div>;
            case "Event":
                return <div>Event Content</div>;
            case "Poll":
                return <div>Poll Content</div>;
            case "More":
                return <div>More Content</div>;
            default:
                return null;
        }
    };

    return (
        <>
            {/* Render Content Based on Active Tab */}
            {renderContent()}
        </>
    );
};

export default Main;
