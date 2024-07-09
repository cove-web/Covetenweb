"use client";
import { Fragment, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Dialog, Transition } from "@headlessui/react";
import { useGqlClient } from "@/hooks/UseGqlClient";
import { useManualQuery, useMutation } from "graphql-hooks";
import { toast } from "react-hot-toast";
import Button from "@/components/Button";
import { HiOutlineCalendar } from "react-icons/hi";
import AuthConfig from "@/firebase/oauth.config";

//props interface
interface IModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  product: string;
}

const CREATE_LEAD = `
mutation CreateLeads($input: [LeadsCreateInput!]!) {
    createLeads(input: $input) {
      info {
        nodesCreated
      }
    }
  }
`;
const GET_USER_INFO = `
query Users($where: UserWhere) {
    users(where: $where) {
      name
      email
      phone
    }
  }
`;

//component
function Modal({ isModalOpen, setIsModalOpen, product }: IModalProps) {
  // hooks
  const client = useGqlClient();
  const { user } = AuthConfig();

  //states
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<string>("");

  // queries and mutations
  const [getUserFn, userState] = useManualQuery(GET_USER_INFO, {
    client,
  });
  const [createLead, createState] = useMutation(CREATE_LEAD, { client });

  // get user info after login
  useEffect(() => {
    if (user?.email) {
      getUserFn({
        variables: {
          where: {
            email: user?.email,
          },
        },
      });
    }
  }, [user?.email]);

  // set user info after data fetch

  useEffect(() => {
    if (userState?.data?.users?.length) {
      const { name, email, phone } = userState?.data?.users[0];
      setName(name);
      setEmail(email);
      setPhone(phone);
    }
  }, [userState.data?.users?.length]);

  // functions

  const createLeads = async () => {
    if (error) return;
    const { data } = await createLead({
      variables: {
        input: [
          {
            email: email,
            name: name,
            phone: phone,
            type: "PRODUCT",
            interest: product,
            createdAt: new Date().toISOString(),
            description: message,
          },
        ],
      },
    });

    if (data.createLeads.info.nodesCreated) {
      toast.success("Interest submitted ");
      closeModal();
    }
  };

  const handlePhoneChange = (inputValue: any) => {
    const numericValue = inputValue.replace(/\D/g, "");
    const indianPhonePattern = /^[789]\d{9}$/;

    if (!indianPhonePattern.test(numericValue)) {
      setError("Please enter a valid Indian phone number");
    } else if (numericValue.length > 10) {
      setError("Phone number cannot be more than 10 digits");
    } else if (numericValue.length < 10) {
      setError("Phone number cannot be less than 10 digits");
    } else {
      setPhone(numericValue);
      setError("");
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    createLeads();
    e.target.reset();
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  //render
  return (
    <div>
      <Transition.Root show={isModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-[564645656] inset-0 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />
            </Transition.Child>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                <p className="focus:outline-none pt-4 pb-8 text-base text-center sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
                  Inquiry
                </p>
                <form onSubmit={handleSubmit} className=" bg-white  ">
                  <div className="px-5 pb-5">
                    <input
                      placeholder="Name"
                      required
                      onChange={(e) => setName(e.target.value)}
                      defaultValue={name}
                      className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-sm bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                    />
                    <input
                      placeholder="Email"
                      required
                      onChange={(e) => setEmail(e.target.value)}
                      defaultValue={email}
                      className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-sm bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                    />
                    <input
                      placeholder="Phone"
                      required
                      type="number"
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      defaultValue={phone}
                      className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-sm bg-gray-200 focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                      pattern="[789]\d{9}" // Pattern for Indian phone numbers starting with 7, 8, or 9 and having a total of 10 digits
                    />
                    {error ? (
                      <p className="text-red-500 text-xs">{error}</p>
                    ) : null}

                    <div className="flex">
                      <textarea
                        rows={3}
                        placeholder="message"
                        required
                        onChange={(e) => setMessage(e.target.value)}
                        defaultValue={message}
                        className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-sm bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                      />
                    </div>
                    <div className="mt-8">
                      <button
                        type="submit"
                        className="gradient-bg rounded font-bold text-white px-7 py-2.5 "
                      >
                        {createState.loading ? "Loading.." : "Submit"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}

export default Modal;
