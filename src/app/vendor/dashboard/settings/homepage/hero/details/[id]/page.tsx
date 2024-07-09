import React from 'react';
import Main from './Main';

const ProductDetails = () => {
    return (
        <div className='bg-white p-7'>
            <div>
                <h2 className="text-2xl font-semibold leading-tight mb-10">Item Details</h2>
            </div>
            <Main />
        </div>
    );
};

export default ProductDetails;