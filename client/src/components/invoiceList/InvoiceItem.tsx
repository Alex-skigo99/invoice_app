import React from 'react';

interface InvoiceItemProps {
    id: string;
    date: string;
    amount: number;
    status: 'paid' | 'pending' | 'draft';
}

const InvoiceItem: React.FC<InvoiceItemProps> = ({ id, date, amount, status }) => {
    return (
        <div className="invoice-item">
            <div className="invoice-id">{id}</div>
            <div className="invoice-date">{date}</div>
            <div className="invoice-amount">${amount.toFixed(2)}</div>
            <div className={`invoice-status ${status}`}>{status}</div>
        </div>
    );
};

export default InvoiceItem;