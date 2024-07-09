import React from 'react';

const ProductSkeleton = () => {
    return (
        <>
            <section className="bg-white dark:bg-gray-900">
                <div className="container px-6 py-10 mx-auto animate-pulse">

                    <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="w-full ">
                            <div className="w-full h-72  bg-gray-300 rounded-lg  dark:bg-gray-600"></div>



                        </div>

                        <div className="w-full ">
                            <div className="w-full h-72  bg-gray-300 rounded-lg  dark:bg-gray-600"></div>



                        </div>

                        <div className="w-full ">
                            <div className="w-full h-72  bg-gray-300 rounded-lg  dark:bg-gray-600"></div>



                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ProductSkeleton;