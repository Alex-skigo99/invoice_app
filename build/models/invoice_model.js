"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invoiceModel = void 0;
const mongoDB_1 = require("../config/mongoDB");
const collectionName = "invoices";
const databaseName = "enterprise";
exports.invoiceModel = {
    async readAll(status) {
        try {
            await mongoDB_1.mongoClient.connect();
            if (status)
                return await mongoDB_1.mongoClient.db(databaseName).collection(collectionName).find({ status: status }).toArray();
            else
                return await mongoDB_1.mongoClient.db(databaseName).collection(collectionName).find().toArray();
        }
        catch (error) {
            console.error("An error occurred while reading invoices: ", error);
        }
        finally {
            await mongoDB_1.mongoClient.close();
        }
    },
    async create(invoice) {
        try {
            await mongoDB_1.mongoClient.connect();
            const result = await mongoDB_1.mongoClient.db(databaseName).collection(collectionName).insertOne(invoice);
            return { ...invoice, _id: result.insertedId };
        }
        catch (error) {
            console.error("An error occurred while creating an invoice: ", error);
        }
        finally {
            await mongoDB_1.mongoClient.close();
        }
    },
    async update(invoice) {
        try {
            await mongoDB_1.mongoClient.connect();
            await mongoDB_1.mongoClient.db(databaseName).collection(collectionName).updateOne({ _id: invoice._id }, { $set: { ...invoice } });
        }
        catch (error) {
            console.error("An error occurred while updating an invoice: ", error);
        }
        finally {
            await mongoDB_1.mongoClient.close();
        }
    },
    async delete(dbId) {
        try {
            await mongoDB_1.mongoClient.connect();
            await mongoDB_1.mongoClient.db(databaseName).collection(collectionName).deleteOne({ _id: dbId });
        }
        catch (error) {
            console.error("An error occurred while deleting an invoice: ", error);
        }
        finally {
            await mongoDB_1.mongoClient.close();
        }
    },
    async check() {
        try {
            await mongoDB_1.mongoClient.connect();
            // Send a ping to confirm a successful connection
            await mongoDB_1.mongoClient.db(databaseName).command({ ping: 1 });
            console.log("Pinged your deployment. You successfully connected to MongoDB!");
            return true;
        }
        catch (error) {
            console.error("An error occurred while checking the connection: ", error);
            return false;
        }
        finally {
            await mongoDB_1.mongoClient.close();
        }
    }
};
