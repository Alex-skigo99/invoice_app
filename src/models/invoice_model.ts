import { ObjectId } from "mongodb";
import { mongoClient } from "../config/mongoDB";
import { Invoice } from "../types/invoice";

const collectionName = "invoices";
const databaseName = "enterprise";

export const invoiceModel = {

    async readAll(status: string | undefined) {
        try {
            await mongoClient.connect();
            if (status) return await mongoClient.db(databaseName).collection(collectionName).find({status: status}).toArray()
                else return await mongoClient.db(databaseName).collection(collectionName).find().toArray();
        }
        catch (error) {
            console.error("An error occurred while reading invoices: ", error);
        }
        finally {
        await mongoClient.close();
        }
    },

    async create(invoice: Invoice) {
        try {
            await mongoClient.connect();
            const result = await mongoClient.db(databaseName).collection(collectionName).insertOne(invoice);
            return { ...invoice, _id: result.insertedId };
        } 
        catch (error) {
            console.error("An error occurred while creating an invoice: ", error);
        } 
        finally {
            await mongoClient.close();
        }
    },

    async update(invoice: Invoice) {
        try {
            await mongoClient.connect();
            await mongoClient.db(databaseName).collection(collectionName).updateOne(
                { _id: invoice._id },
                { $set: { ...invoice } }
            );
        }
        catch (error) {
            console.error("An error occurred while updating an invoice: ", error);
        }
        finally {
            await mongoClient.close();
        }
    },
    async delete(dbId: string) {
        try {
            await mongoClient.connect();
            await mongoClient.db(databaseName).collection(collectionName).deleteOne({ _id: dbId as unknown as ObjectId });
        }
        catch (error) {
            console.error("An error occurred while deleting an invoice: ", error);
        }
        finally {
            await mongoClient.close();
        }
    },
    async check() {
        try {
        await mongoClient.connect();
        // Send a ping to confirm a successful connection
        await mongoClient.db(databaseName).command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        return true;
        } 
        catch (error) {
            console.error("An error occurred while checking the connection: ", error);
            return false;
        }
        finally {
        await mongoClient.close();
        }
    }
};