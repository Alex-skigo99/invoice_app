import { ObjectId } from "mongodb";
import { db } from "../config/mongoDB";
import { InvoicesReadQuery, InvoiceRequest, Invoice } from "../types/invoice";
import { validateCreateRequest, validateUpdateRequest } from "../types/validation";
import { updateInvoiceInstance } from "../services/invoice_service";
import { ResourceNotExistError, ValidationError } from "../types/errors";


const collectionName = "invoices";

export const invoiceModel = {

    async read({query, options}: InvoicesReadQuery) {
        return await db.collection(collectionName).find(query, options).toArray()
    },

    async readOne(dbId: string) {
        return await db.collection(collectionName).findOne({ '_id': new ObjectId(dbId) });
    },

    async findByIdOrThrow(dbId: string) {
        const invoiceDb = await db.collection(collectionName).findOne({ '_id': new ObjectId(dbId) }) as Invoice | null;
        if (invoiceDb === null) throw new ResourceNotExistError("Invoice not found");
        return invoiceDb;
    },

    async findByIdOrThrowUpdate(dbId: string) {
        const invoiceDb = await db.collection(collectionName).findOne({ '_id': new ObjectId(dbId) }) as Invoice | null;
        if (invoiceDb === null) throw new ResourceNotExistError("Invoice not found");
        if (invoiceDb.status === 'paid') throw new ValidationError("Unable to update. Invoice is already paid");
        return invoiceDb;
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
        };
        const result = await db.collection(collectionName).insertOne({
            ...newInvoice,
            _id: new ObjectId()
        });
        return { ...newInvoice, _id: result.insertedId };
    },

    async update(dbId: string, invoice: InvoiceRequest) {
        validateUpdateRequest(invoice);
        const toUpdate = updateInvoiceInstance(invoice);
        const result = await db.collection(collectionName).findOneAndUpdate(
            { '_id': new ObjectId(dbId) },
            { $set: { ...toUpdate } },
            { returnDocument: 'after' }
        );
        return result; 
    },

    async delete(invoice: Invoice) {
        return await db.collection(collectionName).deleteOne({ '_id': new ObjectId(invoice._id) }); 
        // {"acknowledged": true,"deletedCount": 1}
    },

    async ping() {
        await db.command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    }
};