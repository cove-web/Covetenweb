'use client';

import React, { useEffect, useState } from 'react';
import EventFilterCard from './EventFilterCard';
import SideBarFilter from './SideBarFilter';
import { useGqlClient } from '@/hooks/UseGqlClient';
import { useManualQuery, useQuery } from 'graphql-hooks';
import Loading from '@/app/loading';
import Pagination from '@/components/Pagination';
// import AdCard from '@/components/AdCard';

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

    return (
        <>
            <div className="max-w-screen-2xl mx-auto mt-0 lg:px-3">
            </div>
            
            <div className="bg-gray-800 min-h-screen">
                <div className="max-w-screen-xl mx-auto px-4 pt-8 pb-4">
                    <h2 className="border-b-2 border-yellow-600 mb-4"><span className="bg-yellow-600 px-2 py-1 text-white uppercase tracking-wide">Trending</span></h2>
                    <div className="flex flex-col flex-wrap md:flex-row md:-mx-2">
                        <div className="w-full md:w-4/4">
                            {sortedCategories?.map((cat: any) => cat.count > 0 && (
                                <div key={cat.id} className="w-full mb-4">
                                    <h3 className="text-white text-xl font-bold mb-4">{cat.name}</h3>
                                    <div className="flex flex-col flex-wrap md:flex-row md:-mx-2">
                                        {cat.events.map((item: any, i: number) => (
                                            <div key={i} className="w-full md:w-1/2 lg:w-1/4 mb-4 md:mb-0">
                                                <EventFilterCard data={item} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="w-full md:w-1/4 mt-4" style={{position:"absolute",right:'0',marginTop:'45rem'}} >
                            <h3 className="text-white text-xl font-bold mb-4">Advertisements</h3>
                            <div className="space-y-4">
                                {/* {[...Array(4)].map((_, index) => (
                                    <AdCard key={index} />
                                ))} */}
          <div 
        className="bg-white p-4 rounded-lg shadow-md bg-cover bg-center" 
        style={{ backgroundImage: `url(https://www.eventindustrynews.com/wp-content/uploads/2024/06/foeg_download_now_ST.png)` ,height:'400px',widows:'400px'}}
    >
        {/* <h4 className="text-lg font-bold mb-2 text-white">Ad Headline</h4> */}
        {/* <p className="text-sm mb-4 text-white">This is an advertisement.</p> */}
        {/* <button className="bg-yellow-600 text-white px-4 py-2 rounded">Learn More</button> */}
    </div> <div 
        className="bg-white p-4 rounded-lg shadow-md bg-cover bg-center" 
        style={{ backgroundImage: `url(https://www.eventindustrynews.com/wp-content/uploads/2024/06/eco_track_ST.png)` ,height:'400px',widows:'400px' }}
    >
        {/* <h4 className="text-lg font-bold mb-2 text-white">Ad Headline</h4> */}
        {/* <p className="text-sm mb-4 text-white">This is an advertisement.</p> */}
        {/* <button className="bg-yellow-600 text-white px-4 py-2 rounded">Learn More</button> */}
    </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full mt-12 flex items-center justify-center'>
                    {totalEvent > pageLimit && 
                        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />}
                </div>
            </div>
        </>
    );
};

export default Main;
