import { Cart } from "@/components";
import { BuyButton } from "@/components/cart/BuyButton";

export default function pedido() {
  return (
    <div className="flex flex-col gap-4">
      <Cart />
      <div className="px-4 flex justify-end">
        <BuyButton />
      </div>
    </div>
  );
}
