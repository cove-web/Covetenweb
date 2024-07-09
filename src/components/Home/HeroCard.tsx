import React from 'react';
import SearchInput from './SearchInput';

interface HeroProps {
    text: string
    image: string
}






const HeroCard = ({ text, image }: HeroProps) => {


    const style = {
        background: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100%',
        width: '100%',


    }




    return (
        <div style={style} className=" h-screen  lg:min-h-[110vh] pt-14 lg:pt-0">

            {/* <img className="absolute -z-10 inset-0 w-full h-full object-cover object-top" src={image} width="400" height="500" alt="hero background image" />
            <div aria-hidden="true" className="absolute -z-[55555555555555555] inset-0 w-full h-full bg-gray-800 bg-opacity-30 backdrop-blur-[0px] bg-gradient-to-b from-black/90 to-black/10"></div> */}
            <div className=" container m-auto px-6 md:px-12 lg:px-6">
                <div className="mb-12 pt-7 space-y-16 md:mb-20 md:pt-40 lg:w-8/12 lg:mx-auto">
                    <h1 className="text-white text-center text-2xl font-bold sm:text-4xl md:text-5xl lg:leading-normal " style={{textAlign:"left"}}>
                        {text}
                    </h1>
                    <SearchInput />
                </div>

            </div>
        </div >
    );
};

export default HeroCard;