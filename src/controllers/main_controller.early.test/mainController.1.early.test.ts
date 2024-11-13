
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

    // Test for delete method - successful delete
    it("should delete an invoice and return result with status 200", async () => {
        const mockDeleteResult = { deletedCount: 1 };
        (invoiceModel.delete as jest.Mock).mockResolvedValue(mockDeleteResult);

        req.params = { dbId: "1" };

        await mainController.delete(req as Request, res as Response);

        expect(statusMock).toHaveBeenCalledWith(200);
        expect(jsonMock).toHaveBeenCalledWith(mockDeleteResult);
    });

});

// End of unit tests for: mainController
