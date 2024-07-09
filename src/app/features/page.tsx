import React from 'react';



const featuresDetails = async () => {
    const res = fetch('http://localhost:25000/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: `query FeaturesPages($where: FeaturesPageWhere, $options: FeaturesPageOptions) {
                featuresPages(where: $where, options: $options) {
                  title
                  id
                  image
                  description
                }
              }`,
            variables: {
                "options": {
                    "sort": [
                        {
                            "createdAt": "ASC"
                        }
                    ]
                }
            }
        }),


    })

    const { data } = await res.then(res => res.json())
    return data.featuresPages
}




const page = async () => {



    const data = await featuresDetails()



    return (
        <>

            {
                data?.length && data.map((item: any, idx: number) =>
                    <div id={item?.id} key={item?.id} className="">

                        {
                            (idx + 1) % 2 === 0 ?
                                <>
                                    <section className="py-14">
                                        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
                                            <div className="items-center gap-x-12 sm:px-4 md:px-0 lg:flex">
                                                <div className="lg:w-[40%] flex  items-center justify-center  sm:hidden lg:block">
                                                    <img src={item?.image} className="md:max-w-lg sm:rounded-lg h-80 w-full object-cover" alt="" />
                                                </div>
                                                <div className=" max-w-xl  lg:ml-8 px-4 space-y-3 mt-6 sm:px-0 md:mt-0 lg:w-[60%] lg:max-w-2xl">

                                                    <p className="text-secondary capitalize text-3xl font-semibold sm:text-4xl ">
                                                        {item?.title}
                                                    </p>
                                                    <p className="pt-6 text-gray-600 text-justify ">
                                                        {item?.description}
                                                    </p>

                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </>
                                :
                                <>
                                    <section className="py-14">
                                        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
                                            <div className="items-center gap-x-12 sm:px-4 md:px-0 lg:flex">

                                                <div className="max-w-xl px-4 space-y-3 mt-6 sm:px-0 lg:w-[60%] md:mt-0 g:max-w-2xl">

                                                    <p className="text-secondary capitalize  text-3xl font-semibold sm:text-4xl">
                                                        {item?.title}
                                                    </p>
                                                    <p className="pt-6 text-gray-600 text-justify  ">
                                                        {item?.description}
                                                    </p>

                                                </div>
                                                <div className="flex mt-6 lg:mt-0 items-center justify-center sm:hidden lg:block lg:w-[40%]">
                                                    <img src={item?.image} className="md:max-w-lg sm:rounded-lg h-80 w-full object-cover" alt="" />
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </>
                        }


                    </div>)
            }





        </>
    );
};

export default page;