'use client'

import { useGqlClient } from '@/hooks/UseGqlClient';
import { useManualQuery, useQuery } from 'graphql-hooks';
import React, { useEffect ,useState} from 'react';
import { FaArrowUp } from 'react-icons/fa';
import { Notification } from '@/gql/graphql';
import { FaProjectDiagram, FaTicketAlt, FaSpinner, FaTimesCircle, FaCheckCircle, FaFileInvoice, FaFileAlt, FaUserCircle, FaThumbsUp, FaShare, FaComment } from 'react-icons/fa';

import NotificationCard from '@/components/NotificationCard';
import NotificationBlock from '../../../components/NotificationBlock';
import InfoCards from '@/components/InfoCards';
import AuthConfig from '@/firebase/oauth.config';
import Loading from '@/app/loading';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const GET_NOTIFICATIONS = `
query Notifications($where: NotificationWhere, $options: NotificationOptions) {
    notifications(where: $where, options: $options) {
      title
      description
      createdAt
    }
  }
`
const GET_PROJECT = `
query Projects($where: ProjectWhere) {
    projects(where: $where) {
      id
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

const GET_USER = `
query Users($where: UserWhere) {
    users(where: $where){
      user_type
    }
  }`
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
    const [totalTickets, setTotalTickets] = React.useState<any>(0)
    const [pendingTickets, setPendingTickets] = React.useState<any>(0)
    const [completedTickets, setCompletedTickets] = React.useState<any>(0)
    const [latestTickets, setLatestTickets] = React.useState<any>('')
    const [invoiceCount, setInvoiceCount] = React.useState<any>(0);
    const [quotationCount, setQuotationCount] = React.useState<any>(0)
    const [totalInvoiceAmount, setTotalInvoiceAmount] = React.useState<any>(0);
    const [activeTab, setActiveTab] = useState<string>("Menu");

    // HOOKS 
    const client = useGqlClient()
    const router = useRouter()
    const { user, authLoading } = AuthConfig();

    // getting data based on user
    useEffect(() => {
        if (user?.email) {
            getUserAndAuthenticate(user?.email)
            getModuleTicketCount()
            getPendingTicket()
            getCompletedTicket()
            getLatestTicket()
            getInvoicesCount()
            getQuotationCount()
        }
    }, [user?.email])

    // queries
    const [getDataFn, { data, loading, error }] = useManualQuery(GET_USER, { client })
    const [invoiceDataFn] = useManualQuery(GET_INVOICES, { client });
    const [quotationDataFn, quotationState] = useManualQuery(GET_INVOICES, { client })
    const [moduleTicketDataFn, state] = useManualQuery(GET_MODULE_TICKET, { client })
    const { data: notificationsData, error: notificationError, loading: notificationLoading } = useQuery(GET_NOTIFICATIONS, {
        client,
        revalidateOnMount: 3600,
        revalidateOnReconnect: 3600,
        revalidateOnFocus: false,
        variables: {
            "where": {
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
                "limit": 3,
                "sort": [
                    {
                        "createdAt": "DESC"
                    }
                ]
            }
        }
    })
    const { data: projectData, error: projectDataError, loading: projectDataLoading } = useQuery(GET_PROJECT, {
        client,
        revalidateOnMount: 3600,
        revalidateOnReconnect: 3600,
        revalidateOnFocus: false,
        variables: {
            "where": {
                "clientOrdered": {
                    "userIs": {
                        "email": user?.email || 'no email'
                    }
                }
            }
        }
    })

    // fetching functions
    const getModuleTicketCount = async () => {
        const { data } = await moduleTicketDataFn({
            variables: {
                "where": {
                    "clientHas": {
                        "userIs": {
                            "email": user?.email || 'no email'
                        }
                    }
                }
            }
        })
        data.moduleTickets.length && setTotalTickets(data?.moduleTickets?.length)
    }
    const getPendingTicket = async () => {
        const { data } = await moduleTicketDataFn({
            variables: {
                "where": {
                    "status_IN": ["PENDING", "ACCEPTED", "UNDER_REVIEW"],
                    "clientHas": {
                        "userIs": {
                            "email": user?.email || 'no email'
                        }
                    }
                }
            }
        })
        data.moduleTickets.length && setPendingTickets(data?.moduleTickets?.length)
    }
    const getCompletedTicket = async () => {
        const { data } = await moduleTicketDataFn({
            variables: {
                "where": {
                    status: "COMPLETED",
                    "clientHas": {
                        "userIs": {
                            "email": user?.email || 'no email'
                        }
                    }
                }
            }
        })
        data.moduleTickets.length && setCompletedTickets(data?.moduleTickets?.length)
    }
    const getLatestTicket = async () => {
        const { data } = await moduleTicketDataFn({
            variables: {
                "where": {
                    "clientHas": {
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
                    "limit": 3
                }
            }
        })
        data.moduleTickets.length && setLatestTickets(data?.moduleTickets)
    }
    const getUserAndAuthenticate = async (email: string) => {
        const { data, error, loading } = await getDataFn({
            variables: {
                where: {
                    email: email || 'no email'
                }
            }
        })

        if (!user?.email && !authLoading) {
            router.push('/auth/login')
            toast.error('You are not authorized to access this page')
        } else {
            if (data?.users[0].user_type !== 'CONSUMER' && !loading) {
                router.push('/auth/login')
                toast.error('You are not authorized to access this page')
            }
        }
    }
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
    }
    if (authLoading || loading) return <Loading />

    const chartData = {
        labels: ['Total Projects', 'Completed Projects'],
        datasets: [
            {
                label: 'Projects',
                data: [projectData?.projects?.length || 0, completedTickets || 0],
                backgroundColor: ['rgba(75, 192, 192, 0.2)'],
                borderColor: ['rgba(75, 192, 192, 1)'],
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
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
    //render
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
                      <InfoCards
                        title="Total Projects"
                        value={projectData?.projects?.length || "00"}
                        icon={<FaProjectDiagram />}
                        iconColor="royalblue"
                      />
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
                      {/* <InfoCards
                        title="Rejected Tickets"
                        value={`${rejectionTickets < 10 ? `0${rejectionTickets}` : rejectionTickets}` || "00"}
                        icon={<FaTimesCircle />}
                        iconColor="orange"
                      /> */}
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
                <h1 style={{color:'white'}}>Feed</h1>
                <div className="banner flex items-center justify-between p-4 rounded-lg mb-16" style={{ backgroundColor: 'rgba(232, 232, 232, 0.5)',position:'absolute',top:'10rem' ,width:'650px'}}>
           
                  <div className="flex items-center space-x-4">
                    <FaUserCircle size={40} />
                    <div>
                    <h2 className="text-xl font-bold">{getGreeting()}, Welcome to Coveten</h2>

                      {/* <h2 className="text-xl font-bold">Welcome to Coveten</h2> */}
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
      )
};

export default Main;
