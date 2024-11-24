import React from 'react';
import { useState, createContext, useEffect } from 'react';
import InvoiceListHeader from './InvoiceListHeader';
// import InvoiceItemsList from './InvoiceItemsList';
import './invoiceList.css';
import { Invoice } from '../../App/types';
import InvoiceItemsList from './InvoiceItemsList';

export interface InvoiceListContext {
    invoices: Invoice[];
    setInvoices: React.Dispatch<React.SetStateAction<Invoice[]>>;
    statusFilter: string;
    setStatusFilter: React.Dispatch<React.SetStateAction<string>>;
  };

export const InvoiceListContext = createContext<InvoiceListContext | undefined>(undefined);

const InvoiceList: React.FC = () => {
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [statusFilter, setStatusFilter] = useState<string>('all');

    return (
        <InvoiceListContext.Provider value={{invoices, setInvoices, statusFilter, setStatusFilter}} >
            <InvoiceListHeader countInvoices={invoices.length} />
            <p>Filter: {statusFilter}</p>
            <InvoiceItemsList />
        </InvoiceListContext.Provider>
    );
};

export default InvoiceList;