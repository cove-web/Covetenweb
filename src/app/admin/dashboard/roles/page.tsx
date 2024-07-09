
import Main from "./(components)/Main";






const RolesPage = () => {



    return (
        <div className="w-full overflow-hidden bg-white p-7 rounded-lg dark:bg-darkBgLight h-full min-h-[80vh]"                                 style={{backgroundColor:'#e8e8e880'}}
        >
            <div className="flex items-center justify-between h-full">
                <div className=" py-4 md:py-7">
                    <div className="flex items-center justify-between">
                        <p className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal ">Roles</p>

                    </div>
                </div>
            </div>
            <Main />

        </div>
    );
};

export default RolesPage;