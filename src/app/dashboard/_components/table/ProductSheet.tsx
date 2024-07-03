import { Sheet, SheetContent } from "@/components";
import { Product } from "@/types";
import { ProductForm } from "../ProductForm";

interface ProductSheetProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  product: Product;
  pagination?: any[];
}

const ProductSheet = ({
  open,
  setOpen,
  product,
  pagination,
}: ProductSheetProps) => {
  return (
    <Sheet open={open} onOpenChange={() => setOpen(!open)}>
      <SheetContent>
        <ProductForm product={product} pagination={pagination} />
      </SheetContent>
    </Sheet>
  );
};

export default ProductSheet;
