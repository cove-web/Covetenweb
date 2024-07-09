import Link from 'next/link';
import React from 'react';
import { AiOutlineFileProtect } from 'react-icons/ai';

const DocumentCard = ({ url, index }: { url: string, index: number }) => {
    return (
        <div className="relative p-4 w-full bg-white rounded-lg min-h-[250px] overflow-hidden hover:shadow" >
            <Link target='_blank' href={url}>
                <div className="relative block h-full">
                    <div className="h-32 bg-gray-100 rounded-lg min-h-[170px] flex items-center justify-center text-5xl">
                        <AiOutlineFileProtect />
                    </div>
                </div>
            </Link>

            <h2 className="mt-4 text-gray-800 text-sm font-semibold line-clamp-1">
                Document-{index + 1}
            </h2>
        </div>
    );
};

export default DocumentCard;