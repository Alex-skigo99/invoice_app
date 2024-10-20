
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

    // Test for the read method
    it("should return invoices with status 200", async () => {
        const mockInvoices = [{ id: 1, amount: 100 }];
        (invoiceModel.read as jest.Mock).mockResolvedValue(mockInvoices);

        req.query = {};

        await mainController.read(req as Request, res as Response);

        expect(invoiceModel.read).toHaveBeenCalledWith(req.query);
        expect(statusMock).toHaveBeenCalledWith(200);
        expect(jsonMock).toHaveBeenCalledWith(mockInvoices);
    });

    // Test for the create method
    it("should create an invoice and return it with status 200", async () => {
        const mockInvoice = { id: 1, amount: 100 };
        (invoiceModel.create as jest.Mock).mockResolvedValue(mockInvoice);

        req.body = mockInvoice;

        await mainController.create(req as Request, res as Response);

        expect(invoiceModel.create).toHaveBeenCalledWith(req.body);
        expect(statusMock).toHaveBeenCalledWith(200);
        expect(jsonMock).toHaveBeenCalledWith(mockInvoice);
    });

    // Test for the update method with a successful update
    it("should update an invoice and return result with status 200", async () => {
        const mockResult = { acknowledged: true, matchedCount: 1, modifiedCount: 1 };
        (invoiceModel.update as jest.Mock).mockResolvedValue(mockResult);

        req.params = { dbId: "1" };
        req.body = { amount: 200 };

        await mainController.update(req as Request, res as Response);

        expect(invoiceModel.update).toHaveBeenCalledWith("1", req.body);
        expect(statusMock).toHaveBeenCalledWith(200);
        expect(jsonMock).toHaveBeenCalledWith(mockResult);
    });

    // Test for the update method with no matching invoice
    it("should return 404 if invoice to update is not found", async () => {
        const mockResult = { matchedCount: 0 };
        (invoiceModel.update as jest.Mock).mockResolvedValue(mockResult);

        req.params = { dbId: "1" };
        req.body = { amount: 200 };

        await mainController.update(req as Request, res as Response);

        expect(invoiceModel.update).toHaveBeenCalledWith("1", req.body);
        expect(statusMock).toHaveBeenCalledWith(404);
        expect(jsonMock).toHaveBeenCalledWith({ message: "Invoice not found" });
    });

    // Test for the delete method with a successful deletion
    it("should delete an invoice and return result with status 200", async () => {
        const mockResult = { deletedCount: 1 };
        (invoiceModel.delete as jest.Mock).mockResolvedValue(mockResult);

        req.params = { dbId: "1" };

        await mainController.delete(req as Request, res as Response);

        expect(invoiceModel.delete).toHaveBeenCalledWith("1");
        expect(statusMock).toHaveBeenCalledWith(200);
        expect(jsonMock).toHaveBeenCalledWith(mockResult);
    });

    // Test for the delete method with no matching invoice
    it("should return 404 if invoice to delete is not found", async () => {
        const mockResult = { deletedCount: 0 };
        (invoiceModel.delete as jest.Mock).mockResolvedValue(mockResult);

        req.params = { dbId: "1" };

        await mainController.delete(req as Request, res as Response);

        expect(invoiceModel.delete).toHaveBeenCalledWith("1");
        expect(statusMock).toHaveBeenCalledWith(404);
        expect(jsonMock).toHaveBeenCalledWith({ message: "Invoice not found" });
    });

    // Test for the hello method with a successful connection
    it("should return a hello message with status 200 if connected to MongoDB", async () => {
        (invoiceModel.check as jest.Mock).mockResolvedValue(true);

        await mainController.hello(req as Request, res as Response);

        expect(invoiceModel.check).toHaveBeenCalled();
        expect(statusMock).toHaveBeenCalledWith(200);
        expect(jsonMock).toHaveBeenCalledWith({ message: "Hello from My API with connected to MongoDB!" });
    });

    // Test for the hello method with a failed connection
    it("should return an error message with status 500 if not connected to MongoDB", async () => {
        (invoiceModel.check as jest.Mock).mockResolvedValue(false);

        await mainController.hello(req as Request, res as Response);

        expect(invoiceModel.check).toHaveBeenCalled();
        expect(statusMock).toHaveBeenCalledWith(500);
        expect(jsonMock).toHaveBeenCalledWith({ message: "An error occurred while connecting to MongoDB" });
    });
});

// End of unit tests for: mainController
