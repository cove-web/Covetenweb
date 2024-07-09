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
    const handleLike = (id: string) => {
        // Implement the like functionality here
        console.log(`Liked product with ID: ${id}`);
    };

    const handleComment = (id: string) => {
        // Implement the comment functionality here
        console.log(`Commented on product with ID: ${id}`);
    };

    const handleShare = (id: string) => {
        // Implement the share functionality here
        console.log(`Shared product with ID: ${id}`);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
            {productData && productData.map((item, i) => (
                <div key={i} className=" shadow-md rounded-lg p-4" style={{ backgroundColor: 'rgba(255,255,255,0.21)' }}>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold">{item?.title?.slice(0, 40)}</h3>
                        <p className="text-sm text-gray-500">{item?.createdAt?.slice(0, 10)}</p>
                    </div>
                    <p className="text-xl font-semibold mb-4">{item?.shortDescription}</p>
                    <div className="flex space-x-4">
                        <button 
                            onClick={() => handleLike(item.id)} 
                            style={{backgroundColor:'transparent'}}
                            className="focus:ring-2 focus:ring-offset-2 text-xs leading-none text-gray-600 py-2 px-2   focus:outline-none">
                            Like
                        </button>
                        <button 
                            onClick={() => handleComment(item.id)} 
                            style={{backgroundColor:'transparent'}}

                            className="focus:ring-2 focus:ring-offset-2 text-xs leading-none text-gray-600 py-2 px-2   focus:outline-none">
                            Comment
                        </button>
                        <button 
                            onClick={() => handleShare(item.id)} 
                            style={{backgroundColor:'transparent'}}

                            className="focus:ring-2 focus:ring-offset-2 text-xs leading-none text-gray-600 py-2 px-2  focus:outline-none">
                            Share
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductTable;
