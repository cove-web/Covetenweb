"use client";
import { Invoice } from "@/gql/graphql";
import convertISODateToDDMMYear from "@/shared/convertISODateToDDMMYear";
import getInvoiceData from "@/shared/graphQl/queries/invoiceData";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { usePDF } from "react-to-pdf";
import Content from "./Content";

const InvoicePreview = () => {
  const [invoiceData, setInvoiceData] = React.useState<any | null>(null);

  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });

  // hooks
  const params = useParams();

  useEffect(() => {
    getData();
  }, [params?.id]);

  const getData = async () => {
    const invoice: any = await getInvoiceData(params.id);
    setInvoiceData(invoice);
  };

  return (
    <section>
      <div className=" dark:bg-slate-900 relative">
        {/* <!-- Invoice --> */}
        <div
          ref={targetRef}
          className="max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto my-4 sm:my-4 "
        >
          <div className="sm:w-11/12 lg:w-3/4 mx-auto">
            {/* <!-- Card --> */}
            <div className="flex flex-col p-4 sm:px-10 sm:pt-14 sm:pb-40  bg-white shadow-md rounded-xl dark:bg-gray-800  ">
              {/* <!-- Grid --> */}
              <div className="flex justify-between">
                {invoiceData?.sentBy === "VENDOR" ? (
                  <>
                    <div>
                      <div className="mt-7">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 capitalize">
                          {invoiceData?.vendorCreated?.userIs?.companyName}{" "}
                        </h3>
                        <h3 className="text-sm  text-gray-600 dark:text-gray-200">
                          {invoiceData?.vendorCreated?.userIs?.companyEmail}{" "}
                        </h3>
                        <h3 className="text-sm  text-gray-600 dark:text-gray-200">
                          GST Number:{" "}
                          {invoiceData?.vendorCreated?.userIs?.gstNumber}{" "}
                        </h3>
                        <address className="mt-1 text-sm not-italic text-gray-500">
                          {
                            invoiceData?.vendorCreated?.userIs
                              ?.hasPrimaryaddress?.street
                          }
                          <br />
                          {
                            invoiceData?.vendorCreated?.userIs
                              ?.hasPrimaryaddress?.city
                          }
                          ,{" "}
                          {
                            invoiceData?.vendorCreated?.userIs
                              ?.hasPrimaryaddress?.state
                          }
                        </address>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <img src="/assets/log.png" alt="logo" />
                      <div className="mt-7">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                          Coveten Technologies India LLP{" "}
                        </h3>

                        <address className="mt-1 text-sm not-italic text-gray-500">
                          #504, 2nd Phase, 6th Stage, BTM Layout, Off
                          Bannerghatta road
                          <br />
                          {/* <br /> */}
                          Bangalore Karnataka 560076 , India
                          <br />
                          GSTIN 29AASFC8354K1ZM
                          <br />
                        </address>
                      </div>
                    </div>
                  </>
                )}
                {/* <!-- Col --> */}

                <div className="text-right">
                  <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200">
                    Quotation
                  </h2>
                  <span className="mt-1 block font-semibold text-gray-900">
                    {invoiceData?.status === "CONFIRMED"
                      ? `# CIS/IN${
                          invoiceData?.ticket
                            ? invoiceData?.ticket
                            : "loading..."
                        }`
                      : `# CIS/QN${
                          invoiceData?.ticket
                            ? invoiceData?.ticket
                            : "loading..."
                        }`}
                  </span>
                </div>
                {/* <!-- Col --> */}
              </div>
              {/* <!-- End Grid --> */}

              {/* <!-- Grid --> */}
              <div className="mt-8 grid sm:grid-cols-2 gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                    Quotation For:
                  </h3>
                  {invoiceData?.sentBy === "VENDOR" ? (
                    <>
                      <div>
                        <div className="mb-10">
                          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                            Coveten Technologies India LLP{" "}
                          </h3>

                          <address className="mt-1 text-sm not-italic text-gray-500">
                            #504, 2nd Phase, 6th Stage, BTM Layout, Off
                            Bannerghatta road
                            <br />
                            {/* <br /> */}
                            Bangalore Karnataka 560076 , India
                            <br />
                            GSTIN 29AASFC8354K1ZM
                            <br />
                          </address>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <h3 className="text-base  text-gray-600 dark:text-gray-200">
                        {invoiceData?.hasClient?.userIs?.companyName}
                      </h3>
                      <address className="mt-1 text-sm not-italic text-gray-500">
                        {invoiceData?.hasClient?.userIs?.companyEmail}
                        <br />
                        {
                          invoiceData?.hasClient?.userIs?.hasPrimaryaddress
                            ?.street
                        }
                        ,
                        {
                          invoiceData?.hasClient?.userIs?.hasPrimaryaddress
                            ?.city
                        }
                        ,
                        {
                          invoiceData?.hasClient?.userIs?.hasPrimaryaddress
                            ?.state
                        }
                        ,
                        <br />
                        GSTIN {invoiceData?.hasClient?.userIs?.gstNumber}
                      </address>
                    </>
                  )}
                </div>
                {/* <!-- Col --> */}

                <div className="sm:text-right space-y-2">
                  {/* <!-- Grid --> */}
                  <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
                    <dl className="grid sm:grid-cols-3 gap-x-1">
                      <dt className="col-span-2 font-semibold text-gray-800 dark:text-gray-200">
                        Date:
                      </dt>
                      <dd className="col-span-1 text-gray-500">
                        {convertISODateToDDMMYear(invoiceData?.createdAt) ||
                          "N/A"}
                      </dd>
                    </dl>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
                    <dl className="grid sm:grid-cols-3 gap-x-1">
                      <dt className="col-span-2 font-semibold text-gray-800 dark:text-gray-200">
                        Expiry Date:
                      </dt>
                      <dd className="col-span-1 text-gray-500">
                        {convertISODateToDDMMYear(invoiceData?.expiryDate) ||
                          "N/A"}
                      </dd>
                    </dl>
                  </div>
                  {/* <!-- End Grid --> */}
                </div>
                {/* <!-- Col --> */}
              </div>
              {/* <!-- End Grid --> */}

              <div className="space-y-3 mt-5">
                <p className="font-semibold">
                  Place Of Supply:{" "}
                  <span className="text-dimText font-normal">
                    {invoiceData?.placeOfSupply}
                  </span>
                </p>
                <p className="font-semibold">
                  HSN/SAC:{" "}
                  <span className="text-dimText font-normal">
                    {invoiceData?.hsn}
                  </span>
                </p>
                <p className="font-semibold">
                  Type:{" "}
                  <span className="text-dimText font-normal">
                    {invoiceData?.type || "N/A"}
                  </span>
                </p>
                <p className="font-semibold">
                  Subject:{" "}
                  <span className="text-dimText font-normal">
                    {invoiceData?.subject}
                  </span>
                </p>
              </div>

              {/* <!-- Table --> */}
              <div className="mt-6">
                <div className="border border-gray-200 p-4 rounded-lg space-y-4 dark:border-gray-700">
                  <div className="hidden md:flex items-center justify-between">
                    <div className="sm:col-span-2 text-xs font-medium  uppercase">
                      Service Name
                    </div>

                    <div className="text-right text-xs font-medium uppercase">
                      Quantity
                    </div>
                    <div className="text-right text-xs font-medium  uppercase">
                      Amount
                    </div>
                  </div>

                  <div className="hidden sm:block border-b border-gray-200 dark:border-gray-700"></div>

                  <div className="grid  gap-2">
                    {invoiceData?.hasPurchase?.map(
                      (service: any) => (
                        <div className="grid grid-cols-3 " key={service?.id}>
                          <div>
                            <p className="font-medium text-xs lg:text-base text-gray-800 dark:text-gray-200">
                              {service?.itemName}
                            </p>
                          </div>
                          <div>
                            <p className="font-medium text-xs text-center lg:text-base text-gray-800 dark:text-gray-200">
                              {service?.quantity}
                            </p>
                          </div>

                          <div>
                            <p className="sm:text-right text-xs lg:text-base text-gray-800 dark:text-gray-200">
                              {service?.price}
                            </p>
                          </div>
                        </div>
                      )
                      // <div className="sm:hidden border-b border-gray-200 dark:border-gray-700"></div>
                    )}
                  </div>
                </div>
                {/* <!-- End Table --> */}

                {/* <!-- Flex --> */}
                <div className="mt-8 flex sm:justify-end">
                  <div className="w-full max-w-2xl text-sm sm:text-right space-y-2">
                    {/* <!-- Grid --> */}
                    <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
                      {/* <dl className="grid sm:grid-cols-5 gap-x-3">
                                        <dt className="col-span-3 font-semibold text-gray-800 dark:text-gray-200">Subtotal:</dt>
                                        <dd className="col-span-2 text-gray-500">$2750.00</dd>
                                    </dl> */}

                      <dl className="grid sm:grid-cols-5 gap-x-3">
                        <dt className="col-span-3 font-semibold text-gray-800 dark:text-gray-200">
                          Total:
                        </dt>
                        <dd className="col-span-2 text-gray-500">
                          {invoiceData?.totalPrice}
                        </dd>
                      </dl>

                      <dl className="grid sm:grid-cols-5 gap-x-3">
                        <dt className="col-span-3 font-semibold text-gray-800 dark:text-gray-200">
                          {invoiceData?.taxType}:
                        </dt>
                        <dd className="col-span-2 text-gray-500">
                          {invoiceData?.taxRate}%
                        </dd>
                      </dl>

                      <dl className="grid sm:grid-cols-5 gap-x-3">
                        <dt className="col-span-3 font-semibold text-gray-800 dark:text-gray-200">
                          Total Amount With Tax:
                        </dt>
                        <dd className="col-span-2 text-gray-500">
                          {invoiceData?.priceWithTax}
                        </dd>
                      </dl>
                    </div>
                    {/* <!-- End Grid --> */}
                  </div>
                </div>
                {/* <!-- End Flex --> */}
              </div>
              {/* <!-- End Card --> */}

              {/* <!-- End Buttons --> */}
            </div>
          </div>
        </div>
        {/* <!-- Buttons --> */}
        <div
          onClick={() => toPDF()}
          className="cursor-pointer max-w-[85rem] mx-auto mt-6 flex justify-end gap-x-3 "
        >
          <p className="inline-flex items-center mr-36 gap-x-3 text-center bg-blue-600 hover:bg-blue-700 border border-transparent text-sm text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition py-3 px-4 dark:focus:ring-offset-gray-800">
            <svg
              className="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M8.5 6.5a.5.5 0 0 0-1 0v3.793L6.354 9.146a.5.5 0 1 0-.708.708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 10.293V6.5z" />
              <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
            </svg>
            PDF
          </p>
        </div>
      </div>

      <section className="max-w-[70rem]   px-4 sm:px-6 lg:px-8 mx-auto my-4 sm:my-4 ">
        <div className="p-4 sm:px-10 sm:pt-14 sm:pb-40  bg-white shadow-md rounded-xl dark:bg-gray-800">
          {invoiceData?.hasTermspage && (
            <Content content={invoiceData?.hasTermspage?.content} />
          )}
        </div>
      </section>
    </section>
  );
};

export default InvoicePreview;
