'use client'

import { Fragment, useEffect, useState } from 'react';
import { Transition } from '@headlessui/react';
import { HiCheck, HiSelector } from 'react-icons/hi';
import { useGqlClient } from '@/hooks/UseGqlClient';
import { useManualQuery } from 'graphql-hooks';

type User = {
    id: string
    email: string
    companyName: string
    userId: string

}

interface Props {
    selectedUserType: string;
    setSelectedOptions: (User: any[]) => void;
    selectedOptions: any[];
}


const GET_USERS = `
query Users($where: UserWhere, $options: UserOptions) {
    users(where: $where, options: $options) {
      id
      email
      user_type
      companyName
      userId
    }
  }

`



function UserSelect({ selectedUserType, selectedOptions, setSelectedOptions }: Props) {

    const [users, setUsers] = useState<any>([])
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // hooks
    const client = useGqlClient()

    // fetching users
    const [getUserFn, queyState] = useManualQuery(GET_USERS, { client })

    // initializing fetching user

    useEffect(() => {
        if (selectedUserType && !searchTerm) {
            let variable = {
                where: {
                    user_type: selectedUserType
                },
                options: {
                    limit: 10
                }
            }
            getUserData(variable)
        }
        if (searchTerm && selectedUserType) {
            let variable = {
                where: {
                    user_type: selectedUserType,
                    email_CONTAINS: searchTerm.toLowerCase()
                },
                options: {
                    limit: 10
                }
            }

            getUserData(variable)

        }

    }, [selectedUserType, searchTerm])









    const getUserData = async (variables: any) => {
        const { data } = await getUserFn({
            variables: variables
        })
        if (data.users.length) {
            setUsers(data.users)
        }
    }






    // fetched user data
    const options: User[] = queyState.data?.users


    const filteredOptions = options?.filter((option) =>
        option?.email.toLowerCase().includes(searchTerm.toLowerCase())
    );



    const toggleOption = (option: User) => {
        if (selectedOptions.find((item: User) => item.id === option.id)) {
            setSelectedOptions(selectedOptions.filter((item: User) => item.id !== option.id));
        } else {
            setSelectedOptions([...selectedOptions, option]);
        }
    };

    return (
        <div onBlur={() => setIsOpen(false)} className="relative">

            <input
                type="text"
                className="w-full py-2 pl-3 pr-10 text-left bg-white border border-gray-300 rounded-md shadow-sm cursor-default focus:outline-none focus:ring-1  focus:border-primary sm:text-sm"
                placeholder="Search options"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onClick={() => setIsOpen(true)}
            />
            <div>

            </div>

            <Transition
                show={isOpen}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <div className="absolute z-[80000000000000000] mt-1 w-full bg-white shadow-lg rounded-md py-1 text-base ring-1 ring-black ring-opacity-5  focus:outline-none sm:text-sm h-40 overflow-scroll">
                    {
                        queyState.loading && <p>loading ....</p>
                    }

                    {filteredOptions && filteredOptions?.map((option) => (
                        <div
                            key={option.id}
                            className={`${selectedOptions.find((item) => item.id === option.id)
                                ? 'text-amber-900 bg-amber-100'
                                : 'text-gray-900'
                                } cursor-default select-none relative py-2 pl-8 pr-4 `}
                            onClick={() => toggleOption(option)}
                        >
                            <span className="block truncate">{option?.companyName} - {option?.userId}</span>
                            {selectedOptions.find((item) => item.id === option.id) && (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <HiCheck className="w-5 h-5" />
                                </span>
                            )}
                        </div>
                    ))}
                    {filteredOptions && filteredOptions?.length > 6 && (
                        <div className="flex justify-center py-2 text-teal-600 cursor-pointer">
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                            >
                                Close
                            </button>
                        </div>
                    )}
                </div>
            </Transition>


            <div className='grid grid-cols-1 lg:grid-cols-3 gap-2 w-full'>
                {selectedOptions.length > 0 && (
                    selectedOptions.map((option: User, i: number) => (
                        <div key={i} className=" pr-2 flex items-center justify-center text-xs pointer-events-none mt-3 mb-2 border border-gray-300 px-1 py-1 rounded-sm">
                            {option.email}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default UserSelect;
