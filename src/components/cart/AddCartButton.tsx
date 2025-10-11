"use client";
import { useCartStore } from "@/stores/useCartStore";
import { Product } from "@/types";
import { toast } from "sonner";
import { useState } from "react";
import { Button } from "../ui/button";

export const AddCartButton = ({ product }: { product: Product }) => {
  const [quantity, setQuantity] = useState<number>(1);
  const addToCart = useCartStore((state) => state.addToCart);

  const add = () => {
    addToCart({ ...product, quantity });
    toast("Agregado");
  };

  const incrementQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
  };

  const decrementQuantity = () => {
    if (quantity > 0) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
    }
  };
  return (
    <>
      <div className="flex gap-4 items-center">
        <Button
          onClick={decrementQuantity}
          className="rounded-full bg-gray-400 p-4"
        >
          -
        </Button>
        {quantity}
        <Button
          onClick={incrementQuantity}
          className="rounded-full bg-gray-400 p-4"
        >
          +
        </Button>
      </div>
      <Button className={"bg-secondary"} onClick={() => add()}>
        Agregar
      </Button>
    </>
  );
};
