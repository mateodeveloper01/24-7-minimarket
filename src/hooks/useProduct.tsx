import { ProductSchemaType } from "@/app/dashboard/_components";
import { Product } from "@/types";
import { Category, products } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const productsApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/products`,
});

const productKey = "products";
export const getProduct = (category?: string) => {
  const {
    data: products = [],
    isLoading,
    isFetched,
    isError,
  } = useQuery({
    queryKey: [productKey],
    queryFn: async () =>
      (
        await productsApi.get<Product[]>(
          `/${category ? `?category=${category}` : ""}`,
        )
      ).data,
    staleTime: 1000 * 60 * 60,
  });

  return { products, isLoading, isFetched, isError };
};

export const createProduct = () => {
  const queryClient = useQueryClient();

  const create = useMutation({
    mutationKey: [productKey],
    mutationFn: async (product: ProductSchemaType) =>
      (await productsApi.post<Product>(``, product)).data,

    onMutate: ({ category, price, ...product }: ProductSchemaType) => {
      const optimisticProduct = {
        id: Math.random().toString(),
        ...product,
        url: "",
        category: category as Category,
        price: +price,
      }; 

      queryClient.setQueryData<products[]>(["products"], (old) => {
        if (!old) return [optimisticProduct];
        return [...old, optimisticProduct];
      });
      return { optimisticProduct };
    },
    onSuccess: (product, _, context) => {
      const nwProduct = { ...product, category: product.category as Category };
      queryClient.setQueryData<products[]>(["products"], (old) => {
        if (!old) return [nwProduct];

        return old.map((cacheProduct) =>
          cacheProduct.id === context?.optimisticProduct.id
            ? nwProduct
            : cacheProduct,
        );
      });
    },
  });

  // const uploadProduct = async (id: string, product: any) => {
  //   const res = await axios.patch(``, product);
  //   return res.data;
  // };

  return create;
};
