import { z } from 'zod';

export const orderCreateSchema = z.object({
  body: z.object({
    items: z.array(z.object({
      product: z.string().min(1),
      quantity: z.coerce.number().int().positive(),
      size: z.string().optional(),
      color: z.string().optional(),
    })).min(1),
    shippingAddress: z.object({
      fullName: z.string().min(2),
      phone: z.string().min(8),
      addressLine: z.string().min(5),
      ward: z.string().optional(),
      district: z.string().optional(),
      city: z.string().min(2),
    }),
    couponCode: z.string().optional(),
  }),
});
