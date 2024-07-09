import React from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import ProjectCard from './ProjectCard';
import Main from './Main';
import Link from 'next/link';

const Projects = () => {



    return (
        <div className='p-4 h-full max-h-screen  flex flex-col space-y-4 bg-white min-h-[80vh]'>

            {/* project  sections  */}
            <section>
                <div className='flex items-center justify-between'>
                    <h2 className='md:text-2xl xl:text-3xl font-semibold text-primaryText'>Tests</h2>
                    <Link href='/vendor/dashboard/tests/create' className='md:text-base xl:text-lg font-semibold text-white bg-primary px-6  py-2  flex items-center justify-center space-x-3'>
                        <p>Create</p>
                        <span><FaPlusCircle /></span>
                    </Link>

                </div>
                <div className='flex items-center justify-between bg-gray-200 py-4 mt-6 px-5 rounded-md'>
                    <h2 className='text-sm font-semibold '>Project Details</h2>
                    <h2 className='text-sm font-semibold text-dimText'>Quick Actions</h2>
                </div>
            </section>
            {/*  */}
            <section>
                <Main />
            </section>


        </div>
    );
};

export default Projects;