'use client';

import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

const Page: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(1);
  const [animating, setAnimating] = useState(false);
  const intervalRef = useRef(null);

  const handleSlideChange = (nextSlide) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setActiveSlide(nextSlide);
      setAnimating(false);
    }, 1000); // Set the delay to 1000ms for smooth transition
  };

  useEffect(() => {
    const navLinks = document.querySelectorAll('.slide-nav');
    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (Number(link.dataset.slide) === activeSlide) {
        link.classList.add('active');
      }
    });
  }, [activeSlide]);

  useEffect(() => {
    const handleScroll = (event) => {
      if (animating) return;

      if (event.deltaY > 0) {
        // Scrolling down
        if (activeSlide < slides.length) {
          handleSlideChange(activeSlide + 1);
        }
      } else {
        // Scrolling up
        if (activeSlide > 1) {
          handleSlideChange(activeSlide - 1);
        }
      }
    };

    window.addEventListener('wheel', handleScroll);

    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, [activeSlide, animating]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      handleSlideChange(activeSlide < slides.length ? activeSlide + 1 : 1);
    }, 5000); // Change slide every 5 seconds

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [activeSlide]);

  return (
    <Styles>
      <div className="slider__wrapper">
        {slides.map((slide, index) => (
          <div
            className={`flex__container ${slide.className} ${
              activeSlide === index + 1 ? 'flex--active' : 'flex--inactive'
            }`}
            data-slide={index + 1}
            key={index}
          >
            <div className="flex__item flex__item--left">
              <div className={`flex__content ${activeSlide === index + 1 ? 'fade-in' : ''}`}>
                <p className="text--sub">{slide.subText}</p>
                <p className="text--normal">{slide.mainText}</p>
              </div>
            </div>
            <div className="flex__item flex__item--right">
              <img className={`pokemon__img ${activeSlide === index + 1 ? 'fade-in' : ''}`} src={slide.imgSrc} alt={slide.imgAlt} />
            </div>
          </div>
        ))}
      </div>

      <div className="slider__navi">
        {slides.map((slide, index) => (
          <a href="#" className={`slide-nav ${activeSlide === index + 1 ? 'active' : ''}`} data-slide={index + 1} key={index}>
            {slide.navText}
          </a>
        ))}
      </div>
    </Styles>
  );
};

const slides = [
  {
    className: 'flex--pikachu',
    subText: 'What Is Coveten',
    mainText: 'The Coveten software platform is a unified solution provider for all the industrial domains. This platform is specially designed to offer comprehensive testing, verification, and certification guidance to manufacturers. Coveten streamlines the entire manufacturing process, from initial drawings, designs to product performance and failure analysis, The entire process is trackable and traceable ....',
    imgSrc: 'https://images.unsplash.com/photo-1493238792000-8113da705763?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    imgAlt: 'Pikachu',
    navText: 'pikachu'
  },
  {
    className: 'flex--piplup',
    subText: 'How Coveten Works',
    mainText: 'Our mission is to assist industrial customers with all their requirements by simplifying their manufacturing processes and accelerating their process outcomes in a shorter time, We\'re working to provide most of the testing and inspection requirements in realtime to the manufacturers with the aim to reduce their investments on place, people and machines',
    imgSrc: 'https://images.unsplash.com/photo-1493238792000-8113da705763?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    imgAlt: 'Piplup',
    navText: 'piplup'
  },
  {
    className: 'flex--blaziken',
    subText: 'How To Personalise Coveten',
    mainText: 'It is a cloud-based application that can be customised by providing basic information on the required areas, after which you can log in / sign in with your own credentials to add and retrieve information. This application provides all necessary steps to finish your task without hassle. At every point in time, you can discover, track, and obtain the information you require....',
    imgSrc: 'https://images.unsplash.com/photo-1493238792000-8113da705763?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    imgAlt: 'Blaziken',
    navText: 'blaziken'
  },
  {
    className: 'flex--dialga',
    subText: 'Why Should I Use Coveten',
    mainText: 'Coveten is a first-of-its-kind service-integrating application specifically designed for manufacturers and industries. It assists customers in identifying resources, testing and verifying, design, validation, periodic QC assessments, supplier quality, man and machine integration, monitoring, training, and the overall well-being of workforce members all in one place, with the highest data security and the simplest operations.',
    imgSrc: 'https://images.unsplash.com/photo-1493238792000-8113da705763?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    imgAlt: 'Dialga',
    navText: 'dialga'
  },
  {
    className: 'flex--zekrom',
    subText: 'Is Coveten For Everyone',
    mainText: 'Absolutely not. Coveten is a platform that was designed and built to support only business-to-business (B2B) domains. If you are a business owner, manufacturer, or service provider, this platform is ideal for you. Coveten conducts extensive marketing for complete business solutions, and you can simply join and enjoy the noncompetitive business environment.',
    imgSrc: 'https://images.unsplash.com/photo-1493238792000-8113da705763?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    imgAlt: 'Zekrom',
    navText: 'zekrom'
  },
  {
    className: 'flex--zekrom',
    subText: 'Is Coveten For Everyone',
    mainText: 'Absolutely not. Coveten is a platform that was designed and built to support only business-to-business (B2B) domains. If you are a business owner, manufacturer, or service provider, this platform is ideal for you. Coveten conducts extensive marketing for complete business solutions, and you can simply join and enjoy the noncompetitive business environment.',
    imgSrc: 'https://images.unsplash.com/photo-1493238792000-8113da705763?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    imgAlt: 'Zekrom',
    navText: 'zekrom2'
  }
];

const Styles = styled.div`
  .flex__container {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: stretch;
    transition: transform 1s ease-in-out, opacity 1s ease-in-out;
  }

  .flex__item {
    flex: 1;
    box-sizing: border-box;
  }

  .flex__item--left {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .flex__item--right {
    display: flex;
    align-items: center;
  }

  .flex__item--right img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .slider__wrapper {
    position: relative;
  }

  .flex--active {
    display: flex;
    transform: translateY(0);
    opacity: 1;
  }

  .flex--inactive {
    display: none;
    transform: translateY(100%);
    opacity: 0;
  }

  .fade-in {
    opacity: 0;
    animation: fadeIn 2.5s forwards; /* Made the animation slower */
  }

  @keyframes fadeIn {
    from {
      opacity: 1;
      transform: translateY(100px); /* Start from further down */
    }
    to {
      opacity: 1;
      transform: translateY(-50px);
    }
  }

  .text--sub {
    font-size: 30px;
  }

  .text--big {
    font-size: 40px;
    margin: 10px 0;
  }

  .text--normal {
    font-size: 16px;
    opacity: 0;
    animation: slideIn 1.5s forwards; /* Made the animation slower */
  }

  @keyframes slideIn {
    from {
      transform: translateY(50px); /* Start from further down */
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .text__background {
    font-size: 100px;
    opacity: 0.1;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
  }

  .slider__navi a {
    margin: 0 10px;
    text-decoration: none;
    color: #000;
  }

  .slide-nav.active {
    font-weight: bold;
  }
`;


export default Page;
