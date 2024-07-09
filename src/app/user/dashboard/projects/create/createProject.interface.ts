export  interface IProjectInput {
    email: string;
    address: string;
    city: string;
    country: number;
    state: number;
    zipCode: string;
    gstNumber: string;
    projectName: string;
    projectDescription: string;
    type: string;
    priority: string;
}

export interface IModuleInput {
    title: string;
    description: string;
    documents?: Documents
}

type Documents = {
    images: string[];
    files: string[];
}