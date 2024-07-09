import { Invoice } from '@/gql/graphql';
import convertISODateToDDMMYear from '@/shared/convertISODateToDDMMYear';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { AiFillEye, AiTwotoneDelete } from 'react-icons/ai';
import { useCounterData } from '../../CounterProvider';
import { faMoneyBillAlt, faFileInvoice, faCheckDouble, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ITableItem {
    data: any[]
    deleteInvoice: (id: any) => void
}

const InvoiceTable = ({ data, deleteInvoice }: ITableItem) => {
    const [isOpen, setIsOpen] = useState(false);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const counterData = useCounterData();

    useEffect(() => {
        console.log('fromDate:', fromDate);
        console.log('toDate:', toDate);
    }, [fromDate, toDate]);

    // Filter data based on the creation date range
    const filteredData = data.filter(item => {
        const createdDate = new Date(item.createdAt);
        const from = fromDate ? new Date(fromDate) : null;
        const to = toDate ? new Date(toDate) : null;
        console.log('createdDate:', createdDate);
        return (!from || createdDate >= from) && (!to || createdDate <= to);
    });

    // Count of items based on the serial number
    const serialNumberCount: { [key: number]: number } = {};
    filteredData.forEach((item, idx) => {
        const serialNumber = idx + 1;
        serialNumberCount[serialNumber] = (serialNumberCount[serialNumber] || 0) + 1;
    });

    // Total number of quotations
    const totalQuotationCount = Object.values(serialNumberCount).reduce((total, count) => total + count, 0);
    const underReviewCount = filteredData.filter(item => item.status === 'SENT' && item.sentBy !== 'VENDOR').length;
    const confirmedCount = filteredData.filter(item => item.status === 'CONFIRMED').length;

    const handleClick = async (id: string, isViewed: boolean) => {
        if (!isViewed) {
            counterData?.handleUpdateView(id, "invoice");
            counterData?.invoiceRefetch();
        }
    };
    const [searchQuery, setSearchQuery] = useState('')
    const [fetchDirection, setFetchDirection] = useState('All')

    const handleClearDates = () => {
        setFromDate('');
        setToDate('');
    };

    return (
        <>
            {/* Date range filter */}
            <div className="flex space-x-4 mb-4 items-end">
                <div>
                    <label htmlFor="fromDate" className="block text-sm font-medium text-gray-700">From Date</label>
                    <input
                        type="date"
                        id="fromDate"
                        style={{backgroundColor:'#e8e8e880'}}

                        value={fromDate}
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
                    style={{backgroundColor:'#e8e8e880'}}

                    className="mb-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Clear
                </button>
            </div>
         
         
            {/* <div className="card mb-4">
                <div className="card-widget-separator-wrapper">
                    <div className="card-body card-widget-separator">
                        <div className="row gy-4 gy-sm-1">
                            <div className="col-sm-6 col-lg-3">
                                <div className="d-flex justify-content-between align-items-start card-widget-1 border-end pb-3 pb-sm-0">
                                    <div>
                                        <h3 className="mb-1">{totalQuotationCount}</h3>
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
                                        <h3 className="mb-1">{}</h3>
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
                                        <h3 className="mb-1">{underReviewCount}</h3>
                                        <p className="mb-0">Under Review</p>
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
                                        <h3 className="mb-1">{confirmedCount}</h3>
                                        <p className="mb-0">Confirmed</p>
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
            <table className="w-full table-auto text-sm text-left">
                <thead className="text-gray-600 font-medium border-b">
                    <tr style={{color:'black'}}>
                        <th className="py-3 pr-6">Serial No.</th>
                        <th className="py-3 pr-6">Id</th>
                        <th className="py-3 pr-6">User Id</th>
                        <th className="py-3 pr-6">Quotation For</th>
                        <th className="py-3 pr-6">Type</th>
                        <th className="py-3 pr-6">Status</th>
                        <th className="py-3 pr-6">Date</th>
                        <th className="py-3 pr-6">Expiry Date</th>
                        <th className="py-3 pr-6 text-right">Action</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 divide-y">
                    {filteredData && filteredData.map((item, idx) => (
                        <tr key={item?.id} className={item?.isViewed ? "bg-white" : 'bg-gray-200'}                         style={{backgroundColor:'#e8e8e880'}}
                        >
                            <td className="pr-6 py-4 whitespace-nowrap text-center">{idx + 1}</td>
                            <td className="pr-6 py-4 whitespace-nowrap">
                                {`CIS/QN${item?.ticket}`}
                            </td>
                            <td className="pr-6 py-4 whitespace-nowrap capitalize">
                                <Link target='_blank' href={`/admin/dashboard/users/${item?.hasClient?.userIs?.id}`}>
                                    {item?.hasClient?.userIs?.userId || 'N/A'}
                                </Link>
                            </td>
                            <td className="pr-6 py-4 whitespace-nowrap">
                                {item?.sentBy === 'ADMIN' ? 'Sent to Client' : 'Received from Vendor'}
                            </td>
                            <td className="pr-6 py-4 whitespace-nowrap">{item?.type}</td>
                            <td className="pr-6 py-4 whitespace-nowrap capitalize">
                                {item?.status === 'SENT' && item?.sentBy === 'VENDOR' ? "Received" : item?.status === "SENT" ? "Under Review" : item?.status === "CONFIRMED" ? "Confirmed" : item?.status === "COMPLAINED" ? "Complained" : 'N/A'}
                            </td>
                            <td className="pr-6 py-4 whitespace-nowrap">{convertISODateToDDMMYear(item?.createdAt) || 'N/A'}</td>
                            <td className="pr-6 py-4 whitespace-nowrap">{convertISODateToDDMMYear(item?.expiryDate) || 'N/A'}</td>
                            <td className="whitespace-nowrap">
                                <div className="relative flex items-center justify-end space-x-4 px-8">
                                    <div onClick={() => handleClick(item?.id, item?.isViewed as boolean)}>
                                        <Link href={`/admin/dashboard/quotation/preview/${item?.id}`} className="focus:ring-2 block focus:ring-offset-2 text-sm leading-none text-green-600 py-2 px-2 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none"><AiFillEye />
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
        </>
    );
};

export default InvoiceTable;
