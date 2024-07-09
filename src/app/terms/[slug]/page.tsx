import React from 'react';
import Content from './Content';
import Link from 'next/link';



const subServiceDetails = async (slug: string) => {
    const res = fetch('http://localhost:25000/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: `query TermsPages($where: TermsPageWhere) {
                termsPages(where: $where) {
                  slug
                  title
                  content
                  downloadUrl
                }
              }`,
            variables: {
                "where": {
                    "slug": slug
                }
            },

        }),
        next: { revalidate: 10 }
    })

    const { data } = await res.then(res => res.json())
    return data.termsPages[0]
}




const page = async ({ params, searchParams }: any) => {


    const details = await subServiceDetails(params.slug || 'no slug')





    return (
        <section className='relative px-2 lg:px-16'>

            <main className=' relative z-0'>
                <article className='bg-transparent pt-6 w-full '>
                    <header className="mx-auto    max-w-screen-lg rounded-t-lg bg-white lg:pt-16 text-center  w-full">

                        <h1 className="mt-2 text-4xl capitalize font-bold text-secondary sm:text-5xl">{details?.title}</h1>



                    </header>

                    <div className="mx-auto max-w-screen-lg space-y-12 leading-10 rounded-b-lg bg-white px-8 pt-20 pb-20 font-serif text-lg tracking-wide text-gray-700  w-full ">
                        <Content content={JSON.parse(details?.content)} />


                    </div>
                </article>
                <div className='w-full flex items-center justify-center'>
                    <Link target='_blank' href={details?.downloadUrl || '#'} className='px-4 py-2 bg-primary text-white rounded-md'>
                        Download
                    </Link>
                </div>
            </main>

            <div className="w-fit mx-auto mt-10 flex space-x-2">
                <div className="h-0.5 w-2 bg-gray-600"></div>
                <div className="h-0.5 w-32 bg-gray-600"></div>
                <div className="h-0.5 w-2 bg-gray-600"></div>
            </div>



        </section>
    );
};

export default page;