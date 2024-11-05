import supertest from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import { createExpressServer } from "../config/serverExpress";
import { connectToDB } from "../config/mongoDB";

const app = createExpressServer();

const mockData = {
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
};

let createdMongoId: string = "";
let createdMongoId_2: string = "";
let createdInvoiceId: string = "";

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

    describe("create invoice", () => {
        it("should return 200 if sent all fields", async () => {
            const response = await supertest(app)
                .post("/api/invoices")
                .send(mockData);
            expect(response.status).toBe(200);
            const data = await response.body;
            createdMongoId = data._id; // store _id for later use
            expect(data.invoice_id).toBeDefined();
            createdInvoiceId = data.invoice_id; // store invoice_id for later use
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
            expect(data.total).toEqual(0); // total is not calculated when status is draft
        });
        it("should return 200 if generateId return existing invoice_id", async () => {
            const testMockData = {
                ...mockData,
                "description": "test",
                "clientName": createdInvoiceId
            };
            const response = await supertest(app)
                .post("/api/invoices")
                .send(testMockData);
            expect(response.status).toBe(200);
            const data = await response.body;
            createdMongoId_2 = data._id; // store _id for later use
            expect(data.invoice_id).not.toEqual(createdInvoiceId); // invoice_id was changed to random
            expect(data.createdAt).toEqual('2021-10-19T00:00:00.000Z');
            expect(data.paymentDue).toEqual('2021-10-20T00:00:00.000Z');
            expect(data.description).toEqual('');
            expect(data.paymentTerms).toEqual(1);
            expect(data.clientName).toEqual(createdInvoiceId);
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
            expect(data.total).toEqual(0); // total is not calculated when status is draft
            await supertest(app).delete(`/api/invoices/${createdMongoId_2}`);
        });
    });

    describe("invoice is read and update correctly", () => {
        it("should update an invoice with status <draft> and return it", async () => {
            const response = await supertest(app)
                .patch(`/api/invoices/${createdMongoId}`)
                .send({
                    "status": 'draft',
                    "description": 'Changed description'
                });
            const data = await response.body;
            expect(response.status).toBe(200);
            expect(data.invoice_id).toBeDefined();
            expect(data.createdAt).toEqual('2021-10-19T00:00:00.000Z');
            expect(data.paymentDue).toEqual('2021-10-20T00:00:00.000Z');
            expect(data.description).toEqual('Changed description'); // updated description
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
            expect(data.total).toEqual(0); // total is not calculated when status is draft
        });

        it("should update an invoice with status <pending> and return it", async () => {
            const response = await supertest(app)
                .patch(`/api/invoices/${createdMongoId}`)
                .send({
                    ...mockData,
                    "status": 'pending',
                    "paymentTerms": 2
                });
            const data = await response.body;
            expect(response.status).toBe(200);
            expect(data.invoice_id).toBeDefined();
            expect(data.createdAt).toEqual('2021-10-19T00:00:00.000Z');
            expect(data.paymentDue).toEqual('2021-10-20T00:00:00.000Z');
            expect(data.description).toEqual('Re-branding');
            expect(data.paymentTerms).toEqual(2);
            expect(data.clientName).toEqual('Jensen Huang');
            expect(data.clientEmail).toEqual('name@mail.com');
            expect(data.status).toEqual('pending');
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
            expect(data.total).toEqual(1800); // total is calculated after updating status
        });

        it("should read all mock values including updated value and return 200", async () => {
            const response = await supertest(app).get("/api/invoices");
            expect(response.status).toBe(200);
            const data = await response.body[0];
            expect(data.invoice_id).toBeDefined();
            expect(data.createdAt).toEqual('2021-10-19T00:00:00.000Z');
            expect(data.paymentDue).toEqual('2021-10-20T00:00:00.000Z');
            expect(data.description).toEqual('Re-branding');
            expect(data.paymentTerms).toEqual(2);
            expect(data.clientName).toEqual('Jensen Huang');
            expect(data.clientEmail).toEqual('name@mail.com');
            expect(data.status).toEqual('pending');
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

    describe("delete invoice", () => {
        it("should return 200 if exist", async () => {
            const response = await supertest(app).delete(`/api/invoices/${createdMongoId}`);
            expect(response.status).toBe(200);
        });
        it("should return 404 if not exist after deleting", async () => {
            const response = await supertest(app).delete(`/api/invoices/${createdMongoId}`);
            expect(response.status).toBe(400);
        });
        it("should return empty[] after deleting", async () => {
            const response = await supertest(app).get(`/api/invoices`);
            expect(response.body).toEqual([]);
        });
    });

    describe("pagination and filtration test", () => {
        it("should return 2 invoices from 3 when pass page 1 and limit 2", async () => {
            const result1 = await supertest(app)
                .post("/api/invoices")
                .send({...mockData, status: 'draft', clientName: 'Client Name1'});
            expect(result1.status).toBe(200);
            const result2 = await supertest(app)
                .post("/api/invoices")
                .send({...mockData, status: 'pending', clientName: 'Client Name2'});
            expect(result2.status).toBe(200);
            const result3 = await supertest(app)
                .post("/api/invoices")
                .send({...mockData, status: 'pending', clientName: 'Client Name3'});
            expect(result3.status).toBe(200);
            const result4 = await supertest(app)
                .post("/api/invoices")
                .send({...mockData, status: 'draft', clientName: 'Client Name4'});
            expect(result4.status).toBe(200);

            const response = await supertest(app).get("/api/invoices?page=1&limit=2");
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(2);
            expect(response.body[0].clientName).toEqual('Client Name3');
            expect(response.body[1].clientName).toEqual('Client Name4');
        });
        it('should return 2 invoices with status draft', async () => {
            const response = await supertest(app).get('/api/invoices?status=draft');
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(2);
            expect(response.body[0].clientName).toEqual('Client Name1');
            expect(response.body[1].clientName).toEqual('Client Name4');
        });
        it('should return all invoices if pass wrong status', async () => {
            const response = await supertest(app).get('/api/invoices?status=ok');
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(4);
        });
    });

    describe("validation error handling test", () => {
        it("should return 422 if pass invalid email", async () => {
            const response = await supertest(app)
                .post("/api/invoices")
                .send({...mockData, clientEmail: 'invalid email'});
            console.log('validation error', response.body);
            expect(response.status).toBe(422);
            console.log('invalid clientEmail', response.body.errors[0]);
            expect(response.body.errors[0].validation).toEqual('email');
            expect(response.body.errors[0].code).toEqual('invalid_string');
            expect(response.body.errors[0].message).toEqual('Invalid email');
            expect(response.body.errors[0].path).toEqual(['clientEmail']);
        });

        it("should return 422 if pass invalid status", async () => {
            const response = await supertest(app)
                .post("/api/invoices")
                .send({...mockData, status: 'invalid_status'});
            expect(response.status).toBe(422);
            console.log('invalid status', response.body.errors[0]);
            expect(response.body.errors[0].received).toEqual('invalid_status');
            expect(response.body.errors[0].code).toEqual('invalid_enum_value');
            expect(response.body.errors[0].options).toEqual(['paid','pending','draft']);
            expect(response.body.errors[0].path).toEqual(['status']);
            expect(response.body.errors[0].message).toEqual("Invalid enum value. Expected 'paid' | 'pending' | 'draft', received 'invalid_status'");
        });
    })
});
