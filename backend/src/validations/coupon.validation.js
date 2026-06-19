import { z } from 'zod';

export const couponCreateSchema = z.object({
  body: z.object({
    code: z.string().min(3),
    discountType: z.enum(['percent', 'fixed']),
    discountValue: z.coerce.number().positive(),
    expiresAt: z.string().datetime().optional(),
  }),
});
