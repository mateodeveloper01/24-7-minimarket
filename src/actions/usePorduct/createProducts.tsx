import { toast } from "@/components";
import { ProductSchemaType } from "@/app/dashboard/_components";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productsApi, ResProduct } from "./Api";
import { Category } from "@prisma/client";

// Crear un nuevo producto con optimización optimista
export const createProduct = (pagination: any[]) => {
  const queryClient = useQueryClient();
  const createKey = ["products", ...pagination];

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
      return (await productsApi.post("", formData)).data;
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

      queryClient.setQueryData<ResProduct>(createKey, (old) => {
        if (!old) {
          return {
            data: [optimisticProduct],
            meta: { total: 1, page: 1, totalPage: 1 },
          };
        }
        return {
          data: [...old.data, optimisticProduct],
          meta: { ...old.meta, total: old.meta.total + 1 },
        };
      });

      return { previousProducts, optimisticProduct };
    },
    onError: (_, __, context: any) => {
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
