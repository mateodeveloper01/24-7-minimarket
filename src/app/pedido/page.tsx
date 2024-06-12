'use client'
import { Cart, OrderForm } from "@/components";
import useFromStore from "@/hooks/useFromStore";
import { useCartStore } from "@/stores/useCartStore";

export default function pedido() {
  const totalPrice = useFromStore(useCartStore, (state) => state.totalPrice);
  console.log(totalPrice);
  return (
    <div className="flex flex-col gap-4 md:w-4/5 max-w-[800px] ">
      {!totalPrice ? (
        <h2>Agrega productos al carrito para realizar tu compra</h2>
      ) : (
        <>
          <Cart />
          <OrderForm />
        </>
      )}
    </div>
  );
}
