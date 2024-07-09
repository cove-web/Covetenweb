'use client';

import React, { useEffect, useState } from 'react';
// import EventFilterCard from './EventFilterCard';
// import SideBarFilter from './SideBarFilter';
import { useGqlClient } from '@/hooks/UseGqlClient';
import { useManualQuery, useQuery } from 'graphql-hooks';
import Loading from '@/app/loading';
import Pagination from '@/components/Pagination';
// import AdCard from '@/components/AdCard';
import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const GET_EVENT = `
query Events($where: EventWhere, $options: EventOptions) {
    events(where: $where, options: $options) {
      id
      name
      slug
      description
      location
      image
      endAt
      startAt
      category
      registrationUrl
    }
  }
`;

const GET_CATEGORY = `
query Categories($where: CategoryWhere) {
    categories(where: $where) {
      name
      id
    }
  }
`;

const Main = () => {
    // states
    const [isOpen, setIsOpen] = useState(false);
    const [searchFilter, setSearchFilter] = useState({
        type: '',
        value: '',
    });
    const [eventData, setEventData] = useState<any>(null);
    // pagination states
    const [pageLimit, setPageLimit] = useState(8);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalEvent, setTotalEvent] = useState(0);

    // HOOKS
    const client = useGqlClient();

    // QUERY
    const [getEventDataFn, state] = useManualQuery(GET_EVENT, { client });
    const { data: category, loading: catLoading } = useQuery(GET_CATEGORY, {
        client,
        variables: {
            where: {
                type: 'EVENT',
            },
        },
    });

    useEffect(() => {
        let where = {};
        if (searchFilter.type === 'Date' && searchFilter.value === 'Today') {
            where = {
                startAt: new Date().toISOString(),
            };
        } else if (searchFilter.type === 'Date' && searchFilter.value === 'This Week') {
            where = {
                startAt_LTE: getLastDateOfCurrentWeek(),
            };
        } else if (searchFilter.type === 'Date' && searchFilter.value === 'This Month') {
            where = {
                startAt_LTE: getLastDateOfCurrentMonth(),
            };
        } else if (searchFilter.type === 'Category') {
            where = {
                category_CONTAINS: searchFilter.value,
            };
        } else {
            where = {};
        }
        getEvents(where);
    }, [searchFilter.value, searchFilter.type]);

    useEffect(() => {
        getEvents();
        getItemsCount();
    }, [currentPage]);

    // get events data
    const getEvents = async (where: any = { IsApproved: true }) => {
        const { data } = await getEventDataFn({
            variables: {
                where: where,
                options: {
                    limit: pageLimit,
                    offset: (currentPage - 1) * pageLimit,
                    sort: [
                        {
                            startAt: 'ASC',
                        },
                    ],
                },
            },
        });

        if (data?.events) {
            setEventData(data);
        }
    };

    // get event count
    const getItemsCount = async () => {
        const { data } = await getEventDataFn();

        if (data?.events?.length > 0) {
            setTotalEvent(data?.events?.length);
            setTotalPages(Math.ceil(data?.events?.length / pageLimit));
        }
    };

    function getLastDateOfCurrentMonth() {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;
        const lastDate = new Date(year, month, 0);
        const isoLastDate = lastDate.toISOString().split('T')[0];
        return isoLastDate;
    }

    function getLastDateOfCurrentWeek() {
        const currentDate = new Date();
        const currentDayOfWeek = currentDate.getDay();
        const lastDate = new Date(currentDate);
        const daysUntilEndOfWeek = 6 - currentDayOfWeek;
        lastDate.setDate(currentDate.getDate() + daysUntilEndOfWeek);
        const isoLastDate = lastDate.toISOString().split('T')[0];
        return isoLastDate;
    }

    useEffect(() => { console.log('') }, [eventData?.events?.length]);

    if (state.loading) return <Loading />;

    const sortedCategories = category?.categories?.map((cat: any) => {
        const filteredEvents = eventData?.events?.filter((event: any) => event.category === cat.name);
        return {
            ...cat,
            events: filteredEvents,
            count: filteredEvents?.length || 0,
        };
    }).sort((a: any, b: any) => b.count - a.count);
    const cards = [
        { id: 1, text: 'Card 1', image: 'https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { id: 2, text: 'Card 2', image: 'https://images.unsplash.com/photo-1566378246598-5b11a0d486cc?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { id: 3, text: 'Card 3', image: 'https://www.eventindustrynews.com/wp-content/uploads/2024/07/Sustainability-chops-%E2%80%93-how-green-is-festival-thinking-1-265x198.png' },
        { id: 4, text: 'Card 4', image: 'https://www.eventindustrynews.com/wp-content/uploads/2024/05/Ticketbud-image-2-356x220.png' },
        { id: 5, text: 'Card 5', image: 'https://www.eventindustrynews.com/wp-content/uploads/2024/07/mci-group-publishes-2023-company-report-A-testament-to-sustainability-and-diversity-265x198.png' },
        { id: 6, text: 'Card 6', image: 'https://www.eventindustrynews.com/wp-content/uploads/2024/07/Events-Water-licenced-2-Water-Direct-265x198.jpg' },
        { id: 7, text: 'Card 7', image: 'https://www.eventindustrynews.com/wp-content/uploads/2024/06/Royal-Armouries-Museum-Leeds-adjusted-265x198.jpg' }
    ];
    return (
        <>
            {/* <div className="eventscard-grid">
                {cards.slice(0, 3).map(card => (
                    <div key={card.id} className="eventscard" style={{ backgroundImage: `url(${card.image})` }}>
                        <div className="eventscard-text">{card.text}</div>
                    </div>
                ))}
                {cards.slice(3).map(card => (
                    <div key={card.id} className="eventscard" style={{ backgroundImage: `url(${card.image})` }}>
                        <div className="eventscard-text">{card.text}</div>
                    </div>
                ))}
            </div> */}
            <div >
                <div >
                    <div style={{marginLeft:'3rem',marginTop:'3rem'}}>
                        <h2 style={{fontSize:'3rem'}}>BRAND & AGENCY NEWS</h2>
                        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
        <FaFacebook style={{ color: '#3b5998', fontSize: '2rem' }} />
        <FaTwitter style={{ color: '#1DA1F2', fontSize: '2rem' }} />
        <FaInstagram style={{ color: '#E1306C', fontSize: '2rem' }} />
        <FaLinkedin style={{ color: '#0077B5', fontSize: '2rem' }} />
      </div>
                        {/* <Link href="/fea"> */}
                        <div className="advertisements" style={{position:'absolute',right:'3rem',marginTop:'1rem'}}>
                    <div className="advertisement">
                        <img src="https://www.eventindustrynews.com/wp-content/uploads/2024/04/BMA-House-Banner-Adverts-for-our-Venue-Spotlight-395-x-250.jpg" alt="Advertisement 1" />
                    </div>
                    <div className="advertisement">
                        <img src="https://www.eventindustrynews.com/wp-content/uploads/2024/06/banner-eventscase-eva-EN.gif" alt="Advertisement 2" />
                    </div>
                    <div className="advertisement">
                        <img src="https://www.eventindustrynews.com/wp-content/uploads/2024/07/EIN-Side-Banner-Ad-2024-FLLS-1.gif" alt="Advertisement 2" />
                    </div>
                    <div className="advertisement">
                        <img src="https://www.eventindustrynews.com/wp-content/uploads/2024/06/LiveForce-EventTechNews-395x250-2.jpg" alt="Advertisement 2" />
                    </div>
                    <button  style={{backgroundColor:'black',color:'white'}}>Event Details</button>
                  <h1>Event Start Date: 02/07/2024 </h1>
                  <h1>Event End Date: 07/07/2021</h1>
                  <button>Location : Banglore</button>
                  <button style={{backgroundColor:'black',color:'white'}}>Register</button>
                </div>
                        <div  style={{marginTop:'0.3rem',width:'100%'}}>
                            <img src="https://www.eventindustrynews.com/wp-content/uploads/2024/07/Collective-of-event-suppliers-set-to-Ex-Celerate-the-industry-with-50000-incentive.png" alt="Ex-Celerate" 
                            
                             style={{width:'850px',height:'500px'}} />
                            <div style={{width:'70%'}}>
                                <h3 style={{fontSize:'25px'}}>Collective of event suppliers set to Ex-Celerate the industry with £50,000 incentive</h3>
                                <p style={{color:'red'}}>1st July 2024</p>
                                <p>
                                    A collective of leading event contractors and suppliers has announced the launch of Ex-Celerate, a new £50,000 initiative focused on helping independent organisers launch.
                                    <br>
                                    </br>
                                    RefTech has a decade of experience in supplying events in the USA, so the partnership will ensure their services are more affordable and accessible with seamless onsite project management throughout the country.

Margaret Reeves, managing director of RefTech, emphasised the significance of this partnership: “Event and exhibition organisers can now harness the benefits of our award-winning registration systems for their events across the USA. Our clients are organisers of conferences, exhibitions and corporate events and they can now opt for either self-service or managed support. With the Realise team, they gain access to trusted onsite expertise, ensuring smooth operations akin to their UK events.”
Margaret Reeves, managing director of RefTech, emphasised the significance of this partnership: “Event and exhibition organisers can now harness the benefits of our award-winning registration systems for their events across the USA. Our clients are organisers of conferences, exhibitions and corporate events and they can now opt for either self-service or managed support. With the Realise team, they gain access to trusted onsite expertise, ensuring smooth operations akin to their UK events.”
Margaret Reeves, managing director of RefTech, emphasised the significance of this partnership: “Event and exhibition organisers can now harness the benefits of our award-winning registration systems for their events across the USA. Our clients are organisers of conferences, exhibitions and corporate events and they can now opt for either self-service or managed support. With the Realise team, they gain access to trusted onsite expertise, ensuring smooth operations akin to their UK events.”

                                </p>
                            </div>
                        </div>
                        {/* </Link> */}
                    </div>
                   
                </div>
               
            </div>
        </>
    );
};

export default Main;
