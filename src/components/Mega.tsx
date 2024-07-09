import React from 'react';

const MegaMenu = () => {
    return (
        <nav className="relative bg-white border-b-2 border-gray-300 text-gray-900">
            <div className="container mx-auto flex justify-between">
                <div className="relative block p-4 lg:p-6 text-xl text-teal-600 font-bold">
                    <a href="#" className="hover:text-teal-900">Logo</a>
                </div>
                <ul className="flex">

                    {/* <!--Regular Link--> */}
                    <li className="hover:bg-teal-700 hover:text-white">
                        <a href="#" className="relative block py-6 px-2 lg:p-6 text-sm lg:text-base font-bold">navlink</a>
                    </li>

                    {/* <!--Toggleable Link--> */}
                    <li className="toggleable hover:bg-teal-700 hover:text-white">
                        <input type="checkbox" value="selected" id="toggle-one" className="toggle-input" />
                        <label htmlFor="toggle-one" className="block cursor-pointer py-6 px-4 lg:p-6 text-sm lg:text-base font-bold">Click to show</label>
                        <div role="toggle" className="p-6 mega-menu mb-16 sm:mb-0 shadow-xl bg-teal-700">
                            <div className="container  w-full flex flex-wrap justify-between mx-2">
                                <ul className="px-4 w-full sm:w-1/2 lg:w-1/4 border-gray-600 border-b sm:border-r lg:border-b-0 pb-6 pt-6 lg:pt-3">
                                    <h3 className="font-bold text-xl text-white text-bold mb-2">Bespin</h3>
                                    <li>
                                        <a href="#" className="block p-3 hover:bg-teal-900 text-gray-300 hover:text-white">Lando Calrissian</a>
                                    </li>
                                    <li>
                                        <a href="#" className="block p-3 hover:bg-teal-900 text-gray-300 hover:text-white">Nien Nunb</a>
                                    </li>
                                    <li>
                                        <a href="#" className="block p-3 hover:bg-teal-900 text-gray-300 hover:text-white">Mon Mothma</a>
                                    </li>
                                    <li>
                                        <a href="#" className="block p-3 hover:bg-teal-900 text-gray-300 hover:text-white">Wedge Antilles</a>
                                    </li>
                                    <li>
                                        <a href="#" className="block p-3 hover:bg-teal-900 text-gray-300 hover:text-white">Admiral Gial Ackbar</a>
                                    </li>
                                </ul>
                                <ul className="px-4 w-full sm:w-1/2 lg:w-1/4 border-gray-600 border-b sm:border-r-0 lg:border-r lg:border-b-0 pb-6 pt-6 lg:pt-3">
                                    <h3 className="font-bold text-xl text-white text-bold mb-2">Ahch-To</h3>
                                    <li>
                                        <a href="#" className="block p-3 hover:bg-teal-900 text-gray-300 hover:text-white">Obi-Wan Kenobi</a>
                                    </li>
                                    <li>
                                        <a href="#" className="block p-3 hover:bg-teal-900 text-gray-300 hover:text-white">Yoda</a>
                                    </li>
                                    <li>
                                        <a href="#" className="block p-3 hover:bg-teal-900 text-gray-300 hover:text-white">Emperor Palpatine</a>
                                    </li>
                                    <li>
                                        <a href="#" className="block p-3 hover:bg-teal-900 text-gray-300 hover:text-white">Han Solo</a>
                                    </li>
                                    <li>
                                        <a href="#" className="block p-3 hover:bg-teal-900 text-gray-300 hover:text-white">Anakin Skywalker/Darth Vader</a>
                                    </li>
                                </ul>
                                <ul className="px-4 w-full sm:w-1/2 lg:w-1/4 border-gray-600 border-b sm:border-b-0 sm:border-r md:border-b-0 pb-6 pt-6 lg:pt-3">
                                    <h3 className="font-bold text-xl text-white text-bold">Coruscant</h3>
                                    <li>
                                        <a href="#" className="block p-3 hover:bg-teal-900 text-gray-300 hover:text-white">Luke Skywalker</a>
                                    </li>
                                    <li>
                                        <a href="#" className="block p-3 hover:bg-teal-900 text-gray-300 hover:text-white">Princess Leia</a>
                                    </li>
                                    <li>
                                        <a href="#" className="block p-3 hover:bg-teal-900 text-gray-300 hover:text-white">Chewbacca</a>
                                    </li>
                                    <li>
                                        <a href="#" className="block p-3 hover:bg-teal-900 text-gray-300 hover:text-white">R2-D2</a>
                                    </li>
                                    <li>
                                        <a href="#" className="block p-3 hover:bg-teal-900 text-gray-300 hover:text-white">C-3PO</a>
                                    </li>
                                </ul>
                                <ul className="px-4 w-full sm:w-1/2 lg:w-1/4 border-gray-600 pb-6 pt-6 lg:pt-3">
                                    <h3 className="font-bold text-xl text-white text-bold mb-2">Endor</h3>
                                    <li className="pt-3">
                                        <img src="https://placehold.it/205x172" />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </li>
                    {/* <!-- end Toggleable Link-->


                    <!--Hoverable Link--> */}
                    <li className="hoverable hover:bg-teal-700 hover:text-white">
                        <a href="#" className="relative block py-6 px-4 lg:p-6 text-sm lg:text-base font-bold hover:bg-teal-700 hover:text-white">Hover to show</a>
                        <div className="p-6 mega-menu mb-16 sm:mb-0 shadow-xl bg-teal-700">
                            <div className="container mx-auto w-full flex flex-wrap justify-between mx-2">
                                <div className="w-full text-white mb-8 text-center">
                                    <h2 className="font-bold text-2xl">Listen, why don’t you wait out by the speeder.</h2>
                                    <p>our droids. They’ll have to wait outside. We don’t want them here.</p>
                                </div>
                                <ul className="px-4 w-full sm:w-1/2 lg:w-1/4 border-gray-600 border-b sm:border-r lg:border-b-0 pb-6 pt-6 lg:pt-3">
                                    <div className="flex items-center">
                                        <svg className="h-8 mb-3 mr-3 fill-current text-white"
                                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                            <path d="M3 6c0-1.1.9-2 2-2h8l4-4h2v16h-2l-4-4H5a2 2 0 0 1-2-2H1V6h2zm8 9v5H8l-1.67-5H5v-2h8v2h-2z" />
                                        </svg>
                                        <h3 className="font-bold text-xl text-white text-bold mb-2">Tatooine</h3>
                                    </div>
                                    <p className="text-gray-100 text-sm">Thul klivian doldur thisspiasian calrissian. Garindan d8 aurra  sola tarpals.</p>
                                    <div className="flex items-center py-3">
                                        <svg className="h-6 pr-3 fill-current text-teal-300"
                                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                            <path d="M20 10a10 10 0 1 1-20 0 10 10 0 0 1 20 0zm-2 0a8 8 0 1 0-16 0 8 8 0 0 0 16 0zm-8 2H5V8h5V5l5 5-5 5v-3z" />
                                        </svg>
                                        <a href="#" className="text-white bold border-b-2 border-teal-300 hover:text-teal-900">Find out more...</a>
                                    </div>
                                </ul>
                                <ul className="px-4 w-full sm:w-1/2 lg:w-1/4 border-gray-600 border-b sm:border-r-0 lg:border-r lg:border-b-0 pb-6 pt-6 lg:pt-3">
                                    <div className="flex items-center">
                                        <svg className="h-8 mb-3 mr-3 fill-current text-white"
                                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                            <path d="M4.13 12H4a2 2 0 1 0 1.8 1.11L7.86 10a2.03 2.03 0 0 0 .65-.07l1.55 1.55a2 2 0 1 0 3.72-.37L15.87 8H16a2 2 0 1 0-1.8-1.11L12.14 10a2.03 2.03 0 0 0-.65.07L9.93 8.52a2 2 0 1 0-3.72.37L4.13 12zM0 4c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4z" />
                                        </svg>
                                        <h3 className="font-bold text-xl text-white text-bold mb-2">Cantonica</h3>
                                    </div>
                                    <p className="text-gray-100 text-sm">Thul klivian doldur thisspiasian calrissian. Garindan d8 aurra  tund polisi sola tarpals.</p>
                                    <div className="flex items-center py-3">
                                        <svg className="h-6 pr-3 fill-current text-teal-300"
                                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                            <path d="M20 10a10 10 0 1 1-20 0 10 10 0 0 1 20 0zm-2 0a8 8 0 1 0-16 0 8 8 0 0 0 16 0zm-8 2H5V8h5V5l5 5-5 5v-3z" />
                                        </svg>
                                        <a href="#" className="text-white bold border-b-2 border-teal-300 hover:text-teal-900">Find out more...</a>
                                    </div>
                                </ul>
                                <ul className="px-4 w-full sm:w-1/2 lg:w-1/4 border-gray-600 border-b sm:border-b-0 sm:border-r md:border-b-0 pb-6 pt-6 lg:pt-3">
                                    <div className="flex items-center">
                                        <svg className="h-8 mb-3 mr-3 fill-current text-white"
                                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                            <path d="M2 4v14h14v-6l2-2v10H0V2h10L8 4H2zm10.3-.3l4 4L8 16H4v-4l8.3-8.3zm1.4-1.4L16 0l4 4-2.3 2.3-4-4z" />
                                        </svg>
                                        <h3 className="font-bold text-xl text-white text-bold mb-2">Yavin 4</h3>
                                    </div>
                                    <p className="text-gray-100 text-sm">Thul klivian doldur thisspiasian calrissian. Garindan d8 aurra tund polis sola tarpals.</p>
                                    <div className="flex items-center py-3">
                                        <svg className="h-6 pr-3 fill-current text-teal-300"
                                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                            <path d="M20 10a10 10 0 1 1-20 0 10 10 0 0 1 20 0zm-2 0a8 8 0 1 0-16 0 8 8 0 0 0 16 0zm-8 2H5V8h5V5l5 5-5 5v-3z" />
                                        </svg>
                                        <a href="#" className="text-white bold border-b-2 border-teal-300 hover:text-teal-900">Find out more...</a>
                                    </div>
                                </ul>
                                <ul className="px-4 w-full sm:w-1/2 lg:w-1/4 border-gray-600 pb-6 pt-6 lg:pt-3">
                                    <div className="flex items-center">
                                        <svg className="h-8 mb-3 mr-3 fill-current text-white"
                                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                            <path d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z" />
                                        </svg>
                                        <h3 className="font-bold text-xl text-white text-bold mb-2">Alderaan</h3>
                                    </div>
                                    <p className="text-gray-100 text-sm">Thul klivian doldur thisspiasian calrissian. Garindan d8 aurra tund polis  sola tarpals.</p>
                                    <div className="flex items-center py-3">
                                        <svg className="h-6 pr-3 fill-current text-teal-300"
                                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                            <path d="M20 10a10 10 0 1 1-20 0 10 10 0 0 1 20 0zm-2 0a8 8 0 1 0-16 0 8 8 0 0 0 16 0zm-8 2H5V8h5V5l5 5-5 5v-3z" />
                                        </svg>
                                        <a href="#" className="text-white bold border-b-2 border-teal-300 hover:text-teal-900">Find out more...</a>
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </li>


                </ul>
            </div>
        </nav>
    );
};

export default MegaMenu;
