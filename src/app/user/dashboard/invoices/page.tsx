

import React from 'react';
import Main from './Main';





// component
const InvoicePage = () => {




    return (
        <div className='p-4 h-full max-h-screen w-full  flex flex-col space-y-4 bg-white min-h-[70vh]' style={{backgroundColor:'rgba(232, 232, 232, 0.5)'}}>


            {/* table sections  */}

            <section className='overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch w-full'>
                <div className=' w-full  py-3 text-sm font-semibold px-4 grid grid-cols-7 rounded min-w-[700px] overflow-x-scroll lg:overflow-hidden'>
                    <p>Serial No.</p>
                    <p className='col-span-2'>Id</p>
                    <p>Total Price</p>
                    <p>Status</p>
                    <p className='col-span-2 text-center'>Quick Actions</p>
                </div>

                <Main />

            </section>


        </div>
    );
};

export default InvoicePage;