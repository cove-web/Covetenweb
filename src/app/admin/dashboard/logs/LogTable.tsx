'use client'
import React from 'react';
import { AiFillEye, AiTwotoneDelete } from 'react-icons/ai';


interface ILogTable {
    data: any
}





const LogTable = ({ data }: ILogTable) => {
    return (
        <>
            {
                data?.map((item: any) =>
                    <section key={item?.id} className='space-y-5'>
                        <div className="p-5 mb-4 bg-bgLight rounded-lg border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
                            <time className="text-md font-semibold text-gray-800 dark:text-white">
                                {new Date(item?.createdAt).toLocaleDateString()}
                            </time>
                            <ol className="mt-3 divide-y divider-gray-200 dark:divide-gray-700">
                                <li>
                                    <a href="#" className="block items-center p-3 sm:flex hover:bg-gray-100 dark:hover:bg-gray-700">

                                        <div className="text-gray-600 dark:text-gray-400">
                                            <div className="text-base font-normal text-gray-900 ">
                                                <p>{item?.title}</p>
                                            </div>
                                            <div className="text-sm font-normal text-dimText">
                                                <p>{item?.message}</p>
                                            </div>
                                        </div>
                                    </a>
                                </li>

                            </ol>
                        </div>

                    </section>

                )
            }

        </>
    );
};

export default LogTable;