
import Image from 'next/image';
import React, { useState } from 'react';
import 'react-photo-view/dist/react-photo-view.css';
import AssignmentModal from './AssignmentModal';
import Main from './Main';


//component
const ProjectsPage = () => {



    //render
    return (
        <>
            <div className="w-full  bg-white min-h-[400px] rounded-lg py-4 md:py-7 px-4 md:px-8 xl:px-10 "               style={{backgroundColor:'#e8e8e880'}}
>
                <div className=" py-4 md:py-7">
                    <div className="flex items-center justify-between">
                        <p className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">Projects</p>

                    </div>



                    <div className=" grid  overflow-auto  w-full">


                        <Main />


                    </div>
                </div>
            </div >

        </>
    );
};

export default ProjectsPage;