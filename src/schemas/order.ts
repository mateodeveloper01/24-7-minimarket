import { z } from "zod";

export const formOrderSchema = z.object({
    name: z.string().min(5,'Ingrea nombre completo').max(50),
    // number: z.string().min(10,'Ingresa tu numero').max(50),
    delivery_method: z.string().min(2).max(50),
    address: z.string().optional(),
    floor: z.string().optional(),
    references: z.string().optional(),
    pay_method: z.string().min(2).max(50),
  });


export type Order = z.infer<typeof formOrderSchema>