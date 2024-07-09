import React from 'react';
import Content from './Content';
import Link from 'next/link';
import { url } from 'inspector';
import LeadCard from '@/app/services/[slug]/LeadCard';

const subServiceDetails = async (id: string) => {
    const res = fetch('http://localhost:25000/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: `query IndustryPages($where: IndustryPageWhere) {
                industryPages(where: $where) {
                  id
                  title
                  image
                  description
                }
              }`,
            variables: {
                "where": {
                    "id": id
                }
            },

        }),
        next: { revalidate: 10 }

    })

    const { data } = await res.then(res => res.json())
    return data.industryPages[0]
}




const page = async ({ params, searchParams }: any) => {


    const details = await subServiceDetails(params.id || 'no slug')




    return (
        <section className='relative lg:px-16'>
            {/* <div>
                <img className="z-0 absolute lg:px-16 top-0 left-0 h-96 w-full object-cover" src={details?.image || "/assets/heor.jpg"} alt="" />
            </div> */}
            {/* <main className=' relative z-0'>
                <article className='bg-transparent pt-44 w-full '>
                    <header className="mx-auto    max-w-screen-lg rounded-t-lg bg-white pt-16 text-center shadow-lg w-full">

                        <h1 className="mt-2 text-4xl font-bold text-secondary sm:text-5xl uppercase">{details?.title}</h1>



                    </header>

                    <div className="mx-auto max-w-screen-lg space-y-12 leading-10 rounded-b-lg bg-white px-8 pt-20 pb-20 font-serif text-lg tracking-wide text-gray-700 sm:shadow-lg w-full ">
                        <Content content={JSON.parse(details?.description)} />


                    </div>
                </article>
            </main> */}

            {/* <div className="w-fit mx-auto mt-10 flex space-x-2">
                <div className="h-0.5 w-2 bg-gray-600"></div>
                <div className="h-0.5 w-32 bg-gray-600"></div>
                <div className="h-0.5 w-2 bg-gray-600"></div>
            </div> */}

<main>
    <div data-drupal-messages-fallback className="hidden"></div>
    <div id="block-mainpagecontent" className="block block-system block-system-main-block">
        <article className="node-wrapper">
            <div>
                <div className="page-heading">
                    <div className="page-heading--intro">
                        <div className="page-heading--picture field-group-background-image">
                            <img
                                src={details?.image || "/assets/heor.jpg"}
                                alt=""
                            />
                            <div className="visually-hidden field__item">Global_presence</div>
                        </div>
                        <div className="page-heading--content">
                            <nav className="breadcrumb" role="navigation">
                                <ol>
                                    <li>
                                        <Link href="/">Home</Link>
                                    </li>
                                    <li>
                                        WHO WE ARE
                                    </li>
                                </ol>
                            </nav>
                            <div className="page-heading--title">
                                <h1>
                                    <p><strong>{details?.title}</strong></p>
                                </h1>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="container--wrapper wysiwyg field__item">
                            <div className="content-layout">
                                {/* <div className="content-layout__sidebar">
                                    <LeadCard interest={details?.title} />
                                </div> */}
                                <div className="content-layout__main">
                                    <Content content={JSON.parse(details?.description)} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="paragraph paragraph--type--full-width-image paragraph--view-mode--default">
                    <div className="layer-banner">
                        <div
                            className="layer-banner--wrapper field-group-background-image"
                            style={{
                                backgroundImage: `url('https://images.unsplash.com/flagged/photo-1559717865-a99cac1c95d8?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                height: '400px'
                            }}
                        >
                            <div className="container">
                                <div className="layer-banner--content">
                                    <div className="layer-banner--box">
                                        <div className="layer-banner--title field__item" style={{ color: 'red' }}>
                                            <p><strong>Discover</strong> our worldwide presence</p>
                                        </div>
                                        <a href="https://group.bureauveritas.com/place-locator" className="button-action">Find Us</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="paragraph paragraph--type--image-slider paragraph--view-mode--default">
                    <div className="layer-markets">
                        <div className="container">
                            {/* Additional content can go here */}
                        </div>
                    </div>
                </div>
            </div>
        </article>
    </div>
</main>



            {/* <LeadCard interest={details?.title} /> */}

        </section>
   
    );
};

export default page;
{/* <style jsx>{`
.content-layout {
    display: flex;
}
.content-layout__sidebar {
    flex: 1;
    margin-right: 20px;
}
.content-layout__main {
    flex: 3;
}
`}</style>  */}