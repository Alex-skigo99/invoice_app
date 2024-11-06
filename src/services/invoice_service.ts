import { Invoice, InvoiceRequest, Item } from "../types/invoice";

export function generateID(): string {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const randomLetters = letters.charAt(Math.floor(Math.random() * 26)) + 
                          letters.charAt(Math.floor(Math.random() * 26));
    const randomNumbers = Math.floor(1000 + Math.random() * 9000); // Generates a 4-digit number from 1000 to 9999
    return randomLetters + randomNumbers;
};

export const calculateTotal = (items: Required<Item[]>) => items.reduce((acc, item) => acc + (item.total ?? 0), 0);
 // calculate total from items

export function getTotal(invoice: InvoiceRequest): number {
    let total = invoice.items ? calculateTotal(invoice.items) : 0;
    return total;
};

export const createInvoiceInstance = (invoice: InvoiceRequest) => {
    let newInvoice: Invoice;
    // If the invoice description is 'test', use the client name as the invoice ID
    if (invoice.description === 'test') {
        newInvoice = {...invoice, invoice_id: invoice.clientName || 'AB1234', total: getTotal(invoice) };
        return newInvoice;
    };
    // Otherwise, generate a random invoice ID
    newInvoice = {...invoice, invoice_id: generateID(), total: getTotal(invoice) };
    return newInvoice;
};

export const updateInvoiceInstance = (invoice: InvoiceRequest) => {
    if (invoice.items) {
        const toUpdate = {...invoice, total: getTotal(invoice)};
        return toUpdate;
    }
    return invoice;
};
