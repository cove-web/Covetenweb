'use client';

import React, { useEffect, useRef, useState } from 'react';
// import './Page.css'; // Import your CSS for styling

const Page: React.FC = () => {
  const slides = [
    {
      title: 'Pink Cherrish',
      description: 'to evolve into care',
      backgroundColor: '#fde',
      imageUrl: 'https://imgix-prod.sgs.com/-/jssmedia/sgscorp/images/connectivity-and-products/glowing-headlight-of-a-modern-car.cdn.en.1.jpg?fit=clip&auto=format&w=1600&h=900',
    },
    {
      title: 'Yellow Luck',
      description: 'Shinning the clouds',
      backgroundColor: 'rgb(254,160,0)',
      imageUrl: 'https://images.unsplash.com/photo-1539799139339-50c5fe1e2b1b?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      title: 'Redness Lust',
      description: 'in the wilderness',
      backgroundColor: 'rgb(231, 58, 95)',
      imageUrl: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8Zmxvd2Vyc3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1296&q=60',
    },
    {
      title: 'Lavanda Love',
      description: 'in the sunset',
      backgroundColor: 'rgb(176, 136, 240)',
      imageUrl: 'https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80',
    },
  ];

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const slidesLength = slides.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlideIndex((prevIndex) => (prevIndex + 1) % slidesLength);
    }, 3000);

    return () => clearInterval(interval);
  }, [slidesLength]);

  const changeSlide = (direction) => {
    if (direction === 'up') {
      setActiveSlideIndex((prevIndex) =>
        prevIndex + 1 >= slidesLength ? 0 : prevIndex + 1
      );
    } else if (direction === 'down') {
      setActiveSlideIndex((prevIndex) =>
        prevIndex - 1 < 0 ? slidesLength - 1 : prevIndex - 1
      );
    }
  };


  return (
    // <div className="timeline">
    //   <section className="timeline">
    //     <ul>
    //       {data.map((item: any) => (
    //         <li key={item.id}>
    //           <div id={item.id} className={`content ${item.id}`} ref={(el) => (elementsRef.current[item.id] = el!)}>
    //             <div className="timeline-content-info">
    //               <span className="timeline-content-info-title">
    //                 <i className="fa fa-certificate" aria-hidden="true"></i>
    //                 {item.title}
    //               </span>
    //               <span className="timeline-content-info-date">
    //                 <i className="fa fa-calendar" aria-hidden="true"></i>
                  
    //               </span>
    //             </div>
    //             <p>{item.description}</p>
    //           </div>
    //         </li>
    //       ))}
    //     </ul>
    //   </section>
    // </div>
    <div className="slider-container">
    <div
      className="left-slide"
      style={{ top: `-${(slidesLength - 1) * 100}vh` }}
    >
      {slides.map((slide, index) => (
        <div
          key={index}
          style={{
            backgroundColor: slide.backgroundColor,
            transform: `translateY(${activeSlideIndex * 100}vh)`,
          }}
        >
          <h1>{slide.title}</h1>
          <p>{slide.description}</p>
        </div>
      ))}
    </div>
    <div className="right-slide">
      {slides.map((slide, index) => (
        <div
          key={index}
          style={{
            backgroundImage: `url(${slide.imageUrl})`,
            transform: `translateY(-${activeSlideIndex * 100}vh)`,
          }}
        ></div>
      ))}
    </div>
    <div className="action-buttons">
      <button className="down-button" onClick={() => changeSlide('down')}>
        <i className="fas fa-arrow-down"></i>
      </button>
      <button className="up-button" onClick={() => changeSlide('up')}>
        <i className="fas fa-arrow-up"></i>
      </button>
    </div>
  </div>
  );
};

export default Page;
