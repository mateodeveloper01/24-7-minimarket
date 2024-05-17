import { Product } from "@/types";
import { Button } from "../ui/button";
interface Prop {
  listCart: Product[];
}
export const BuyButton = ({ listCart }: Prop) => {
  const buyButton = () => {
    const message = listCart
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
