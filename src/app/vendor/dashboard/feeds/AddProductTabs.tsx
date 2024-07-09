
'use client';

import { Fragment, useEffect, useState } from 'react';
import { Tab } from '@headlessui/react';

import Link from 'next/link';
import ProductTable from './ProductTable';
import AddProduct from './AddProduct';
import { addProductVariables } from './Main';
import { Product } from '@/gql/graphql';

interface IAddProductTabsProps {
    addNewProductFn: (input: addProductVariables) => void,
    productData: Product[]
    deleteProduct: (id: string) => void
    addToHome: (id: string, status: boolean, type: string) => void
}





function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}


const AddProductTabs = ({ addNewProductFn, productData, deleteProduct, addToHome }: IAddProductTabsProps) => {
    const [tab, setTab] = useState(0);
    return (
        <div className="w-full  bg-transprent  dark:bg-darkBg p-2 lg:p-7 rounded ">
            <Tab.Group selectedIndex={tab} onChange={setTab}>
                <div className="flex items-center justify-between mb-3">
                    <div className="mb-3">
                        <h4 className="text-primary-main font-semibold text-xl">
                            Feed
                        </h4>
                    </div>
                    <div className=''>
                        <Tab.List className="flex space-x-1 rounded-sm bg-gray-100 p-1 max-w-xs mx-auto">
                            <Tab
                                className={({ selected }) =>
                                    classNames(
                                        'w-52 rounded-sm py-2.5 text-sm font-medium leading-5 text-gray-900',
                                        '',
                                        selected
                                            ? 'bg-transprent  '
                                            : 'text-gray hover:bg-blue/[0.12] hover:text-blue'
                                    )
                                }
                            >
                                Feeds
                            </Tab>
                            <Tab
                                className={({ selected }) =>
                                    classNames(
                                        'w-52 rounded-sm py-2.5 text-sm font-medium leading-5 text-gray-900',
                                        '',
                                        selected
                                            ? 'bg-transprent  '
                                            : 'text-gray hover:bg-blue/[0.12] hover:text-blue'
                                    )
                                }
                            >
                                Create Feed
                            </Tab>
                        </Tab.List>
                    </div>
                </div>
                <div className="w-full mt-16">


                    <Tab.Panels>
                        <Tab.Panel>
                            <div className="w-full min-h-screen bg-transprent rounded-xl mt-2 py-2  -md">
                                <ProductTable productData={productData} deleteProduct={deleteProduct} addToHome={addToHome} />
                            </div>

                        </Tab.Panel>
                        <Tab.Panel>
                            <div className="w-full min-h-screen bg-transprent rounded-xl mt-2 py-2  -md">
                                <AddProduct addNewProductFn={addNewProductFn} setTab={setTab} />
                            </div>
                        </Tab.Panel>
                    </Tab.Panels>

                </div>
            </Tab.Group>

        </div >
    );
};

export default AddProductTabs;