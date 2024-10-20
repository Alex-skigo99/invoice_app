import supertest from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import { createExpressServer } from "../config/serverExpress";
import { connectToDB } from "../config/mongoDB";
import { Invoice } from "../types/invoice";

const app = createExpressServer();

const mockData: Invoice = {
    "id": "1",
    "createdAt": "2021-10-19T00:00:00.000Z",
    "paymentDue": "2021-10-20T00:00:00.000Z",
    "description": "Re-branding",
    "paymentTerms": 1,
    "clientName": "Jensen Huang",
    "clientEmail": "name@mail.com",
    "status": "draft",
    "senderAddress": {
        "street": "19 Union Terrace",
        "city": "London",
        "postCode": "E1 3EZ",
        "country": "United Kingdom"
    },
    "clientAddress": {
        "street": "19 Union Terrace",
        "city": "London",
        "postCode": "E1 3EZ",
        "country": "United Kingdom"
    },
    "items": [
        {
            "name": "Brand Guidelines",
            "quantity": 1,
            "price": 1800,
            "total": 1800
        }
    ],
    "total": 1800
};

let invoiceId: string = "";

describe("invoice CRUD operations test", () => {
    let mongoServer: MongoMemoryServer;

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        const dbName = "testDb";
        await connectToDB(uri, dbName);
    });

    afterAll(async () => {
        await mongoServer.stop();
    });

    describe("start page is availibale", () => {
        it("should return 200 OK", async () => {
            const response = await supertest(app).get("/");
            expect(response.status).toBe(200);
        });
    });

    // describe("swagger is available", () => {
    //     it("should return 200 OK", async () => {
    //         const response = await supertest(app).get("http://localhost:3001/api-docs");
    //         expect(response.status).toBe(200);
    //     });
    // });

    describe("invoice is created", () => {
        it("should return 200", async () => {
            const response = await supertest(app)
                .post("/api/invoices")
                .send(mockData);
            expect(response.status).toBe(200);
            const data = await response.body;
            invoiceId = data._id;
            expect(data.id).toEqual(mockData.id);
            expect(data.createdAt).toEqual(mockData.createdAt);
            expect(data.paymentDue).toEqual(mockData.paymentDue);
            expect(data.description).toEqual(mockData.description);
            expect(data.paymentTerms).toEqual(mockData.paymentTerms);
            expect(data.clientName).toEqual(mockData.clientName);
            expect(data.clientEmail).toEqual(mockData.clientEmail);
            expect(data.status).toEqual(mockData.status);
            expect(data.senderAddress.street).toEqual(mockData.senderAddress.street);
            expect(data.senderAddress.city).toEqual(mockData.senderAddress.city);
            expect(data.senderAddress.postCode).toEqual(mockData.senderAddress.postCode);
            expect(data.senderAddress.country).toEqual(mockData.senderAddress.country);
            expect(data.clientAddress.street).toEqual(mockData.clientAddress.street);
            expect(data.clientAddress.city).toEqual(mockData.clientAddress.city);
            expect(data.clientAddress.postCode).toEqual(mockData.clientAddress.postCode);
            expect(data.clientAddress.country).toEqual(mockData.clientAddress.country);
            for (let i = 0; i < data.items.length; i++) {
                expect(data.items[i].name).toEqual(mockData.items[i].name);
                expect(data.items[i].quantity).toEqual(mockData.items[i].quantity);
                expect(data.items[i].price).toEqual(mockData.items[i].price);
                expect(data.items[i].total).toEqual(mockData.items[i].total);
            };
            expect(data.total).toEqual(mockData.total);
        });
    });

    describe("invoice is read and update correctly", () => {
        it("should update an invoice and return 200", async () => {
            const response = await supertest(app)
                .patch(`/api/invoices/${invoiceId}`)
                .send({
                    "paymentTerms": 2
                });
            expect(response.status).toBe(200);
            expect(response.body.matchedCount).toEqual(1);
            expect(response.body.modifiedCount).toEqual(1);
        });

        it("should read all mock values including updated value and return 200", async () => {
            const response = await supertest(app).get("/api/invoices");
            expect(response.status).toBe(200);
            const data = response.body[0];
            expect(data.id).toEqual(mockData.id);
            expect(data.createdAt).toEqual(mockData.createdAt);
            expect(data.paymentDue).toEqual(mockData.paymentDue);
            expect(data.description).toEqual(mockData.description);
            expect(data.paymentTerms).toEqual(2); // updated value
            expect(data.clientName).toEqual(mockData.clientName);
            expect(data.clientEmail).toEqual(mockData.clientEmail);
            expect(data.status).toEqual(mockData.status);
            expect(data.senderAddress.street).toEqual(mockData.senderAddress.street);
            expect(data.senderAddress.city).toEqual(mockData.senderAddress.city);
            expect(data.senderAddress.postCode).toEqual(mockData.senderAddress.postCode);
            expect(data.senderAddress.country).toEqual(mockData.senderAddress.country);
            expect(data.clientAddress.street).toEqual(mockData.clientAddress.street);
            expect(data.clientAddress.city).toEqual(mockData.clientAddress.city);
            expect(data.clientAddress.postCode).toEqual(mockData.clientAddress.postCode);
            expect(data.clientAddress.country).toEqual(mockData.clientAddress.country);
            for (let i = 0; i < data.items.length; i++) {
                expect(data.items[i].name).toEqual(mockData.items[i].name);
                expect(data.items[i].quantity).toEqual(mockData.items[i].quantity);
                expect(data.items[i].price).toEqual(mockData.items[i].price);
                expect(data.items[i].total).toEqual(mockData.items[i].total);
            };
            expect(data.total).toEqual(mockData.total);
        });
    });

    describe("invoice is deleted", () => {
        it("should return 200 if exist", async () => {
            const response = await supertest(app).delete(`/api/invoices/${invoiceId}`);
            expect(response.status).toBe(200);
        });
        it("should return 404 if not exist after deleting", async () => {
            const response = await supertest(app).delete(`/api/invoices/${invoiceId}`);
            expect(response.status).toBe(404);
        });
        it("should return empty[] after deleting", async () => {
            const response = await supertest(app).get(`/api/invoices`);
            expect(response.body).toEqual([]);
        });
    });
});
