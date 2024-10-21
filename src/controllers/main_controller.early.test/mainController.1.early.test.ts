
// Unit tests for: mainController


import { Request, Response } from "express";
import { invoiceModel } from "../../models/invoice_model";
import { mainController } from '../main_controller';



jest.mock("../../models/invoice_model");

describe('mainController() mainController method', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let jsonMock: jest.Mock;
    let statusMock: jest.Mock;

    beforeEach(() => {
        jsonMock = jest.fn();
        statusMock = jest.fn(() => ({ json: jsonMock }));
        req = {};
        res = {
            status: statusMock,
        };
    });

    // Test for read method
    it("should return invoices with status 200", async () => {
        const mockInvoices = [{ id: 1, amount: 100 }];
        (invoiceModel.read as jest.Mock).mockResolvedValue(mockInvoices);

        req.query = {};

        await mainController.read(req as Request, res as Response);

        expect(invoiceModel.read).toHaveBeenCalledWith(req.query);
        expect(statusMock).toHaveBeenCalledWith(200);
        expect(jsonMock).toHaveBeenCalledWith(mockInvoices);
    });

    // Test for create method
    it("should create an invoice and return it with status 200", async () => {
        const mockInvoice = { amount: 100 };
        const mockNewInvoice = { id: 1, amount: 100 };
        (invoiceModel.create as jest.Mock).mockResolvedValue(mockNewInvoice);

        req.body = mockInvoice;

        await mainController.create(req as Request, res as Response);

        expect(invoiceModel.create).toHaveBeenCalledWith(mockInvoice);
        expect(statusMock).toHaveBeenCalledWith(200);
        expect(jsonMock).toHaveBeenCalledWith(mockNewInvoice);
    });

    // Test for update method - successful update
    it("should update an invoice and return it with status 200", async () => {
        const mockInvoice = { amount: 150 };
        const mockUpdatedInvoice = { id: 1, amount: 150 };
        (invoiceModel.update as jest.Mock).mockResolvedValue(mockUpdatedInvoice);

        req.params = { dbId: "1" };
        req.body = mockInvoice;

        await mainController.update(req as Request, res as Response);

        expect(invoiceModel.update).toHaveBeenCalledWith("1", mockInvoice);
        expect(statusMock).toHaveBeenCalledWith(200);
        expect(jsonMock).toHaveBeenCalledWith(mockUpdatedInvoice);
    });

    // Test for update method - invoice not found
    it("should return 404 if invoice to update is not found", async () => {
        (invoiceModel.update as jest.Mock).mockResolvedValue(null);

        req.params = { dbId: "1" };
        req.body = { amount: 150 };

        await mainController.update(req as Request, res as Response);

        expect(invoiceModel.update).toHaveBeenCalledWith("1", req.body);
        expect(statusMock).toHaveBeenCalledWith(404);
        expect(jsonMock).toHaveBeenCalledWith({ message: "Invoice not found" });
    });

    // Test for delete method - successful delete
    it("should delete an invoice and return result with status 200", async () => {
        const mockDeleteResult = { deletedCount: 1 };
        (invoiceModel.delete as jest.Mock).mockResolvedValue(mockDeleteResult);

        req.params = { dbId: "1" };

        await mainController.delete(req as Request, res as Response);

        expect(invoiceModel.delete).toHaveBeenCalledWith("1");
        expect(statusMock).toHaveBeenCalledWith(200);
        expect(jsonMock).toHaveBeenCalledWith(mockDeleteResult);
    });

    // Test for delete method - invoice not found
    it("should return 404 if invoice to delete is not found", async () => {
        const mockDeleteResult = { deletedCount: 0 };
        (invoiceModel.delete as jest.Mock).mockResolvedValue(mockDeleteResult);

        req.params = { dbId: "1" };

        await mainController.delete(req as Request, res as Response);

        expect(invoiceModel.delete).toHaveBeenCalledWith("1");
        expect(statusMock).toHaveBeenCalledWith(404);
        expect(jsonMock).toHaveBeenCalledWith({ message: "Invoice not found" });
    });

    // Test for hello method - successful connection
    it("should return a success message if connected to MongoDB", async () => {
        (invoiceModel.check as jest.Mock).mockResolvedValue(true);

        await mainController.hello(req as Request, res as Response);

        expect(invoiceModel.check).toHaveBeenCalled();
        expect(statusMock).toHaveBeenCalledWith(200);
        expect(jsonMock).toHaveBeenCalledWith({ message: "Hello from My API with connected to MongoDB!" });
    });

    // Test for hello method - failed connection
    it("should return an error message if not connected to MongoDB", async () => {
        (invoiceModel.check as jest.Mock).mockResolvedValue(false);

        await mainController.hello(req as Request, res as Response);

        expect(invoiceModel.check).toHaveBeenCalled();
        expect(statusMock).toHaveBeenCalledWith(500);
        expect(jsonMock).toHaveBeenCalledWith({ message: "An error occurred while connecting to MongoDB" });
    });
});

// End of unit tests for: mainController
