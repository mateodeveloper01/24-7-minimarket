"use server";
import prisma from "@/utils/db";
// TODO:probar si se puede eliminar la imagen de cloudinary
import cloudinary from "@/utils/cloudinary";
export const removeProductAction = async (id: string) => {

  const product = await prisma.products.findUnique({
    where: {
      id,
    },
  });
  
  if (product?.image) {
    await cloudinary.uploader.destroy(product.image.public_id);
  }

  const removeProduct = await prisma.products.delete({
    where: {
      id,
    },
  });
  console.log("removeProductAction ", removeProduct);
  return removeProduct;
};
