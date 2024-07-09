'use client'



import Loading from "@/app/loading";
import { useAuth } from "@/firebase/AuthProvider";
import { useGqlClient } from "@/hooks/UseGqlClient";
import { getEmployerEmail } from "@/shared/getEmployerEmail";
import { useMutation, useQuery } from "graphql-hooks";
import Cookies from "js-cookie";
import React, { useContext, useEffect } from "react";
import { createContext, ReactNode } from "react";
import { useState } from "react";




const GET_MODULE = `
query ModuleTickets($where: ModuleTicketWhere, $options: ModuleTicketOptions) {
  moduleTickets(where: $where, options: $options) {
    id
    reports
  }
}
`

const GET_INVOICE_COUNT = `
query Invoices($where: InvoiceWhere) {
    invoices(where: $where) {
      id
    }
  }
`







const UPDATE_INVOICE_VIEW = `
mutation UpdateInvoices($where: InvoiceWhere, $update: InvoiceUpdateInput) {
    updateInvoices(where: $where, update: $update) {
      info {
        nodesCreated
      }
    }
  }
`
const UPDATE_MODULE = `
mutation UpdateModuleTickets($where: ModuleTicketWhere, $update: ModuleTicketUpdateInput) {
  updateModuleTickets(where: $where, update: $update) {
    info {
      nodesCreated
    }
  }
}
`





export const CounterContext = createContext<ContextType | undefined>(undefined);


type ContextType = {
    newModuleCountData: number,
    handleUpdateView: (id: string, type: string) => void
    moduleRefetch: any,
    moduleCountLoading: boolean,
    moduleCounter: number,
    approveCounter: number,
    complainCounter: number,
    moduleForApproveCountData: number,
    complainCountData: number,
    complainRefetch: any,
    moduleApproveRefetch: any,
    moduleApproveCountLoading: boolean,


}


type AuthProviderProps = {
    children: ReactNode;
};

const CounterProvider = ({ children }: AuthProviderProps) => {
    const [emailCounter, setEmailCounter] = useState(0);
    const [invoiceCounter, setInvoiceCounter] = useState(0);
    const [moduleCounter, setModuleCounter] = useState(0);
    const [approveCounter, setApproveCounter] = useState(0);
    const [complainCounter, setComplainCounter] = useState(0);
    const [labEmail, setLabEmail] = useState('')





    // HOOKS
    const client = useGqlClient()
    const { user, authLoading }: any = useAuth()



    // getting module data
    useEffect(() => {
        getLabEmail()
    }, [labEmail, user?.email]);



    // getting lab email if employee is logged in
    const getLabEmail = async () => {
        if (user?.email) {
            const email = await getEmployerEmail(user?.email)
            setLabEmail(email)
        }

    }







    const { data: newModuleCountData, error: moduleCountError, loading: moduleCountLoading, refetch: moduleRefetch } = useQuery(GET_MODULE, {
        client,
        variables: {

            where: {
                vendorHas: {
                    userIs: {
                        email: labEmail || "no email"
                    }
                },
                status: "ASSIGNED",
                isViewedByVendor: false
            }
        }
    })
    const { data: moduleForApproveCountData, error: moduleApproveCountError, loading: moduleApproveCountLoading, refetch: moduleApproveRefetch } = useQuery(GET_MODULE, {
        client,
        variables: {

            where: {
                vendorHas: {
                    userIs: {
                        email: labEmail || "no email"
                    }
                },
                status: "UNDER_REVIEW",
                isApproveRequestViewed: false
            }
        }
    })


    const { data: complainCountData, error: complaineCountError, loading: complainCountLoading, refetch: complainRefetch } = useQuery(GET_MODULE, {
        client,
        variables: {

            where: {
                vendorHas: {
                    userIs: {
                        email: labEmail || "no email"
                    }
                },
                status: "COMPLAINED",
                isComplainedViewed: false
            }
        }
    })




    //mutations


    // const [updateInvoiceView] = useMutation(UPDATE_INVOICE_VIEW, { client })
    const [updateModuleView] = useMutation(UPDATE_MODULE, { client })






    const handleUpdateView = async (id: string, type: string) => {


        if (type === "newModule") {

            const variables = {
                "where": {
                    "id": id
                },
                "update": {
                    "isViewedByVendor": true
                }
            }
            await updateModuleView({ variables })
        } else if (type === "approveModule") {

            const variables = {
                "where": {
                    "id": id
                },
                "update": {
                    "isApproveRequestViewed": true
                }
            }
            await updateModuleView({ variables })
        }
        else if (type === "complain") {
            const variables = {
                "where": {
                    "id": id
                },
                "update": {
                    "isComplainedViewed": true
                }
            }
            await updateModuleView({ variables })
        }


    }



    useEffect(() => {



        if (newModuleCountData?.moduleTickets.length) {

            setModuleCounter(newModuleCountData?.moduleTickets.length)
        }
        if (moduleForApproveCountData?.moduleTickets.length) {
            setApproveCounter(moduleForApproveCountData?.moduleTickets.length)
        }

        if (complainCountData?.moduleTickets.length) {
            setComplainCounter(complainCountData?.moduleTickets.length)
        }



    }, [newModuleCountData, moduleForApproveCountData, complainCountData])







    if (authLoading) return <Loading />




    const authInfo: ContextType = {
        newModuleCountData,
        handleUpdateView,
        moduleRefetch,
        moduleCountLoading,
        moduleCounter,
        approveCounter,
        complainCounter,
        moduleForApproveCountData,
        complainCountData,
        complainRefetch,
        moduleApproveRefetch,
        moduleApproveCountLoading,






    };

    return <CounterContext.Provider value={authInfo}>{children}</CounterContext.Provider>;
};

export default CounterProvider;




// return (
//   <>
//     <AuthContext.Provider value={authInfo}>
//       {children}
//     </AuthContext.Provider>
//   </>
// );


// export default AuthProvider;

export const useCounterData = (): ContextType | undefined => {
    const data = useContext(CounterContext);
    return data;
};