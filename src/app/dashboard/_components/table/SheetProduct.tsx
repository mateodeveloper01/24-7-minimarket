import {
  Button,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components";
import { ProductForm } from "../ProductForm";

export const SheetProduct = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Crear Producto</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Crear/Editar producto</SheetTitle>
        </SheetHeader>
        <ProductForm />
     </SheetContent>
    </Sheet> 
   );
};
