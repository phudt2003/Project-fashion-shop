import { z } from 'zod';

export const productCreateSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    slug: z.string().min(2),
    price: z.coerce.number().nonnegative(),
    category: z.string().min(1),
    brand: z.string().optional(),
    stock: z.coerce.number().int().nonnegative().default(0),
    description: z.string().optional(),
  }),
});
