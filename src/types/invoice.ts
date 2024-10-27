import { z } from 'zod';

// Status as a Zod Enum
export const StatusSchema = z.enum(["paid", "pending", "draft"]);
export type Status = z.infer<typeof StatusSchema>;

// Address as a Zod Object
export const AddressSchema = z.object({
  street: z.string().max(100),
  city: z.string().max(50),
  postCode: z.string().max(6),
  country: z.string().max(50)
});
export type Address = z.infer<typeof AddressSchema>;

// Item as a Zod Object
export const ItemSchema = z.object({
  name: z.string(),
  quantity: z.number().nonnegative(),
  price: z.number().nonnegative(),
  total: z.number().nonnegative()
});
export type Item = z.infer<typeof ItemSchema>;

// Invoice as a Zod Object with nested schemas
export const InvoiceSchema = z.object({
  id: z.string(),
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
  total: z.number().nonnegative()
});
export type Invoice = z.infer<typeof InvoiceSchema>;

export function isValidStatus(arg: any): arg is Status {
    return arg === "paid" || arg === "pending" || arg === "draft";
};

export interface InvoicesReadQuery {
    query: {
        status?: Status
    },
    options: {
        skip: number,
        limit: number
    }
};
