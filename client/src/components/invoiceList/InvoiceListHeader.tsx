import React from 'react';
import FilterByStatus from './FilterByStatus';
import Button from '../button/Button';
import { useMediaQuery } from 'react-responsive';

const InvoiceListHeader: React.FC<{countInvoices: number}> = ({countInvoices}) => {

    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    const title: React.ReactElement = (
        <div id='invoice-list-title'>
            <h1>Invoices</h1>
            <p id='title-invoices-count' data-testid='title-invoices-count'>There are {countInvoices} total invoices</p>
        </div>
    );

    const titleMobile: React.ReactElement = (
        <div id='invoice-list-title'>
            <h2 id='title'>Invoices</h2>
            <p id='title-invoices-count' data-testid='title-invoices-count'>{countInvoices} invoices</p>
        </div>
    );

    return (
        <div id='header' data-testid='header'>
            {isMobile ? titleMobile : title}
            <div className='right-block'>
                <FilterByStatus label={isMobile ? '' : 'Filter by status'}/>
                <Button 
                    image='images/icon-plus.svg' 
                    title={isMobile ? 'New' : 'New Invoice'} 
                    width={isMobile ? '90px' : '160px'} 
                    onClick={() => console.log('New Invoice')}
                    testId='new-invoice-button'
                />
            </div>
        </div>
    );
};

export default InvoiceListHeader;