import { z } from 'zod';

export const createSePayQrSchema = z.object({
  body: z.object({
    orderId: z.string().min(1),
  }),
});

