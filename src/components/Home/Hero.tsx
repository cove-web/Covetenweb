'use client'
import React, { useEffect, useState } from 'react';
// import './HomeCarousel.css'; // Ensure this file is correctly imported

const slideTransitionDuration = 0.8 * 1000;

const Hero: React.FC = ({ heroData }: any) => {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const homeCarouselWrappers = document.querySelectorAll('.home-carousel-wrapper');

        homeCarouselWrappers.forEach(wrapper => {
            const theCarousel = wrapper.querySelector('.home-carousel') as HTMLElement;
            const textElements = wrapper.querySelectorAll('.text-dynamic');

            const rotateWrappers = wrapper.querySelectorAll('.home-carousel-rotate-wrapper');
            rotateWrappers.forEach((rotateWrapper) => {
                const rotationDelay = rotateWrapper.getAttribute('data-delay')
                    ? parseInt(rotateWrapper.getAttribute('data-delay')!)
                    : 0;
                setInterval(() => {
                    setTimeout(() => {
                        const currentLabel = rotateWrapper.querySelector('.home-carousel-rotate-item:nth-of-type(1)') as HTMLElement;
                        const nextLabel = rotateWrapper.querySelector('.home-carousel-rotate-item:nth-of-type(2)') as HTMLElement;
                        currentLabel.classList.add('slideLeft');
                        nextLabel.classList.add('slideLeft');
                        setTimeout(() => {
                            rotateWrapper.classList.add('disableTransition');
                            rotateWrapper.querySelectorAll('.slideLeft').forEach((element) => {
                                element.classList.remove('slideLeft');
                            });
                            rotateWrapper.appendChild(currentLabel);
                            setTimeout(() => {
                                rotateWrapper.classList.remove('disableTransition');
                            }, slideTransitionDuration);
                        }, slideTransitionDuration * 2);
                    }, rotationDelay);
                }, slideTransitionDuration * 4);
            });

            setInterval(() => {
                const currentPanel = theCarousel.querySelector('.home-carousel-panel:nth-of-type(1)') as HTMLElement;
                const nextPanel = theCarousel.querySelector('.home-carousel-panel:nth-of-type(2)') as HTMLElement;

                const currentPanelImages = Array.from(currentPanel.querySelectorAll('.home-carousel-image')) as HTMLElement[];
                const nextPanelImages = Array.from(nextPanel.querySelectorAll('.home-carousel-image')) as HTMLElement[];

                const newBackgroundImage = getComputedStyle(nextPanelImages[0]).backgroundImage;

                currentPanel.style.backgroundImage = 'none';
                nextPanel.style.backgroundImage = 'none';

                currentPanelImages[0].classList.add('slideLeft');
                nextPanelImages[0].classList.add('slideLeft');

                setTimeout(() => {
                    currentPanelImages[1].classList.add('slideLeft');
                    nextPanelImages[1].classList.add('slideLeft');
                }, slideTransitionDuration * 0.17);

                setTimeout(() => {
                    currentPanelImages[2].classList.add('slideLeft');
                    nextPanelImages[2].classList.add('slideLeft');
                }, slideTransitionDuration * 0.34);

                setTimeout(() => {
                    currentPanel.classList.add('disableTransition');
                    nextPanel.classList.add('disableTransition');

                    currentPanel.style.backgroundImage = newBackgroundImage;
                    nextPanel.style.backgroundImage = newBackgroundImage;

                    theCarousel.querySelectorAll('.slideLeft').forEach((element) => {
                        element.classList.remove('slideLeft');
                    });

                    theCarousel.appendChild(currentPanel);

                    setTimeout(() => {
                        theCarousel.querySelectorAll('.disableTransition').forEach((element) => {
                            element.classList.remove('disableTransition');
                        });
                    }, slideTransitionDuration);

                    // Change text dynamically
                    textElements.forEach((textElement, index) => {
                        if (index === activeIndex) {
                            textElement.classList.remove('text-hidden');
                            textElement.classList.add('text-visible');
                        } else {
                            textElement.classList.remove('text-visible');
                            textElement.classList.add('text-hidden');
                        }
                    });

                    setActiveIndex((activeIndex + 1) % textElements.length);
                }, slideTransitionDuration * 2);
            }, slideTransitionDuration * 4);
        });
    }, [activeIndex]);

    return (
        <div className="home-carousel-wrapper">
            <div className="home-carousel">
                
                <div className="home-carousel-panel">
                <div className="home-carousel-image" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1715059250871-08786b8a884a?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D                ')" }}></div>
                <div className="home-carousel-image" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1715059250871-08786b8a884a?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D                ')" }}></div>
                <div className="home-carousel-image" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1715059250871-08786b8a884a?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D                ')" }}></div>

                {/* <div className="home-carousel-image" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1518276077558-120c2ea7d5e3?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}></div>

                    <div className="home-carousel-image" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1518276077558-120c2ea7d5e3?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}></div>
                    */}
                    
                </div>
                <div className="home-carousel-panel">
                <div className="home-carousel-image" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1647427060118-4911c9821b82?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D                ')" }}></div>
                {/* <div className="home-carousel-image" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1474674556023-efef886fa147?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}></div>

                    <div className="home-carousel-image" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1474674556023-efef886fa147?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}></div>
                     */}
                                   <div className="home-carousel-image" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1647427060118-4911c9821b82?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D                ')" }}></div>

                </div>
                <div className="home-carousel-panel">
                <div className="home-carousel-image" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1451187863213-d1bcbaae3fa3?q=80&w=2520&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D                ')" }}></div>
                <div className="home-carousel-image" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1451187863213-d1bcbaae3fa3?q=80&w=2520&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D                ')" }}></div>
                <div className="home-carousel-image" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1451187863213-d1bcbaae3fa3?q=80&w=2520&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D                ')" }}></div>

                {/* <div className="home-carousel-image" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1530191601183-4de2969575ad?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}></div>

                    <div className="home-carousel-image" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1530191601183-4de2969575ad?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}></div>
                     */}
                </div>
            </div>
            {/* <div className="home-carousel-text">
                <div className="text-static" style={{marginTop:'3rem'}}>Pass</div>
                <div className="text-static" style={{marginTop:'3rem'}}>saas</div>
                <div className="text-static" style={{marginTop:'3rem'}}>Taas</div>

            </div> */}
            <div className="home-carousel-text">
			<div className="text-static"><br></br></div>
			<div className="text-dynamic">
				<div className="text-dynamic-content-1 home-carousel-rotate-wrapper">
					<div className="text-dynamic-content home-carousel-rotate-item">TaaS - Testing as a Solution
</div>
					<div className="text-dynamic-content home-carousel-rotate-item">PaaS - Procurement as a Solution
</div>
					<div className="text-dynamic-content home-carousel-rotate-item">SaaS - Software as a Solution</div>
				</div>
				<div className="text-dynamic-content-2 home-carousel-rotate-wrapper" data-delay="200">
					<div className="text-dynamic-content home-carousel-rotate-item"></div>
					<div className="text-dynamic-content home-carousel-rotate-item"></div>
					<div className="text-dynamic-content home-carousel-rotate-item"></div>
				</div>
			</div>
		</div>
        </div>
    );
}

export default Hero;
