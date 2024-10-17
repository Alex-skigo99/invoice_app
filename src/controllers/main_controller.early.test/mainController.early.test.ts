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
        statusMock = jest.fn().mockReturnValue({ json: jsonMock });
        req = {};
        res = {
            status: statusMock,
        };
    });

    describe("read", () => {
        it("should return invoices on successful read", async () => {
            // Arrange
            const invoices = [{ id: 1, amount: 100 }];
            (invoiceModel.read as jest.Mock).mockResolvedValue(invoices);
            req.query = {};

            // Act
            await mainController.read(req as Request, res as Response);

            // Assert
            expect(invoiceModel.read).toHaveBeenCalledWith(req.query);
            expect(statusMock).toHaveBeenCalledWith(200);
            expect(jsonMock).toHaveBeenCalledWith(invoices);
        });
    });

    describe("create", () => {
        it("should create a new invoice and return it", async () => {
            // Arrange
            const invoice = { amount: 100 };
            const newInvoice = { id: 1, amount: 100 };
            (invoiceModel.create as jest.Mock).mockResolvedValue(newInvoice);
            req.body = invoice;

            // Act
            await mainController.create(req as Request, res as Response);

            // Assert
            expect(invoiceModel.create).toHaveBeenCalledWith(invoice);
            expect(statusMock).toHaveBeenCalledWith(200);
            expect(jsonMock).toHaveBeenCalledWith(newInvoice);
        });
    });

    describe("update", () => {
        it("should update an existing invoice and return the result", async () => {
            // Arrange
            const dbId = "1";
            const invoice = { amount: 200 };
            const result = { matchedCount: 1 };
            (invoiceModel.update as jest.Mock).mockResolvedValue(result);
            req.params = { dbId };
            req.body = invoice;

            // Act
            await mainController.update(req as Request, res as Response);

            // Assert
            expect(invoiceModel.update).toHaveBeenCalledWith(dbId, invoice);
            expect(statusMock).toHaveBeenCalledWith(200);
            expect(jsonMock).toHaveBeenCalledWith(result);
        });

        it("should return 404 if invoice to update is not found", async () => {
            // Arrange
            const dbId = "1";
            const invoice = { amount: 200 };
            const result = { matchedCount: 0 };
            (invoiceModel.update as jest.Mock).mockResolvedValue(result);
            req.params = { dbId };
            req.body = invoice;

            // Act
            await mainController.update(req as Request, res as Response);

            // Assert
            expect(invoiceModel.update).toHaveBeenCalledWith(dbId, invoice);
            expect(statusMock).toHaveBeenCalledWith(404);
            expect(jsonMock).toHaveBeenCalledWith({ message: "Invoice not found" });
        });
    });

    describe("delete", () => {
        it("should delete an invoice and return the result", async () => {
            // Arrange
            const dbId = "1";
            const result = { deletedCount: 1 };
            (invoiceModel.delete as jest.Mock).mockResolvedValue(result);
            req.params = { dbId };

            // Act
            await mainController.delete(req as Request, res as Response);

            // Assert
            expect(invoiceModel.delete).toHaveBeenCalledWith(dbId);
            expect(statusMock).toHaveBeenCalledWith(200);
            expect(jsonMock).toHaveBeenCalledWith(result);
        });

        it("should return 404 if invoice to delete is not found", async () => {
            // Arrange
            const dbId = "1";
            const result = { deletedCount: 0 };
            (invoiceModel.delete as jest.Mock).mockResolvedValue(result);
            req.params = { dbId };

            // Act
            await mainController.delete(req as Request, res as Response);

            // Assert
            expect(invoiceModel.delete).toHaveBeenCalledWith(dbId);
            expect(statusMock).toHaveBeenCalledWith(404);
            expect(jsonMock).toHaveBeenCalledWith({ message: "Invoice not found" });
        });
    });
});
