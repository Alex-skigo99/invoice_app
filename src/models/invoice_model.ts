import { ObjectId } from "mongodb";
import { db } from "../config/mongoDB";
import { InvoicesReadQuery, InvoiceRequest, Invoice } from "../types/invoice";
import { validateCreateRequest, validateUpdateRequest } from "../types/validation";
import { getTotal } from "../services/invoice_service";


const collectionName = "invoices";

export const invoiceModel = {

    async read({query, options}: InvoicesReadQuery) {
        return await db.collection(collectionName).find(query, options).toArray()
    },

    async readOne(dbId: string) {
        return await db.collection(collectionName).findOne({ '_id': new ObjectId(dbId) });
    },

    async create(invoice: InvoiceRequest, createInvoiceInstance: (invoice: InvoiceRequest) => Invoice) {
        validateCreateRequest(invoice);
        let newInvoice;
        while (!newInvoice) {
            let genInvoice = createInvoiceInstance(invoice);
            const invoiceDb = await db.collection(collectionName).findOne({ 'invoice_id': genInvoice.invoice_id });
            if (invoiceDb === null) {
                newInvoice = genInvoice;
            }
            if (genInvoice.description === 'test') {
                invoice.description = ''; // Return empty description for the next iteration with a random ID
            }
        };
        const result = await db.collection(collectionName).insertOne(newInvoice);
        return { ...newInvoice, _id: result.insertedId };
    },

    async update(dbId: string, invoice: InvoiceRequest) {
        validateUpdateRequest(invoice);
        const toUpdate = {...invoice, total: getTotal(invoice)};
        const result = await db.collection(collectionName).findOneAndUpdate(
            { '_id': new ObjectId(dbId) },
            { $set: { ...toUpdate } },
            { returnDocument: 'after' }
        );
        return result; 
    },

    async delete(dbId: string) {
        return await db.collection(collectionName).deleteOne({ '_id': new ObjectId(dbId) }); 
        // {"acknowledged": true,"deletedCount": 1}
    },

    async ping() {
        await db.command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    }
};