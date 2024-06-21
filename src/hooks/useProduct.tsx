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

interface GetProductsProps {
  category?: string;
  stock?: boolean;
  limit?: number;
  offset?: number;
}
export const getProduct = ({
  category,
  stock,
  limit,
  offset,
}: GetProductsProps) => {
  const {
    data: products = [],
    isLoading,
    isFetched,
    isError,
  } = useQuery({
    queryKey: category ? [productKey, category] : [productKey],
    queryFn: async () => {
      const queryParams = [];
      if (category) {
        queryParams.push(`category=${category}`);
      }
      if (stock) {
        queryParams.push(`stock=true`);
      }
      if (limit) {
        queryParams.push(`limit=${limit}`);
      }

      if (offset) {
        queryParams.push(`offset=${offset}`);
      }
      const queryString = queryParams.length ? `?${queryParams.join("&")}` : "";

      return (await productsApi.get<Product[]>(`/${queryString} `)).data;
    },
    staleTime: 1000 * 60 * 60,
  });

  return { products, isLoading, isFetched, isError };
};

export const searchProduct = async (filter: string) => {
  try {
    return (await productsApi.get(`/search?filter=${filter}`)).data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return []
  }
};

export const createProduct = () => {
  const queryClient = useQueryClient();

  const create = useMutation({
    mutationKey: [productKey],
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
    mutationFn: async ({ id, ...nwProduct }: ProductSchemaType) => {
      const formData = new FormData();

      Object.entries(nwProduct).forEach(([key, value]) => {
        if (key === "image") {
          formData.append(key, value as File);
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
      await queryClient.cancelQueries({ queryKey: [productKey] });

      const previousProducts = queryClient.getQueryData<products[]>([
        productKey,
      ]);

      const optimisticProduct = {
        id: id!,
        ...restProduct,
        url: "",
        category: category as Category,
        price: +price,
      };

      queryClient.setQueryData<products[]>([productKey], (old) => {
        if (!old) return [optimisticProduct];
        return old.map((cacheProduct) =>
          cacheProduct.id === id ? optimisticProduct : cacheProduct,
        );
      });

      return { previousProducts, optimisticProduct };
    },
    onError: (__, _, context: any) => {
      queryClient.setQueryData<products[]>(
        [productKey],
        context.previousProducts,
      );
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
  return update;
};
