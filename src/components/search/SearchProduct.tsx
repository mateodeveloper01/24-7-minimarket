"use client";
import { Product } from "@/types";

import { InstantSearchNext } from "react-instantsearch-nextjs";
import { Suspense, useEffect, useState } from "react";
import { SearchProductItem } from "./SearchProductItem";

import { index, indexObject, searchClient } from "./indexObject";

interface Prop {
  products: Product[];
  className?: string;
}

export const SearchProduct = ({ products, className }: Prop) => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<any[]>([]);

  useEffect(() => {
    indexObject(products);
  }, [products]);
  const performSearch = async (value: any) => {
    const { hits } = await index.search(value);
    setResult([...hits]);
    return hits;
  };

  const handleChange = (e: any) => {
    const { value } = e.target;
    setQuery(value);
    value == "" ? setResult([]) : performSearch(value);
  };

  return (
    <Suspense>
      <InstantSearchNext
        searchClient={searchClient}
        indexName="products"
        future={{ preserveSharedStateOnUnmount: true }}
      >
        <div className={`flex flex-col w-4/5 ${className}`}>
          <form>
            <input
              type="search"
              onChange={handleChange}
              className="text-black py-1 px-2"
              value={query}
              placeholder="buscar"
            />
          </form>
          {result.length !== 0 && (
            <div className="bg-black  p-2 ">
              {result.map((result) => (
                <SearchProductItem key={result.objectID} product={result} />
              ))}
            </div>
          )}
        </div>
      </InstantSearchNext>
    </Suspense>
  );
};
