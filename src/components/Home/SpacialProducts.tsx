'use client'
import { Swiper, SwiperSlide } from 'swiper/react';

import Link from "next/link"
import { FaComment } from "react-icons/fa"
import { Navigation, Pagination, Scrollbar, A11y, Autoplay, Grid } from 'swiper/modules';
import AnimatedButton from '../AnimatedButton';
import { LuArrowRight } from 'react-icons/lu';
import { Suspense } from 'react';
import ProductSkeleton from './ProductSkeleton';



export default function SpacialProducts({ products }: { products: any }) {



    return (
        <section className="py-12">
            <div className="max-w-screen-2xl mx-auto px-2 lg:px-12  md:px-8">
                <div className="relative max-w-2xl mx-auto sm:text-center">
                    <div className="relative z-10 ">
                        <h3 className=" text-3xl font-semibold text-center sm:text-4xl mb-3">
                            Our Innovations
                        </h3>

                        <p className="mx-auto max-w-screen-md text-center text-dimText dark:text-darkDimText ">You may find the majority of tests, technologies, processes, techniques, equipment, experts, and many more cutting-edge innovations</p>
                    </div>
                    {/* <div aria-hidden="true" className="absolute inset-0 my-auto max-w-xsh-32 rotate-45 bg-gradient-to-r from-[#00b1fd] to-[#71faca] blur-[90px] opacity-50 dark:opacity-20">
                    </div> */}
                    {/* <div className="absolute inset-0 max-w-xs mx-auto h-96 blur-[100px]" style={{ background: "linear-gradient(152.92deg, rgba(192, 132, 252, 0.2) 4.54%, rgba(232, 121, 249, 0.26) 34.2%, rgba(192, 132, 252, 0.1) 77.55%)" }}></div> */}
                </div>
                <div className="relative mt-12">
                    <Suspense fallback={<ProductSkeleton />}>
                        <ul className="">
                            <Swiper
                                modules={[Navigation, Pagination, A11y, Autoplay]}
                                spaceBetween={10}
                                loop={true}
                                autoplay={{
                                    delay: 3000,
                                    disableOnInteraction: false,
                                    pauseOnMouseEnter: true,
                                }}
                                pagination={{
                                    clickable: true,
                                }}
                                slidesPerView={1}
                                breakpoints={{
                                    640: {
                                        slidesPerView: 2,
                                        spaceBetween: 10,
                                    },
                                    768: {
                                        slidesPerView: 2,
                                        spaceBetween: 10,
                                    },
                                    900: {
                                        slidesPerView: 3,
                                        spaceBetween: 18,
                                    },
                                }}
                            >


                                {
                                    products && products.map((item: any, idx: number) =>
                                        <SwiperSlide key={item} className="pb-10">
                                            <Link href={`/products/details/${item?.id}`}  >
                                                <div style={{
                                                    backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${item?.image})`,
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center',
                                                }} className="productCard">
                                                    <div className="productCard-front">
                                                        <p className="productTitle uppercase">{item?.title}</p>
                                                        {/* <p className="subtitle">{item?.price}</p> */}
                                                    </div>
                                                    <div className="productCard-back">
                                                        <div className="mt-4 px-5 pb-5 w-full h-full grid place-content-center ">

                                                            <h5 className="text-2xl font-bold  uppercase ">{item?.title}</h5>
                                                            <p className="mt-2  mb-5 text-white dark:text-gray-300">
                                                                {item?.shortDescription.slice(0, 180) || 'N/A'}
                                                            </p>

                                                            <Link href={`/products/details/${item?.id}`} className=' w-full text-3xl ' >
                                                                <p className='border w-14 h-14  border-white rounded-full  flex items-center justify-center'>
                                                                    <LuArrowRight />
                                                                </p>

                                                            </Link>

                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </SwiperSlide>
                                    )
                                }
                            </Swiper>

                        </ul>
                    </Suspense>
                </div>
            </div>
        </section>
    )
}