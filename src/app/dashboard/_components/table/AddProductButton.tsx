import {
  Button,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components";
import { ProductForm } from "../ProductForm";

export const AddProductButton = ({pagination}:{pagination:any[]}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Crear Producto</Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto ">
        <SheetHeader className="pb-4">
          <SheetTitle>Crear/Editar producto</SheetTitle>
        </SheetHeader>
        <ProductForm pagination={pagination}  />
     </SheetContent>
    </Sheet> 
   );
};
