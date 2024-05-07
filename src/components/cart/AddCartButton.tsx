"use client";
import { useCartStore } from "@/stores/useCartStore";
import { Product } from "@/types";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export const AddCartButton = ({ product }: { product: Product }) => {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <Button
     size={'sm'}
    className={cn('my-1 bg-green-400')}
      onClick={() => addToCart(product)}
    >
      Agregar
    </Button>
  );
};
