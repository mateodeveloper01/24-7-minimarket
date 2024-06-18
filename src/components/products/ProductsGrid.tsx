"use client";
import { ProductItem } from "./ProductItem";
import { Title } from "../ui/Title";
import Link from "next/link";
import { Button } from "../ui/button";
import { getProduct } from "@/hooks/useProduct";

interface Prop {
  category: string;
  perPage?: number;
  className?: string;
}
export const ProductsGrid =  ({ category, perPage, className }: Prop) => {
  const { products } = getProduct(category);
  const productsList = products!
    .slice(0, perPage);
  if (productsList.length !== 0) {
    return (
      <div className="w-4/5 flex flex-col gap-5">
        <div className="border-b-2 border-black pb-2  flex justify-between w-full">
          <Title>Productos {category}</Title>
          <Link href={`/${category}`}>
            <Button>Ver todo</Button>
          </Link>
        </div>
        <div className={className}>
          {productsList.map((product) => (
            <ProductItem {...product} key={product.id} />
          ))}
        </div>
      </div>
    );
  }
};
