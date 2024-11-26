import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import InvoiceItem from './InvoiceItem';
import { Status } from '../../types';

describe('InvoiceItem Component', () => {
    const mockInvoice = {
        invoice_id: 'AB1234',
        paymentDue: new Date('2023-12-31'),
        clientName: 'John Doe',
        total: 250.75,
        status: 'paid' as Status
    };

    test('renders invoice id correctly', () => {
        const { getByTestId } = render(<InvoiceItem {...mockInvoice} />);
        expect(getByTestId('id-AB1234')).toHaveTextContent('#AB1234');
    });

    test('renders payment due date correctly', () => {
        const { getByText } = render(<InvoiceItem {...mockInvoice} />);
        expect(getByText('Due 31 Dec 2023')).toBeInTheDocument();
    });

    test('renders client name correctly', () => {
        const { getByText } = render(<InvoiceItem {...mockInvoice} />);
        expect(getByText('John Doe')).toBeInTheDocument();
    });

    test('renders total amount correctly', () => {
        const { getByText } = render(<InvoiceItem {...mockInvoice} />);
        expect(getByText('$250.75')).toBeInTheDocument();
    });

    test('renders status correctly', () => {
        const { getByText } = render(<InvoiceItem {...mockInvoice} />);
        expect(getByText('paid')).toBeInTheDocument();
    });

    test('renders default values when props are missing', () => {
        const { getByText } = render(<InvoiceItem invoice_id="12345" clientName="John Doe" status="pending" />);
        expect(getByText('-')).toBeInTheDocument();
        expect(getByText('$-')).toBeInTheDocument();
    });
});