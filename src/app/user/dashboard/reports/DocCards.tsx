import React from 'react';
import DocumentCard from './DocumentCard';
import { useGqlClient } from '@/hooks/UseGqlClient';
import { useQuery } from 'graphql-hooks';
import Loading from '@/app/loading';
import { PiNotebookDuotone } from 'react-icons/pi';

const GET_MODULE = `
query ModuleTickets($where: ModuleTicketWhere) {
    moduleTickets(where: $where) {
      id
      reports
      ticket
      status
    }
  }
`


const DocCards = ({ currentModule, setIsOpen, confirmComplete, setVendorId }: { currentModule: string, confirmComplete: any, setIsOpen: any, setVendorId: any }) => {


    //hooks 
    const client = useGqlClient();


    // fetching data
    const { data, loading, error } = useQuery(GET_MODULE, {
        client,

        variables: {
            where: {
                id: currentModule
            }
        }

    });





    if (loading) return <p><Loading /></p>



    if (!data?.moduleTickets[0]?.reports?.length) return (


        <div
            className="flex flex-col flex-auto lg:p-10 flex-shrink-0  bg-white ml-7  h-full min-h-[80vh] lg:max-h-[80vh]"
            style={{backgroundColor:'rgba(232, 232, 232, 0.5)'}} 

       >
            <div className='bg-white h-full w-full flex items-center justify-center space-x-2'         style={{backgroundColor:'rgba(232, 232, 232, 0.5)'}} 
>
                <span className='text-lg'><PiNotebookDuotone /></span>
                <p className='text-lg text-dimText'>No Reports Found</p>
            </div>



        </div>
    )

    return (

        <div className="flex flex-col flex-auto h-full px-6 ">
            <div
                className="flex flex-col flex-auto flex-shrink-0 rounded-lg bg-white h-full min-h-[85vh] lg:max-h-[85vh]"
                style={{backgroundColor:'rgba(232, 232, 232, 0.5)'}} 

            >
                <div className='bg-white shadow-sm px-4 py-5 rounded-lg flex items-center  justify-between'         style={{backgroundColor:'rgba(232, 232, 232, 0.5)'}} 
>
                    <div className='flex items-center'>
                        <p className='bg-green-500 w-3 h-3 rounded-full mr-2'></p>
                        <p className='font-bold'> {data?.moduleTickets[0]?.ticket}</p>
                    </div>

                    {
                        data?.moduleTickets[0]?.status === "COMPLETED" ? <></>
                            :
                            <>
                                <div className='space-x-3'>
                                    <button onClick={() => {
                                        setIsOpen(true)
                                        setVendorId(data?.moduleTickets[0]?.forModule?.vendor?.id)
                                    }} className='bg-primary text-white font-semibold px-4 py-1'>
                                        Comment
                                    </button>
                                    <button onClick={() => {
                                        confirmComplete()
                                        setVendorId(data?.moduleTickets[0]?.vendorHas?.userIs?.id)
                                    }} className='bg-primary  text-white font-semibold px-4 py-1'>
                                        Confirm
                                    </button>
                                </div>
                            </>
                    }


                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full ml-5 h-full overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch mb-4  p-4 ">
                    {
                        data?.moduleTickets[0]?.reports?.map((url: string, i: number) =>
                            <div key={i}>
                                <DocumentCard url={url} index={i} />
                            </div>)
                    }
                </div>


            </div>
        </div>

    );
};

export default DocCards;