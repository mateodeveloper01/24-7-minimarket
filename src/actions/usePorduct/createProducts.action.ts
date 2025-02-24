"use server";
import { ProductSchemaType } from "@/app/dashboard/_components";
import prisma from "@/utils/db";
import { Category } from "@prisma/client";
import sharp from "sharp";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

interface ProductFormData {
  id: string;
  stock: "true" | "false";
  amount: string;
  brand: string;
  description: string;
  tipo: string;
  image: File;
  category: Category;
  price: number;
}

export const createProductsAction = async (formData: any) => {
  const product = Object.fromEntries(formData.entries()) as ProductFormData;
  const {
    id,
    stock,
    amount,
    brand,
    description,
    tipo,
    image,
    category,
    price,
  } = product;
  if (!image) {
    return await prisma.products.create({
      data: {
        id,
        stock: stock === "true" ? true : false,
        tipo: tipo.toLowerCase(),
        description: description.toLowerCase(),
        brand: brand.toLocaleLowerCase(),
        amount: amount.toLocaleLowerCase(),
        url: "",
        price: +price,
        category: category as Category,
      },
    });
  }

  if (formData.getAll("image")) {
    const imagedata = formData.getAll("image") as File[];
    const imageBuffer = await imagedata[0].arrayBuffer();
    const imageWebp = await sharp(Buffer.from(imageBuffer)).webp().toBuffer();
    fs.writeFileSync(`temp.webp`, Buffer.from(imageWebp));
  }
  const result = await cloudinary.uploader.upload(`temp.webp`, {
    folder: "products-diego",
  });
  console.log(result, "result");
  fs.unlinkSync(`temp.webp`);

  return await prisma.products.create({
    data: {
      id,
      stock: stock === "true" ? true : false,
      tipo: tipo.toLowerCase(),
      description: description.toLowerCase(),
      brand: brand.toLocaleLowerCase(),
      amount: amount.toLocaleLowerCase(),
      image: {
        create: {
          url: result.secure_url,
          public_id: result.public_id,
        },
      },

      category: category as Category,
      price: +price,
    },
  });
};
