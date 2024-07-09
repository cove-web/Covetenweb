import React from 'react';

interface IButton {
    title: string;
    padding?: string;
    margin?: string;
    type?: string;
}

const Button = ({ title, padding, margin, type }: IButton) => {


    return (
        <button className={``}>
            {title}
        </button>
    );
};

export default Button;
