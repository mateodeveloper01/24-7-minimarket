"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Form, FormField } from "../ui/form";
import { MyFormItem } from "./MyFormItem";

import { useState } from "react";
import { BuyButton } from "../cart/BuyButton";
import useFromStore from "@/hooks/useFromStore";
import { useCartStore } from "@/stores/useCartStore";
import { formOrderSchema, Order } from "@/schemas/order";
import { DevTool } from "@hookform/devtools";

export const OrderForm = () => {
  const [deliveryMethod, setDeliveryMethod] = useState<string>();
  const form = useForm<Order>({
    resolver: zodResolver(formOrderSchema),
    defaultValues: {
      name: "",
      delivery_method: "",
      address: "",
      floor: "",
      references: "",
      pay_method: "",
    },
  });
  const cart = useFromStore(useCartStore, (state) => state.cart);
  const total = useFromStore(useCartStore, (state) => state.totalPrice);
  const onSubmit = (values: Order) => {
    BuyButton(values, cart!, total!);
  };
  return (
    <div className="flex flex-col gap-4 md:w-2/5 max-md:w-full max-md:px-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          onError={(error) => console.log(error)}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <MyFormItem field={field} label="Nombre y apellido" />
            )}
          />
          
          <FormField
            control={form.control}
            name="delivery_method"
            render={({ field }) => (
              <MyFormItem field={field} setDeliveryMethod={setDeliveryMethod} />
            )}
          />
          {deliveryMethod === "envio" && (
            <>
              <p>
                Costo del envio $1000 (puede variar dependiendo de la distancia)
              </p>
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <MyFormItem field={field} label="Direccion y calle" />
                )}
              />
              <FormField
                control={form.control}
                name="floor"
                render={({ field }) => (
                  <MyFormItem field={field} label="Piso / Departamento" />
                )}
              />
              <FormField
                control={form.control}
                name="references"
                render={({ field }) => (
                  <MyFormItem field={field} label="Referencias" />
                )}
              />
            </>
          )}

          <FormField
            control={form.control}
            name="pay_method"
            render={({ field }) => (
              <MyFormItem field={field} label="Forma de pago" />
            )}
          />
          <Button type="submit">Realizar pedido</Button>
          <DevTool control={form.control} />
        </form>
      </Form>
    </div>
  );
};
