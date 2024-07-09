import React from 'react';

const MicroscopicTestingpage = () => {
    return (
        <section className='relative px-16'>
            <div>
                <img className="z-0 absolute px-16 top-0 left-0 h-96 w-full object-cover" src="/assets/heor.jpg" alt="" />
            </div>
            <main className=' relative z-20'>
                <article className='bg-transparent pt-44'>
                    <header className="mx-auto    max-w-screen-lg rounded-t-lg bg-white pt-16 text-center shadow-lg ">

                        <h1 className="mt-2 text-4xl font-bold text-primaryText sm:text-5xl">Acoustic Emission Testing (AE)</h1>
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
                            <h2 className="text-2xl font-semibold mb-8">What is Acoustic Emission Testing</h2>
                            <blockquote className="w-full  border-l-4 px-4">
                                Acoustic Emission Testing is a versatile NDT method used in a wide range of applications to monitor, detect, and evaluate defects, structural changes, and potential failure mechanisms in materials and structures. Its real-time monitoring capabilities make it particularly valuable in safety-critical industries where early detection of damage can prevent catastrophic failures and ensure the long-term reliability of assets.

                            </blockquote>
                        </div>
                        <p>AE testing observe, understand and monitor the release of acoustic waves from materials under stress or undergoing deformation, used to detect defects or monitor structural integrity, acoustic emission test monitors and analyses the acoustic waves emitted by materials and structures under stress or undergoing deformation.

                        </p>
                        <p>Structural Health Monitoring (SHM): AE is employed to continuously monitor the integrity of structures such as bridges, buildings, pipelines, and aerospace components. It can detect and assess the growth of defects, such as cracks, in real-time, allowing for timely maintenance and preventing catastrophic failures.</p>


                        <p>Pressure Vessels and Tanks: AE is used to detect and monitor the growth of defects like corrosion, pitting, and cracking in pressure vessels and storage tanks, ensuring their safe operation and compliance with industry standards.</p>

                        <p>Welding Inspection: During and after welding processes, AE can be utilized to identify weld quality issues, such as weld discontinuities or incomplete fusion..</p>

                        <p>Pipeline Inspection: AE is employed to monitor the integrity of pipelines for leaks, cracks, and other defects, particularly in oil and gas, water distribution, and chemical industries.</p>

                        <p>Composite Material Inspection: AE is used to detect and evaluate defects in composite materials used in aerospace, automotive, and other industries, where conventional NDT methods may be less effective.</p>

                        <p>Rock Mechanics and Mining: AE is applied to monitor the stability of rock masses in mines, tunnels, and civil engineering projects, helping to predict potential rock failures.</p>


                        <p>Concrete and Civil Structures: AE can be used to assess the health of concrete structures and identify early signs of damage, such as cracking and reinforcement corrosion.</p>


                        <p>Bolt and Fastener Inspection: AE is employed to monitor the integrity of bolts and fasteners in critical applications, such as aerospace and heavy machinery.</p>


                        <p>Fatigue Crack Growth Monitoring: AE can detect the growth of fatigue cracks in materials subjected to cyclic loading, helping to predict the remaining useful life of components.</p>

                        <p>Composite Pressure Vessels: AE is used to evaluate the integrity of composite pressure vessels, commonly used in the aerospace and transportation industries.</p>

                        <p>Power Generation Equipment: AE is applied to monitor the condition of turbines, generators, and other power generation equipment to detect potential defects and failures.</p>
                    </div>
                </article>
            </main>

            <div className="w-fit mx-auto mt-10 flex space-x-2">
                <div className="h-0.5 w-2 bg-gray-600"></div>
                <div className="h-0.5 w-32 bg-gray-600"></div>
                <div className="h-0.5 w-2 bg-gray-600"></div>
            </div>

            <aside aria-label="Recent Posts" className="mx-auto mt-10 max-w-screen-xl py-20">
                <div className="mx-auto max-w-screen-xl px-4 md:px-8">
                    {/* <!-- Heading --> */}
                    <div className="mb-10 md:mb-16">
                        <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">Most Recent Posts</h2>
                        <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint necessitatibus molestias explicabo.</p>
                    </div>
                    {/* <!-- /Heading --> */}
                    <div className="grid gap-8 sm:grid-cols-2 sm:gap-12 lg:grid-cols-2 xl:grid-cols-2 xl:gap-16">
                        {/* <!-- Article --> */}
                        <article className="flex flex-col items-center gap-4 md:flex-row lg:gap-6">
                            <a href="#" className="group shrink-0 relative block h-56 w-full self-start overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-24 md:w-24 lg:h-40 lg:w-40">
                                <img src="https://images.unsplash.com/photo-1476362555312-ab9e108a0b7e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" loading="lazy" alt="" className="group-hover:scale-110 absolute inset-0 h-full w-full object-cover object-center transition duration-200" />
                            </a>

                            <div className="flex flex-col gap-2">
                                <span className="text-sm text-gray-400">April 2, 2022</span>

                                <h2 className="text-xl font-bold text-gray-800">
                                    <a href="#" className="active:text-rose-600 transition duration-100 hover:text-rose-500">The Pines and the Mountains</a>
                                </h2>

                                <p className="text-gray-500">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint necessitatibus molestias explicabo.</p>

                                <div>
                                    <a href="#" className="active:text-rose-700 font-semibold text-rose-500 transition duration-100 hover:text-rose-600">Read more</a>
                                </div>
                            </div>
                        </article>
                        {/* <!-- /Article --> */}
                        {/* 
                        <!-- Article --> */}
                        <article className="flex flex-col items-center gap-4 md:flex-row lg:gap-6">
                            <a href="#" className="group shrink-0 relative block h-56 w-full self-start overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-24 md:w-24 lg:h-40 lg:w-40">
                                <img src="https://images.unsplash.com/photo-1511376777868-611b54f68947?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" loading="lazy" alt="" className="group-hover:scale-110 absolute inset-0 h-full w-full object-cover object-center transition duration-200" />
                            </a>

                            <div className="flex flex-col gap-2">
                                <span className="text-sm text-gray-400">April 2, 2022</span>

                                <h2 className="text-xl font-bold text-gray-800">
                                    <a href="#" className="active:text-rose-600 transition duration-100 hover:text-rose-500">The Coding Mania</a>
                                </h2>

                                <p className="text-gray-500">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint necessitatibus molestias explicabo.</p>

                                <div>
                                    <a href="#" className="active:text-rose-700 font-semibold text-rose-500 transition duration-100 hover:text-rose-600">Read more</a>
                                </div>
                            </div>
                        </article>
                        {/* <!-- /Article --> */}

                        {/* <!-- Article --> */}
                        <article className="flex flex-col items-center gap-4 md:flex-row lg:gap-6">
                            <a href="#" className="group shrink-0 relative block h-56 w-full self-start overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-24 md:w-24 lg:h-40 lg:w-40">
                                <img src="https://images.unsplash.com/photo-1496395031280-4201b0e022ca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" loading="lazy" alt="" className="group-hover:scale-110 absolute inset-0 h-full w-full object-cover object-center transition duration-200" />
                            </a>

                            <div className="flex flex-col gap-2">
                                <span className="text-sm text-gray-400">April 2, 2022</span>

                                <h2 className="text-xl font-bold text-gray-800">
                                    <a href="#" className="active:text-rose-600 transition duration-100 hover:text-rose-500">Architectural Warfare</a>
                                </h2>

                                <p className="text-gray-500">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint necessitatibus molestias explicabo.</p>

                                <div>
                                    <a href="#" className="active:text-rose-700 font-semibold text-rose-500 transition duration-100 hover:text-rose-600">Read more</a>
                                </div>
                            </div>
                        </article>
                        {/* <!-- /Article --> */}

                        {/* <!-- Article --> */}
                        <article className="flex flex-col items-center gap-4 md:flex-row lg:gap-6">
                            <a href="#" className="group shrink-0 relative block h-56 w-full self-start overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-24 md:w-24 lg:h-40 lg:w-40">
                                <img src="https://images.unsplash.com/photo-1510081887155-56fe96846e71?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80" loading="lazy" alt="" className="group-hover:scale-110 absolute inset-0 h-full w-full object-cover object-center transition duration-200" />
                            </a>

                            <div className="flex flex-col gap-2">
                                <span className="text-sm text-gray-400">April 2, 2022</span>

                                <h2 className="text-xl font-bold text-gray-800">
                                    <a href="#" className="active:text-rose-600 transition duration-100 hover:text-rose-500">Blues in Architechture</a>
                                </h2>

                                <p className="text-gray-500">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint necessitatibus molestias explicabo.</p>

                                <div>
                                    <a href="#" className="active:text-rose-700 font-semibold text-rose-500 transition duration-100 hover:text-rose-600">Read more</a>
                                </div>
                            </div>
                        </article>
                        {/* <!-- /Article --> */}
                    </div>
                </div>
            </aside>

        </section>
    );
};

export default MicroscopicTestingpage;