'use client'

import { Invoice } from '@/gql/graphql';
import convertISODateToDDMMYear from '@/shared/convertISODateToDDMMYear';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { AiFillEye, AiTwotoneDelete } from 'react-icons/ai';
import { useCounterData } from '../../CounterProvider';
import { useMutation } from 'graphql-hooks';
import { useGqlClient } from '@/hooks/UseGqlClient';
import Loading from '@/app/loading';
import toast from 'react-hot-toast';
import { faMoneyBillAlt, faFileInvoice, faCheckDouble, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ITableItem {
    data: any[]
    deleteInvoice: (id: any) => void
    getInvoiceData: any
    setRefetch: any
}

const UPDATE_INVOICE = `
mutation UpdateInvoices($where: InvoiceWhere, $update: InvoiceUpdateInput) {
    updateInvoices(where: $where, update: $update) {
      info {
        nodesCreated
      }
    }
  }
`

const InvoiceTable = ({ data, deleteInvoice, getInvoiceData, setRefetch }: ITableItem) => {
    const [isOpen, setIsOpen] = useState(false);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    // HOOKS
    const counterData = useCounterData();
    const client = useGqlClient();
    const [updateInvoiceFn, updateInvoiceState] = useMutation(UPDATE_INVOICE, { client });

    const updateInvoice = async (id: string, status: string) => {
        const { data } = await updateInvoiceFn({
            variables: {
                "where": {
                    "id": id
                },
                "update": {
                    "paymentStatus": status
                }
            }
        });
        if (data) {
            toast.success('Updated successfully');
            setRefetch(true);
            getInvoiceData();
        }
    };

    useEffect(() => { }, [updateInvoiceState.data]);

    const handleClick = async (id: string, isViewed: boolean) => {
        if (!isViewed) {
            counterData?.handleUpdateView(id, "invoice");
            counterData?.invoiceRefetch();
        }
    };

    if (updateInvoiceState?.loading) return <Loading />;

    const invoiceCount = data?.length || 0; // Get invoice count from data length

    let totalAmount = 0; // Initialize total amount
    let paidInvoiceCount = 0;
    let unpaidInvoiceCount = 0;
    if (data) {
        totalAmount = data.reduce((acc, item) => acc + (item?.priceWithTax || 0), 0);
        paidInvoiceCount = data.filter(item => item.paymentStatus === 'Paid').length;
        unpaidInvoiceCount = data.filter(item => item.paymentStatus === 'Unpaid').length;
    }

    const formatIndianNumber = (num) => {
        if (num === 0) return '0';
        // Create a new Intl.NumberFormat object for Indian locale
        const formatter = new Intl.NumberFormat('en-IN', {
            maximumFractionDigits: 2, // Limit to 2 decimal places
        });
        return formatter.format(num);
    };

    // Filter data based on the creation date range
    const filteredData = data.filter(item => {
        const createdDate = new Date(item.createdAt);
        const from = fromDate ? new Date(fromDate) : null;
        const to = toDate ? new Date(toDate) : null;
        return (!from || createdDate >= from) && (!to || createdDate <= to);
    });

    const handleClearDates = () => {
        setFromDate('');
        setToDate('');
    };
    const [searchQuery, setSearchQuery] = useState('')
    const [fetchDirection, setFetchDirection] = useState('DESC')
  
    return (
        <>
            <div className="flex space-x-4 mb-4 items-end">
                <div>
                    <label htmlFor="fromDate" className="block text-sm font-medium text-gray-700">From Date</label>
                    <input
                        type="date"
                        id="fromDate"
                        value={fromDate}
                        style={{backgroundColor:'#e8e8e880'}}

                        onChange={(e) => setFromDate(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>
                <div>
                    <label htmlFor="toDate" className="block text-sm font-medium text-gray-700">To Date</label>
                    <input
                        type="date"
                        id="toDate"
                        style={{backgroundColor:'#e8e8e880'}}

                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>
                <button
                    onClick={handleClearDates}
                    className="mb-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    style={{backgroundColor:'#e8e8e880'}}

                >
                    Clear
                </button>
                 {/* <div className="my-2 flex justify-end sm:flex-row flex-col mb-5"> */}
        <div className="flex flex-row mb-1 sm:mb-0" style={{marginLeft:'5rem'}}>

          <div className="relative">
            <select
              value={setFetchDirection as any}
              onChange={(e) => setFetchDirection(e.target.value)}
              className="form-control"
              style={{backgroundColor:'#e8e8e880'}}

              // className=" h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block  w-full  bg-white border-gray-300  py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r text-xs  focus:border-gray-500  dark:bg-darkBg dark:border-darkBorder"
              >
              <option value={"All"}>All</option>
              <option value={"DESC"}>Descending Order</option>
              <option value={"ASC"}>Ascending Order</option>
            </select>

          </div>
        </div>
        <div className="block relative" style={{marginTop:'-1rem'}}>
          <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
            {/* <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current text-gray-500">
              <path
                d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z">
              </path>
            </svg> */}
          </span>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Invoice"
            className="form-control"
            style={{backgroundColor:'#e8e8e880'}}

            // className="  sm:rounded-l-none border border-gray-300 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
             />
       {/* <label><input type="search" className="form-control" placeholder="Search Invoice" aria-controls="DataTables_Table_0"/></label> */}

        </div>
      {/* </div> */}
            </div>

{/* 
            <div className="card mb-4">
                <div className="card-widget-separator-wrapper">
                    <div className="card-body card-widget-separator">
                        <div className="row gy-4 gy-sm-1">
                            <div className="col-sm-6 col-lg-3">
                                <div className="d-flex justify-content-between align-items-start card-widget-1 border-end pb-3 pb-sm-0">
                                    <div>
                                        <h3 className="mb-1">{formatIndianNumber(totalAmount)}</h3>
                                        <p className="mb-0">Total</p>
                                    </div>
                                    <div className="avatar me-sm-4">
                                        <span className="avatar-initial rounded bg-label-secondary">
                                            <FontAwesomeIcon icon={faMoneyBillAlt} className="bx bx-sm" />
                                        </span>
                                    </div>
                                </div>
                                <hr className="d-none d-sm-block d-lg-none me-4" />
                            </div>
                            <div className="col-sm-6 col-lg-3">
                                <div className="d-flex justify-content-between align-items-start card-widget-2 border-end pb-3 pb-sm-0">
                                    <div>
                                        <h3 className="mb-1">{invoiceCount}</h3>
                                        <p className="mb-0">Invoices</p>
                                    </div>
                                    <div className="avatar me-lg-4">
                                        <span className="avatar-initial rounded bg-label-secondary">
                                            <FontAwesomeIcon icon={faFileInvoice} className="bx bx-sm" />
                                        </span>
                                    </div>
                                </div>
                                <hr className="d-none d-sm-block d-lg-none" />
                            </div>
                            <div className="col-sm-6 col-lg-3">
                                <div className="d-flex justify-content-between align-items-start border-end pb-3 pb-sm-0 card-widget-3">
                                    <div>
                                        <h3 className="mb-1">{paidInvoiceCount}</h3>
                                        <p className="mb-0">Paid</p>
                                    </div>
                                    <div className="avatar me-sm-4">
                                        <span className="avatar-initial rounded bg-label-secondary">
                                            <FontAwesomeIcon icon={faCheckDouble} className="bx bx-sm" />
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-lg-3">
                                <div className="d-flex justify-content-between align-items-start">
                                    <div>
                                        <h3 className="mb-1">{unpaidInvoiceCount}</h3>
                                        <p className="mb-0">Unpaid</p>
                                    </div>
                                    <div className="avatar">
                                        <span className="avatar-initial rounded bg-label-secondary">
                                            <FontAwesomeIcon icon={faExclamationCircle} className="bx bx-sm" />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

            <div className="card">
                <div className="card-datatable table-responsive">
                    <table className="invoice-list-table table border-top">
                        <thead>
                            <tr>
                                <th className="py-3 pr-6">Serial No.</th>
                                <th className="py-3 pr-6">Invoice Id</th>
                                <th className="py-3 pr-6">User Id</th>
                                <th className="py-3 pr-6">Type</th>
                                <th className="py-3 pr-6">Date</th>
                                <th className="py-3 pr-6">Payment Status</th>
                                <th className="py-3 pr-6 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 divide-y">
                            {filteredData && filteredData.map((item, idx) => (
                                <tr key={item?.id} className=''>
                                    <td className="pr-6 py-3 whitespace-nowrap">{idx + 1}</td>
                                    <td className="pr-6 py-3 whitespace-nowrap">
                                        {`CIS/IN${item?.ticket}`}
                                    </td>
                                    <td className="pr-6 py-4 whitespace-nowrap uppercase">
                                        <Link target='_blank' href={`/admin/dashboard/users/${item?.hasClient?.userIs?.id}`}>
                                            {item?.hasClient?.userIs?.userId || 'N/A'}
                                        </Link>
                                    </td>
                                    <td className="pr-6 py-4 whitespace-nowrap uppercase">{item?.type}</td>
                                    <td className="pr-6 py-4 whitespace-nowrap">{convertISODateToDDMMYear(item?.createdAt) || 'N/A'}</td>
                                    <td className="pr-2 py-2 whitespace-nowrap uppercase">
                                        <select
                                            onChange={(e) => updateInvoice(item?.id, e.target.value)}
                                            value={item?.paymentStatus}
                                            name=""
                                            className='p-0 m-0'
                                            id=""
                                            style={{backgroundColor:'#e8e8e880'}}

                                        >
                                            <option value="">Select</option>
                                            <option value="Paid">Paid</option>
                                            <option value="Unpaid">Unpaid</option>
                                            <option value="Pending">Pending</option>
                                            <option value="Partially Paid">Partially Paid</option>
                                            <option value="Overdue">Overdue</option>
                                            <option value="Completed">Completed</option>
                                            <option value="Processed">Processed</option>
                                            <option value="Canceled">Canceled</option>
                                            <option value="Refunded">Refunded</option>
                                            <option value="Disputed">Disputed</option>
                                            <option value="Authorized">Authorized</option>
                                            <option value="On Hold">On Hold</option>
                                            <option value="Delinquent">Delinquent</option>
                                            <option value="Settled">Settled</option>
                                            <option value="Cleared">Cleared</option>
                                            <option value="Sent To Collections">Sent To Collections</option>
                                            <option value="Chargeback">Chargeback</option>
                                            <option value="Void">Void</option>
                                            <option value="Pending Review">Pending Review</option>
                                            <option value="Not Applicable">Not Applicable</option>
                                        </select>
                                    </td>
                                    <td className="whitespace-nowrap">
                                        <div className="relative flex items-center justify-end space-x-4 px-8">
                                            <div onClick={() => handleClick(item?.id, item?.isViewed as boolean)}>
                                                <Link target='_blank' href={`/admin/dashboard/invoice/preview/${item?.id}`} className="focus:ring-2 focus:ring-offset-2 block text-sm leading-none text-green-600 py-2 px-2 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none">
                                                    <AiFillEye />
                                                </Link>
                                            </div>
                                            <button
                                                onClick={() => deleteInvoice(item?.id)}
                                                className="focus:ring-2 focus:ring-offset-2 text-sm leading-none text-red-600 py-2 px-2 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none">
                                                <AiTwotoneDelete />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default InvoiceTable;
