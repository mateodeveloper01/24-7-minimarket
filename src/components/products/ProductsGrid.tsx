import { ProductItem } from "./ProductItem";
import { Product } from "@/types";
import { Title } from "../ui/Title";

interface Prop {
  title: string;
  products: Product[];
}
export const ProductsGrid = async ({ title, products }: Prop) => {
  if (products.length !== 0) {
    return (
      <div className="w-4/5 flex flex-col gap-5">
        <Title>{title}</Title>
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
