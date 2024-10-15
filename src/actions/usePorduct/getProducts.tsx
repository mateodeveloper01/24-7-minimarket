import { fetchProduct, productsApi, ResProduct } from "./Api";

interface GetProductsProps {
  category?: string;
  stock?: boolean;
  limit?: number;
  page?: number;
  brand?: string;
  tipo?: string;
}

// Obtiene productos según los filtros dados (categoría, stock, etc.)
export const getFetchProduct = async ({ category }: GetProductsProps) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/products?category=${category}&limit=10&stock=true`,
    { next: { revalidate: 3600 } },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json() as Promise<ResProduct>;
};

// Genera la consulta con parámetros opcionales para obtener productos
export const getProduct = async ({
  category,
  stock,
  limit,
  page,
  brand,
  tipo,
}: GetProductsProps) => {
  const queryParams = [];
  if (category) queryParams.push(`category=${category}`);
  if (stock) queryParams.push(`stock=true`);
  if (limit) queryParams.push(`limit=${limit}`);
  if (page) queryParams.push(`page=${page}`);
  if (brand) queryParams.push(`brand=${brand}`);
  if (tipo) queryParams.push(`tipo=${tipo}`);

  const queryString = queryParams.length ? `?${queryParams.join("&")}` : "";
  const res = await productsApi.get<ResProduct>(`/${queryString}`);
  return res.data;
};

// Buscar productos mediante un filtro específico
export const searchProduct = async (filter: string) => {
  try {
    const res = await fetchProduct(`/search?filter=${filter}&stock:true`);
    return res.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const getBrand = async (category?: string) => {
  try {
    const res = await fetchProduct(category ? `/brand/${category}` : `/brand`);
    return res.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
export const getTipos = async (category?: string) => {
  try {
    const res = await fetchProduct(category ? `/tipos/${category}` : `/tipos`);
    return res.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
