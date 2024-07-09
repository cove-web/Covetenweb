import React from 'react';

const ImportantLinks = () => {


    const data = [
        {
            id: 1,
            icon: "",
            title: "Calibrate your VBOX",
            details: "We offer an ISO 17025 calibration service for VBOX data loggers and speed sensors."
        },
        {
            id: 2,
            icon: "",
            title: "Find a distributor",
            details: "We offer an ISO 17025 calibration service for VBOX data loggers and speed sensors."
        },
        {
            id: 4,
            icon: "",
            title: "Register your VBOX",
            details: "We offer an ISO 17025 calibration service for VBOX data loggers and speed sensors."
        },
        {
            id: 5,
            icon: "",
            title: "Support Centre",
            details: "We offer an ISO 17025 calibration service for VBOX data loggers and speed sensors."
        },
        {
            id: 6,
            icon: "",
            title: "Raise a support ticket",
            details: "We offer an ISO 17025 calibration service for VBOX data loggers and speed sensors."
        },
        {
            id: 7,
            icon: "",
            title: "Download software",
            details: "We offer an ISO 17025 calibration service for VBOX data loggers and speed sensors."
        },
    ]



    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
                <div className="text-center mb-20">
                    <h1 className="text-3xl font-bold  md:text-4xl dark:text-white mb-4">Useful Links</h1>
                    <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-dimText dark:text-darkDimText">Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine, ramps microdosing banh mi pug.</p>
                    {/* <div className="flex mt-6 justify-center">
                        <div className="w-16 h-1 rounded-full bg-primary inline-flex"></div>
                    </div> */}
                </div>
                <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
                    {
                        data.map((item) =>
                            <div key={item.id} className="p-4 mb-6  md:w-1/3 flex flex-col text-center items-center">
                                <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-indigo-100 text-primary mb-5 flex-shrink-0">
                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10" viewBox="0 0 24 24">
                                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                                    </svg>
                                </div>
                                <div className="flex-grow">
                                    <h2 className=" text-lg title-font font-medium mb-3">{item.title}</h2>
                                    <p className="leading-relaxed text-base">{item.details}</p>
                                    <a className="mt-3 text-primary inline-flex items-center">Learn More
                                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                                        </svg>
                                    </a>
                                </div>
                            </div>)
                    }


                </div>

            </div>
        </section>
    );
};

export default ImportantLinks;