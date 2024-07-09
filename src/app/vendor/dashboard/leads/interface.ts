import { Leads, User } from "@/gql/graphql"



export interface IUpdateLead {
    id: string
    duration: string
    status: string
    price: string
    address: string
}


export interface ILeadsTableProps {
    data: Leads[]
    setIsModalOpen: (value: boolean) => void;
    setCurrentLead: (value: Leads) => void;

}


export interface IUserModalProps {
    isModalOpen: boolean;
    setIsModalOpen: (value: boolean) => void;
    data?: any | {}
    loading?: boolean
    updateLeads?: any
    setUserDetails?: any
    userDetails?: any
    setCurrentLead?: any
}
