'use client';
import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { FaArrowRight } from 'react-icons/fa';

interface IServiceCard {
    title: string;
}

const Eads = ({ title }: IServiceCard) => {
    const [adetails, setAdetails] = useState<any>(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const res = await fetch('http://localhost:25000/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        query: `query AboutPages {
                            aboutPages {
                              id
                              title
                              image
                              description
                              count
                              ctext
                              hoadsimg
                              hadstitle
                              hadsdesc
                              btadstitle
                              btadsdesc
                              productsastitle
                              hoadsimgt
                              hadstitlet
                              hadsdesct
                              hoadsimgth
                              hadstitleth
                              hadsdescth
                              hoadsimgf
                              hadstitlef
                              hadsdescf
                              hoadsimgfi
                              hadstitlefi 
                              hadsdescfi 
                            }
                          }`,
                    }),
                    next: { revalidate: 10 }
                });

                const { data } = await res.json();
                if (data.aboutPages.length > 0) {
                    setAdetails(data.aboutPages[0]);
                }
            } catch (error) {
                console.error('Error fetching details:', error);
            }
        };

        fetchDetails();
    }, []);

    const slides = [
        {
            title: adetails?.title,
            image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiemnIKcQNgpCAr8FkQ98KqWewgvX4yCO5AbE77FbQxCCjtcKfUAMsQPpnvDxfPuyQxvyl9vz6qMUIsPRxb1E3ybA6djfLevmsl3VHnaMFfuhtI4ieNlZUv7rn2DqzMouR6q_Rra0pwEm0Etkno3qTiQU6BxOfNnreoj_r4UUg4eRbj9dwRWTGCA4tN/w640-h80/How%20to%20Explain%20Banner%20Ads%20to%20Anyone-5.webp'
        },
        {
            title: adetails?.title,
            image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiemnIKcQNgpCAr8FkQ98KqWewgvX4yCO5AbE77FbQxCCjtcKfUAMsQPpnvDxfPuyQxvyl9vz6qMUIsPRxb1E3ybA6djfLevmsl3VHnaMFfuhtI4ieNlZUv7rn2DqzMouR6q_Rra0pwEm0Etkno3qTiQU6BxOfNnreoj_r4UUg4eRbj9dwRWTGCA4tN/w640-h80/How%20to%20Explain%20Banner%20Ads%20to%20Anyone-5.webp'
        }
    ];

    return (
        <div className="w-full mt-6 lg:mt-0 overflow-hidden p-2">
            <div className="relative">
                <Swiper
                    modules={[Pagination, A11y, Autoplay]}
                    spaceBetween={10}
                    loop={true}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                >
                    {slides.map((slide, index) => (
                        <SwiperSlide key={index}>
                            <div className="sticky_bottom">
                                <div className="ads_sticky_bottom">
                                    {slide.title}
                                    <a href="#">
                                        <img
                                            data-original-height="129"
                                            data-original-width="1024"
                                            height="80"
                                            src={slide.image}
                                            width="640"
                                            alt={slide.title}
                                        />
                                    </a>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div>
                <p className="font-medium">{title}</p>
            </div>
            <div>
                <button
                    className="px-3 py-1 text-sm font-medium text-primary flex items-center space-x-1 rounded-md hover:bg-blue-50 transition duration-300"
                >
                    <span>More</span>
                    <FaArrowRight size={16} />
                </button>
            </div>
        </div>
    );
};

export default Eads;
