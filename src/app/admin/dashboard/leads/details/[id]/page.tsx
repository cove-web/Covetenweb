
import { Leads } from '@/gql/graphql';
import Cookies from 'js-cookie';
import React from 'react';
import Main from './Main';





const leadInfo = async ({ params }: { params: any }) => {



    return (
        <div className='bg-white rounded-md px-2 lg:px-8'>
            <h4 className=' text-3xl font-semibold pt-8'>Lead Details</h4>
            <Main id={params.id} />
        </div>
    );
};

export default leadInfo;