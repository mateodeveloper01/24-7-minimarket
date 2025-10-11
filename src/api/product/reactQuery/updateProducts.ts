import { ProductSchemaType } from "@/app/gestor/_components/ProductForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {  products } from "@prisma/client";
import { toast } from "sonner"
import { updateProductsAction } from "../actions/updateProducts.action";

type ResProduct = {
  data: products[];
  meta: {
    total: number;
    page: number;
    totalPage: number;
  };
};
// Actualizar un producto con optimización optimista
export const updateProduct = (pagination?: any[]) => {
  const queryClient = useQueryClient();
  const updateKey = ["products", ...pagination!];

  const update = useMutation({
    mutationKey: updateKey,
    mutationFn: async ({ id, ...nwProduct }: ProductSchemaType) => {

      const formData = new FormData();
      
      if (nwProduct.image) {
        formData.append("image", nwProduct.image as Blob);
      }
      
      Object.entries(nwProduct).forEach(([key, value]) => {
        formData.append(key, value as string);
      });
      
      return updateProductsAction(formData,id);
      // return (await productsApi.patch(`/${id}`, formData)).data;
    },
    onMutate: async ({
      id,
      category,
      price,
      ...restProduct
    }: ProductSchemaType) => {
      await queryClient.cancelQueries({ queryKey: updateKey });

      const previousProducts = queryClient.getQueryData<products[]>([
        "products",
      ]);

      const optimisticProduct = {
        id: id!,
        ...restProduct,
        category ,
        price: +price,
      };

      queryClient.setQueryData<ResProduct>(updateKey, (old) => {
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
      queryClient.setQueryData<ResProduct>(updateKey, context.previousProducts);
    },
    onSuccess: (product: any, _: any, context: any) => {
      const nwProduct = { ...product, category: product.category  };

      queryClient.setQueryData<ResProduct>(updateKey, (old) => {
        if (!old) {
          return {
            data: [nwProduct],
            meta: { total: 0, page: 0, totalPage: 0 },
          };
        }
        return {
          data: old.data.map((cacheProduct: any) =>
            cacheProduct.id === context?.optimisticProduct.id
              ? nwProduct
              : cacheProduct,
          ),
          meta: old.meta,
        };
      });

      toast( "Cambio realizado" );
    },
  });

  return update;
};
