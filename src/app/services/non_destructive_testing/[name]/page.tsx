import React from 'react';
import ServiceData from '../../../../utlts/service_data/nonDestructiveTesting.json';

interface IDetails {
    id: number,
    title: string,
    desc: string,
    subTitle: string,
    points: string[],
}


const DetailsPage = ({ params }: { params: { name: string } }) => {

    const details = ServiceData.find((item: any) => item.id === parseFloat(params.name));

    return (
        <section className='relative px-16'>
            <div>
                <img className="z-0 absolute px-16 top-0 left-0 h-96 w-full object-cover" src="/assets/heor.jpg" alt="" />
            </div>
            <main className=' relative z-0'>
                <article className='bg-transparent pt-44'>
                    <header className="mx-auto    max-w-screen-lg rounded-t-lg bg-white pt-16 text-center shadow-lg ">

                        <h1 className="mt-2 text-4xl font-bold text-primaryText sm:text-5xl">{details?.title}</h1>
                        <p className="mt-6 text-sm text-dimText">Find out the best acoustic emission inspection equipment at reasonable prices in India.</p>
                        {/* <div className="mt-6 flex flex-wrap justify-center gap-2">
                        <button className="rounded-lg bg-gray-100 px-2 py-1 font-medium text-gray-600 hover:bg-gray-200">Marketing</button>
                        <button className="rounded-lg bg-gray-100 px-2 py-1 font-medium text-gray-600 hover:bg-gray-200">Branding</button>
                        <button className="rounded-lg bg-gray-100 px-2 py-1 font-medium text-gray-600 hover:bg-gray-200">Digital</button>
                        <button className="rounded-lg bg-gray-100 px-2 py-1 font-medium text-gray-600 hover:bg-gray-200">Identity</button>
                    </div> */}

                    </header>

                    <div className="mx-auto max-w-screen-lg space-y-12 rounded-b-lg bg-white px-8 pt-20 pb-20 font-serif text-lg tracking-wide text-gray-700 sm:shadow-lg">
                        <div>
                            <h2 className="text-2xl font-semibold mb-8">{details?.subTitle}</h2>
                            <blockquote className="w-full  border-l-4 px-4">
                                {details?.desc}.

                            </blockquote>
                        </div>
                        {
                            details && details?.points.map((text: string, index: number) =>
                                <p key={index}>
                                    {/* {text} */}
                                </p>

                            )
                        }


                    </div>
                </article>
            </main>

            <div className="w-fit mx-auto mt-10 flex space-x-2">
                <div className="h-0.5 w-2 bg-gray-600"></div>
                <div className="h-0.5 w-32 bg-gray-600"></div>
                <div className="h-0.5 w-2 bg-gray-600"></div>
            </div>



        </section>
    );
};

export default DetailsPage;