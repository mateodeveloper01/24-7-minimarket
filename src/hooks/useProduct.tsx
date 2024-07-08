import { ProductSchemaType } from "@/app/dashboard/_components";
import { Product } from "@/types";
import { Category, products } from "@prisma/client";
import { toast } from "@/components";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
export type ResProduct = {
  data: products[];
  meta: {
    total: number;
    page: number;
    totalPage: number;
  };
};

export const productsApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/products`,
});

export const fetchProduct = async (url: string) => {
  return await productsApi.get(url);
};

const productKey = "products";

interface GetProductsProps {
  category?: string;
  stock?: boolean;
  limit?: number;
  page?: number;
}

export const getFetchProduct = async ({ category }: GetProductsProps) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/products?category=${category}&limit=10`,
    { next: { revalidate: 3600 } },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json() as Promise<ResProduct>;
};

export const getProduct = async ({
  category,
  stock,
  limit,
  page,
}: GetProductsProps) => {
  const queryParams = [];
  if (category) queryParams.push(`category=${category}`);
  if (stock) queryParams.push(`stock=true`);
  if (limit) queryParams.push(`limit=${limit}`);
  if (page) queryParams.push(`page=${page}`);
  const queryString = queryParams.length ? `?${queryParams.join("&")}` : "";
  const res = await productsApi.get<ResProduct>(`/${queryString}`);
  return res.data;
};

export const searchProduct = async (filter: string) => {
  try {
    const res = await fetchProduct(`/search?filter=${filter}&stock:true`);
    return res.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const createProduct = (pagination: any[]) => {
  // console.log(pagination);
  const createKey = [productKey, ...pagination];
  const queryClient = useQueryClient();
  const create = useMutation({
    mutationKey: createKey,
    mutationFn: async (product: ProductSchemaType) => {
      const { id, ...nwProduct } = product;
      const formData = new FormData();
      Object.entries(nwProduct).forEach(([key, value]) => {
        if (key === "image" && value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, value.toString());
        }
      });
      return (await productsApi.post<Product>(``, formData)).data;
    },
    onMutate: ({ category, price, ...product }: ProductSchemaType) => {
      const optimisticProduct = {
        id: Math.random().toString(),
        ...product,
        url: "",
        category: category as Category,
        price: +price,
      };
      const previousProducts = queryClient.getQueryData<ResProduct>(createKey);

      // Optimistic update
      queryClient.setQueryData<ResProduct>(createKey, (old) => {
        if (!old) {
          return {
            data: [optimisticProduct],
            meta: { total: 1, page: 1, totalPage: 1 },
          };
        }
        return {
          data: [...old.data, optimisticProduct],
          meta: {
            ...old.meta,
            total: old.meta.total + 1,
          },
        };
      });
      return { previousProducts, optimisticProduct };
    },
    onError: (_, __, context: any) => {
      // Restaurar el estado anterior en caso de error
      queryClient.setQueryData<ResProduct>(createKey, context.previousProducts);
    },
    onSuccess: (product: any, _: any, context: any) => {
      const nwProduct = { ...product, category: product.category as Category };
      queryClient.setQueryData<ResProduct>(createKey, (old) => {
        if (!old) {
          return {
            data: [nwProduct],
            meta: { total: 1, page: 1, totalPage: 1 },
          };
        }
        return {
          data: old.data.map((cacheProduct) =>
            cacheProduct.id === context?.optimisticProduct.id
              ? nwProduct
              : cacheProduct,
          ),
          meta: old.meta,
        };
      });
      toast({ variant: "success", title: "Cambio realizado" });
    },
  });
  return create;
};

export const updateProduct = (pagination?: any[]) => {
  const queryClient = useQueryClient();
  const updateKey = [productKey, ...pagination!];
  const update = useMutation({
    mutationKey: updateKey,
    mutationFn: async ({ id, ...nwProduct }: ProductSchemaType) => {
      const formData = new FormData();

      Object.entries(nwProduct).forEach(([key, value]) => {
        if (key === "image") {
          formData.append(key, value as File);
        } else if (key === "stock") {
          if (value === true) {
            formData.append(key, value.toString());
          }
        } else {
          formData.append(key, value.toString());
        }
      });
      return (await productsApi.patch<Product>(`/${id}`, formData)).data;
    },
    onMutate: async ({
      id,
      category,
      price,
      ...restProduct
    }: ProductSchemaType) => {
      await queryClient.cancelQueries({ queryKey: updateKey });

      const previousProducts = queryClient.getQueryData<ResProduct>([
        productKey,
      ]);

      const optimisticProduct = {
        id: id!,
        ...restProduct,
        url: "",
        category: category as Category,
        price: +price,
      };

      queryClient.setQueryData<ResProduct>(updateKey, (old) => {
        if (!old)
          return {
            data: [optimisticProduct],
            meta: { total: 0, page: 0, totalPage: 0 },
          };

        return {
          data: old.data.map((cacheProduct) =>
            cacheProduct.id === id ? optimisticProduct : cacheProduct,
          ),
          meta: old.meta,
        };
      });

      return { previousProducts, optimisticProduct };
    },
    onError: (__, _, context: any) => {
      queryClient.setQueryData<products[]>(updateKey, context.previousProducts);
    },
    onSuccess: (product: any, _: any, context: any) => {
      const nwProduct = { ...product, category: product.category as Category };
      queryClient.setQueryData<ResProduct>(updateKey, (old) => {
        if (!old)
          return {
            data: [nwProduct],
            meta: { total: 0, page: 0, totalPage: 0 },
          };

        return {
          data: old.data.map((cacheProduct) =>
            cacheProduct.id === context?.optimisticProduct.id
              ? nwProduct
              : cacheProduct,
          ),
          meta: old.meta,
        };
      });
      toast({ variant: "success", title: "Cambio realizado" });
    },
  });
  return update;
};

export const removeProduct = () => {
  const queryClient = useQueryClient();
  const remove = useMutation({
    mutationKey: [productKey],
    mutationFn: async (id: string) => (await productsApi.delete(`/${id}`)).data,
    onSuccess: () => {
      toast({ variant: "success", title: "Cambio realizado" });
      queryClient.invalidateQueries();
    },
  });
  return remove;
};
// export const getProduct = ({
//   category,
//   stock,
//   limit,
//   page,
// }: GetProductsProps) => {
//   const {
//     data: products ,
//     isLoading,
//     isFetched,
//     isError,
//   } = useQuery({
//     queryKey: category ? [productKey, category, limit] : [productKey],
//     queryFn: async () => {
//       const queryParams = [];
//       if (category) {
//         queryParams.push(`category=${category}`);
//       }
//       if (stock) {
//         queryParams.push(`stock=true`);
//       }
//       if (limit) {
//         queryParams.push(`limit=${limit}`);
//       }

//       if (page) {
//         queryParams.push(`page=${page}`);
//       }
//       const queryString = queryParams.length ? `?${queryParams.join("&")}` : "";

//       const res = await productsApi.get<ResProduct>(`/${queryString} `);
//       return res.data;
//     },
//     staleTime: 1000 * 60 * 60,
//   });
//   return { products, isLoading, isFetched, isError };
// };
