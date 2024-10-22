import supertest from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import { createExpressServer } from "../config/serverExpress";
import { connectToDB } from "../config/mongoDB";
import { invoiceModel } from "../models/invoice_model";

const app = createExpressServer();

const mockData = {
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
const paginationMockData = [
    {
        "id": "1",
        "clientName": "Jensen Huang",
        "status": "draft"
    },
    {
        "id": "2",
        "clientName": "Jeff Bezos",
        "status": "paid"
    },
    {
        "id": "3",
        "clientName": "Elon Musk",
        "status": "pending"
    },
    {
        "id": "4",
        "clientName": "Bill Gates",
        "status": "draft"
    }
];

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
    //         const response = await supertest(app).get("/api-docs");
    //         expect(response.status).toBe(200);
    //     });
    // });

    describe("invoice is created", () => {
        it("should return 200", async () => {
            const response = await supertest(app)
                .post("/api/invoices")
                .send(mockData);
            expect(response.status).toBe(200);
            // const data: Invoice & {_id: string} = await response.body;
            const data = await response.body;
            invoiceId = data._id; // store _id for later use
            expect(data.id).toEqual('1');
            expect(data.createdAt).toEqual('2021-10-19T00:00:00.000Z');
            expect(data.paymentDue).toEqual('2021-10-20T00:00:00.000Z');
            expect(data.description).toEqual('Re-branding');
            expect(data.paymentTerms).toEqual(1);
            expect(data.clientName).toEqual('Jensen Huang');
            expect(data.clientEmail).toEqual('name@mail.com');
            expect(data.status).toEqual('draft');
            expect(data.senderAddress.street).toEqual('19 Union Terrace');
            expect(data.senderAddress.city).toEqual('London');
            expect(data.senderAddress.postCode).toEqual('E1 3EZ');
            expect(data.senderAddress.country).toEqual('United Kingdom');
            expect(data.clientAddress.street).toEqual('19 Union Terrace');
            expect(data.clientAddress.city).toEqual('London');
            expect(data.clientAddress.postCode).toEqual('E1 3EZ');
            expect(data.clientAddress.country).toEqual('United Kingdom');
            expect(data.items.length).toEqual(1);
            expect(data.items[0].name).toEqual('Brand Guidelines');
            expect(data.items[0].quantity).toEqual(1);
            expect(data.items[0].price).toEqual(1800);
            expect(data.items[0].total).toEqual(1800);
            expect(data.total).toEqual(1800);
        });
    });

    describe("invoice is read and update correctly", () => {
        it("should update an invoice and return it", async () => {
            const response = await supertest(app)
                .patch(`/api/invoices/${invoiceId}`)
                .send({
                    "paymentTerms": 2
                });
            const data = await response.body;
            expect(response.status).toBe(200);
            expect(data.id).toEqual('1');
            expect(data.createdAt).toEqual('2021-10-19T00:00:00.000Z');
            expect(data.paymentDue).toEqual('2021-10-20T00:00:00.000Z');
            expect(data.description).toEqual('Re-branding');
            expect(data.paymentTerms).toEqual(2);
            expect(data.clientName).toEqual('Jensen Huang');
            expect(data.clientEmail).toEqual('name@mail.com');
            expect(data.status).toEqual('draft');
            expect(data.senderAddress.street).toEqual('19 Union Terrace');
            expect(data.senderAddress.city).toEqual('London');
            expect(data.senderAddress.postCode).toEqual('E1 3EZ');
            expect(data.senderAddress.country).toEqual('United Kingdom');
            expect(data.clientAddress.street).toEqual('19 Union Terrace');
            expect(data.clientAddress.city).toEqual('London');
            expect(data.clientAddress.postCode).toEqual('E1 3EZ');
            expect(data.clientAddress.country).toEqual('United Kingdom');
            expect(data.items.length).toEqual(1);
            expect(data.items[0].name).toEqual('Brand Guidelines');
            expect(data.items[0].quantity).toEqual(1);
            expect(data.items[0].price).toEqual(1800);
            expect(data.items[0].total).toEqual(1800);
            expect(data.total).toEqual(1800);
        });

        it("should read all mock values including updated value and return 200", async () => {
            const response = await supertest(app).get("/api/invoices");
            expect(response.status).toBe(200);
            const data = await response.body[0];
            expect(data.id).toEqual('1');
            expect(data.createdAt).toEqual('2021-10-19T00:00:00.000Z');
            expect(data.paymentDue).toEqual('2021-10-20T00:00:00.000Z');
            expect(data.description).toEqual('Re-branding');
            expect(data.paymentTerms).toEqual(2);
            expect(data.clientName).toEqual('Jensen Huang');
            expect(data.clientEmail).toEqual('name@mail.com');
            expect(data.status).toEqual('draft');
            expect(data.senderAddress.street).toEqual('19 Union Terrace');
            expect(data.senderAddress.city).toEqual('London');
            expect(data.senderAddress.postCode).toEqual('E1 3EZ');
            expect(data.senderAddress.country).toEqual('United Kingdom');
            expect(data.clientAddress.street).toEqual('19 Union Terrace');
            expect(data.clientAddress.city).toEqual('London');
            expect(data.clientAddress.postCode).toEqual('E1 3EZ');
            expect(data.clientAddress.country).toEqual('United Kingdom');
            expect(data.items.length).toEqual(1);
            expect(data.items[0].name).toEqual('Brand Guidelines');
            expect(data.items[0].quantity).toEqual(1);
            expect(data.items[0].price).toEqual(1800);
            expect(data.items[0].total).toEqual(1800);
            expect(data.total).toEqual(1800);
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

    describe("pagination and filtration test", () => {
        it("should return page 2 and limit 2", async () => {
            const result = await invoiceModel.createMany(paginationMockData);
            expect(result.insertedCount).toBe(4);
            const response = await supertest(app).get("/api/invoices?page=2&limit=2");
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(2);
            expect(response.body[0].id).toEqual('3');
            expect(response.body[1].id).toEqual('4');
        });
        it('should return all invoices with status draft', async () => {
            const response = await supertest(app).get('/api/invoices?status=draft');
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(2);
            expect(response.body[0].id).toEqual('1');
            expect(response.body[1].id).toEqual('4');
        });
    });
});
