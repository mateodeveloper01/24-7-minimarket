"use client";
import {
  Button,
  BuyButton,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components";
import useFromStore from "@/hooks/useFromStore";
import { useCartStore } from "@/stores/useCartStore";
import { useState } from "react";

export default function confirmacion() {
  const [deliveryMethod, setDeliveryMethod] = useState<string>();
  const cart = useFromStore(useCartStore, (state) => state.cart);
  const total = useFromStore(useCartStore, (state) => state.totalPrice);
  const submit = (formData: FormData) => {
    const orderInfo = {
      name: formData.get("name") as string,
      number: formData.get("number") as string,
      delivery_method: formData.get("delivery_method") as string,
      address: formData.get("address") as string,
      floor: formData.get("floor") as string,
      references: formData.get("references") as string,
      pay_method: formData.get("pay_method") as string,
    };
    BuyButton(orderInfo, cart!, total!);
  };

  return (
    <div className="flex flex-col gap-4 md:w-2/5 max-md:w-full max-md:px-6">
      <form action={submit} className="flex flex-col gap-4">
        <Label>Nombre y apellido</Label>
        <Input name="name" />

        <Label>Telefono</Label>
        <Input name="number" type="number" />

        <Label>Forma de entrega</Label>
        <Select
          name="delivery_method"
          onValueChange={(item) => setDeliveryMethod(item)}
        >
          <SelectTrigger>
            <SelectValue placeholder="[seleccione]" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Av.Revolucion">
              Retiro en Av.Revolución de Mayo 1510
            </SelectItem>
            <SelectItem value="Lima">Retiro en Lima 1109</SelectItem>
            <SelectItem value="envio">Nesecito que me lo envien</SelectItem>
          </SelectContent>
        </Select>
        {deliveryMethod === "envio" && (
          <>
            <p>
              Costo del envio $1000 (puede variar dependiendo de la distancia)
            </p>
            <Label>Direccion y calle</Label>
            <Input name="address" />

            <Label>Piso / Departamento</Label>
            <Input name="floor" />

            <Label>Referencias</Label>
            <Input name="references" />
          </>
        )}

        <Label>Forma de pago</Label>
        <Select name="pay_method">
          <SelectTrigger>
            <SelectValue placeholder="[seleccione]" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Mercado pago">Mercado pago</SelectItem>
            <SelectItem value="Targeta de debito">Targeta de debito</SelectItem>
            <SelectItem value="Targeta de credito">
              Targeta de credito(12% recargo)
            </SelectItem>
          </SelectContent>
        </Select>

        <div className="px-4 flex justify-end">
          <Button>Realizar pedido</Button>
        </div>
      </form>
    </div>
  );
}
