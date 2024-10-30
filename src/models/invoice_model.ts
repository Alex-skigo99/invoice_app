import { ObjectId } from "mongodb";
import { db } from "../config/mongoDB";
import { InvoicesReadQuery, InvoiceRequest } from "../types/invoice";
import { validateDraftInvoice, validatePendingInvoice, validatePaidInvoice } from "../types/validation";
import { generateID, getTotal } from "../services/invoice_service";


export const collectionName = "invoices";


export const invoiceModel = {

    async read({query, options}: InvoicesReadQuery) {
        return await db.collection(collectionName).find(query, options).toArray()
    },

    async create(invoice: InvoiceRequest) {
        validateDraftInvoice(invoice); // only status is required and the rest is optional
        let invoiceTotal = 0;
        if (invoice.status === 'pending') {
            validatePendingInvoice(invoice); // all fields are required
            invoice.items ? invoiceTotal = getTotal(invoice.items) : 0;
        }
        const newInvoice = {...invoice, id: generateID(), total: invoiceTotal};
        const result = await db.collection(collectionName).insertOne(newInvoice);
        return { ...newInvoice, _id: result.insertedId };
    },

    async update(dbId: string, invoice: InvoiceRequest) {
        validateDraftInvoice(invoice); // only status is required and the rest is optional
        const invoiceDb = await db.collection(collectionName).findOne({ '_id': new ObjectId(dbId) });
        if (!invoiceDb) return null;
        if (invoiceDb.status === 'paid') return 'paid'; // no changes
        let toUpdate = {};
        switch (invoice.status) {
            case 'paid':
                validatePaidInvoice(invoice); // only status
                toUpdate = {...invoice};
                break;
            case 'pending':
                validatePendingInvoice(invoice); // all fields are required
                toUpdate = {...invoice, total: invoice.items ? getTotal(invoice.items) : 0 };
                break;
            case 'draft':
                toUpdate = {...invoice};
                break;
        };
        const result = await db.collection(collectionName).findOneAndUpdate(
            { '_id': new ObjectId(dbId) },
            { $set: { ...toUpdate } },
            { returnDocument: 'after' }
        );
        return result;
    },

    async delete(dbId: string) {
        return await db.collection(collectionName).deleteOne({ '_id': new ObjectId(dbId) });
    },

    // async createMany(itemsArray: Invoice[]) {
    //     const result = await db.collection(collectionName).insertMany(itemsArray);
    //     return result;
    // },

    async check() {
        await db.command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        return true;
    }
};