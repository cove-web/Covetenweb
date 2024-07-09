
import React from 'react';


interface IProps {
    setUserInfo: any,
    userInfo: any,
    setCurrentTab: any,
    updateUser: any

}



const AddressInfo = async ({ setUserInfo, userInfo, updateUser }: IProps) => {


    const handleSubmit = (e: any) => {
        e.preventDefault();

        const { street, city, state, country, otherStreet, otherCity, otherState, otherCountry } = e.target;

        const updatedData = {
            ...userInfo,
            street: street.value,
            city: city.value,
            state: state.value,
            country: country.value,
            otherStreet: otherStreet.value,
            otherCity: otherCity.value,
            otherState: otherState.value,
            otherCountry: otherCountry.value,
        };

        updateUser(updatedData);
    };









    return (
        <section className='mt-6'>
            <form onSubmit={handleSubmit} className='grid grid-cols-1 lg:grid-cols-3 gap-4'>

                <p className='text-gray-700 text-md font-semibold mb-4 col-span-full'>Primary Address</p>

                <div className="mb-5">
                    <label className="block  text-gray-700 text-sm mb-1">
                        Street
                    </label>
                    <input
                        name="street"
                        defaultValue={userInfo?.street}
                        type="text"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div className="mb-5">
                    <label className="block  text-gray-700 text-sm mb-1">
                        City
                    </label>
                    <input

                        name="city"
                        defaultValue={userInfo?.city}
                        type="text"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div className="mb-5">
                    <label className="block  text-gray-700 text-sm mb-1">
                        State
                    </label>
                    <input

                        name="state"
                        defaultValue={userInfo?.state}
                        type="text"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div className="mb-5">
                    <label className="block  text-gray-700 text-sm mb-1">
                        Country
                    </label>
                    <input

                        name="country"
                        defaultValue={userInfo?.country}
                        type="text"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <p className='text-gray-700 mt-5 text-md font-semibold mb-4 col-span-full'>Other Address</p>

                <div className="mb-5">
                    <label className="block  text-gray-700 text-sm mb-1">
                        Street
                    </label>
                    <input

                        name="otherStreet"
                        defaultValue={userInfo?.otherStreet}
                        type="text"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div className="mb-5">
                    <label className="block  text-gray-700 text-sm mb-1">
                        City
                    </label>
                    <input

                        name="otherCity"
                        defaultValue={userInfo?.otherCity}
                        type="text"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div className="mb-5">
                    <label className="block  text-gray-700 text-sm mb-1">
                        State
                    </label>
                    <input

                        name="otherState"
                        defaultValue={userInfo?.otherState}
                        type="text"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div className="mb-5">
                    <label className="block  text-gray-700 text-sm mb-1">
                        Country
                    </label>
                    <input

                        name="otherCountry"
                        defaultValue={userInfo?.otherCountry}
                        type="text"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                </div>


                <div className="mt-6 col-span-full">
                    <button
                        type="submit"
                        className="px-10 py-2 bg-primary text-white hover:bg-blue-600"
                    >
                        Update
                    </button>
                </div>
            </form>
        </section>
    );
};

export default AddressInfo;