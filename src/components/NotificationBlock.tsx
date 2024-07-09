
import NotificationCard from '@/components/NotificationCard';
import { Notification } from '@/gql/graphql';




//props interface
interface Props {
    data: Notification[]
}



//component
const NotificationBlock = ({ data }: Props) => {




    //render
    return (
        <>
            <div>
                <div className="w-full ">
                    <div className="bg-transprent  px-1 md:px-2 xl:px-3 dark:bg-darkBgLight dark:text-black">
                        <div className="mt-7 overflow-x-auto w-full ">
                            <table className="w-full whitespace-nowrap ">
                                <tbody>
                                    {data?.map((item: any) => (
                                        <tr key={item?.id} className="w-full">
                                            <NotificationCard data={item} />
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NotificationBlock;
