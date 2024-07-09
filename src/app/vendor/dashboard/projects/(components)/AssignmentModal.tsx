import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import AutoSelect from '@/components/AutoSelect';
import { useGqlClient } from '@/hooks/UseGqlClient';
import { useQuery, useMutation, useManualQuery } from 'graphql-hooks';
import { toast } from 'react-hot-toast';
import { generateUniqueId } from '@/shared/genarateUniqueId';
import createLog from '@/shared/graphQl/mutations/createLog';
import AuthConfig from '@/firebase/oauth.config';
import Loading from '@/app/loading';

interface IModalProps {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    currentProject: any;
    refetchProjects: () => void;
}

const GET_VENDORS = `
query Vendors($userIsWhere2: UserWhere) {
    vendors {
      id
      userIs(where: $userIsWhere2) {
        id
        name
        email
        companyEmail
        companyName
        status
      }
    }
  }
`;

function AssignmentModal({ isOpen, setIsOpen, currentProject, refetchProjects }: IModalProps) {
    const [selected, setSelected] = useState<any>({});
    const [vendorEmails, setVendorEmails] = useState<string[]>([]);

    const client = useGqlClient();
    const { user } = AuthConfig();

    const { data, loading } = useQuery(GET_VENDORS, {
        client,
        variables: {
            userIsWhere2: {
                status: "APPROVED"
            }
        }
    });

    useEffect(() => {
        if (data && data.vendors) {
            const emails = data.vendors
                .filter((vendor: any) => vendor.userIs && vendor.userIs.email) // Filter out vendors with null userIs or null email
                .map((vendor: any) => vendor.userIs.email);
            setVendorEmails(emails);
        }
    }, [data]);
console.log("ma",data);
    

    // Rest of your component code...

    return (
        <div>
            <Transition.Root show={isOpen} as={Fragment}>
                {/* Rest of your modal code... */}
                <div className='relative'>
                    <AutoSelect setSelected={setSelected} selected={selected} data={vendorEmails} />
                </div>
                {/* Rest of your modal code... */}
            </Transition.Root>
        </div>
    );
}

export default AssignmentModal;
