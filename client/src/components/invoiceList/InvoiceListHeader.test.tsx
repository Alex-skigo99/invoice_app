import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import InvoiceListHeader from './InvoiceListHeader';
import { InvoiceListContext } from '../invoiceList/InvoiceList'; // Import the context

describe('InvoiceListHeader', () => {
    const mockContextValue = {
        statusFilter: 'all',
        setStatusFilter: jest.fn(),
        invoices: [],
        setInvoices: jest.fn()
    };

    it('renders the title and invoice count', () => {
        render(
            <InvoiceListContext.Provider value={mockContextValue}>
                <InvoiceListHeader countInvoices={5} />
            </InvoiceListContext.Provider>
        );
        const countElement = screen.getByTestId('title-invoices-count');
        
        expect(countElement).toHaveTextContent('There are 5 total invoices');
    });

    it('renders the FilterByStatus component', () => {
        render(
            <InvoiceListContext.Provider value={mockContextValue}>
                <InvoiceListHeader countInvoices={5} />
            </InvoiceListContext.Provider>
        );
        const filterByStatusElement = screen.getByTestId('select-status');
        
        expect(filterByStatusElement).toBeInTheDocument();
    });

    it('renders the New Invoice button', () => {
        render(
            <InvoiceListContext.Provider value={mockContextValue}>
                <InvoiceListHeader countInvoices={5} />
            </InvoiceListContext.Provider>
        );
        const buttonElement = screen.getByTestId('new-invoice-button');
        
        expect(buttonElement).toBeInTheDocument();
        expect(buttonElement).toHaveTextContent('New Invoice');
    });
});