export  interface IInput {
    testName: string;
    testDescription: string;
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