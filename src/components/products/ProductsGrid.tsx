"use client";
import React, { useState } from "react";
import { Title } from "../ui/Title";
import Link from "next/link";
import { Button } from "../ui/button";
import { ProductItem } from "./ProductItem";

import { getProduct } from "@/hooks/useProduct";
import { useQuery } from "@tanstack/react-query";
import { products } from "@prisma/client";
import { PaginationComponent } from "../pagination/PaginationComponent";

interface Prop {
  category: string;
  className?: string;
}

export const ProductsGrid = ({ category, className }: Prop) => {
  const [page, setPage] = useState(1);
  const { isLoading, data: products } = useQuery({
    queryKey: ["products", category, 20, page],
    queryFn: () => getProduct({ category, stock: true, limit: 21, page }),
    staleTime: 60 * 60 * 1000, // 1 hs
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="w-4/5 flex flex-col gap-5 pt-10">
      <div className="border-t-2 border-black pb-2 pt-4 flex justify-between gap-2 w-full">
        <Title>Productos {category.replace(/_/g, " ")}</Title>
        <Link href={`/`}>
          <Button>Volver</Button>
        </Link>
      </div>
      <div className={className}>
        {products?.data?.map((product: products) => (
          <ProductItem {...product} key={product.id} />
        ))}
      </div>
      <PaginationComponent
        meta={products?.meta!}
        page={page}
        setPage={setPage}
      />
    </div>
  );
};
