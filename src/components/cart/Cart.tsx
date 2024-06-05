"use client";
import CartItem from "./CartItem";

import { useCartStore } from "../../stores/useCartStore";
import useFromStore from "@/hooks/useFromStore";

interface Prop {
  className?: string;
}

export const Cart = ({ className }: Prop) => {
  const cart = useFromStore(useCartStore, (state) => state.cart);
  const totalPrice = useFromStore(useCartStore, (state) => state.totalPrice);
  

  return (
    <section className={` px-6 ${className}`}>
      <h3 className="text-2xl font-bold mb-4">Carrito</h3>
      {!totalPrice ? (
        <h2>Agrega productos al carrito para realizar tu compra</h2>
      ) : (
        <>
          <ul className="flex flex-col gap-2">
            {cart?.map((product) => (
              <CartItem key={product.id} product={product} />
            ))}
          </ul>
          <div className="flex justify-end items-center gap-10 mt-4 pr-10">
            <span className="text-lg font-bold">Sub-Total:</span>
            <span className="text-xl font-bold">${totalPrice.toFixed(2)}</span>
          </div>
        </>
      )}
    </section>
  );
};
