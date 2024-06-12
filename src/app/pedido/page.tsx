import { Cart, OrderForm } from "@/components";

export default function pedido() {
  return (
    <div className="flex flex-col gap-4 md:w-4/5 max-w-[800px] ">
      <Cart />
      <OrderForm />
    </div>
  );
}
