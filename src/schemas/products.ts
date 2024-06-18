import { boolean, nativeEnum, number, object, string } from "zod";
import { fileSchema } from "./file";
import { Category } from "@prisma/client";

export const ProductSchema = object({
  tipo: string(),
  description: string(),
  brand: string(),
  amount: string(),
  price: string(),
  category: string(nativeEnum(Category)),
  stock: boolean(),
  image: fileSchema.optional(),
  // url         String
});
