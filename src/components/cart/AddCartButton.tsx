"use client";
import { useCartStore } from "@/stores/useCartStore";
import { Product } from "@/types";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useToast } from "../ui/use-toast";

export const AddCartButton = ({ product }: { product: Product }) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const { toast } = useToast();

  const add = () => {
    addToCart(product);
    toast({
      title:'Agregado',
      variant:'aggregate',
      duration:500
    })
  };
  return (
    <Button
      size={"sm"}
      className={cn("my-1 bg-green-400")}
      onClick={() => add()}
    >
      Agregar
    </Button>
  );
};
