import React from 'react';
import FilterByStatus from './FilterByStatus';
import Button from '../button/Button';

const InvoiceListHeader: React.FC<{countInvoices: number}> = ({countInvoices}) => {

    const title: React.ReactElement = (
        <div id='invoice-list-title'>
            <h1>Invoices</h1>
            <p id='title-invoices-count' data-testid='title-invoices-count'>There are {countInvoices} total invoices</p>
        </div>
    );

    return (
        <div id='header' data-testid='header'>
            {title}
            <div className='right-block'>
                <FilterByStatus />
                <Button 
                    image='images/icon-plus.svg' 
                    title='New Invoice' 
                    width='160px' 
                    onClick={() => console.log('New Invoice')}
                    testId='new-invoice-button'
                />
            </div>
        </div>
    );
};

export default InvoiceListHeader;