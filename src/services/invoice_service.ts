import { InvoiceRequest, Item } from "../types/invoice";

export function generateID() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const randomLetters = letters.charAt(Math.floor(Math.random() * 26)) + 
                          letters.charAt(Math.floor(Math.random() * 26));
    const randomNumbers = Math.floor(1000 + Math.random() * 9000); // Generates a 4-digit number from 1000 to 9999
    return randomLetters + randomNumbers;
};

export const calculateTotal = (items: Item[]) => items.reduce((acc, item) => acc + item.total, 0); // calculate total from items

export function getTotal(invoice: InvoiceRequest) {
    let total = 0;
    if (invoice.status === 'pending' || invoice.status === 'paid') {
        invoice.items ? total = calculateTotal(invoice.items) : 0;
    }
    return total;
}