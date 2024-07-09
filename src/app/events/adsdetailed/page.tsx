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
         <main style={{background:'black'}}>
  <header className="navbar-header">
    <div className="container">
      <div className="navbar-header_content">
        <div className="navbar-logo">
          {/* <img src="https://img.freepik.com/free-vector/hand-drawn-flat-design-anarchy-symbol_23-2149242490.jpg?t=st=1716019253~exp=1716022853~hmac=a34584f061fa5811c156693b5da29f60e7ff1d57ec270684ebeb34308f33b722&w=900" alt="logo"/> */}
        </div>
        <nav className="navbar-header_navigation">
          <ul className="navbar-links">
            <li className="navbar-link-item">
              <a href="#" className="navbar-link">Home</a>
            </li>
            <li className="navbar-link-item">
              <a href="#" className="navbar-link">About</a>
            </li>
            <li className="navbar-link-item">
              <a href="#" className="navbar-link">Showcase</a>
            </li>
            <li className="navbar-link-item">
              <a href="#" className="navbar-link">Premium</a>
            </li>
            <button className="btn btn-primary">Join Our Program</button>
          </ul>
        </nav>
      </div>
    </div>
  </header>
  <section className="hero-section">
    <div className="container">
      <h2 className="hero-section_title">Why should you try <q><span className="quoted-text">Albo Strategies</span></q> to leveling up your startup?</h2>
      <div className="hero-section_cards">
        <div className="hero-section_card card-1">
          <div className="hero-section_card_content">
            <h2 className="hero-section_card_title">Expert Guidance</h2>
            <p className="hero-section_card_description">Benefit from industry expertise to navigate the complexities of startup growth effectively</p>
          </div>
        </div>
        <div className="hero-section_card card-2">
          <div className="hero-section_card_content">
            <h2 className="hero-section_card_title">Personalized Solutions</h2>
            <p className="hero-section_card_description">Receive individualized attention and customized solutions designed to address your unique goses in your Startup</p>
          </div>
        </div>
        <div className="hero-section_card card-3">
          <div className="hero-section_card_content">
            <h2 className="hero-section_card_title">Vibrant Community</h2>
            <p className="hero-section_card_description">Connect with like-minded entrepreneurs, industry leaders, and potential investors to exchange ideas and explore new opportunities.</p>
          </div>
        </div>
        <div className="hero-section_card card-4">
         <div className="hero-section_card_content">
           <h2 className="hero-section_card_title">Being Always At The Top</h2>
           <p className="hero-section_card_description">Unlock the full potential of your startup with Albo's comprehensive support, personalized solutions, and vibrant community</p>
         </div>
        </div>
      </div>
    </div>
  </section>
  
</main>
        </>
    );
};

export default Main;
