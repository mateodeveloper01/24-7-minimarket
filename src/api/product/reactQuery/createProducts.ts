import { toast } from "@/components";
import { ProductSchemaType } from "@/app/dashboard/_components";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Category, products } from "@prisma/client";
import { createProductsAction } from "../actions/createProducts.action";
export type ResProduct = {
  data: products[];
  meta: {
    total: number;
    page: number;
    totalPage: number;
  };
};
export const createProduct = (pagination: any[]) => {
  const queryClient = useQueryClient();
  const createKey = ["products", ...pagination];

  const create = useMutation({
    mutationKey: createKey,
    mutationFn: (product: ProductSchemaType) => {
      const formData = new FormData();
      
      if (product.image) {
        formData.append("image", product.image as Blob);
      }
      
      Object.entries(product).forEach(([key, value]) => {
        formData.append(key, value);
      });

      return createProductsAction(formData);
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
      queryClient.setQueryData<ResProduct>(createKey, (old: any) => {
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
