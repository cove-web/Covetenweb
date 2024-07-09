'use client'

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
// style={{ background: "linear-gradient(152.92deg, rgba(192, 132, 252, 0.2) 4.54%, rgba(232, 121, 249, 0.26) 34.2%, rgba(192, 132, 252, 0.1) 77.55%)" }}
const AboutUs = ({ data }: any) => {

    return (
        <>
        {/* <div className="relative w-full h-96">
                <img
                    src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Background Image"
                    fill
                    style={{ objectFit: 'cover' }}
                    quality={100}
                />
            </div> */}
        <section className='pt-12'>
            
            
            <div className="views-element-container block block-views block-views-blocknewsroom-block-2" id="block-views-block-newsroom-block-2">


                <div><div className="cross-news container view view-newsroom view-id-newsroom view-display-id-block_2 js-view-dom-id-d199a345f813cb4e0fe138fcb0e537bfc26ad9fbb93e587cb43c3f0c7cee165a">


                    <div className="view-header">
                        <p className="cross-news--title">
                            <strong>Discover Everything </strong>
                            You Need
                        </p>
                        <Link href="/events/search" className="link-std">See all news</Link>

                    </div>

                    <div className="view-content">
                    <div>
                        <ul className="cross-news--list">
                            {
                                data?.hasPoints?.map((item: any) => (
                                    <li key={item.id}>
                                        <article className="node-wrapper">
                                            <div>
                                                <div className="teaser-light">
                                                    <p className="teaser-light--tag">
                                                        <a href={item.url}>{item.title}</a>
                                                    </p>
                                                    <a href={item.url} className="field-group-link teaser-light--content" hreflang="en">
                                                        <div className="teaser-light--text">
                                                            <p className="teaser-light--title">
                                                                {item.description}
                                                            </p>
                                                            <p className="teaser-light--date">
                                                                {item.date}
                                                            </p>
                                                        </div>
                                                        <div className="teaser-light--action">
                                                            <span className="link-std">
                                                                Read More
                                                            </span>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                        </article>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>

                    </div>

                </div>
                </div>

            </div>
        </section>
        </>
    );
};

export default AboutUs;