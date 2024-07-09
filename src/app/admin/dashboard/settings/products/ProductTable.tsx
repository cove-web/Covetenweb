import { Product } from '@/gql/graphql';
import deleteImage from '@/shared/deleteImage';
import Link from 'next/link';
import React, { useState } from 'react';
import ProductModal from './ProductModal';


interface IProductTableProps {
   productData: Product[];
   deleteProduct: (id: string) => void;
   addToHome: (id: string, status: boolean, type: string) => void;
   updateProduct: (id: string) => void; // Add updateProduct prop
}


const ProductTable = ({ productData, deleteProduct, addToHome, updateProduct }: IProductTableProps) => {
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);


   const handleOpenModal = (product: Product) => {
       setSelectedProduct(product);
       setIsModalOpen(true);
   };


   return (
       <>
           <table className="w-full leading-normal">
               <thead>
                   <tr>
                       <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase">
                           Serial No.
                       </th>
                       <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase">
                           Name
                       </th>
                       <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase">
                           Price
                       </th>
                       <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase">
                           Added Date
                       </th>
                       <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase">
                           Isapproved
                       </th>
                       <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase">
                           Action
                       </th>
                       <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase">
                           
                       </th>  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase">
                           
                       </th>  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase">
                           
                       </th>
                   </tr>
               </thead>
               <tbody>
                   {productData && productData.map((item: Product, i) => (
                       <tr key={i}>
                           <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
                               <div className="flex items-center justify-center font-semibold text-base">
                                   {i + 1}
                               </div>
                           </td>
                           <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
                               <div className="flex items-center">
                                   <div>
                                       <p className="text-gray-700 font-bold whitespace-nowrap">
                                           {item?.title?.slice(0, 40)}
                                       </p>
                                   </div>
                               </div>
                           </td>
                           <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
                               <p className="text-gray-700 whitespace-nowrap">
                                   {item?.price}
                               </p>
                           </td>
                           <td className="px-3 py-5 border-b border-gray-200 bg-white text-xs">
                               <p className="text-gray-700 whitespace-nowrap">
                                   {item?.createdAt?.slice(0, 10)}
                               </p>
                           </td>
                           <td className="px-5 py-5 cursor-pointer text-xs space-x-3 dark:bg-darkBg dark:border-darkBorder font-semibold">
                               <button
                                   onClick={() => handleOpenModal(item)}
                                   //
                                   className="relative inline-block px-4 py-1 rounded-md leading-tight">
                                   <span className="absolute"></span>
                                   <span className="relative font-bold text-[10px] uppercase">
                                       Approve
                                   </span>
                               </button>
                           </td>
                           <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
                               <div className="flex gap-4">
                                   <button
                                       onClick={() => deleteProduct(item.id)}
                                       className="relative inline-block px-3 py-1 font-semibold text-white leading-tight bg-red-400 rounded-full"
                                   >
                                       <span aria-hidden className="absolute inset-0 bg-red-200 opacity-50 rounded-full"></span>
                                       <span className="relative">Delete</span>
                                   </button>
                                   <Link href={`products/edit/${item.id}`}>
                                       <button className="relative inline-block px-3 py-1 font-semibold text-white leading-tight bg-blue-400 rounded-full">
                                           <span aria-hidden className="absolute inset-0 bg-blue-200 opacity-50 rounded-full"></span>
                                           <span className="relative">Edit</span>
                                       </button>
                                   </Link>
                               </div>
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
                       </tr>
                   ))}
               </tbody>
           </table>
           {selectedProduct && (
               <ProductModal
                   isModalOpen={isModalOpen}
                   setIsModalOpen={setIsModalOpen}
                   data={selectedProduct}
                   updateProduct={updateProduct} // Pass the updateProduct function
               />
           )}
       </>
   );
};


export default ProductTable;