import Image from 'next/image';
import React from 'react';

const page = () => {
    const getRandomColorClass = () => {
        const colors = ['red', 'lime', 'blue', 'amber', 'purple', 'orange'];
        const randomIndex = Math.floor(Math.random() * colors.length);
        const randomColor = colors[randomIndex];
        const randomColorClass = `bg-${randomColor}-300`;
        return randomColorClass;
    };

    return (
        <>
            <div className="max-w-screen-xl mx-auto">
                <div className="bg-white font-family-karla">
                    <div className="container mx-auto flex flex-wrap py-6">

                        {/* <!-- Posts Section --> */}
                        <section className="w-full md:w-2/3  overflow-hidden flex flex-col items-center px-3">

                            <div>
                                <article className="flex flex-col max-w-full overflow-hidden shadow my-4 ">
                                    <div className="hover:opacity-75 w-full h-80 overflow-hidden">
                                        <Image
                                            src='/assets/heor.jpg'
                                            alt="art cover"
                                            loading="lazy"
                                            width={1000}
                                            height={300}
                                            objectFit='cover'
                                            objectPosition='center'
                                            className="h-full  sm:h-full w-full object-cover object-center transition duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="bg-white flex flex-col justify-start p-6">
                                        <p className="text-blue-700 text-sm font-bold uppercase pb-4">Design Services</p>
                                        <p className="text-3xl font-bold hover:text-gray-700 pb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat eveniet culpa sequi!</p>
                                        <div className="text-sm pb-3">

                                            <p className="font-semibold hover:text-gray-800">By Example Name</p>
                                            Contact: Lorem ipsum dolor sit.
                                        </div>
                                        <p className="pb-6">
                                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet accusamus voluptatum, blanditiis nobis recusandae asperiores. Dolor tenetur, sapiente aut necessitatibus nobis iure officiis corporis impedit fuga praesentium unde dolorum rerum porro deleniti ipsa nemo! Aspernatur voluptas qui sequi nostrum quisquam?

                                        </p>
                                        <p className="uppercase text-gray-800 hover:text-black">Continue Reading <i className="fas fa-arrow-right"></i></p>
                                    </div>
                                </article>
                                <article className="flex flex-col max-w-full overflow-hidden shadow my-4 ">
                                    <div className="hover:opacity-75 w-full h-80 overflow-hidden">
                                        <Image
                                            src='/assets/heor.jpg'
                                            alt="art cover"
                                            loading="lazy"
                                            width={1000}
                                            height={300}
                                            objectFit='cover'
                                            objectPosition='center'
                                            className="h-full  sm:h-full w-full object-cover object-center transition duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="bg-white flex flex-col justify-start p-6">
                                        <p className="text-blue-700 text-sm font-bold uppercase pb-4">Design Services</p>
                                        <p className="text-3xl font-bold hover:text-gray-700 pb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat eveniet culpa sequi!</p>
                                        <div className="text-sm pb-3">

                                            <p className="font-semibold hover:text-gray-800">By Example Name</p>
                                            Contact: Lorem ipsum dolor sit.
                                        </div>
                                        <p className="pb-6">
                                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet accusamus voluptatum, blanditiis nobis recusandae asperiores. Dolor tenetur, sapiente aut necessitatibus nobis iure officiis corporis impedit fuga praesentium unde dolorum rerum porro deleniti ipsa nemo! Aspernatur voluptas qui sequi nostrum quisquam?

                                        </p>
                                        <p className="uppercase text-gray-800 hover:text-black">Continue Reading <i className="fas fa-arrow-right"></i></p>
                                    </div>
                                </article>
                            </div>


                            {/* <!-- Pagination --> */}
                            {/* {
                data?.blogs &&
                <div className="flex items-center py-8">
                  <p className="h-10 w-10 bg-blue-800 hover:bg-blue-600 font-semibold text-white text-sm flex items-center justify-center">1</p>
                  <p className="h-10 w-10 font-semibold text-gray-800 hover:bg-blue-600 hover:text-white text-sm flex items-center justify-center">2</p>
                  <p className="h-10 w-10 font-semibold text-gray-800 hover:text-gray-900 text-sm flex items-center justify-center ml-3">Next <i className="fas fa-arrow-right ml-2"></i></p>
                </div>
              } */}


                        </section>

                        {/* <!-- Sidebar Section --> */}
                        <aside className="w-full md:w-1/3 flex flex-col items-center px-3">

                            <div className="w-full bg-white shadow flex flex-col my-4 p-6">
                                <p className="text-xl font-semibold pb-5">About Us</p>
                                <p className="pb-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas mattis est eu odio sagittis tristique. Vestibulum ut finibus leo. In hac habitasse platea dictumst.</p>
                                <p className="w-full bg-blue-800 text-white font-bold text-sm uppercase rounded hover:bg-blue-700 flex items-center justify-center px-2 py-3 mt-4">
                                    Get to know us
                                </p>
                            </div>

                            <div className="w-full bg-white shadow  my-4 p-6">
                                <div className="w-full  px-3">
                                    {/* <!-- topics --> */}
                                    <div className="mb-4">
                                        <h5 className="font-bold text-lg uppercase text-gray-700 px-1 mb-2">
                                            {' '}
                                            Popular Topics{' '}
                                        </h5>
                                        <ul>
                                            <div className="px-1 py-4 border-b border-t border-white hover:border-gray-200 transition duration-300">
                                                <p
                                                    className="flex items-center text-gray-600 cursor-pointer"
                                                >
                                                    <span className={`inline-block h-4 w-4 ${getRandomColorClass()} mr-3`}></span>
                                                    Upcomming
                                                    <span className="text-gray-500 ml-auto">05</span>
                                                    <i className="text-gray-500 bx bx-right-arrow-alt ml-1"></i>
                                                </p>
                                            </div>
                                            <div className="px-1 py-4 border-b border-t border-white hover:border-gray-200 transition duration-300">
                                                <p
                                                    className="flex items-center text-gray-600 cursor-pointer"
                                                >
                                                    <span className={`inline-block h-4 w-4 ${getRandomColorClass()} mr-3`}></span>
                                                    This Weeked
                                                    <span className="text-gray-500 ml-auto">05</span>
                                                    <i className="text-gray-500 bx bx-right-arrow-alt ml-1"></i>
                                                </p>
                                            </div>
                                            <div className="px-1 py-4 border-b border-t border-white hover:border-gray-200 transition duration-300">
                                                <p
                                                    className="flex items-center text-gray-600 cursor-pointer"
                                                >
                                                    <span className={`inline-block h-4 w-4 ${getRandomColorClass()} mr-3`}></span>
                                                    Next mounth
                                                    <span className="text-gray-500 ml-auto">05</span>
                                                    <i className="text-gray-500 bx bx-right-arrow-alt ml-1"></i>
                                                </p>
                                            </div>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                        </aside>

                    </div>




                </div>
            </div >
        </>
    );
};

export default page;