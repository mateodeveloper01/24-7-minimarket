"use client";

import { Product } from "@/types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ProductItem } from "../products/ProductItem";
import { searchProduct } from "@/actions/usePorduct";

export default function SearchBar() {
  const searchParams = useSearchParams();
  const search = searchParams.get("query");

  // This will not be logged on the server when using static rendering
  //   console.log(search);
  const [results, setResults] = useState<Product[]>([]);
  //   const [query, setQuery] = useState<string | null>(null);

  useEffect(() => {
    if (search) {
      performSearch(search);
    }
  }, [search]);

  const performSearch = async (searchTerm: string) => {
    const modifiedFilter = searchTerm.replace(/ /g, "_");
    const res = await searchProduct(modifiedFilter);
    setResults(res);
  };

  return (
    <div className="w-4/5 flex flex-col gap-10">
      <div className="grid grid-cols-dynamic-150 md:grid-cols-dynamic-200 gap-4">
        {results.map((result: Product) => (
          <ProductItem {...result} key={result.id} />
        ))}
      </div>
    </div>
  );
}
