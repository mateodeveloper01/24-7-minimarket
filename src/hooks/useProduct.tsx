import { ProductSchemaType } from "@/app/dashboard/_components";
import { Product } from "@/types";
import { Category, products } from "@prisma/client";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";

const productsApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/products`,
});

const productKey = "products";

const onMutate = ({ category, price, ...product }: ProductSchemaType) => {
  const queryClient = useQueryClient();

  const optimisticProduct = {
    id: Math.random().toString(),
    ...product,
    url: "",
    category: category as Category,
    price: +price,
  };

  queryClient.setQueryData<products[]>([productKey, null], (old) => {
    if (!old) return [optimisticProduct];
    return [...old, optimisticProduct];
  });
  return { optimisticProduct };
};
const onSuccess = (product: any, _: any, context: any) => {
  const queryClient = useQueryClient();

  const nwProduct = { ...product, category: product.category as Category };
  queryClient.setQueryData<products[]>([productKey, null], (old) => {
    if (!old) return [nwProduct];

    return old.map((cacheProduct) =>
      cacheProduct.id === context?.optimisticProduct.id
        ? nwProduct
        : cacheProduct,
    );
  });
};

export const getProduct = (category?: string, stock?: Boolean) => {
  const {
    data: products = [],
    isLoading,
    isFetched,
    isError,
  } = useQuery({
    queryKey: category?[productKey, category]:[productKey],
    queryFn: async () => {
      const queryParams = [];
      if (category) {
        queryParams.push(`category=${category}`);
      }
      if (stock) {
        queryParams.push(`stock=true`);
      }

      const queryString = queryParams.length ? `?${queryParams.join("&")}` : "";

      return (await productsApi.get<Product[]>(`/${queryString} `)).data;
    },
    staleTime: 1000 * 60 * 60,
  });

  return { products, isLoading, isFetched, isError };
};

export const createProduct = () => {
  const queryClient = useQueryClient();

  const create = useMutation({
    mutationKey: [productKey],
    mutationFn: async (product: ProductSchemaType) => {
      const {  id,...nwproduct } = product;
      return (await productsApi.post<Product>(``, nwproduct)).data;
    },
    onMutate: ({ category, price, ...product }: ProductSchemaType) => {

      const optimisticProduct = {
        id: Math.random().toString(),
        ...product,
        url: "",
        category: category as Category,
        price: +price,
      };

      queryClient.setQueryData<products[]>([productKey], (old) => {
        if (!old) return [optimisticProduct];
        return [...old, optimisticProduct];
      });
      return { optimisticProduct };
    },
    onSuccess: (product: any, _: any, context: any) => {

      const nwProduct = { ...product, category: product.category as Category };
      queryClient.setQueryData<products[]>([productKey], (old) => {
        if (!old) return [nwProduct];

        return old.map((cacheProduct) =>
          cacheProduct.id === context?.optimisticProduct.id
            ? nwProduct
            : cacheProduct,
        );
      });
    },
  });
  return create;
};

export const updateProduct = () => {
  const queryClient = useQueryClient();

  const update = useMutation({
    mutationKey: [productKey],
    mutationFn: async (product: ProductSchemaType) => {
      const { id, ...nwProduct } = product;
      return (await productsApi.patch<Product>(`/${id}`, nwProduct)).data;
    },
    // onMutate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey:[productKey]});
    },
  });
  return update;
};
