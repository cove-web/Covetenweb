import Button from '@/components/Button';
import React from 'react';

const Hero = () => {

    const styles = {
        background: `linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(19,19,26,0) 81%, rgba(20,3,66,0) 82%), url('/assets/track.png')`,
        // backgroundImage: `url('/assets/track.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        brigthness: '50%',
    }

    return (
        <section style={styles} className="text-gray-600 body-font px-16 min-h-screen relative">
            {/* <div className='absolute top-7 right-5'>
                <svg xmlns="http://www.w3.org/2000/svg" width="631" height="665" viewBox="0 0 631 665" fill="none">
                    <path d="M1 2L77 32V70.5L68.5 102L41.5 185.5L155 225C158 226 166 227.7 174 226.5C182 225.3 195.667 219.667 201.5 217H204.5L209 218.5L211 220.5L214.5 226.5L236.5 286.5L239 291.5L242 295.5L248 305L251 312L252.5 319.5L254 328L255.5 339L256.5 345L259 352.5L261.5 357.5L263 362V367V372.5L264.5 377L273 400L280.5 408.5L293 418.5L298 428L299.5 434L408.5 400L413 409.5L420.5 422.5L429.5 433L440 444L448 448.5L456 449.5L465.5 451L470 452.5L477.5 457.5L481.5 463.5L485 470.5L489 486.5L502 500L521 518L526.5 527L535 551L537.5 563L539 573V581.5L540 585.5L562.5 654.5L572.5 652.5H579.5L585 654.5L598 662.5H601.5L629.5 652.5" stroke="#408dfb" strokeWidth="4" />
                </svg>
            </div> */}
            <div className=" py-24 md:flex-row max-w-2xl w-full">
                <div className="w-full lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                    <h1 className="title-font sm:text-4xl text-3xl mb-4 font-bold text-primaryText">Find Your Shipment Item Quickly and Accurately</h1>
                    <p className="mb-8 leading-relaxed text-sm text-dimText">Chillwave portland ugh, knausgaard fam polaroid iPhone. Man braid swag typewriter affogato, hella selvage wolf narwhal dreamcatcher.</p>
                    <div className="flex w-full md:justify-start justify-center items-end">
                        <div className="relative mr-4 md:w-full lg:w-full xl:w-1/2 w-2/4">
                            <label htmlFor="hero-field" className="leading-7 text-sm text-gray-600">Enter Tracking Id</label>
                            <input type="text" id="hero-field" name="hero-field" className="w-full bg-gray-100 rounded border bg-opacity-50 border-gray-300 focus:ring-2 focus:ring-indigo-200 focus:bg-transparent focus:border-primary text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                        <Button title='Search' />
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Hero;