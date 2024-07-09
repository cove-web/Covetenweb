'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Eads from '@/components/Home/Eads';
const fetchAPI = async (query, variables) => {
    const res = await fetch('http://localhost:25000/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, variables }),
        next: { revalidate: 10 },
    });

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    const { data } = await res.json();
    return data;
};

// Fetch service details based on slug
const servicesCategories = async () => {
    const query = `
    query Categories($where: CategoryWhere) {
        categories(where: $where) {
          id
          name
          image
          hasService {
            id
            title
            slug
          }
        }
      }
    `;
    const variables = { "where": {
        "type": "SERVICE"
      }};
    const data = await fetchAPI(query, variables);
    return data?.categories;
};

// Fetch popular services


// Fetch counts for projects, modules, and users
const fetchCounts = async () => {
    const query = `
        query Query {
            projects {
                id
            }
            modules {
                id
            }
            users {
                id
            }
        }
    `;
    const data = await fetchAPI(query);
    return {
        projectCount: data.projects.length,
        moduleCount: data.modules.length,
        userCount: data.users.length,
    };
};

const Page = ({ params }) => {
    const [details, setDetails] = useState(null);
    const [services, setServices] = useState([]);
    const [counts, setCounts] = useState({ projectCount: 0, moduleCount: 0, userCount: 0 });

    useEffect(() => {
        const fetchData = async () => {
            const [servicesData,detailsData, countsData] = await Promise.all([
                servicesCategories(),
                
                fetchCounts(),
            ]);
            setDetails(detailsData);
            setServices(servicesData);
            setCounts(countsData);
        };

        fetchData();
    }, [params.slug]);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const res = await fetch('http://localhost:25000/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
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
                              sercount
                              newclients
                              coffecups
                              photostak
                              seradstitle
                              seradsdesc
                              seradsimg
                              servicesecdtitle
                              servicesecdec
                              servicesecdimg
                              threesertitle
                              threeserdesc
                              threeserimg
                              foursertitle
                              fourserdesc
                              fourserimg
                              fivesertitle
                              fiveserdesc
                              fiveserimg
                            }
                        }`,
                    }),
                    next: { revalidate: 10 },
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

    const slides = [
        {
            imageUrl: 'https://images.unsplash.com/photo-1516937941344-00b4e0337589?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            title: 'Materials engineering',
        },
        {
            imageUrl: 'https://images.unsplash.com/photo-1694889649703-e86125c14fe2?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            title: 'Discovery services',
        },
        {
            imageUrl: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            title: 'Non destructive testing',
        },
        {
            imageUrl: 'https://images.unsplash.com/photo-1572964734607-0051976fac79?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            title: 'Design engineering ',
        },
        {
            imageUrl: 'https://images.unsplash.com/photo-1694889649703-e86125c14fe2?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            title: 'Spectral & microscopic studies ',
        },
        {
            imageUrl: 'https://images.unsplash.com/photo-1501260928121-766a7feb7f8d?q=80&w=2532&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            title: 'Fire, safety & reliability',
        },
        {
            imageUrl: 'https://images.unsplash.com/photo-1647402024248-755d432afde5?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            title: 'Mechanical testings',
        },
        {
            imageUrl: 'https://plus.unsplash.com/premium_photo-1664637952509-c2627f44406b?q=80&w=2575&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            title: 'Functional testings',
        },
        {
            imageUrl: 'https://images.unsplash.com/photo-1576671081837-49000212a370?q=80&w=2598&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            title: 'Calibration services',
        },
        {
            imageUrl: 'https://images.unsplash.com/photo-1501260928121-766a7feb7f8d?q=80&w=2532&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            title: 'Manufacturing services ',
        },
    ];
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


    console.log("service",services)
    console.log("count",counts)
    return (
        <>
            <div className="page-heading">
                <Carousel
                    autoPlay
                    infiniteLoop
                    showThumbs={false}
                    showStatus={false}
                    interval={5000}
                    dynamicHeight={false}
                >
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            style={{
                                backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5) ), url(${slide.imageUrl})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                            className="h-[500px] flex items-center justify-center text-white"
                        >
                            <div className="-mx-4 flex flex-wrap w-full">
                                <div className="w-full px-4">
                                    <div className="mx-auto mb-[60px] max-w-[680px] text-center lg:mb-20">
                                        <h2 className="mb-4 leading-3 font-bold text-dark sm:text-3xl ">
                                            {slide.title}
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Carousel>
            </div>
            <section className="flex justify-around items-center text-center bg-gray-100 py-8">
                <motion.div className="counter" animate={{ opacity: 1 }} initial={{ opacity: 0 }} transition={{ duration: 1 }}>
                    <i className="fas fa-project-diagram text-4xl mb-2"></i>
                    {/* <h3 className="text-3xl font-bold">{details?.sercount}</h3> */}
                    {/* <h3 className="text-3xl font-bold">{counts.projectCount}</h3> */}
                    <h3 className="text-3xl font-bold">14 +</h3>


                    <p className="text-lg">Projects Done </p>
                </motion.div>
                <motion.div className="counter" animate={{ opacity: 1 }} initial={{ opacity: 0 }} transition={{ duration: 1 }}>
                    <i className="fas fa-smile text-4xl mb-2"></i>
                    {/* <h3 className="text-3xl font-bold">                    {counts.moduleCount}
</h3> */}

<h3 className="text-3xl font-bold">25 +</h3>

                    <p className="text-lg">Modules </p>
                </motion.div>
                <motion.div className="counter" animate={{ opacity: 1 }} initial={{ opacity: 0 }} transition={{ duration: 1 }}>
                    <i className="fas fa-coffee text-4xl mb-2"></i>
                    {/* <h3 className="text-3xl font-bold">{counts.userCount}</h3> */}
                    <h3 className="text-3xl font-bold">22 +</h3>

                    <p className="text-lg">Clients </p>
                </motion.div>
                <motion.div className="counter" animate={{ opacity: 1 }} initial={{ opacity: 0 }} transition={{ duration: 1 }}>
                    <i className="fas fa-camera text-4xl mb-2"></i>
                    <h3 className="text-3xl font-bold">{details?.photostak}</h3>
                    <p className="text-lg">Photos Taken +</p>
                </motion.div>
            </section>
<section>
{/* <div className="relative">
        <div className="relative left-16  h-[100px] bg-cover bg-center text-white p-4"
            style={{
                backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5) ), url(${details?.fiveserimg})`,
            width:'100%',height:'150px',left:'0'
            }}
        >
            
            <div className="absolute inset-0 bg-blue-600 opacity-50"></div>
            <div className="relative flex flex-col justify-between h-full z-10">
                <div>

                    
                <h2 className="text-2xl font-bold" style={{color:'pink'}}>{details?.fivesertitle} </h2>
                    <p className="mt-2">{details?.fiveserdesc}</p>
                </div>
                <div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded mt-4">Learn More</button>
                </div>
            </div>
        </div>
    </div> */}
    <Eads/>
