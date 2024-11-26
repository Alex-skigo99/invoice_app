import React from 'react';
import { InvoiceListContext } from './InvoiceList';
import InvoiceItem from './InvoiceItem';

const InvoiceItemsList: React.FC = () => {
    const context = React.useContext(InvoiceListContext);
    if (!context) {
        throw new Error('useInvoiceListContext must be used within an InvoiceListContext.Provider');
    }
    const { invoices, statusFilter } = context;

    return (
        <>
            <h3>Invoice Items List</h3>
            <div id='invoices-list'>
                {invoices.filter(item => item.status === statusFilter || statusFilter === 'all').map(invoice => (
                    <InvoiceItem key={invoice._id} {...invoice} />
                ))}
            </div>
        </>
    );
};

export default InvoiceItemsList;