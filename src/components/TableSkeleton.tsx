import React from 'react';

const TableSkeleton = () => {
    return (
        <div className="w-full ">
            <ul className="mt-5 space-y-3">
                <li className="w-full h-10 bg-gray-200  dark:bg-gray-700"></li>
                <li className="w-full h-10 bg-gray-200  dark:bg-gray-700"></li>
                <li className="w-full h-10 bg-gray-200  dark:bg-gray-700"></li>
                <li className="w-full h-10 bg-gray-200  dark:bg-gray-700"></li>
            </ul>
        </div>
    );
};

export default TableSkeleton;