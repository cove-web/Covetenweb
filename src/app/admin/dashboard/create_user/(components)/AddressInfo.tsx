
import Loading from '@/app/loading';
import React from 'react';


interface IProps {
    setFormData: any,
    formData: any,
    setCurrentTab: any,
    handleCreateUser: any
}



const AddressInfo = ({ setFormData, formData, setCurrentTab, handleCreateUser }: IProps) => {
    const [loading, setLoading] = React.useState(false);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const city = e.target.city.value;
        const state = e.target.state.value;
        const country = e.target.country.value;
        const street = e.target.street.value;
        const otherCity = e.target.otherCity.value;
        const otherState = e.target.otherState.value;
        const otherCountry = e.target.otherCountry.value;
        const otherStreet = e.target.otherStreet.value;
        const zipCode = e.target.zipCode.value;
        const otherZipCode = e.target.otherZipCode.value;

        const address = {
            city,
            state,
            country,
            street,
            otherCity,
            otherState,
            otherCountry,
            otherStreet,
            zipCode,
            otherZipCode
        };
        // formData.email
        await handleFirebaseUserCreate(formData.email, formData.password);
        await handleCreateUser(address);
    };

    const handleFirebaseUserCreate = async (email: string, password: string) => {
        setLoading(true);
        const res: any = await fetch('/api/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        if (res.status === 200) {

            setLoading(false);
        } else {

            setLoading(false);
        }


    };

    if (loading) return <Loading />;

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
                        type="text"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div className="mb-5">
                    <label className="block  text-gray-700 text-sm mb-1">
                        City
                    </label>
                    <input
                        // onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        name="city"
                        type="text"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div className="mb-5">
                    <label className="block  text-gray-700 text-sm mb-1">
                        State
                    </label>
                    <input
                        // onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        name="state"
                        type="text"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div className="mb-5">
                    <label className="block  text-gray-700 text-sm mb-1">
                        Country
                    </label>
                    <input
                        // onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        name="country"
                        type="text"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div className="mb-5">
                    <label className="block  text-gray-700 text-sm mb-1">
                        Zip Code
                    </label>
                    <input
                        // onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                        name="zipCode"
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
                        // onChange={(e) => setFormData({ ...formData, otherStreet: e.target.value })}
                        name="otherStreet"
                        type="text"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div className="mb-5">
                    <label className="block  text-gray-700 text-sm mb-1">
                        City
                    </label>
                    <input
                        // onChange={(e) => setFormData({ ...formData, otherCity: e.target.value })}
                        name="otherCity"
                        type="text"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div className="mb-5">
                    <label className="block  text-gray-700 text-sm mb-1">
                        State
                    </label>
                    <input
                        // onChange={(e) => setFormData({ ...formData, otherState: e.target.value })}
                        name="otherState"
                        type="text"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div className="mb-5">
                    <label className="block  text-gray-700 text-sm mb-1">
                        Country
                    </label>
                    <input
                        // onChange={(e) => setFormData({ ...formData, otherCountry: e.target.value })}
                        name="otherCountry"
                        type="text"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div className="mb-5">
                    <label className="block  text-gray-700 text-sm mb-1">
                        Zip Code
                    </label>
                    <input
                        // onChange={(e) => setFormData({ ...formData, otherZipCode: e.target.value })}
                        name="otherZipCode"
                        type="text"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                </div>









                <div className="mt-6 col-span-full">
                    <button
                        type="submit"
                        className="px-10 py-2 bg-primary text-white hover:bg-blue-600"
                    >
                        Create user
                    </button>
                </div>
            </form>
        </section>
    );
};

export default AddressInfo;