import { Order } from "@/schemas/order";
import { Product } from "@/types";

export const BuyButton = (
  { address, delivery_method, floor, name, pay_method, references }: Order,
  cart: Product[],
  totalPrice: number,
) => {
  const message = `Hola! %0AMi nombre es ${name} %0AVoy a pagar con ${pay_method} %0A${
    delivery_method === "envio"
      ? `Necesito que me lo envien %0A Mi direccion es ${address}, ${floor}, ${references && references}`
      : `Lo retiro por ${delivery_method} %0AMi pedido: %0A`
  }${cart
    .map(
      ({ quantity, tipo, description, brand, amount, price }) =>
        `${quantity} ${tipo} ${description} ${brand} ${amount} - ${price}`,
    )
    .join("%0A")}%0ATotal : $${totalPrice}`;
  console.log(message);
  window.open(
    `https://api.whatsapp.com/send?phone=${process.env.NEXT_PUBLIC_WPP_NUMBER}&text=${message}`,
    "_blank",
  );
};