</section>
            {/* <section className='grid grid-cols-1 lg:grid-cols-3 gap-7 lg:px-16 max-w-screen-2xl mx-auto p-3 lg:p-8'>
                <div className="col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
                    {services?.map(service => (
                        <motion.div
                            key={service.id}
                            className="box relative overflow-hidden shadow-lg"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link href={`/services/${service.id}`}>
                                <div className="imgBx">
                                    <img src={service.image} alt={service.title} className="w-full  object-cover"  style={{height:'150px'}}/>
                                </div>
                                <div className="content p-2 bg-white" style={{ textAlign: 'center' }}>
                                    <h2 className="text-xl font-400" style={{ textTransform: 'capitalize', textAlign: 'left' ,fontSize:'1rem'}}>{service.name}</h2>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section> */}
            <section className='grid grid-cols-1 lg:grid-cols-3 gap-7 lg:px-16 max-w-screen-2xl mx-auto p-3 lg:p-8'>
    <div className="col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
        {services?.map((service, index) => (
            <motion.div
                key={service.id}
                className="box relative overflow-hidden shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <Link href={`/services/${service.id}`}>
                    <div className="imgBx">
                        <img
                            src={imageUrls[index]} 
                             
                            alt={service.title}
                            className="w-full object-cover"
                            style={{ height: '150px' }}
                        />
                    </div>
                    <div className="content p-2 bg-white" style={{ textAlign: 'center' }}>
                        <h2 className="text-xl font-400" style={{ textTransform: 'capitalize', textAlign: 'left', fontSize: '1rem' }}>
                            {service.name}
                        </h2>
                    </div>
                </Link>
            </motion.div>
        ))}
    </div>
