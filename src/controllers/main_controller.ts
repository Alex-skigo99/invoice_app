import { Request, Response } from "express";
import { invoiceModel } from "../models/invoice_model";
import { InvoicesReadQuery } from "../types/invoice";
import { isValidStatus } from "../types/validation";
    
export const mainController = {
    read: async (req: Request, res: Response) => {
        const { status } = req.query; // status is passed as query parameter
        const page = parseInt(req.query.page as string) || 0; // page is passed as query parameter for pagination
        const limit = parseInt(req.query.limit as string) || 10; // limit is passed as query parameter for pagination
        const query = (status && isValidStatus(status)) ? { status } : {}; // if status is valid, add it to query
        const options = { skip: page * limit, limit: limit };
        const readQuery: InvoicesReadQuery = { query, options };
        const invoices = await invoiceModel.read(readQuery);
        res.status(200).json(invoices);
    },

    create: async (req: Request, res: Response) => {
        const invoice = req.body;
        const newInvoice = await invoiceModel.create(invoice);
        res.status(200).json(newInvoice);
    },

    update: async (req: Request, res: Response) => {
        const { dbId } = req.params;
        const invoice = req.body;
        const result = await invoiceModel.update(dbId, invoice);
        if (result === null) {
            res.status(404).json({ message: "Invoice not found" });
        } else {
            res.status(200).json(result); // return updated invoice
        }
    },

    delete: async (req: Request, res: Response) => {
        const { dbId } = req.params;
        const result = await invoiceModel.delete(dbId);
        if (result.deletedCount === 0) {
            res.status(404).json({ message: "Invoice not found" });
        } else {
            res.status(200).json(result);
        }
    },

    hello: async (req: Request, res: Response) => {
        if (await invoiceModel.check()) {
            res.status(200).json({ message: "Hello from My API with connected to MongoDB!" });
        }
        else {
            res.status(500).json({ message: "An error occurred while connecting to MongoDB" });
        }
    },
};
