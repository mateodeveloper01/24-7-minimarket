import { ProductSchemaType } from "@/app/dashboard/_components";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productsApi, ResProduct } from "./Api";
import { Category, products } from "@prisma/client";
import { toast } from "@/components";

// Actualizar un producto con optimización optimista
export const updateProduct = (pagination?: any[]) => {
  const queryClient = useQueryClient();
  const updateKey = ["products", ...pagination!];

  const update = useMutation({
    mutationKey: updateKey,
    mutationFn: async ({ id, ...nwProduct }: ProductSchemaType) => {
      const formData = new FormData();
      Object.entries(nwProduct).forEach(([key, value]) => {
        if (key === "image") {
          formData.append(key, value as File);
        } else {
          formData.append(key, value.toString());
        }
      });
      return (await productsApi.patch(`/${id}`, formData)).data;
    },
    onMutate: async ({
      id,
      category,
      price,
      ...restProduct
    }: ProductSchemaType) => {
      await queryClient.cancelQueries({ queryKey: updateKey });

      const previousProducts = queryClient.getQueryData<ResProduct>([
        "products",
      ]);

      const optimisticProduct = {
        id: id!,
        ...restProduct,
        category: category as Category,
        price: +price,
      };

      queryClient.setQueryData<ResProduct>(updateKey, (old: any) => {
        if (!old) {
          return {
            data: [optimisticProduct],
            meta: { total: 0, page: 0, totalPage: 0 },
          };
        }

        return {
          data: old.data.map((cacheProduct: any) =>
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
        if (!old) {
          return {
            data: [nwProduct],
            meta: { total: 0, page: 0, totalPage: 0 },
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

  return update;
};
