'use client'


import React, { useCallback, useEffect, useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form"


//interface props
interface IModuleFrom {
    index: number
    equipments: any[]
    setEquipments: (equipments: any[]) => void
}



//component
const Equipment = ({ index, setEquipments, equipments }: IModuleFrom) => {


    //states
    const [files, setFiles] = useState<any[]>([]);
    const [title, setTitle] = useState<string>('');
    const [selected, setSelected] = useState<any>([]);


    // hook from 
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<any>()


    // current module index
    const moduleIndex = equipments?.findIndex(module => module?.hasOwnProperty(`name${index}`));







    // setting the module data
    const handleModule: SubmitHandler<any> = (data) => {
        const name = data[`name${index}`];
        const model = data[`model${index}`];
        const make = data[`make${index}`];
        const calibrationDetails = data[`calibrationDetails${index}`];
        const warranty = data[`warranty${index}`];
        const yearOfInstallation = data[`yearOfInstallation${index}`];

        if (name) {
            const equipmentData: any = {
                name,
                model,
                make,
                calibrationDetails,
                warranty,
                yearOfInstallation,
            };

            const moduleIndex = equipments.findIndex(
                (module) => module.hasOwnProperty(`name${index}`)
            );

            if (moduleIndex !== -1) {
                const updatedEquipments = [...equipments];
                updatedEquipments[moduleIndex][`name${index}`] = equipmentData;
                setEquipments(updatedEquipments);
            } else {
                const newModule = {
                    [`name${index}`]: equipmentData,
                };
                setEquipments([...equipments, newModule]);
            }
        }
    };




    return (
        <form onChange={handleSubmit(handleModule)}>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6'>
                <div className="">
                    <label htmlFor="address">Name</label>

                    <input
                        defaultValue={equipments[moduleIndex]?.[`name${index}`]?.name}
                        type="text" className="h-10 border border-gray-300 mt-1 rounded px-4 w-full " placeholder=""   {...register(`name${index}`)} />
                </div>
                <div className="">
                    <label htmlFor="address">model</label>

                    <input
                        defaultValue={equipments[moduleIndex]?.[`name${index}`]?.model}
                        type="text" className="h-10 border border-gray-300 mt-1 rounded px-4 w-full " placeholder=""   {...register(`model${index}`)} />
                </div>
                <div className="">
                    <label htmlFor="address">make</label>

                    <input
                        defaultValue={equipments[moduleIndex]?.[`name${index}`]?.make}
                        type="text" className="h-10 border border-gray-300 mt-1 rounded px-4 w-full " placeholder=""   {...register(`make${index}`)} />
                </div>
                <div className="">
                    <label htmlFor="address">calibrationDetails</label>

                    <input
                        defaultValue={equipments[moduleIndex]?.[`name${index}`]?.calibrationDetails}
                        type="text" className="h-10 border border-gray-300 mt-1 rounded px-4 w-full " placeholder=""   {...register(`calibrationDetails${index}`)} />
                </div>
                <div className="">
                    <label htmlFor="address">year Of Installation</label>

                    <input
                        defaultValue={equipments[moduleIndex]?.[`name${index}`]?.yearOfInstallation}
                        type="text" className="h-10 border border-gray-300 mt-1 rounded px-4 w-full " placeholder=""   {...register(`yearOfInstallation${index}`)} />
                </div>
                <div className="">
                    <label htmlFor="address">warranty</label>

                    <input
                        defaultValue={equipments[moduleIndex]?.[`name${index}`]?.warranty}
                        type="text" className="h-10 border border-gray-300 mt-1 rounded px-4 w-full " placeholder=""   {...register(`warranty${index}`)} />
                </div>
            </div>

        </form>
    );
};

export default Equipment;