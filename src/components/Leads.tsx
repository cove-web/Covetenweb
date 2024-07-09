"use client";
import React, { useEffect, useState } from "react";
import {
  HiChevronLeft,
  HiChevronRight,
  HiOutlineCalendar,
} from "react-icons/hi";
import industries from "@/utlts/InductiresData.json";
import { useGqlClient } from "@/hooks/UseGqlClient";

import { toast } from "react-hot-toast";
import { useManualQuery, useMutation, useQuery } from "graphql-hooks";
import AuthConfig from "@/firebase/oauth.config";

// interface
interface Inputs {
  email: string;
  phone: string;
  gstNumber?: string;
}

// mutation

const CREATE_LEAD = `
mutation CreateLeads($input: [LeadsCreateInput!]!) {
    createLeads(input: $input) {
      info {
        nodesCreated
      }
    }
  }
`;

const GET_INDUSTRY = `
query IndustryPages($where: IndustryPageWhere, $options: IndustryPageOptions) {
    industryPages(where: $where, options: $options) {
      id
      title
    }
  }
`;

const GET_SERVICE = `
query Services($where: ServiceWhere, $options: ServiceOptions) {
    services(where: $where, options: $options) {
      id
      title
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
const Leads = () => {
  //states
  const [isLeadFromOpen, setIsLeadFromOpen] = useState<boolean>(false);
  const [selectedIndustry, setSelectedIndustry] = useState<any>("");
  const [selectedService, setSelectedService] = useState<any>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  // hooks
  const client = useGqlClient();
  const { user } = AuthConfig();

  // queries and mutations
  const {
    data,
    loading,
    error: industryError,
  } = useQuery(GET_INDUSTRY, { client });
  const [getUserFn, userState] = useManualQuery(GET_USER_INFO, {
    client,
  });
  const {
    data: serviceData,
    loading: serviceLoading,
    error: serviceError,
  } = useQuery(GET_SERVICE, {
    client,
    variables: {
      where: {
        isService: true,
      },
    },
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
      setError(""); // Clear any previous error message
    }
  };

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
            type: "TEST",
            industry: selectedIndustry,
            interest: `industry: ${selectedIndustry}, service: ${selectedService}`,
            createdAt: new Date().toISOString(),
            description: message,
          },
        ],
      },
    });

    if (data?.createLeads?.info?.nodesCreated) {
      setIsLeadFromOpen(false);
      toast.success("Test Requested Successfully");
      setEmail("");
      setPhone("");
      setMessage("");
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    createLeads();
    e.target.reset();
  };

  // render
  return (
    <div
      className={`fixed top-52 right-0  hidden transition-all duration-500  lg:block overflow-hidden z-[9999999999999999]
            ${isLeadFromOpen ? "h-auto w-auto" : "h-36 w-14   "}`}
    >
      <div
        className={`transition-all duration-500 transform ${
          isLeadFromOpen ? "translate-x-0" : "translate-x-[42%]"
        } `}
      >
        <div className="flex  ">
          <button
            onClick={() => setIsLeadFromOpen(!isLeadFromOpen)}
            className="bg-[#21618C] text-white px-2 text-4xl rounded-sm hidden lg:block h-28 "
            style={{   backgroundColor:'#e71a41'}}
          >
            {isLeadFromOpen ? (
              <HiChevronRight />
            ) : (
              <p
                className="text-[10px]  w-full font-bold"
                style={{
                  textOrientation: "upright",
                  writingMode: "vertical-lr"
               
                }}
              >
                INQUIRY
              </p>
            )}
          </button>
          <div className="w-full">
            <div className="flex  ">
              <div className="m-auto">
                <div>
                  <form
                    onSubmit={handleSubmit}
                    className=" bg-white border border-gray-200 shadow-lg  max-w-lg"
                  >
                    <div className="flex">
                      <div className="flex-1 py-5 pl-5 text-primaryText overflow-hidden flex items-center  space-x-3">
                        <HiOutlineCalendar size={25} />
                        <h1 className="inline text-2xl font-semibold leading-none">
                          Get Test
                        </h1>
                      </div>
                    </div>
                    <div className="px-5 pb-5">
                      <input
                        placeholder="Name"
                        required
                        onChange={(e) => setName(e.target.value)}
                        defaultValue={name}
                        className=" text-black placeholder-gray-600 w-full px-4 py-1.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-sm bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                      />
                      <input
                        placeholder="Email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        defaultValue={email}
                        className=" text-black placeholder-gray-600 w-full px-4 py-1.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-sm bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                      />
                      <input
                        placeholder="Phone"
                        required
                        type="number"
                        onChange={(e) => handlePhoneChange(e.target.value)}
                        defaultValue={phone}
                        className="text-black placeholder-gray-600 w-full px-4 py-1.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-sm bg-gray-200 focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                        pattern="[789]\d{9}" // Pattern for Indian phone numbers starting with 7, 8, or 9 and having a total of 10 digits
                      />
                      {error ? (
                        <p className="text-red-500 text-xs">{error}</p>
                      ) : null}

                      <div className="flex">
                        <div className="flex-grow">
                          <select
                            value={selectedIndustry}
                            onChange={(e) =>
                              setSelectedIndustry(e.target.value)
                            }
                            className="text-black placeholder-gray-600 w-full px-4 py-1.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-sm bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                          >
                            <option value="" disabled>
                              Select an Industry
                            </option>
                            {data?.industryPages?.map((option: any) => (
                              <option
                                key={option?.id}
                                value={option?.title}
                                className="uppercase"
                              >
                                {option?.title}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="flex-grow">
                          <select
                            value={selectedService}
                            onChange={(e) => setSelectedService(e.target.value)}
                            className="text-black placeholder-gray-600 w-full px-4 py-1.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-sm bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                          >
                            <option value="" disabled>
                              Select Service
                            </option>
                            {serviceData?.services?.map((option: any) => (
                              <option
                                key={option?.id}
                                value={option?.title}
                                className="uppercase"
                              >
                                {option?.title}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="flex">
                        <textarea
                          rows={3}
                          placeholder="message"
                          required
                          onChange={(e) => setMessage(e.target.value)}
                          defaultValue={message}
                          className=" text-black placeholder-gray-600 w-full px-4 py-1.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-sm bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                        />
                      </div>
                      <div className="mt-3">
                        <button
                          type="submit"
                          className="gradient-bg font-bold text-white px-7 py-2 "
                        >
                          {createState.loading ? "Loading.." : "Submit"}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leads;
