"use client";

import { Product } from "@/types";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { ProductItem } from "../products/ProductItem";
import { searchProduct } from "@/api";

export default function SearchBar() {
  const searchParams = useSearchParams();
  const search = searchParams.get("query");

  const { data: results = [] } = useQuery({
    queryKey: ['products', 'search', search],
    queryFn: () => searchProduct((search ?? '').replace(/ /g, '_')),
    enabled: Boolean(search),
  });
  return (
    <div className="w-4/5 flex flex-col gap-10 pt-10">
      {results.length === 0 ? (
        <section className="text-center h-[30vh] flex flex-col justify-center">
          <h2 className="text-xl font-semibold">No se encontraron productos</h2>
          <p className="text-gray-500">Intenta buscar con otros términos.</p>
        </section>
      ) : (
        <div className="grid grid-cols-dynamic-150 md:grid-cols-dynamic-200 gap-4">
          {results.map((result: Product) => (
            <ProductItem {...result} key={result.id} />
          ))}
        </div>
      )}
    </div>
  );
}
