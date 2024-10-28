import { InvoiceSchema } from '../types/validation';

const validInvoice = {
    id: '123',
    createdAt: '2023-10-01T00:00:00Z',
    paymentDue: '2023-10-15T00:00:00Z',
    description: 'Web development services',
    paymentTerms: 30,
    clientName: 'John Doe',
    clientEmail: 'john.doe@example.com',
    status: 'paid',
    senderAddress: {
        street: '123 Main St',
        city: 'Anytown',
        postCode: '123456',
        country: 'USA'
    },
    clientAddress: {
        street: '456 Elm St',
        city: 'Othertown',
        postCode: '654321',
        country: 'USA'
    },
    items: [
        {
            name: 'Website Design',
            quantity: 1,
            price: 1000,
            total: 1000
        }
    ],
    total: 1000
};

describe('InvoiceSchema', () => {
    it('should validate a correct invoice', () => {
        expect(() => InvoiceSchema.parse(validInvoice)).not.toThrow();
    });

    it('should invalidate an invoice with missing fields', () => {
        const invalidInvoice = {
            id: '123',
            createdAt: '2023-10-01T00:00:00Z',
            paymentDue: '2023-10-15T00:00:00Z',
            description: 'Web development services',
            paymentTerms: 30,
            clientName: 'John Doe',
            clientEmail: 'john.doe@example.com',
            status: 'paid',
            senderAddress: {
                street: '123 Main St',
                city: 'Anytown',
                postCode: '123456',
                country: 'USA'
            },
            clientAddress: {
                street: '456 Elm St',
                city: 'Othertown',
                postCode: '654321',
                country: 'USA'
            },
            items: [
                {
                    name: 'Website Design',
                    quantity: 1,
                    price: 1000,
                    total: 1000
                }
            ]
            // Missing total field
        };

        expect(() => InvoiceSchema.parse(invalidInvoice)).toThrow();
    });

    it('should invalidate an invoice with incorrect id', () => {
        const invalidInvoice = {...validInvoice, id: 123};
        expect(() => InvoiceSchema.parse(invalidInvoice)).toThrow();
    });
    it('should invalidate an invoice with invalid createdAt', () => {
        const invalidInvoice = {...validInvoice, createdAt: '2023-10-01'};
        expect(() => InvoiceSchema.parse(invalidInvoice)).toThrow();
    });
    it('should invalidate an invoice with invalid paymentDue', () => {
        const invalidInvoice = {...validInvoice, paymentDue: '2023-10-15'};
        expect(() => InvoiceSchema.parse(invalidInvoice)).toThrow();
    });
    it('should invalidate an invoice with too long description', () => {
        const invalidInvoice = {...validInvoice, description: 'a'.repeat(1001)};
        expect(() => InvoiceSchema.parse(invalidInvoice)).toThrow();
    });
    it('should invalidate an invoice with too high paymentTerms', () => {
        const invalidInvoice = {...validInvoice, paymentTerms: 181};
        expect(() => InvoiceSchema.parse(invalidInvoice)).toThrow();
    });
    it('should invalidate an invoice with incorrect email', () => {
        const invalidInvoice = {...validInvoice, clientEmail: 'invalid-email'};
        expect(() => InvoiceSchema.parse(invalidInvoice)).toThrow();
    });
    it('should invalidate an invoice with incorrect status', () => {
        const invalidInvoice = {...validInvoice, status: 'invalid-status'};
        expect(() => InvoiceSchema.parse(invalidInvoice)).toThrow();
    });
    it('should invalidate an invoice with incorrect senderAddress', () => {
        const invalidInvoice = {...validInvoice, senderAddress: {street: 123}};
        expect(() => InvoiceSchema.parse(invalidInvoice)).toThrow();
    });
    it('should invalidate an invoice with incorrect clientAddress', () => {
        const invalidInvoice = {...validInvoice, clientAddress: {street: 123}};
        expect(() => InvoiceSchema.parse(invalidInvoice)).toThrow();
    });
    it('should invalidate an invoice with incorrect items', () => {
        const invalidInvoice = {...validInvoice, items: [{name: 'Website Design', quantity: 1, price: 1000}]};
        expect(() => InvoiceSchema.parse(invalidInvoice)).toThrow();
    });
    it('should invalidate an item with negative quantity', () => {
        const invalidInvoice = {...validInvoice, items: [{name: 'Website Design', quantity: -1, price: 1000, total: 1000}]};
        expect(() => InvoiceSchema.parse(invalidInvoice)).toThrow();
    });
    it('should invalidate an item with negative price', () => {
        const invalidInvoice = {...validInvoice, items: [{name: 'Website Design', quantity: 1, price: -1000, total: 1000}]};
        expect(() => InvoiceSchema.parse(invalidInvoice)).toThrow();
    });
    it('should invalidate an item with negative total', () => {
        const invalidInvoice = {...validInvoice, items: [{name: 'Website Design', quantity: 1, price: 1000, total: -1000}]};
        expect(() => InvoiceSchema.parse(invalidInvoice)).toThrow();
    });
    it('should invalidate an invoice with negative total', () => {
        const invalidInvoice = {...validInvoice, total: -1000};
        expect(() => InvoiceSchema.parse(invalidInvoice)).toThrow();
    });
});