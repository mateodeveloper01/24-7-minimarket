import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productsApi } from "./Api";
import { toast } from "@/components";

// Eliminar un producto
export const removeProduct = () => {
  const queryClient = useQueryClient();

  const remove = useMutation({
    mutationKey: ["products"],
    mutationFn: async (id: string) => (await productsApi.delete(`/${id}`)).data,
    onSuccess: () => {
      toast({ variant: "success", title: "Cambio realizado" });
      queryClient.invalidateQueries();
    },
  });

  return remove;
};
