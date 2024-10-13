import { Request, Response } from "express";
import { invoiceModel } from "../models/invoice_model";
    
export const mainController = {
    read: async (req: Request, res: Response) => {
        try {
            const invoices = await invoiceModel.read(req.query);
            res.status(200).json(invoices);
        }
        catch (error) {
            console.error("An error occurred while reading invoices: ", error);
            res.status(500).json({message:'Something went wrong!', error: error});
        }
    },

    create: async (req: Request, res: Response) => {
        const invoice = req.body;
        try {
            const newInvoice = await invoiceModel.create(invoice);
            res.status(200).json(newInvoice);
        }
        catch (error) {
            console.error("An error occurred while creating an invoice: ", error);
            res.status(500).json({ message: "An error occurred while creating an invoice" });
        }
    },

    update: async (req: Request, res: Response) => {
        const invoice = req.body;
        try {
            await invoiceModel.update(invoice);
            res.status(200).json({ message: "Invoice updated" });
        }
        catch (error) {
            console.error("An error occurred while updating an invoice: ", error);
            res.status(500).json({ message: "An error occurred while updating an invoice" });
        }
    },

    delete: async (req: Request, res: Response) => {
        const { dbId } = req.params;
        try {
            await invoiceModel.delete(dbId);
            res.status(200);
        }
        catch (error) {
            console.error("An error occurred while deleting an invoice: ", error);
            res.status(500).json({ message: "An error occurred while deleting an invoice" });
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
