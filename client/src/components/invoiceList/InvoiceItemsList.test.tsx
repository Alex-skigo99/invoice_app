import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import InvoiceItemsList from './InvoiceItemsList';
import { InvoiceListContext } from './InvoiceList';
import { Status } from '../../types';

const mockInvoices = [
    { invoice_id: 'AB1234', status: 'paid' as Status, amount: 100 },
    { invoice_id: 'CD5678', status: 'unpaid' as Status, amount: 200 },
];

describe('InvoiceItemsList', () => {
    it('displays all invoices when statusFilter is "all"', () => {
        render(
            <InvoiceListContext.Provider value={{ 
                invoices: mockInvoices, 
                statusFilter: 'all', 
                setInvoices: jest.fn(), 
                setStatusFilter: jest.fn() 
            }}>
                <InvoiceItemsList />
            </InvoiceListContext.Provider>
        );
        expect(screen.getByTestId('id-AB1234')).toBeInTheDocument();
        expect(screen.getByTestId('id-CD5678')).toBeInTheDocument();
    });

    it('filters invoices based on statusFilter', () => {
        render(
            <InvoiceListContext.Provider value={{ 
                invoices: mockInvoices, 
                statusFilter: 'paid', 
                setInvoices: jest.fn(), 
                setStatusFilter: jest.fn() 
            }}>
                <InvoiceItemsList />
            </InvoiceListContext.Provider>
        );
        expect(screen.getByTestId('id-AB1234')).toBeInTheDocument();
        expect(screen.queryByTestId('id-CD5678')).not.toBeInTheDocument();
    });

    it('throws an error when used outside of InvoiceListContext.Provider', () => {
        expect(() => render(<InvoiceItemsList />)).toThrow(
            'useInvoiceListContext must be used within an InvoiceListContext.Provider'
        );
    });
});