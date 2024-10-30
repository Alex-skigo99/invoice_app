import { z } from 'zod';
import { Status } from './invoice';

// Status as a Zod Enum
export const StatusSchema = z.enum(["paid", "pending", "draft"]);

// Address as a Zod Object
export const AddressSchema = z.object({
  street: z.string().max(100),
  city: z.string().max(50),
  postCode: z.string().max(10),
  country: z.string().max(50)
});

// Item as a Zod Object
export const ItemSchema = z.object({
  name: z.string(),
  quantity: z.number().nonnegative(),
  price: z.number().nonnegative(),
  total: z.number().nonnegative()
});

// Invoice as a Zod Object with nested schemas
export const InvoiceSchema = z.object({
  // id: z.string(),
  createdAt: z.string().datetime(),
  paymentDue: z.string().datetime(),
  description: z.string().max(1000),
  paymentTerms: z.number().max(180),
  clientName: z.string(),
  clientEmail: z.string().email(),
  status: StatusSchema,
  senderAddress: AddressSchema,
  clientAddress: AddressSchema,
  items: z.array(ItemSchema),
  // total: z.number().nonnegative()
});

export function isValidStatus(arg: any): arg is Status {
    return arg === "paid" || arg === "pending" || arg === "draft";
};

export function validateDraftInvoice(invoice: any) {
    InvoiceSchema.partial().required({status: true}).parse(invoice); // only status is required and the rest is optional
};

export function validatePaidInvoice(invoice: any) {
    InvoiceSchema.pick({status: true}).parse(invoice); // only status is required
};

export function validatePendingInvoice(invoice: any) {
    InvoiceSchema.parse(invoice); // all fields are required
};
