import { ProductItem } from "./ProductItem";
import { Title } from "../ui/Title";
import Link from "next/link";
import { useProduct } from "@/hooks/useProduct";

interface Prop {
  category: string;
  perPage?:number
  className?:string
}
export const ProductsGrid = async ({ category,perPage,className }: Prop) => {
  const { products } = await useProduct();

  const productsList = products
    .filter((i) => i.category === category)
    .slice(0, perPage);
  if (productsList.length !== 0) {
    return (
      <div className="w-4/5 flex flex-col gap-5">
        <Link href={`/${category}`} className="hover:border-b-2 border-white w-max">
          <Title >Productos {category}</Title>
        </Link>
        <div className={className}>
          {productsList.map((product) => (
            <ProductItem {...product} key={product.tipo} />
          ))}
        </div>
      </div>
    );
  }
};
