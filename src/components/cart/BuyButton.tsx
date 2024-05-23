import { Product } from "@/types";

type orderInfo = {
  name: string;
  number: string;
  delivery_method: string;
  address: string | undefined;
  floor: string | undefined;
  references: string | undefined;
  pay_method: string;
};

export const BuyButton = (orderInfo: orderInfo, cart: Product[],totalPrice:number) => {
  
  const {
    address,
    delivery_method,
    floor,
    name,
    number,
    pay_method,
    references,
  } = orderInfo;
  const message = `Hola! %0AMi nombre es ${name} %0AVoy a pagar con ${pay_method} %0A${
    delivery_method === "envio"
      ? `Necesito que me lo envien %0A Mi direccion es ${address}, ${floor}, ${references && references}`
      : `Lo retiro por ${delivery_method} %0AMi numero es ${number} %0AMi pedido: %0A`
  }${cart
    .map(
      ({ quantity, tipo, description, brand, amount, price }) =>
        `${quantity} ${tipo} ${description} ${brand} ${amount} - ${price}`,
    )
    .join("%0A")}%0ATotal : $${totalPrice}`;
  console.log(message);
  window.open(
    `https://api.whatsapp.com/send?phone=542302308783&text=${message}`,
    "_blank",
  );
};
