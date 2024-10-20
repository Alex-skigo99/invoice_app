import { Request, Response } from "express";
import { invoiceModel } from "../models/invoice_model";
    
export const mainController = {
    read: async (req: Request, res: Response) => {
            const invoices = await invoiceModel.read(req.query);
            res.status(200).json(invoices);
    },

    create: async (req: Request, res: Response) => {
        const invoice = req.body;
            const newInvoice = await invoiceModel.create(invoice);
            res.status(200).json(newInvoice);
    },

    update: async (req: Request, res: Response) => {
        const { dbId } = req.params;
        const invoice = req.body; // must be without _id
        const result = await invoiceModel.update(dbId, invoice);
        if (result.matchedCount === 0) {
            res.status(404).json({ message: "Invoice not found" });
        } else {
            res.status(200).json(result); // return { acknowledged: true, matchedCount: 1, modifiedCount: n, upsertedId: null,  }
        }
        res.status(200);
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
