import React from 'react';
import HomeCard from '../HomeCard';
import { FaPlusCircle } from 'react-icons/fa';
import ProjectCard from './ProjectCard';
import Main from './Main';
import Link from 'next/link';

const Projects = () => {



    return (
        <div className='p-4 h-full max-h-screen  flex flex-col space-y-4 bg-white min-h-[80vh]' style={{backgroundColor:'#e8e8e880'}}>

            {/* project  sections  */}
            <section>
                <div className='flex items-center justify-between'>
                    <h2 className='md:text-2xl xl:text-3xl font-semibold text-primaryText'>Projects</h2>
                    <Link href='/user/dashboard/projects/create' className='bg-primary md:text-base xl:text-lg font-semibold text-white px-6 xl:px-8 py-2 xl:py-4 rounded-md flex items-center justify-center space-x-3'>
                        <p>Create Project</p>
                        <span><FaPlusCircle /></span>
                    </Link>

                </div>
                <div className='flex items-center justify-between bg-gray-200 py-4 mt-6 px-5 rounded-md'>
                    <h2 className='text-sm font-semibold '>Project Details</h2>
                    <h2 className='text-sm font-semibold '>Quick Actions</h2>
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