import React from 'react';

const FilePreview = ({ name }: { name?: string }) => {
    return (

        <div
            style={{
                backgroundImage: `url(${'/assets/file.svg'})`,

            }}
            className=' h-full w-full flex items-center justify-center text-gray-800 font-semibold'>
            {name}
        </div>


    );
};

export default FilePreview;