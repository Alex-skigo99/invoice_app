import { InvoiceRequest } from '../types/invoice';
import { InvoiceSchema } from '../types/validation';

const validInvoice: InvoiceRequest = {
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
};

describe('InvoiceSchema', () => {
    it('should validate a correct invoice', () => {
        expect(() => InvoiceSchema.parse(validInvoice)).not.toThrow();
    });

    it('should invalidate an invoice with missing fields', () => {
        const invalidInvoice = {...validInvoice};
        delete invalidInvoice.clientName;
        const result = InvoiceSchema.safeParse(invalidInvoice);
        expect(result.error?.issues).toEqual([{
            "code": "invalid_type",
            "expected": "string",
            "message": "Required",
            "path": ["clientName"],
            "received": "undefined"
        }]);
    });

    it('should invalidate an invoice with invalid createdAt', () => {
        const invalidInvoice = {...validInvoice, createdAt: '2023-10-01'};
        const result = InvoiceSchema.safeParse(invalidInvoice);
        expect(result.error?.issues).toEqual(
            [
                {
                  code: 'invalid_string',
                  validation: 'datetime',
                  message: 'Invalid datetime',
                  path: [ 'createdAt' ]
                }
              ]
        );
    });
    it('should invalidate an invoice with invalid paymentDue', () => {
        const invalidInvoice = {...validInvoice, paymentDue: '2023-10-15'};
        const result = InvoiceSchema.safeParse(invalidInvoice);
        expect(result.error?.issues).toEqual(
            [
                {
                  code: 'invalid_string',
                  validation: 'datetime',
                  message: 'Invalid datetime',
                  path: [ 'paymentDue' ]
                }
              ]
        );
    });
    it('should invalidate an invoice with too long description', () => {
        const invalidInvoice = {...validInvoice, description: 'a'.repeat(1001)};
        const result = InvoiceSchema.safeParse(invalidInvoice);
        expect(result.error?.issues).toEqual(
            [
                {
                  code: 'too_big',
                  maximum: 1000,
                  type: 'string',
                  inclusive: true,
                  exact: false,
                  message: 'String must contain at most 1000 character(s)',
                  path: [ 'description' ]
                }
              ]
        );
    });
    it('should invalidate an invoice with too high paymentTerms', () => {
        const invalidInvoice = {...validInvoice, paymentTerms: 181};
        const result = InvoiceSchema.safeParse(invalidInvoice);
        expect(result.error?.issues).toEqual(
            [
                {
                  code: 'too_big',
                  maximum: 180,
                  type: 'number',
                  inclusive: true,
                  exact: false,
                  message: 'Number must be less than or equal to 180',
                  path: [ 'paymentTerms' ]
                }
              ]
        );
    });
    it('should invalidate an invoice with incorrect email', () => {
        const invalidInvoice = {...validInvoice, clientEmail: 'invalid-email'};
        const result = InvoiceSchema.safeParse(invalidInvoice);
        expect(result.error?.issues).toEqual(
            [
                {
                  validation: 'email',
                  code: 'invalid_string',
                  message: 'Invalid email',
                  path: [ 'clientEmail' ]
                }
              ]
        );
    });
    it('should invalidate an invoice with incorrect status', () => {
        const invalidInvoice = {...validInvoice, status: 'invalid-status'};
        const result = InvoiceSchema.safeParse(invalidInvoice);
        expect(result.error?.issues).toEqual(
            [
                {
                  received: 'invalid-status',
                  code: 'invalid_enum_value',
                  options: [ 'paid', 'pending', 'draft' ],
                  path: [ 'status' ],
                  message: "Invalid enum value. Expected 'paid' | 'pending' | 'draft', received 'invalid-status'"
                }
              ]
        );
    });
    it('should invalidate an invoice with incorrect senderAddress', () => {
        const invalidInvoice = {...validInvoice, senderAddress: {street: 123}};
        const result = InvoiceSchema.safeParse(invalidInvoice);
        expect(result.error?.issues).toEqual(
            [
                {
                  code: 'invalid_type',
                  expected: 'string',
                  received: 'number',
                  path: [ 'senderAddress', 'street' ],
                  message: 'Expected string, received number'
                },
                {
                  code: 'invalid_type',
                  expected: 'string',
                  received: 'undefined',
                  path: [ 'senderAddress', 'city' ],
                  message: 'Required'
                },
                {
                  code: 'invalid_type',
                  expected: 'string',
                  received: 'undefined',
                  path: [ 'senderAddress', 'postCode' ],
                  message: 'Required'
                },
                {
                  code: 'invalid_type',
                  expected: 'string',
                  received: 'undefined',
                  path: [ 'senderAddress', 'country' ],
                  message: 'Required'
                }
              ]
        );
    });
    it('should invalidate an invoice with incorrect clientAddress', () => {
        const invalidInvoice = {...validInvoice, clientAddress: {street: 123}};
        const result = InvoiceSchema.safeParse(invalidInvoice);
        expect(result.error?.issues).toEqual(
            [
                {
                  code: 'invalid_type',
                  expected: 'string',
                  received: 'number',
                  path: [ 'clientAddress', 'street' ],
                  message: 'Expected string, received number'
                },
                {
                  code: 'invalid_type',
                  expected: 'string',
                  received: 'undefined',
                  path: [ 'clientAddress', 'city' ],
                  message: 'Required'
                },
                {
                  code: 'invalid_type',
                  expected: 'string',
                  received: 'undefined',
                  path: [ 'clientAddress', 'postCode' ],
                  message: 'Required'
                },
                {
                  code: 'invalid_type',
                  expected: 'string',
                  received: 'undefined',
                  path: [ 'clientAddress', 'country' ],
                  message: 'Required'
                }
              ]
        );
    });
    it('should invalidate an invoice with incorrect items', () => {
        const invalidInvoice = {...validInvoice, items: [{name: 'Website Design', quantity: 1, price: 1000}]};
        const result = InvoiceSchema.safeParse(invalidInvoice);
        expect(result.error?.issues).toEqual(
            [
                {
                  code: 'invalid_type',
                  expected: 'number',
                  received: 'undefined',
                  path: [ 'items', 0, 'total' ],
                  message: 'Required'
                }
              ]
        );
    });
    it('should invalidate an item with negative quantity', () => {
        const invalidInvoice = {...validInvoice, items: [{name: 'Website Design', quantity: -1, price: 1000, total: 1000}]};
        const result = InvoiceSchema.safeParse(invalidInvoice);
        expect(result.error?.issues).toEqual(
            [
                {
                  code: 'too_small',
                  minimum: 0,
                  type: 'number',
                  inclusive: true,
                  exact: false,
                  message: 'Number must be greater than or equal to 0',
                  path: [ 'items', 0, 'quantity' ]
                }
              ]
        );
    });
    it('should invalidate an item with negative price', () => {
        const invalidInvoice = {...validInvoice, items: [{name: 'Website Design', quantity: 1, price: -1000, total: 1000}]};
        const result = InvoiceSchema.safeParse(invalidInvoice);
        expect(result.error?.issues).toEqual(
            [
                {
                  code: 'too_small',
                  minimum: 0,
                  type: 'number',
                  inclusive: true,
                  exact: false,
                  message: 'Number must be greater than or equal to 0',
                  path: [ 'items', 0, 'price' ]
                }
              ]
        );
    });
    it('should invalidate an item with negative total', () => {
        const invalidInvoice = {...validInvoice, items: [{name: 'Website Design', quantity: 1, price: 1000, total: -1000}]};
        const result = InvoiceSchema.safeParse(invalidInvoice);
        expect(result.error?.issues).toEqual(
            [
                {
                  code: 'too_small',
                  minimum: 0,
                  type: 'number',
                  inclusive: true,
                  exact: false,
                  message: 'Number must be greater than or equal to 0',
                  path: [ 'items', 0, 'total' ]
                }
              ]
        );
    });
});
