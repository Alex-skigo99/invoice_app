import supertest from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import { createExpressServer } from "../config/serverExpress";
import { connectToDB } from "../config/mongoDB";
import { Invoice } from "../types/invoice";

const app = createExpressServer();

const mockData: Invoice = {
    "id": "1",
    "createdAt": new Date("2021-10-19T00:00:00.000Z"),
    "paymentDue": new Date("2021-10-19T00:00:00.000Z"),
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

describe("invoice", () => {
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
            const data = response.body;
            invoiceId = data._id;
            expect(data.paymentTerms).toEqual(mockData.paymentTerms);
        });
    });

    describe("invoice is update", () => {
        it("should return 200", async () => {
            const response = await supertest(app)
                .patch(`/api/invoices/${invoiceId}`)
                .send({
                    "paymentTerms": 2
                });
            expect(response.status).toBe(200);
            mockData.paymentTerms = 2;
        });
    });

    describe("invoices are read", () => {
        it("should return 200", async () => {
            const response = await supertest(app).get("/api/invoices");
            expect(response.status).toBe(200);
            const data = response.body[0];
            expect(data._id).toEqual(invoiceId);
        });
    });

    describe("invoice is deleted", () => {
        it("should return 200", async () => {
            const response = await supertest(app).delete(`/api/invoices/${invoiceId}`);
            expect(response.status).toBe(200);
        });
    });
});
