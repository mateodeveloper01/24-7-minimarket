"use client";
import { Product } from "@/types";

import { InstantSearchNext } from "react-instantsearch-nextjs";
import { Suspense, useEffect, useState } from "react";
import { SearchProductItem } from "./SearchProductItem";

import { index, indexObject, searchClient } from "./indexObject";
import { Input } from "../ui/input";

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
            <Input
              type="search"
              onChange={handleChange}
              className=" py-1 px-2 border-black"
              value={query}
              placeholder="buscar"
            />
          </form>
          {result.length !== 0 && (
            <div className="p-2 ">
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
