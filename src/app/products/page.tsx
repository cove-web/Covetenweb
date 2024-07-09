import React from 'react';
import Sidebar from './Sidebar';
import Image from 'next/image';
import Link from 'next/link';
import Main from './Main';


const ProductPage = ({ params, searchParams }: any) => {

    return (
        <Sidebar>
            <>
                <Main />


            </>
        </Sidebar>
    );
};

export default ProductPage;