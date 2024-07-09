import AuthConfig from '@/firebase/oauth.config';
import { useGqlClient } from '@/hooks/UseGqlClient';
import { useManualQuery, useQuery } from 'graphql-hooks';
import React, { useEffect } from 'react';
import UnAuthorized from './UnAuthorized';
import Loading from '@/app/loading';
import { NavItem } from '@/app/admin/NavItem';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/firebase/AuthProvider';

interface IRestrictAdminRouteProps {
    children: any;
    accessibleNavItems: any;
    navItems?: any;
    setAccessibleNavItems: (accessibleNavItems: any) => void;
    managementNavItems: any;
    setManagementNavItemsAccess: any
}


const GET_USER = `
query Users($where: UserWhere) {
    users(where: $where){
      user_type
      hasRole {
        permissions
      }
    }
  }`


const RestrictAdminRoute = ({ children, accessibleNavItems, setAccessibleNavItems, navItems, setManagementNavItemsAccess, managementNavItems }: IRestrictAdminRouteProps) => {

    // states
    const [data, setData] = React.useState<any>(null)
    const [loading, setLoading] = React.useState<boolean>(true)

    // HOOKS
    const client = useGqlClient()
    const { user, authLoading }: any = useAuth()
    const userEmail = user?.email
    const router = useRouter()

    const [getUserFn, getUserState] = useManualQuery(GET_USER, { client })



    useEffect(() => {
        getUserData()
        checkUserType()


    }, [userEmail, data?.users?.length, authLoading])




    // checking user type

    const checkUserType = () => {
        setLoading(true)
        if (!user?.email && !authLoading) {
            setLoading(false)
            return <UnAuthorized />
        }

        else if (data?.users?.length) {

            if (data?.users[0]?.user_type === "ADMIN") {
                setLoading(false)
                setAccessibleNavItems(navItems)
                setManagementNavItemsAccess(managementNavItems)
                return children
            }
            else if (data?.users[0]?.user_type === "COVENTEN_EMPLOYEE") {
                getAccessibleNavItems()
            }

            else if (data?.users[0]?.user_type != "ADMIN" || data?.users[0]?.user_type != "COVENTEN_EMPLOYEE") {
                setLoading(false)
                return <UnAuthorized />
            }
        } else {
            setLoading(false)
            return <UnAuthorized />
        }
    }

    const getAccessibleNavItems = () => {
        if (data?.users[0]?.user_type === "COVENTEN_EMPLOYEE" && data?.users[0]?.hasRole?.permissions?.length) {
            setLoading(true)
            const permissions = data?.users[0]?.hasRole?.permissions
            const lowerCasePermissions = permissions.map((item: any) => item.toLowerCase())


            const fieldsOptions = navItems.flatMap((section: any) => section.links.map((item: any) => {
                return item.label.toLowerCase()
            }));



            // filtering nav items
            const filteredNavItems = fieldsOptions?.filter((navItem: any) => {
                return lowerCasePermissions.includes(navItem);
            });


            // filtering nav items with links and section
            const filteredItems = navItems.reduce((acc: any, section: any) => {
                const filteredLinks = section.links.filter((link: any) =>
                    filteredNavItems.includes(link.label.toLowerCase())
                );

                if (filteredLinks.length > 0) {
                    acc.push({
                        ...section,
                        links: filteredLinks,
                    });
                }

                return acc;
            }, []);

            setAccessibleNavItems(filteredItems)
            setLoading(false)

        }
        else {
            setLoading(false)
            setAccessibleNavItems([])
            return <UnAuthorized />
        }
    }

    const getUserData = async () => {
        const { data } = await getUserFn({
            variables: {
                where: {
                    email: user?.email || 'no email'
                }
            }
        })

        if (data?.users?.length) {
            setData(data)
        }
    }


    if (getUserState.loading || loading || authLoading) return <Loading />



    // if (!accessibleNavItems?.length && !loading && !authLoading && !getUserState.loading) {
    //     router.replace('/not_authorized')
    // }


    return (
        <>
            {
                accessibleNavItems.length ? children : <UnAuthorized />
            }
        </>
    );
};

export default RestrictAdminRoute;