
import React from 'react';
import Main from './Main';



const ChatsPage = () => {

    return (

        <>
            <div className="flex h-full antialiased text-gray-800 lg:p-5">
                <div className="flex flex-row h-full lg:max-h-[85vh] w-full overflow-x-hidden">
                    <Main />
                </div>
            </div>

        </>



    );
};

export default ChatsPage;