
import React from 'react';
import Main from './Main';



const ChatsPage = () => {

    return (

        <>
            <div className="flex h-screen antialiased text-gray-800">
                <div className="flex flex-row h-full lg:max-h-[85vh] w-full overflow-x-hidden">
                    <Main />
                </div>
            </div>

        </>



    );
};

export default ChatsPage;