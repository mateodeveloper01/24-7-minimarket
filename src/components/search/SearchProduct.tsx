"use client";
import { Product } from "@/types";

import { InstantSearchNext } from "react-instantsearch-nextjs";
import { Suspense, useEffect, useState } from "react";
import { SearchProductItem } from "./SearchProductItem";

import { index, indexObject, searchClient } from "./indexObject";
import { Input } from "../ui/input";
import { Search } from "lucide-react";

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
        <div className={`flex flex-col w-4/5 pt-10 ${className}`}>
          <form>
            <Input
              type="search"
              onChange={handleChange}
              className="py-6 border-black text-md"
              value={query}
              placeholder={`Buscar cualquiera de nuestros productos `}//${<Search />}
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
