import React, { useEffect, useState, createContext } from 'react';
import InvoiceListHeader from './InvoiceListHeader';
import './invoiceList.css';
import { Invoice } from '../../types';
import InvoiceItemsList from './InvoiceItemsList';
import { mockFetchInvoice } from '../../utils/mock-fetch';

export interface InvoiceListContextType {
    invoices: Invoice[];
    setInvoices: React.Dispatch<React.SetStateAction<Invoice[]>>;
    statusFilter: string;
    setStatusFilter: React.Dispatch<React.SetStateAction<string>>;
  };

export const InvoiceListContext = createContext<InvoiceListContextType | undefined>(undefined);

const InvoiceList: React.FC = () => {
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [statusFilter, setStatusFilter] = useState<string>('all');

    useEffect(() => {
        mockFetchInvoice()
        .then(data => setInvoices(data))
    });

    return (
        <InvoiceListContext.Provider value={{invoices, setInvoices, statusFilter, setStatusFilter}} >
            <InvoiceListHeader countInvoices={invoices.length} />
            {invoices.length === 0 || <InvoiceItemsList />}
        </InvoiceListContext.Provider>
    );
};

export default InvoiceList;