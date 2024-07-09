import React from 'react';

interface IButtonProps {
    title: string;
}

const Button = ({ title }: IButtonProps) => {
    return (
        <button className='gradient-bg rounded font-bold text-white px-7 py-2.5'>
            {title}
        </button>
    );
};

export default Button;