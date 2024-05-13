import { useProduct } from "@/hooks/useProduct";
import { ProductItem } from "./ProductItem";
import { Product } from "@/types";

interface Prop {
  title: string;
  products: Product[];
}
export const ProductsGrid = async ({ title, products }: Prop) => {
  if (products.length !== 0) {
    return (
      <div className="w-4/5 flex flex-col gap-5">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <div className=" grid grid-cols-2 md:grid-cols-5  gap-4">
          {products.length === 0 ? (
            <></>
          ) : (
            products.map((product) => (
              <ProductItem {...product} key={product.tipo} />
            ))
          )}
        </div>
      </div>
    );
  }
};
