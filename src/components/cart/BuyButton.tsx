import { Product } from "@/types";
import { Button } from "../ui/button";
import { redirect } from "next/navigation";
interface Prop{
    listCart:Product[]
}
export const BuyButton = ({listCart}:Prop) => {
    const buyButton= ()=>{
        const message = listCart.map(item=>`${item.quantity} ${item.title} - ${item.price}`).join(' | ')
        // console.log(message);
        window.open(`https://api.whatsapp.com/send?phone=542302308783&text=${message}`, '_blank');

    }
  return <Button onClick={buyButton}> Realizar pedido</Button>;
};
