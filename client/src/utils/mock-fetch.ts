import { Invoice } from "../types";

export const mockFetchInvoice = (): Promise<Invoice[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                _id: "1",
                invoice_id: "RT3080",
                createdAt: new Date(),
                paymentDue: new Date(new Date().setDate(new Date().getDate() + 30)),
                description: "Web development services",
                paymentTerms: 30,
                clientName: "John Doe",
                clientEmail: "john.doe@example.com",
                status: "paid",
                senderAddress: {
                    street: "123 Main St",
                    city: "Anytown",
                    postCode: "12345",
                    country: "USA"
                },
                clientAddress: {
                    street: "456 Elm St",
                    city: "Othertown",
                    postCode: "67890",
                    country: "USA"
                },
                items: [
                    {
                        name: "Website Design",
                        quantity: 1,
                        price: 1000,
                        total: 1000
                    },
                    {
                        name: "Hosting",
                        quantity: 12,
                        price: 10,
                        total: 120
                    }
                ],
                total: 1120
            },
            {
                _id: "2",
                invoice_id: "XM9141",
                createdAt: new Date(),
                // paymentDue: new Date(new Date().setDate(new Date().getDate() + 31)),
                description: "Graphic Design services",
                paymentTerms: 30,
                clientName: "William Dorbursh",
                clientEmail: "JaneDoe@mail.com",
                status: "draft",
                senderAddress: {
                    street: "123 Main St",
                    city: "Anytown",
                    postCode: "12345",
                    country: "USA"
                },
                clientAddress: {
                    street: "456 Elm St",
                    city: "Othertown",
                    postCode: "67890",
                    country: "USA"
                },
                items: [
                    {
                        name: "Logo Design",
                        quantity: 1,
                        price: 100,
                        total: 100
                    },
                    {
                        name: "Hosting",
                        quantity: 12,
                        price: 12,
                        total: 144
                    }
                ],
                total: 244
                },
            ]);
        }, 1000);
    });
};