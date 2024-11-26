import React from 'react';
import { Invoice } from '../../types';

type InvoiceItemProps = Pick<Invoice, '_id' | 'invoice_id' | 'paymentDue' | 'clientName' | 'total' | 'status'>;

const dateToString = (date: Date) => {
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][date.getMonth()];
    return `Due ${date.getDate()} ${month} ${date.getFullYear()}`;
}

const InvoiceItem: React.FC<InvoiceItemProps> = ({ _id, invoice_id, paymentDue, clientName, total, status }) => {
    return (
        <div className="invoice-item" key={_id}>
            <div className="invoice-id" data-testid={`id-${invoice_id}`}><span>#</span>{invoice_id}</div>
            <div className="invoice-date">{paymentDue ? dateToString(paymentDue) : '-'}</div>
            <div className="invoice-client">{clientName}</div>
            <div className="invoice-total">${total ? total.toFixed(2) : '-'}</div>
            <div className={`invoice-status ${status}`}>{status}</div>
            <div className='invoice-action'><img src="images/icon-arrow-right.svg" alt="act" /></div>
        </div>
    );
};

export default InvoiceItem;