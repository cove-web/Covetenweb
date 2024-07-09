import { Leads } from '@/gql/graphql';
import React, { useEffect } from 'react';

interface IComplainTableProps {
    data: any;
    setIsModalOpen: any;
    setCurrentComplain: any;
    setIsDocModalOpen: any;

}


const ComplainTable = ({ data, setIsModalOpen, setCurrentComplain, setIsDocModalOpen }: IComplainTableProps) => {


    useEffect(() => { }, [data?.length])

    return (
        <table className="min-w-full leading-normal uppercase">
            <thead>
                <tr className='border-b border-gray-200'>
                    <th
                     style={{backgroundColor:'#e8e8e880'}}
                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-dimText dark:text-darkDimText uppercase tracking-wider dark:bg-darkBg dark:border-darkBorder">
                        Serial No.
                    </th>
                    <th
                     style={{backgroundColor:'#e8e8e880'}}
                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-dimText dark:text-darkDimText uppercase tracking-wider dark:bg-darkBg dark:border-darkBorder">
                        Ticket Id
                    </th>
                    <th
                     style={{backgroundColor:'#e8e8e880'}}
                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-dimText dark:text-darkDimText uppercase tracking-wider dark:bg-darkBg dark:border-darkBorder">
                        Client Email

                    </th>

                    <th
                     style={{backgroundColor:'#e8e8e880'}}
                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-dimText dark:text-darkDimText uppercase tracking-wider dark:bg-darkBg dark:border-darkBorder">
                        Actions
                    </th>

                </tr>
            </thead>
            <tbody>

                {
                    data && data.map((complain: any, index: number) =>
                        <tr key={complain?.id} className='border-b border-gray-200'>

                            <td className="px-5 py-5  bg-white text-xs dark:bg-darkBg dark:border-darkBorder"  style={{backgroundColor:'#e8e8e880'}}>
                                <p className=" whitespace-no-wrap">{index + 1}</p>
                            </td>
                            <td className="px-5 py-5  bg-white text-xs dark:bg-darkBg dark:border-darkBorder"  style={{backgroundColor:'#e8e8e880'}}>
                                <p className=" whitespace-no-wrap">
                                    {complain?.ticket}
                                </p>
                            </td>
                            <td className="px-5 py-5  bg-white text-xs dark:bg-darkBg dark:border-darkBorder rounded-xl font-semibold"  style={{backgroundColor:'#e8e8e880'}}>
                                <p className=" whitespace-no-wrap">
                                    {complain?.clientHas?.userIs?.email || 'N/A'}
                                </p>
                            </td>

                            <td className="px-5 py-5 cursor-pointer  bg-white text-xs dark:bg-darkBg dark:border-darkBorder rounded-xl font-semibold space-x-3"  style={{backgroundColor:'#e8e8e880'}}>

                                <button
                                    onClick={() => {
                                        setIsModalOpen(true)
                                        setCurrentComplain(complain?.id)
                                    }}
                                    className='bg-primary text-white px-4 py-2 rounded-sm'>
                                    View
                                </button>
                                <button
                                    onClick={() => {
                                        setIsDocModalOpen(true)
                                        setCurrentComplain(complain?.id)
                                    }}
                                    className='bg-primary text-white px-4 py-2 rounded-sm'>
                                    Resend
                                </button>


                            </td>

                        </tr>

                    )
                }




            </tbody>
        </table>
    );
};

export default ComplainTable;