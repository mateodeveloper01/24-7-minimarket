import axios from "axios";
import { Products } from "@prisma/client";

// Configuración de Axios para la API de productos
export const productsApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/products`,
});

// Tipo de respuesta esperado al obtener productos
export type ResProduct = {
  data: Products[];
  meta: {
    total: number;
    page: number;
    totalPage: number;
  };
};

// Función genérica para hacer peticiones GET a productos
export const fetchProduct = async (url: string) => {
  return await productsApi.get(url);
};
