import React from 'react';
import { AiTwotoneDelete } from 'react-icons/ai';
import { BiSolidEditAlt } from 'react-icons/bi';
import TicketTable from './TicketTable';
import Main from './Main';

const page = () => {
    return (
        <div className="antialiased rounded-md bg-white"               style={{backgroundColor:'#e8e8e880'}}
        >
            <div className="container mx-auto px-4 sm:px-8">
                <div className="py-8">
                    <div>
                        <h2 className="text-2xl font-semibold leading-tight">All Modules</h2>
                    </div>

                    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                        <div className="inline-block min-w-full  rounded-sm overflow-hidden">

                            <Main />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default page;