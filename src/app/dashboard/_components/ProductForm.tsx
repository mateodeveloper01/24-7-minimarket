"use client";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Switch,
} from "@/components";
import { MyFormItem } from "@/components/order/MyFormItem";
import { ProductSchema } from "@/schemas/products";
import { Product } from "@/types";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { UploadImages } from "./UploadImages";
import { useState } from "react";
import { useProduct } from "@/hooks/useProduct";
interface Props {
  product: Product;
}
export type ProductSchemaType = z.infer<typeof ProductSchema>;

export const ProductForm = ({ product }: Props) => {
  const { uploadProduct } = useProduct();
  const { amount, brand, category, description, price, stock, tipo, id } =
    product;
  const [image, setImage] = useState<File | null>(null);

  const form = useForm<ProductSchemaType>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      tipo,
      amount,
      brand,
      category,
      description,
      price:price.toString(),
      stock,
      // image: "",
    },
  });
  const onSubmit = async (values: ProductSchemaType) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });
    if (image) {
      formData.append("image", image);
      const res = await uploadProduct(id, formData);
      console.log(res);
    }
    // console.log(formData);
    
    const res = await uploadProduct(id, values);
    console.log(res);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        onError={(error) => console.log(error)}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="tipo"
          render={({ field }) => <MyFormItem field={field} label="Tipo" />}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <MyFormItem field={field} label="Descripcion" />
          )}
        />
        <FormField
          control={form.control}
          name="brand"
          render={({ field }) => <MyFormItem field={field} label="Marca" />}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => <MyFormItem field={field} label="Cantidad" />}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <MyFormItem field={field} label="Precio" type="number" />
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => <MyFormItem field={field} label="Categoria" />}
        />
        <FormField
          control={form.control}
          name="stock"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <FormLabel>Stock</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <UploadImages onUpload={setImage} />

        <Button type="submit">Guardar</Button>

        <DevTool control={form.control} />
      </form>
    </Form>
  );
};