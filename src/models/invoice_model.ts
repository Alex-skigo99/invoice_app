import { ObjectId } from "mongodb";
import { db } from "../config/mongoDB";
import { Invoice } from "../types/invoice";

const collectionName = "invoices";

export const invoiceModel = {

    async read(query: {}) {
        return await db.collection(collectionName).find(query).toArray()
    },

    async create(invoice: Invoice) {
        const result = await db.collection(collectionName).insertOne(invoice);
        return { ...invoice, _id: result.insertedId };
    },

    async update(dbId: string, invoice: Invoice) {
        return await db.collection(collectionName).updateOne(
            { '_id': new ObjectId(dbId) },
            { $set: { ...invoice } }
        );
    },

    async delete(dbId: string) {
        return await db.collection(collectionName).deleteOne({ '_id': new ObjectId(dbId) });
    },
    
    async check() {
        await db.command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        return true;
    }
};