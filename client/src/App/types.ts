export type Status = "paid" | "pending" | "draft";

type Address = {
    street?: string,
    city?: string,
    postCode?: string,
    country?: string
};

export type Item = {
    name?: string,
    quantity?: number,
    price?: number,
    total?: number
};

export interface Invoice {
    _id?: string;
    invoice_id: string;
    createdAt?: Date;
    paymentDue?: Date;
    description?: string;
    paymentTerms?: number;
    clientName?: string;
    clientEmail?: string; // email
    status: Status;
    senderAddress?: Address;
    clientAddress?: Address;
    items?: Item[];
    total?: number;
}