import { any, boolean, object, string } from "zod";
import { fileSchema } from "./file";

export const ProductSchema = object({
  tipo: string(),
  description: string(),
  brand: string(),
  amount: string(),
  price: string(),
  category: string(),
  stock: boolean(),
  image: fileSchema.optional(),
  id: any().optional(),
  // url         String
});
