"use server";
import fs from "fs";
import sharp from "sharp";
import prisma from "@/utils/db";
import { Category } from "@prisma/client";
import cloudinary from "@/utils/cloudinary";
interface ProductFormData {
  id: string;
  stock: "true" | "false";
  amount: string;
  brand: string;
  description: string;
  tipo: string;
  image?: File;
  category: Category;
  price: number;
}
export const updateProductsAction = async (formData: any, id: string) => {
  const product = Object.fromEntries(formData.entries()) as ProductFormData;

  const productDB = await prisma.products.findUnique({
    where: { id },
  });

  if (productDB?.image && product.image) {
    await cloudinary.uploader.destroy(productDB.image.public_id);
  }

  if (!product.image) {
    const updateProduct = await prisma.products.update({
      where: { id },
      data: {
        stock: product.stock === "true" ? true : false,
        tipo: product.tipo.toLowerCase(),
        description: product.description.toLowerCase(),
        brand: product.brand.toLocaleLowerCase(),
        amount: product.amount.toLocaleLowerCase(),
        url: "",
        price: +product.price,
        category: product.category as Category,
      },
    });
    return updateProduct;
  } else {
    if (formData.getAll("image")) {
      const imagedata = formData.getAll("image") as File[];
      const imageBuffer = await imagedata[0].arrayBuffer();
      const imageWebp = await sharp(Buffer.from(imageBuffer)).webp().toBuffer();
      fs.writeFileSync(`temp.webp`, Buffer.from(imageWebp));
    }
    const result = await cloudinary.uploader.upload(`temp.webp`, {
      folder: "products-diego",
    });
    fs.unlinkSync(`temp.webp`);

    const updateProduct = await prisma.products.update({
      where: { id },
      data: {
        stock: product.stock === "true" ? true : false,
        tipo: product.tipo.toLowerCase(),
        description: product.description.toLowerCase(),
        brand: product.brand.toLocaleLowerCase(),
        amount: product.amount.toLocaleLowerCase(),
        category: product.category as Category,
        price: +product.price,
        image: {
          url: result.secure_url,
          public_id: result.public_id,
        },
      },
    });
    return updateProduct;
  }
};
