import { ControllerRenderProps, FieldPath, FieldValues } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export const MyFormItem = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  field,
  label,
  placeholder,
  setDeliveryMethod,
}: {
  field: ControllerRenderProps<TFieldValues, TName>;
  label?: string;
  placeholder?: string;
  setDeliveryMethod?: (value: string) => void;
}) => {
  if (field.name === "pay_method") {
    return (
      <FormItem>
        <FormLabel>Forma de pago</FormLabel>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger>
            <SelectValue placeholder="[seleccione]" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Efectivo">
              En efectivo en el momento de la entrega
            </SelectItem>
            <SelectItem value="Transferencia">
              Transferencia bancaria
            </SelectItem>
            <SelectItem value="Mercado pago">Link de mercado pago</SelectItem>
            <SelectItem value="Tarjeta de debito">Tarjeta de debito</SelectItem>
            <SelectItem value="Tarjeta de credito">
              Tarjeta de credito(12% recargo)
            </SelectItem>
          </SelectContent>
        </Select>
      </FormItem>
    );
  }

  if (field.name === "delivery_method") {
    return (
      <FormItem>
        <FormLabel>Forma de entrega</FormLabel>
        <Select
          defaultValue={field.value}
          onValueChange={(item) => {
            field.onChange(item)
            setDeliveryMethod && setDeliveryMethod(item)
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="[seleccione]" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Av.Revolucion">
              Retiro en Av.Revolución de Mayo 1510
            </SelectItem>
            <SelectItem value="Lima">Retiro en Lima 1109</SelectItem>
            <SelectItem value="envio">Necesito que me lo envien</SelectItem>
          </SelectContent>
        </Select>
      </FormItem>
    );
  }

  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Input placeholder={placeholder} {...field} />
      </FormControl>
      {/* <FormDescription>This is your public display name.</FormDescription> */}
      <FormMessage />
    </FormItem>
  );
};
