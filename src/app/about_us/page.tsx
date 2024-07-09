import React from 'react';
import Content from './Content';
import Ads from '@/components/Home/Ads';


// Helper function to check if a string is valid JSON
function isValidJson(str) {
   try {
       JSON.parse(str);
       return true;
   } catch (e) {
       return false;
   }
}


const aboutUsPageDetails = async () => {
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
                 worksSpace
                 website
                 differentt
               }
             }`,
       }),
       next: { revalidate: 10 }
   });


   const { data } = await res.json();
   return data.aboutPages[0];
   console.log("about",data)


  
};


const page = async ({ params, searchParams }: any) => {
   const details = await aboutUsPageDetails();
   return (
       <>
           <main>
               <div data-drupal-messages-fallback className="hidden"></div>
               <div id="block-mainpagecontent" className="block block-system block-system-main-block">
                   <article className="node-wrapper">
                       <div>
                           <div className="page-heading">
                               <div className="page-heading--intro">
                                   <div className="page-heading--picture field-group-background-image"
                                       style={{
                                           backgroundImage: `url(
                                               'https://images.unsplash.com/photo-1718036094456-5f57368fdabd?q=80&w=2456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                                               )`
                                       }}
                                   >
                                       <div className="visually-hidden field__item">Group Cover</div>
                                   </div>
                                   <div className="page-heading--content">
                                       <nav className="breadcrumb" role="navigation">
                                           <ol>
                                               <li>
                                                   <a href="/">Home</a>
                                                  
                                               </li>
                                           </ol>
                                       </nav>
                                       <div className="page-heading--title">
                                           {/* <h6 style={{opacity:'1',color:'#21618c',marginLeft:'5rem'}}>
                                               <p> <strong>{details?.title}</strong></p>
                                           </h6> */}
                                           <p>{details?.title}</p>
                                       </div>
                                   </div>
                               </div>
{/* ads 1 */}
                               <div className="relative">
                                   <div className="absolute left-2 w-52 h-[400px] bg-cover bg-center text-white p-4"
                                       style={{
                                           backgroundImage: `url(${details.hoadsimg})`,


                                           marginTop: '3rem'
                                       }}
                                   >
                                       {/* Overlay */}
                                       <div className="absolute inset-0 bg-blue-600 opacity-50"></div>
                                       <div className="relative flex flex-col justify-between h-full z-10">
                                           <div>
                                               <h2 className="text-2xl font-bold" style={{ color: 'pink' }}>{details?.hadstitle}</h2>
                                               <p className="mt-2">{details?.hadsdesc}</p>
                                           </div>
                                           <div>
                                               <button className="px-4 py-2 bg-blue-600 text-white rounded mt-4">Learn More</button>
                                           </div>
                                       </div>
                                   </div>
                               </div>


                               {/* More divs similar to the above for other sections */}


                               <div className="container">
                                   <div className="container--wrapper wysiwyg field__item">
                                       <p>
                                           <Content content={JSON.parse(details?.description)} />
                                           {isValidJson(details?.image) ? (
                                               <Content content={JSON.parse(details?.image)} />
                                           ) : (
                                            <></>
                                            //    <img src={details?.image} alt="Description" style={{marginTop:'1rem'}}/>
                                           )}
                                       </p>
                                   </div>
                               </div>
                           </div>


                           <div className="paragraph paragraph--type--video paragraph--view-mode--default">
                               <div className="layer-media container">
                                   <div className="layer-media--container">
                                       <div className="layer-media--media field field--name-field-youtube-video field--type-video-embed-field field--label-hidden field__items">
                                           <div className="video-embed-field-provider-youtube video-embed-field-responsive-video">
                                               <iframe width="854" height="485" src="https://www.youtube.com/embed/oNrEHazY20Q?si=Xc-yDGXn5jRM8oXy" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                                           </div>
                                       </div>
                                   </div>
                               </div>
                           </div>


                           <div className="paragraph paragraph--type--key-figures paragraph--view-mode--default">
                               <div className="list-keyfigures container">
                                   <div className="list-keyfigures--container">
                                       <div className="teaser-keyfigure field__item">
                                           <div className="paragraph paragraph--type--key-figures-items paragraph--view-mode--default">
                                              {details.ctext}
                                               <span className="teaser-keyfigure--data field__item">{details.count}</span>
                                               <div className="teaser-keyfigure--action">
                                                   <a href="https://careers.bureauveritas.com/India/?locale=en_US" className="link-std">Technical Experts</a>
                                               </div>
                                           </div>
                                       </div>
                                       <div className="teaser-keyfigure field__item">
                                           <div className="paragraph paragraph--type--key-figures-items paragraph--view-mode--default">
                                              {details.ctext}
                                               <span className="teaser-keyfigure--data field__item">{details.worksSpace}</span>
                                               <div className="teaser-keyfigure--action">
                                                   <a href="https://careers.bureauveritas.com/India/?locale=en_US" className="link-std">WorkSpace</a>
                                               </div>
                                           </div>
                                       </div>
                                       <div className="teaser-keyfigure field__item">
                                           <div className="paragraph paragraph--type--key-figures-items paragraph--view-mode--default">
                                              {details.ctext}
                                               <span className="teaser-keyfigure--data field__item">{details.website}</span>
                                               <div className="teaser-keyfigure--action">
                                                   <a href="https://careers.bureauveritas.com/India/?locale=en_US" className="link-std">Average visitor</a>
                                               </div>
                                           </div>
                                       </div>
                                       <div className="teaser-keyfigure field__item">
                                           <div className="paragraph paragraph--type--key-figures-items paragraph--view-mode--default">
                                              {details.ctext}
                                               <span className="teaser-keyfigure--data field__item">{details.differentt}</span>
                                               <div className="teaser-keyfigure--action">
                                                   <a href="https://careers.bureauveritas.com/India/?locale=en_US" className="link-std">Different Types of testing</a>
                                               </div>
                                           </div>
                                       </div>
                                       <div className="teaser-keyfigure field__item">
                                           <div className="paragraph paragraph--type--key-figures-items paragraph--view-mode--default">
                                              {details.ctext}
                                               <span className="teaser-keyfigure--data field__item">{details.differentt}</span>
                                               <div className="teaser-keyfigure--action">
                                                   <a href="https://careers.bureauveritas.com/India/?locale=en_US" className="link-std">Expected business volume</a>
                                               </div>
                                           </div>
                                       </div>
                                       <div className="teaser-keyfigure field__item">
                                           <div className="paragraph paragraph--type--key-figures-items paragraph--view-mode--default">
                                              {details.ctext}
                                               <span className="teaser-keyfigure--data field__item">{details.differentt}</span>
                                               <div className="teaser-keyfigure--action">
                                                   <a href="https://careers.bureauveritas.com/India/?locale=en_US" className="link-std">Annual expected </a>
                                               </div>
                                           </div>
                                       </div>
                                       <div className="teaser-keyfigure field__item">
                                           <div className="paragraph paragraph--type--key-figures-items paragraph--view-mode--default">
                                              {details.ctext}
                                               <span className="teaser-keyfigure--data field__item">{details.differentt}</span>
                                               <div className="teaser-keyfigure--action">
                                                   <a href="https://careers.bureauveritas.com/India/?locale=en_US" className="link-std">Clients 
</a>
                                               </div>
                                           </div>
                                       </div>
                                       {/* More key figures */}
                                   </div>
                                  
                               </div>
                              
                           </div>
                          
                       </div>
                   </article>
               </div>
               {/* <div className="sticky_bottom">
<a href="javascript:;" className="button_sticky_bottom"><i className="fa fa-angle-down"></i> </a>
<div className="ads_sticky_bottom" >
<h1>{details?.btadstitle}</h1>
<p>{details?.btadsdesc}</p>
<a href="#" ><img  data-original-height="129" data-original-width="1024" height="80"
src={details.hoadsimg}
width="640" /></a></div>
</div> */}
               <Ads />
           </main>
       </>
   );
};


export default page;



