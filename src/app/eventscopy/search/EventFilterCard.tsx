import Image from "next/image";
import Link from "next/link";
import React from "react";

interface EventFilterCardProps {
  data: any;
}

const EventFilterCard: React.FC<EventFilterCardProps> = ({ data }) => {
  return (
    <>
      {/* <h6 style={{color:'white'}}>Category - {data?.category}</h6> */}
      <div className=" bg-transprent border h-full w-full border-gray-300 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700  relative">
        <div>
        
          <div className="relative mx-3 mt-3 flex  h-60 overflow-hidden rounded group">
            <img
              className="peer absolute top-0 right-0  h-60 w-full  rounded overflow-hidden transition-all duration-500 group-hover:scale-125"
              src={data?.image || "/assets/no_image.png"}
              alt="product image"
            />

            <svg
              className="pointer-events-none absolute inset-x-0 bottom-5 mx-auto text-3xl text-white  transition-opacity group-hover:animate-ping group-hover:opacity-30 peer-hover:opacity-0"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="img"
              width="1em"
              height="1em"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 32 32"
            >
              <path
                fill="currentColor"
                d="M2 10a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v10a4 4 0 0 1-2.328 3.635a2.996 2.996 0 0 0-.55-.756l-8-8A3 3 0 0 0 14 17v7H6a4 4 0 0 1-4-4V10Zm14 19a1 1 0 0 0 1.8.6l2.7-3.6H25a1 1 0 0 0 .707-1.707l-8-8A1 1 0 0 0 16 17v12Z"
              />
            </svg>
          </div>
          {/* <img className="rounded-t-lg h-56 w-full object-cover" src={data?.image || '/assets/no_image.png'} alt="" /> */}
        </div>
        <div className="p-5 mb-9">
          <p>
            <h5 className="mb-2 text-lg font-semibold uppercase tracking-tight text-white-900 dark:text-white" style={{color:'white'}}>
              {data?.name}
            </h5>
          </p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400" style={{color:'white'}}>{data?.description.slice(0, 70)}</p>
          <Link
            href={`/events/details/${data?.slug}`}
            className="absolute bottom-4 "
          >
            <button
              className="relative group inline-block flex-shrink-0  py-2.5 px-5 text-sm font-semibold text-orange-50  overflow-hidden"
              type="submit"
            >
              <div className="absolute top-0 right-full w-full h-full bg-gray-900 transform group-hover:translate-x-full group-hover:scale-102 transition duration-500"></div>
              <div className="relative flex items-center justify-center">
                <span className="">Read more</span>
                <svg
                  className="w-3.5 h-3.5 ml-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    strokeLinejoin="round"
                    stroke-width="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </div>
            </button>
          </Link>

          {/* <Link href={`/events/details/${data?.slug}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-primary absolute bottom-4">
                        Read more
                        <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" strokeLinejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </Link> */}
        </div>
      </div>
      
    </>
  );
};

export default EventFilterCard;
