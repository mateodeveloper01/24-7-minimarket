"use client";
import { getProduct } from "@/hooks/useProduct";
import React from "react";
import { Title } from "../ui/Title";
import Link from "next/link";
import { Button } from "../ui/button";
import { ProductItem } from "./ProductItem";

interface Prop {
  category: string;
  perPage?: number;
  className?: string;
}
export const ProductsGrid = ({ category, className, perPage }: Prop) => {
  const { products } = getProduct({ category, stock: true, limit: perPage });

  if (products.length !== 0) {
    return (
      <div className="w-4/5 flex flex-col gap-5">
        <div className="border-b-2 border-black pb-2  flex justify-between w-full">
          <Title>Productos {category}</Title>
          <Link href={`/`}>
            <Button>Volver</Button>
          </Link>
        </div>
        <div className={className}>
          {products.map((product) => (
            <ProductItem {...product} key={product.id} />
          ))}
        </div>
      </div>
    );
  }
};
