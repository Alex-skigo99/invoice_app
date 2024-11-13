import { Invoice, InvoiceRequest, Item } from "../types/invoice";

export const generateID = {
    get() {
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const randomLetters = letters.charAt(Math.floor(Math.random() * 26)) + 
                            letters.charAt(Math.floor(Math.random() * 26));
        const randomNumbers = Math.floor(1000 + Math.random() * 9000); // Generates a 4-digit number from 1000 to 9999
        return randomLetters + randomNumbers;
    }
};

export const calculateTotal = (items: Required<Item[]>) => items.reduce((acc, item) => acc + (item.total ?? 0), 0);
 // calculate total from items

export function getTotal(invoice: InvoiceRequest): number {
    let total = invoice.items ? calculateTotal(invoice.items) : 0;
    return total;
};

export const createInvoiceFromInvoiceRequest = (invoice: InvoiceRequest) => {
    const newInvoice: Invoice = {...invoice, invoice_id: generateID.get(), total: getTotal(invoice) };
    return newInvoice;
};

export const updateInvoiceInstance = (invoice: InvoiceRequest) => {
    if (invoice.items) {
        const toUpdate = {...invoice, total: getTotal(invoice)};
        return toUpdate;
    }
    return invoice;
};
