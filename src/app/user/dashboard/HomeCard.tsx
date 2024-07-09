import React from 'react';
interface IHomeCardProps {
    title: string;
    value: string;
}

const HomeCard = ({ title, value }: IHomeCardProps) => {
    return (
        <div className='lg:min-h-[100px] xl:min-h-[120px] h-full p-5 border border-desktopPrimaryLight'>
            <p className='text-desktopTextLight font-semibold text-sm md:text-sm  lg:text-sm xl:text-lg'>{title}</p>
            <h1 className='text-lg md:text-xl lg:text-3xl  xl:text-5xl   font-extrabold text-desktopPrimary'>{value}</h1>
        </div>
    );
};

export default HomeCard;