import { Product } from '@/gql/graphql';
import deleteImage from '@/shared/deleteImage';
import Link from 'next/link';
import React from 'react';


interface IProductTableProps {
    productData: Product[]
    deleteProduct: (id: string) => void
    addToHome: (id: string, status: boolean, type: string) => void
}

const ProductTable = ({ productData, deleteProduct, addToHome }: IProductTableProps) => {



    return (
        <table className="w-full leading-normal">


            <thead>
                <tr>

                    <th
                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase ">
                        Serial No.
                    </th>
                    <th
                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase ">
                        Name
                    </th>

                    <th
                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase ">
                        Price
                    </th>
                    <th
                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase ">
                        Added Date
                    </th>

                    <th
                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase ">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    productData && productData?.map((item, i) =>
                        <tr key={i}>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
                                <div className="flex items-center justify-center font-semibold text-base">

                                    {i + 1}
                                </div>
                            </td>

                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
                                <div className="flex items-center">

                                    <div className="">
                                        <p className="text-gray-700 font-bold  whitespace-nowrap ">
                                            {item?.title?.slice(0, 40)}
                                        </p>
                                    </div>
                                </div>
                            </td>


                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
                                <p className="text-gray-700  whitespace-nowrap  ">
                                    {item?.price}
                                </p>
                            </td>
                            <td className="px-3 py-5 border-b border-gray-200 bg-white text-xs">
                                <p className="text-gray-700  whitespace-nowrap  ">
                                    {item?.createdAt?.slice(0, 10)}
                                </p>
                            </td>

                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
                                <div className="relative flex items-center justify-center  space-x-4 px-8 ">

                                    <Link href={`/admin/dashboard/settings/products/details/${item?.id}`} className="focus:ring-2 focus:ring-offset-2  text-xs leading-none text-primary py-2 px-2 bg-primary/20 rounded  focus:outline-none">Update</Link>
                                    {
                                        item.isPopular ?
                                            <button onClick={() => addToHome(item?.id, false, 'popular')} className="focus:ring-2 focus:ring-offset-2  text-xs leading-none text-red-700 py-2 px-2 bg-red-100 rounded  focus:outline-none">Remove from Popular</button>
                                            :
                                            <button onClick={() => addToHome(item?.id, true, 'popular')} className="focus:ring-2 focus:ring-offset-2  text-xs leading-none text-green-800 py-2 px-2 bg-green-100  rounded  focus:outline-none">Make Popular</button>
                                    }
                                    {
                                        item.isSpecial ?
                                            <button onClick={() => addToHome(item?.id, false, 'spacial')} className="focus:ring-2 focus:ring-offset-2  text-xs leading-none text-red-700 py-2 px-2 bg-red-100 rounded  focus:outline-none">Remove from Spacial</button>
                                            :
                                            <button onClick={() => addToHome(item?.id, true, 'spacial')} className="focus:ring-2 focus:ring-offset-2  text-xs leading-none text-green-800 py-2 px-2 bg-green-100  rounded  focus:outline-none">Make Spacial</button>
                                    }
                                    <button onClick={() => {
                                        deleteProduct(item.id)
                                        deleteImage(item?.image as string)
                                        deleteImage(item?.sideImage as string)

                                    }} className="focus:ring-2 focus:ring-offset-2  text-xs leading-none text-red-700 py-2 px-2 bg-red-100 rounded  focus:outline-none">Delete</button>

                                </div>
                            </td>
                        </tr>)
                }





            </tbody>
            {/* <TicketModal isOpen={isOpen} setIsOpen={setIsOpen} /> */}
        </table>
    );
};

export default ProductTable