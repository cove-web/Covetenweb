'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y, Autoplay } from 'swiper/modules';
import { useEffect, useState } from 'react';
import Ads from './Ads';

// component


export default function Services({ services }: { services: any[] }) {
    const [servicesDataChunk, setServicesDataChunk] = useState<any>([]);
    const [details, setDetails] = useState<any>(null); // State to hold the fetched data
    const [currentCardIndex, setCurrentCardIndex] = useState(0); // State to control which card is visible

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
                    setDetails(data.aboutPages[0]);
                }
            } catch (error) {
                console.error('Error fetching details:', error);
            }
        };

        fetchDetails();
    }, []);

    const imageUrls = [
        'https://images.unsplash.com/photo-1460186136353-977e9d6085a1?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1581094017399-34c4fb48c65b?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1710828530560-2920125ad032?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1612257998095-1feb6bd2bcf9?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1631824686833-deb5156dea8f?q=80&w=2618&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://www.bureauveritas.co.in/sites/g/files/zypfnx556/files/styles/teaser_img_desktop/public/2019-11/Consumer%20products%20%26%20Retail%20-%20960%20X%20480_0.jpg?h=355d1f8c&itok=KadHiXL7',

        'https://www.oneindiainstitute.com/assets/images/course/intl_banner.png',
        'https://www.iam.kit.edu/wk/img/Fest_003.jpg',
'https://www.bureauveritas.co.in/sites/g/files/zypfnx556/files/styles/teaser_img_desktop/public/2019-11/Consumer%20products%20%26%20Retail%20-%20960%20X%20480_0.jpg?h=355d1f8c&itok=KadHiXL7',
'https://www.bureauveritas.co.in/sites/g/files/zypfnx556/files/styles/teaser_img_desktop/public/2019-11/Power%20%26%20Utilities%20-%20960%20X%20480_0.jpg?h=355d1f8c&itok=Dw-VAae_',
'https://www.bureauveritas.co.in/sites/g/files/zypfnx556/files/styles/teaser_img_desktop/public/2019-11/Oil%20%26%20Gas%20-%20960%20X%20480_0.jpg?h=355d1f8c&itok=sa2aEYWh'        // Add more URLs as needed
    ];

    useEffect(() => {
        if (services) {
            const chunked = splitArrayIntoChunks(services, 8); // Updated chunk size to 8
            setServicesDataChunk(chunked);
        }
    }, [services]);

    function splitArrayIntoChunks(array: any, chunkSize: number) {
        return Array.from({ length: Math.ceil(array.length / chunkSize) }, (v, index) =>
            array.slice(index * chunkSize, index * chunkSize + chunkSize)
        );
    }

    function getServiceUrl(index: number) {
        const urls = [
            'http://localhost:3000/services/computed_tomography_ct',
            'http://localhost:3000/services/nanomaterial_testing',
            'http://localhost:3000/services/hardness_testing',
            // Add more URLs as needed
        ];
        return urls[index] || '#';
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentCardIndex(prevIndex => (prevIndex + 1) % 3);
        }, 20000); // Change card every 20 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <section className="pt-1">
            <div className="relative">
      
    </div>
                <div className="content-container">
                    <div className="services-container">
                        <li className="menu-item menu-item--expanded">
                            
                            <div id="block-our-markets" className="block block-block-content block-block-content4b57c271-b71b-4658-bda9-e87f9d742907">
                    
                                <div className="section-gallery">
                                    <div className="section-gallery--container">
                                        <h2 className="section-gallery--title field__item"><p>Our <strong>Services</strong></p>
                                        </h2>
                                        
                                        <div className="section-gallery--slider">
                                        
                                            <div className="splashcard">
                                                {currentCardIndex === 0 && (
                                                    <div className="relative left-16 h-[100px] bg-cover bg-center text-white p-4"
                                                        style={{
                                                            backgroundImage: `url(${details?.hoadsimg})`,
                                                            width: '180px', height: '310px', left: '-13rem'
                                                        }}>
                                                            {/* <div className="absolute inset-0 bg-blue-600 opacity-50"></div> */} 
                                                        <div className="relative flex flex-col justify-between h-full z-10">
                                                            <div>
                                                                <h2 className="text-2xl font-bold" style={{ color: 'pink' }}>{details?.hadstitle}</h2>
                                                                <p className="mt-2">{details?.hadsdesc}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                                {currentCardIndex === 1 && (
                                                    <div className="relative left-16 h-[100px] bg-cover bg-center text-white p-4"
                                                        style={{
                                                            backgroundImage: `url(${details?.hoadsimg})`,
                                                            width: '180px', height: '310px', left: '-13rem'
                                                        }}>
                                                           {/* <div className="absolute inset-0 bg-blue-600 opacity-50"></div> */}
                                                        <div className="relative flex flex-col justify-between h-full z-10">
                                                            <div>
                                                                <h2 className="text-2xl font-bold" style={{ color: 'pink' }}>Ads</h2>
                                                                <p className="mt-2"></p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                                {currentCardIndex === 2 && (
                                                    <div className="relative left-16 h-[100px] bg-cover bg-center text-white p-4"
                                                        style={{
                                                            backgroundImage: `url(${details?.hoadsimgt})`,
                                                            width: '180px', height: '310px', left: '-13rem'
                                                        }}>
                                                           {/* <div className="absolute inset-0 bg-blue-600 opacity-50"></div> */}
                                                        <div className="relative flex flex-col justify-between h-full z-10">
                                                            <div>
                                                                <h2 className="text-2xl font-bold" style={{ color: 'pink' }}>Ads</h2>
                                                                <p className="mt-2"></p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            {/* </div> */}
                                        {/* </div> */}
                                    </div>


        {/* <div className="relative left-16  h-[100px] bg-cover bg-center text-white p-4"
            style={{
                backgroundImage: `url(${details?.hoadsimgt})`,
           width:'180px',height:'310px',left:'-13rem',marginTop:'2rem'
            }}
        >
               <div className="absolute inset-0 bg-blue-600 opacity-50"></div>
            <div className="relative flex flex-col justify-between h-full z-10">
                <div>
                <h2 className="text-2xl font-bold" style={{color:'pink'}}>{details?.hadstitlet} </h2>
                    <p className="mt-2">{details?.hadsdesct}</p>
                </div>
                <div>
                </div>
            </div>
        </div> */}
           <div className="relative left-16 h-[100px] bg-cover bg-center text-white p-4"
                                                        style={{
                                                            backgroundImage: `url(${details?.hoadsimg})`,
                                                            width: '180px', height: '310px', left: '-13rem',marginTop:'1rem'
                                                        }}>
                                                            {/* <div className="absolute inset-0 bg-blue-600 opacity-50"></div> */} 
                                                        <div className="relative flex flex-col justify-between h-full z-10">
                                                            <div>
                                                                <h2 className="text-2xl font-bold" style={{ color: 'pink' }}>{details?.hadstitle}</h2>
                                                                <p className="mt-2">{details?.hadsdesc}</p>
                                                            </div>
                                                        </div>
                                                    </div>
       
                                            <ul className="section-gallery--list field field--name-field-gallery-items field--type-entity-reference-revisions field--label-hidden field__items" style={{marginTop:'-42rem'}}>
                                                
                                                {servicesDataChunk.length > 0 && servicesDataChunk[0].map((item: any, idx: number) => (
                                                    <li key={idx} className="section-gallery--item field__item">
                                                        <div className="paragraph paragraph--type--gallery-items paragraph--view-mode--default">
                                                            <div className="teaser-img">
                                                                <a href={getServiceUrl(idx)} className="field-group-link">
                                                                    <div className="teaser-img--picture field__item">
                                                                        <div className="teaser-img--picture"> 
                                                                            <picture>
                                                                                <source srcSet={imageUrls[idx % imageUrls.length]} media="all and (min-width: 1280px)" type="image/jpeg" width="265" height="375" />
                                                                                <source srcSet={imageUrls[idx % imageUrls.length]} media="all and (min-width: 960px)" type="image/jpeg" width="265" height="375" />
                                                                                <source srcSet={imageUrls[idx % imageUrls.length]} media="all and (min-width: 640px)" type="image/jpeg" width="266" height="300" />
                                                                                <source srcSet={imageUrls[idx % imageUrls.length]} type="image/jpeg" width="400" height="400" />
                                                                                <img loading="lazy"
                                                                                    src={imageUrls[idx % imageUrls.length]}
                                                                                    width="265" height="975" alt={item.title} />
                                                                            </picture>
                                                                        </div>
                                                                    </div>
                                                                    <div className="teaser-img--content">
                                                                        <h4 className="tag-std field__item">{item.title}</h4>
                                                                        <div className="teaser-img--action">
                                                                            <span className="link-std">Read More</span>
                                                                        </div>
                                                                    </div>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                            <div className="relative left-16  h-[100px] bg-cover bg-center text-white p-4"
            style={{
                backgroundImage: `url('https://www.eventindustrynews.com/wp-content/uploads/2024/06/eco_track_ST.png')`,
           width:'180px',height:'310px',left:'55rem',marginTop:'-25rem'
            }}
        >
               {/* <div className="absolute inset-0 bg-blue-600 opacity-50"></div> */}
            <div className="relative flex flex-col justify-between h-full z-10">
                <div>
                {/* <h2 className="text-2xl font-bold" style={{color:'pink'}}>{details?.hadstitleth} </h2> */}
                    {/* <p className="mt-2">{details?.hadsdescth}</p> */}
                </div>
                <div>
                </div>
            </div>
        </div>
        <div className="relative left-16  h-[100px] bg-cover bg-center text-white p-4"
            style={{
                backgroundImage: `url('https://www.eventindustrynews.com/wp-content/uploads/2024/06/eco_track_ST.png')`,
           width:'180px',height:'310px',left:'55rem',marginTop:'1rem'
            }}
        >
               {/* <div className="absolute inset-0 bg-blue-600 opacity-50"></div> */}
            <div className="relative flex flex-col justify-between h-full z-10">
                <div>
                {/* <h2 className="text-2xl font-bold" style={{color:'pink'}}>{details?.hadstitlef} </h2> */}
                    {/* <p className="mt-2">{details?.hadsdescf}</p> */}
                </div>
                <div>
                </div>
            </div>
        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </div>
                </div>
      {/* <div className="sticky_bottom" style={{marginTop:'0rem'}}>
<div className="ads_sticky_bottom" >
<h2 className="text-2xl font-bold" style={{color:'red'}}>{details?.hadstitlefi} </h2>
                    <p className="mt-2">{details?.hadsdescfi}</p>
<a href="#" ><img  data-original-height="129" data-original-width="1024" height="80"
src={details?.hoadsimg}
  width="640"  style={{height:'250px'}}/></a></div>
</div> */}
<Ads/>

                <div>
                   
                </div>
          
        
                <div className="field__item" style={{marginTop:'-7rem',backgroundColor:'blue'}}>
                    <div className="paragraph paragraph--type--long-verbatim paragraph--view-mode--default">
                        <div className="layer-long-verbatim" style={{backgroundColor:'#21618c'}}>
                            <div className="layer-long-verbatim--container">
                                <div className="layer-long-verbatim--card">
                                    <div className="layer-long-verbatim--picture">
                                        <div className="teaser-verbatim--picture">
                                            <div className="field__label visually-hidden">Image</div>
                                           
                                        </div>
                                    </div>
                                    <cite className="layer-long-verbatim--author">
                                        <div className="field field--name-field-author-firstname field--type-string field--label-hidden field__items">
                                            <div className="field__item">Our </div>
                                        </div>
                                        <span className="firstname field field--name-field-author-lastname field--type-string field--label-hidden field__items"> Vission
                                        </span>
                                    </cite>
                                    
                                    <p className="layer-long-verbatim--society field field--name-field-company field--type-string field--label-hidden field__items">Coveten
                                    </p>
                                </div>
                                <blockquote className="layer-long-verbatim--quote">
                                    <div className="layer-long-verbatim--text">
                                    To be at the forefront of technological innovation, setting new standards for what is 
possible and inspiring a future where technology creates limitless opportunities for 
growth and exploration                                    </div>
                                </blockquote>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
        </>
    )
}