</section>

            {/* <section>
                <div className="container text-center mt-12 flex items-center justify-center" style={{ backgroundColor: '#3c515b', height: '300px', color: 'white', marginBottom: '2rem' }}>
                    <div>
                        <h3 className="text-lg font-semibold mb-2 mt-8">Looking for something specific?</h3>
                        <p className="text-md mb-4">Know More</p>
                        
                        <button>Know more</button>
                        
                        
                    </div>
                </div>
            </section> */}

            {/* Horizontal Ad Section */}
           <section className='videosecserv'>

           <div className="paragraph paragraph--type--video paragraph--view-mode--default" style={{marginTop:'-7rem'}}>
           <div className="relative">
        <div className="relative left-0 w-52 h-[500px] bg-cover bg-center text-white p-4"
            style={{


// backgroundImage: ` url(${details?.seradsimg})`,
backgroundImage: ` url('https://www.eventindustrynews.com/wp-content/uploads/2024/06/eco_track_ST.png')`,
marginLeft:'-2.4rem'   
            }}
        >
          
            <div className="absolute inset-0 bg-blue-600 opacity-50"></div>
            <div className="relative flex flex-col justify-between h-full z-10">
                <div>
                    <h2 className="text-2xl font-bold" style={{color:'pink'}}>{details?.seradstitle} </h2>
                    <p className="mt-2">{details?.seradsdesc}</p>
                </div>
                <div>
                    {/* <button className="px-4 py-2 bg-blue-600 text-white rounded mt-4">Learn More</button> */}
                </div>
            </div>
        </div>
    </div>
<div className="layer-media container" style={{marginTop:'-34.4rem'}}>

    <div className="layer-media--container">

        <div
            className="layer-media--media field field--name-field-youtube-video field--type-video-embed-field field--label-hidden field__items">
            <div
                className="video-embed-field-provider-youtube video-embed-field-responsive-video">
                <iframe width="854" height="485" src="https://www.youtube.com/embed/oNrEHazY20Q?si=Xc-yDGXn5jRM8oXy" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>

        </div>
    </div>

</div>


</div>
<div className="flex">
  
{/* ads2 */}
   
   
   
   
 
  
    
</div>

{/* <div className="relative">
        <div className="relative left-16  h-[100px] bg-cover bg-center text-white p-4"
            style={{
                backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5) ), url(${details?.fiveserimg})`,
                marginTop: '-9.3rem',marginLeft:'18.2rem',width:'685px',height:'150px'
            }}
        >
            <div className="absolute inset-0 bg-blue-600 opacity-50"></div>
            <div className="relative flex flex-col justify-between h-full z-10">
                <div>

                    
                <h2 className="text-2xl font-bold" style={{color:'pink'}}>{details?.fivesertitle} </h2>
                    <p className="mt-2">{details?.fiveserdesc}</p>
                </div>
                <div>
                </div>
            </div>
        </div>
    </div> */}



    <section className='reelservice'>
  <span>ads</span>
  {/* <h2>Team</h2> */}
  
  <div className="reelscards">
  <div className="reelscard" style={{     
            //    backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5) ), url(${details?.servicesecdimg})`,
            backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5) ), url('https://www.eventindustrynews.com/wp-content/uploads/2024/06/eco_track_ST.png')`,

}}>
  {/* <div className="relative"> */}
  <div style={{marginTop:'8rem'}}>
  <h2 className="text-2xl font-bold" style={{color:'pink'}}>{details?.servicesecdtitle} </h2>
                    <p className="mt-2">{details?.servicesecdec}</p>
       
    {/* </div> */}
    </div>

</div>
<div className="reelscard" style={{    
                backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5) ), url('https://www.eventindustrynews.com/wp-content/uploads/2024/06/eco_track_ST.png')`,
        
        // backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5) ), url(${details?.servicesecdimg})`,
}}>
  {/* <div className="relative"> */}
  <div style={{marginTop:'8rem'}}>
  <h2 className="text-2xl font-bold" style={{color:'pink'}}>{details?.servicesecdtitle} </h2>
                    <p className="mt-2">{details?.servicesecdec}</p>
       
    {/* </div> */}
    </div>

