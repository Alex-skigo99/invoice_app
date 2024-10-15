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
        const invoice = req.body;
            await invoiceModel.update(invoice);
            res.status(200);
    },

    delete: async (req: Request, res: Response) => {
        const { dbId } = req.params;
            await invoiceModel.delete(dbId);
            res.status(200);
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
