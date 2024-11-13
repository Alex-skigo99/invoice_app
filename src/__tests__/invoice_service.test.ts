import { calculateTotal, generateID, getTotal } from '../services/invoice_service';
import { InvoiceRequest, Item } from '../types/invoice';

describe('generateID', () => {
    it('should generate an ID with 2 letters followed by 4 digits', () => {
        const id = generateID();
        expect(id).toMatch(/^[A-Z]{2}\d{4}$/);
    });

    it('should generate unique IDs', () => {
        const id1 = generateID();
        const id2 = generateID();
        expect(id1).not.toBe(id2);
    });
});

describe('calculateTotal', () => {
    it('should return the total sum of item totals', () => {
        const items: Item[] = [
            {
                total: 100,
                name: '',
                quantity: 2,
                price: 50
            },
            {
                total: 200,
                name: '',
                quantity: 2,
                price: 100
            },
            {
                total: 300,
                name: '',
                quantity: 3,
                price: 100
            }
        ];
        const total = calculateTotal(items);
        expect(total).toBe(600);
    });

    it('should return 0 if no items are provided', () => {
        const items: Item[] = [];
        const total = calculateTotal(items);
        expect(total).toBe(0);
    });

    it('should handle items with zero total', () => {
        const items: Item[] = [
            {
                total: 0,
                name: '',
                quantity: 0,
                price: 0
            },
            {
                total: 0,
                name: '',
                quantity: 0,
                price: 0
            },
            {
                total: 0,
                name: '',
                quantity: 0,
                price: 0
            }
        ];
        const total = calculateTotal(items);
        expect(total).toBe(0);
    });
});

describe('getTotal', () => {
    it('should return 0 for draft invoices', () => {
        const invoice: InvoiceRequest = {
            status: 'draft',
            items: []
        };
        const total = getTotal(invoice);
        expect(total).toBe(0);
    });

    it('should return 0 for draft invoices with items', () => {
        const invoice: InvoiceRequest = {
            status: 'draft',
            items: [
                {
                    total: 100,
                    name: '',
                    quantity: 2,
                    price: 50
                },
                {
                    total: 200,
                    name: '',
                    quantity: 2,
                    price: 100
                },
                {
                    total: 300,
                    name: '',
                    quantity: 3,
                    price: 100
                }
            ]
        };
        const total = getTotal(invoice);
        expect(total).toBe(0);
    });

    it('should return total for pending invoices', () => {
        const invoice: InvoiceRequest = {
            status: 'pending',
            items: [
                {
                    total: 100,
                    name: '',
                    quantity: 2,
                    price: 50
                },
                {
                    total: 200,
                    name: '',
                    quantity: 2,
                    price: 100
                },
                {
                    total: 300,
                    name: '',
                    quantity: 3,
                    price: 100
                }
            ]
        };
        const total = getTotal(invoice);
        expect(total).toBe(600);
    });

    it('should return total for paid invoices', () => {
        const invoice: InvoiceRequest = {
            status: 'paid',
            items: [
                {
                    total: 100,
                    name: '',
                    quantity: 2,
                    price: 50
                },
                {
                    total: 200,
                    name: '',
                    quantity: 2,
                    price: 100
                },
                {
                    total: 300,
                    name: '',
                    quantity: 3,
                    price: 100
                }
            ]
        };
        const total = getTotal(invoice);
        expect(total).toBe(600);
    });
});