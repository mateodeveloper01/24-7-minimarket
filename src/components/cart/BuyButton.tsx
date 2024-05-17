'use client'
import { Product } from "@/types";
import { Button } from "../ui/button";
import useFromStore from "@/hooks/useFromStore";
import { useCartStore } from "@/stores/useCartStore";
interface Prop {
  listCart: Product[];
}
export const BuyButton = () => {
  const cart = useFromStore(useCartStore, (state) => state.cart);

  const buyButton = () => {
    const message = cart!
      .map(
        ({ quantity, tipo, description, brand, amount, price }) =>
          `${quantity} ${tipo} ${description} ${brand} ${amount} - ${price}`,
      )
      .join(" | ");
    // console.log(message);
    window.open(
      `https://api.whatsapp.com/send?phone=542302308783&text=${message}`,
      "_blank",
    );
  };
  return <Button onClick={buyButton}> Realizar pedido</Button>;
};
