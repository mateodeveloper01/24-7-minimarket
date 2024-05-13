"use client";
import CartItem from "./CartItem";

import { useCartStore } from "../../stores/useCartStore";
import useFromStore from "@/hooks/useFromStore";
import { BuyButton } from "./BuyButton";

interface Prop {
  className?: string;
}

export const Cart = ({ className }: Prop) => {
  const cart = useFromStore(useCartStore, (state) => state.cart);

  let total = 0;
  if (cart) {
    total = cart.reduce(
      (acc, product) => acc + product.price * (product.quantity as number),
      0,
    );
  }

  return (
    <section className={` px-6 ${className}`}>
      <h3 className="text-2xl font-bold mb-4">Carrito</h3>
      {total === 0 ? (
        <h2>Agrega productos al carrito para realizar tu compra</h2>
      ) : (
        <>
          <ul>
            {cart?.map((product) => (
              <CartItem key={product.id} product={product} />
            ))}
          </ul>
          <div className="flex justify-between items-center mt-4">
            <span className="text-lg font-bold">Total:</span>
            <span className="text-xl font-bold">${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-end py-3">
            {cart && <BuyButton listCart={cart} />}
          </div>
        </>
      )}
    </section>
  );
};
