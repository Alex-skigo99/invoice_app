import { ObjectId } from "mongodb";
import { db } from "../config/mongoDB";

export const collectionName = "invoices";

export const invoiceModel = {

    async read(query: {}, options?: {}) {
        return await db.collection(collectionName).find(query, options).toArray()
    },

    async create(invoice: any) {
        const result = await db.collection(collectionName).insertOne(invoice);
        return { ...invoice, _id: result.insertedId };
    },

    async update(dbId: string, invoice: any) {
        const result = await db.collection(collectionName).findOneAndUpdate(
            { '_id': new ObjectId(dbId) },
            { $set: { ...invoice } },
            { returnDocument: 'after' }
        );
        return result;
    },

    async delete(dbId: string) {
        return await db.collection(collectionName).deleteOne({ '_id': new ObjectId(dbId) });
    },

    async createMany(itemsArray: any[]) {
        const result = await db.collection(collectionName).insertMany(itemsArray);
        return result;
    },

    async check() {
        await db.command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        return true;
    }
};