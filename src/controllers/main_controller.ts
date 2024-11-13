import { Request, Response } from "express";
import { invoiceModel } from "../models/invoice_model";
import { InvoicesReadQuery } from "../types/invoice";
import { isValidStatus } from "../types/validation";
import { CRUDError } from "../types/errors";
    
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
        const invoiceDb = await invoiceModel.readOne(dbId);
        if (invoiceDb === null) throw new CRUDError("Invoice for update not found");
        if (invoiceDb.status === 'paid') throw new CRUDError("Unable to update. Invoice is already paid");
        const result = await invoiceModel.update(dbId, invoice);
        res.status(200).json(result); // return updated invoice
    },

    delete: async (req: Request, res: Response) => {
        const { dbId } = req.params;
        const invoiceDb = await invoiceModel.readOne(dbId);
        if (invoiceDb === null) throw new CRUDError("Invoice for deletion not found");
        const result = await invoiceModel.delete(dbId);
        res.status(200).json(result);
    },

    hello: async (req: Request, res: Response) => {
        await invoiceModel.ping();
        res.status(200).json({ message: "Hello from My API with connected to MongoDB!" });
    },
};
