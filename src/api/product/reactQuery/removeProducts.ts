import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner"
import { removeProductAction } from "../actions/removeProducts.action";

export const removeProduct = () => {
  const queryClient = useQueryClient()
  const remove = useMutation({
    mutationKey: ["products"],
    mutationFn: async (id: string) => await removeProductAction(id),
    onSuccess: () => {
      toast( "Cambio realizado" );
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return remove;
};
