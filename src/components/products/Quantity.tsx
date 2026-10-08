"use client";
import useFromStore from "@/hooks/useFromStore";
import { Button } from "../ui/button";
import { useCartStore } from "@/stores/useCartStore";

interface Props {
  id: string;
}

export const Quantity = ({ id }: Props) => {
  const cart = useFromStore(useCartStore, (state) => state.cart);
  const updateCart = useCartStore((state) => state.updateCart);

  const quantity = cart?.find((item) => item.id === id)?.quantity ?? 0;

  const incrementQuantity = () => {
    const newQuantity = quantity + 1;
    updateCart(id, newQuantity); // Actualiza el carrito globalmente
  };

  const decrementQuantity = () => {
    if (quantity > 0) {
      const newQuantity = quantity - 1;
      updateCart(id, newQuantity); // Actualiza el carrito globalmente
    }
  };

  return (
    <div className="flex gap-4 items-center">
      <Button
        onClick={decrementQuantity}
        disabled={quantity === 1 ? true : false}
        className={`rounded-full bg-gray-400 p-4 `}
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
  );
};
