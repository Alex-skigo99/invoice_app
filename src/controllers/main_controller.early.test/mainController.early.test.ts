
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
