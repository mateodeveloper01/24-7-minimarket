"use server";
import { Product } from "@/types";
import prisma from "@/utils/db";
import { Category, Prisma } from "@prisma/client";

interface GetProductsProps {
  category?: Category;
  stock?: boolean;
  limit?: number;
  page?: number;
  brand?: string;
  tipo?: string;
}

export const getProducts = async ({
  category,
  stock,
  brand,
  limit = 10,
  page = 1,
  tipo,
}: GetProductsProps): Promise<{
  data: Product[];
  meta: {
    total: number;
    page: number;
    totalPage: number;
  };
}> => {
  const offset = (page - 1) * limit;
  try {
    const totalProducts = await prisma.products.count({
      where: { stock, category },
    });
    const totalPage = Math.ceil(totalProducts / limit);
    const data = await prisma.products.findMany({
      take: limit,
      skip: offset,
      where: {
        AND: [
          stock !== undefined ? { stock } : {},
          category !== undefined ? { category } : {},
          brand !== undefined ? { brand } : {},
          tipo !== undefined ? { tipo } : {},
        ],
      },
      orderBy: {
        tipo: "asc",
      },
      include: {
        image: true,        
      },
    });

    return {
      data: data as Product[],
      meta: {
        total: totalProducts,
        page,
        totalPage,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      data: [],
      meta: {
        total: 0,
        page: 1,
        totalPage: 1,
      },
    };
  }
};

export const searchProduct = async (filter: string) => {
  const normalizeString = (str: string) =>
    str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const filterParts = normalizeString(filter.toLowerCase()).split("_");

  const filterConditions: Prisma.productsWhereInput[] = filterParts.map(
    (part) => ({
      OR: [
        { tipo: { contains: part, mode: "insensitive" } },
        { description: { contains: part, mode: "insensitive" } },
        { brand: { contains: part, mode: "insensitive" } },
        { amount: { contains: part, mode: "insensitive" } },
        { url: { contains: part, mode: "insensitive" } },
      ],
    }),
  );
  try {
    return prisma.products.findMany({
      where: {
        AND: filterConditions,
      },
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const getBrand = async (category?: Category) => {
  const whereClause = category ? { category } : {};

  try {
    return await prisma.products.findMany({
      where: whereClause,

      select: { brand: true },
      distinct: ["brand"],
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
export const getTipos = async (category?: Category) => {
  try {
    const whereClause = category ? { category } : {};
    return await prisma.products.findMany({
      where: whereClause,
      select: { tipo: true },
      distinct: ["tipo"],
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