</div>
<div className="reelscard" style={{     
                backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5) ), url('https://www.eventindustrynews.com/wp-content/uploads/2024/06/eco_track_ST.png')`,
        
    //    backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5) ), url(${details?.servicesecdimg})`,
}}>
  {/* <div className="relative"> */}
  <div style={{marginTop:'8rem'}}>
  <h2 className="text-2xl font-bold" style={{color:'pink'}}>{details?.servicesecdtitle} </h2>
                    <p className="mt-2">{details?.servicesecdec}</p>
       
    {/* </div> */}
    </div>

</div>
{/* <div className="reelscard"   style={{
                backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5) ), url(${details?.threeserimg})`,
                
            }}>
  <h2 className="text-2xl font-bold" style={{color:'pink'}}>{details?.threesertitle} </h2>
                    <p className="mt-2">{details?.threeserdesc}</p>


</div> */}
{/* <div className="reelscard"  style={{
                backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5) ), url(${details?.fourserimg})`,
              
            }}>


<h2 className="text-2xl font-bold" style={{color:'pink'}}>{details?.foursertitle} </h2>
                    <p className="mt-2">{details?.fourserdesc}</p>

</div> */}

  </div>
</section>

<section className='reelservice'>
  <span>ads</span>
  {/* <h2>Team</h2> */}
  
  <div className="reelscards">
  <div className="reelscard">
  <div className="reelsvideo-container">
  <iframe
    width="100%"
    height="600px"
    src="https://www.youtube.com/embed/PyVkSUVwTb0?rel=0&autoplay=1"
    title="YouTube video player"
    allow=" clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>
</div>


</div>

<div className="reelscard">
  <div className="reelsvideo-container">
  <iframe
    width="100%"
    height="600px"
    src="https://www.youtube.com/embed/PyVkSUVwTb0?rel=0&autoplay=1"
    title="YouTube video player"
    allow=" clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>
</div>


</div>
<div className="reelscard">
  <div className="reelsvideo-container">
  <iframe
    width="100%"
    height="600px"
    src="https://www.youtube.com/embed/PyVkSUVwTb0?rel=0&autoplay=1"
    title="YouTube video player"
    allow=" clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>
</div>


</div>

  </div>
</section>



{/* <div className="l-container">
  <div className="b-game-card">
    <div className="b-game-card__cover" style={{ backgroundImage: 'url(https://andrewhawkes.github.io/codepen-assets/steam-game-cards/game_1.jpg)' }}></div>
  </div>
  <div className="b-game-card">
    <div className="b-game-card__cover" style={{ backgroundImage: 'url(https://andrewhawkes.github.io/codepen-assets/steam-game-cards/game_2.jpg)' }}></div>
  </div>
  <div className="b-game-card">
    <div className="b-game-card__cover" style={{ backgroundImage: 'url(https://andrewhawkes.github.io/codepen-assets/steam-game-cards/game_3.jpg)' }}></div>
  </div>
  <div className="b-game-card">
    <div className="b-game-card__cover" style={{ backgroundImage: 'url(https://andrewhawkes.github.io/codepen-assets/steam-game-cards/game_4.jpg)' }}></div>
  </div>
</div> */}

    
 {/* <script src='http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js?ver=1.6.4' type='text/javascript'/> */}
           </section>
        </>
    );
};

export default Page;
