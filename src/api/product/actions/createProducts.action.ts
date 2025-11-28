"use server";
import prisma from "@/utils/db";
import sharp from "sharp";
import fs from "fs";
import path from "path";
import os from "os";
import cloudinary from "@/utils/cloudinary";


interface ProductFormData {
  id: string;
  stock: "true" | "false";
  amount: string;
  brand: string;
  description: string;
  tipo: string;
  image?: File;
  category: string;
  price: number;
}

interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
  [key: string]: any;
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
  
  // Normalizar el nombre de la categoría: minúsculas, eliminar espacios y reemplazar por guion bajo
  const normalizedCategory = category.trim().toLowerCase().replace(/\s+/g, '_');
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
        category: normalizedCategory,
        categoryModel: {
          connectOrCreate: {
            where: {
              name: normalizedCategory,
            },
            create: {
              name: normalizedCategory,
            },
          },
        },
      },
    });
  }else{

  let result: CloudinaryUploadResult;
  
  if (formData.getAll("image")) {
    const imagedata = formData.getAll("image") as File[];
    const imageBuffer = await imagedata[0].arrayBuffer();
    const imageWebp = await sharp(Buffer.from(imageBuffer)).webp().toBuffer();
    
    // Upload directly from buffer to Cloudinary
    result = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "products-diego" },
        (error: any, result: any) => {
          if (error) reject(error);
          else resolve(result as CloudinaryUploadResult);
        }
      );
      uploadStream.end(imageWebp);
    });
  } else {
    throw new Error("No image provided");
  }

  

  const product = await prisma.products.create({  
    data: {
      id,
      stock: stock === "true" ? true : false,
      tipo: tipo.toLowerCase(),
      description: description.toLowerCase(),
      brand: brand.toLocaleLowerCase(),
      amount: amount.toLocaleLowerCase(),
      url: result.secure_url,
      category: normalizedCategory,
      price: +price,
      image: {
        url: result.secure_url,
        public_id: result.public_id,
      },
      categoryModel: {
        connectOrCreate: {
          where: {
            name: normalizedCategory,
          },
          create: {
            name: normalizedCategory,
          },
        },
      },
    },
  });
  
  console.log(product);
  return product;
}
};
