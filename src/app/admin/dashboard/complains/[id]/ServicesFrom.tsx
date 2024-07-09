import { Invoice, Service } from '@/gql/graphql';
import React, { useEffect } from 'react';



interface IServiceFrom {
    data: any
    setPreviousData: (data: Invoice) => void
    previousData: Invoice,
    index: number
}


const ServicesFrom = ({ index, data, setPreviousData, previousData }: IServiceFrom) => {

    const [serviceData, setServiceData] = React.useState<any>(data)



    useEffect(() => {
        const updatedHasPurchase = [...previousData.hasPurchase];
        updatedHasPurchase[index] = serviceData;

        setPreviousData({
            ...previousData,
            hasPurchase: updatedHasPurchase,
        });


    }, [serviceData.itemName, serviceData.price, serviceData.quantity])


    return (
        <form className='grid  lg:grid-cols-6 gap-6'>
            <div className="md:col-span-4">
                <label htmlFor="">Service Name</label>
                <input
                    defaultValue={serviceData?.itemName || ''}
                    onChange={(e) => setServiceData({ ...serviceData, itemName: e.target.value as string })}
                    type="text" id=""
                    className="h-10 border border-gray-300 mt-1 rounded px-4 w-full " placeholder="" />
            </div>
            <div className="md:col-span-1">
                <label htmlFor="">Quantity</label>
                <input type='number' required
                    defaultValue={serviceData?.quantity || ''} className="h-10 border border-gray-300 mt-1 rounded px-4 w-full " placeholder=""
                    onChange={(e) => setServiceData({ ...serviceData, quantity: parseInt(e.target.value) })} />
            </div>
            <div className="md:col-span-1">
                <label htmlFor="">Price</label>
                <input defaultValue={serviceData?.price || ''}
                    onChange={(e) => setServiceData({ ...serviceData, price: parseInt(e.target.value) })}
                    type='number' className="h-10 border border-gray-300 mt-1 rounded px-4 w-full " placeholder="" />
            </div>
        </form>
    );
};

export default ServicesFrom;