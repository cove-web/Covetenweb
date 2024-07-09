"use client";

import Loading from "@/app/loading";
import { useGqlClient } from "@/hooks/UseGqlClient";
import { useQuery } from "graphql-hooks";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";
import Modal from "../Modal";
import Link from "next/link";
import Content from "../Content";

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
      registrationUrl
    }
  }`;

// Utility function to check if a string is valid JSON
const isValidJson = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

// Component

const EventDetails = () => {
  // states
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  // hooks
  const client = useGqlClient();
  const params = useParams();

  // query
  const {
    data: eventData,
    error,
    loading,
  } = useQuery(GET_EVENT, {
    client,
    variables: {
      where: {
        slug: params.slug,
      },
    },
  });

  if (loading) return <Loading />;

  const event = eventData?.events[0];

  return (
    <div className="max-w-screen-lg mx-auto pb-20">
      <main className="mt-10">
        <div className="mb-4 md:mb-0 w-full mx-auto relative">
          <img
            src={event?.image || "/assets/no_image.png"}
            className="max-h-[450px] w-full "
          />
        </div>
        <div className="px-4 lg:px-0 mt-10">
          <h2 className="text-4xl font-semibold text-gray-800 leading-tight">
            {event?.name}
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row lg:space-x-12">
          <div className="px-4 lg:px-0 mt-12 text-gray-700 text-lg leading-relaxed w-full lg:w-3/4 text-justify">
            {isValidJson(event?.description) ? (
              <Content content={JSON.parse(event?.description)} />
            ) : (
              <p>{event?.description}</p>
            )}
          </div>

          <div className="w-full lg:w-1/4 m-auto mt-2 max-w-screen-sm">
            <div className="col-span-1 lg:col-span-2 p-4">
              <div className="border-b border-gray-300 pb-1 mt-7 flex space-x-3">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="relative group inline-block flex-shrink-0  py-2.5 px-5 text-sm font-semibold text-orange-50 bg-primary  overflow-hidden"
                  type="submit"
                  style={{backgroundColor:'black'}}
                >
                  <div className="absolute top-0 right-full w-full h-full bg-gray-900 transform group-hover:translate-x-full group-hover:scale-102 transition duration-500"></div>
                  <div className="relative flex items-center justify-center">
                    <span className="">Interested</span>
                  </div>
                </button>
                <Link href={event?.registrationUrl || "#"}>
                  <button
                    className="relative group inline-block flex-shrink-0   py-2.5 px-5 text-sm font-semibold text-primary hover:text-white bg-transparent border border-primary  overflow-hidden"
                    type="submit"
                  >
                    <div className="absolute top-0 right-full w-full h-full bg-primary transform group-hover:translate-x-full group-hover:scale-102 transition duration-500"></div>
                    <div className="relative flex items-center justify-center">
                      <span className="">Register</span>
                    </div>
                  </button>
                </Link>
              </div>
              <div className="border-b border-gray-300 pb-1 mt-7">
                <p className="text-primary font-semibold">Start:</p>
                <p className="text-dimText">
                  {event?.startAt?.slice(0, 10) || "Coming Soon"}
                </p>
              </div>
              <div className="border-b border-gray-300 pb-1">
                <p className="text-primary font-semibold">End:</p>
                <p className="text-dimText">
                  {event?.endAt?.slice(0, 10) || "Coming Soon"}
                </p>
              </div>
              <div className="border-b border-gray-300 pb-1">
                <p className="text-primary font-semibold">Location:</p>
                <p className="text-dimText">
                  {event?.location || "Not Available"}
                </p>
              </div>
              <div className="w-full md:w-1/4 mt-4" style={{position:"absolute",right:'0'}} >
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
    </div> 
    {/* <div 
        className="bg-white p-4 rounded-lg shadow-md bg-cover bg-center" 
        style={{ backgroundImage: `url(https://www.eventindustrynews.com/wp-content/uploads/2024/06/eco_track_ST.png)` ,height:'400px',widows:'400px' }}
    > */}
        {/* <h4 className="text-lg font-bold mb-2 text-white">Ad Headline</h4> */}
        {/* <p className="text-sm mb-4 text-white">This is an advertisement.</p> */}
        {/* <button className="bg-yellow-600 text-white px-4 py-2 rounded">Learn More</button> */}
    {/* </div> */}
                            </div>
                        </div>
            </div>
          </div>
        </div>
      </main>

      <Modal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        event={event?.name}
      />
    </div>
  );
};

export default EventDetails;
