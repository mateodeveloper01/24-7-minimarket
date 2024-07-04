"use client";

import { ProductItem } from "@/components";
import { searchProduct } from "@/hooks/useProduct";
import { Product } from "@/types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchPage() {
  const [results, setResults] = useState([]);
  const searchParams = useSearchParams();

  const query = searchParams.get("query");

  useEffect(() => {
    if (query) {
      performSearch(query);
    }
  }, [query]);
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
