"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainController = void 0;
const invoice_model_1 = require("../models/invoice_model");
exports.mainController = {
    readAll: async (req, res) => {
        const { status } = req.query;
        try {
            const invoices = await invoice_model_1.invoiceModel.readAll(status);
            console.log("invoices", invoices); // debug
            res.status(200).json(invoices);
        }
        catch (error) {
            console.error("An error occurred while reading invoices: ", error);
            res.status(404).json({ message: 'Something went wrong!', error: error });
        }
    },
    create: async (req, res) => {
        const invoice = req.body;
        console.log("invoice", invoice); // debug
        try {
            const newInvoice = await invoice_model_1.invoiceModel.create(invoice);
            res.status(201).json(newInvoice);
        }
        catch (error) {
            console.error("An error occurred while creating an invoice: ", error);
            res.status(500).json({ message: "An error occurred while creating an invoice" });
        }
    },
    update: async (req, res) => {
        const invoice = req.body;
        try {
            await invoice_model_1.invoiceModel.update(invoice);
            res.status(206).json({ message: "Invoice updated" });
        }
        catch (error) {
            console.error("An error occurred while updating an invoice: ", error);
            res.status(500).json({ message: "An error occurred while updating an invoice" });
        }
    },
    delete: async (req, res) => {
        const { dbId } = req.params;
        try {
            await invoice_model_1.invoiceModel.delete(dbId);
            res.status(204).json({ message: "Invoice deleted" });
        }
        catch (error) {
            console.error("An error occurred while deleting an invoice: ", error);
            res.status(500).json({ message: "An error occurred while deleting an invoice" });
        }
    },
    hello: async (req, res) => {
        if (await invoice_model_1.invoiceModel.check()) {
            res.status(200).json({ message: "Hello from My API with connected to MongoDB!" });
        }
        else {
            res.status(500).json({ message: "An error occurred while connecting to MongoDB" });
        }
    },
};
