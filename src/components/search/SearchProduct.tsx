"use client";
import { Product } from "@/types";

import { InstantSearchNext } from "react-instantsearch-nextjs";
import { useEffect, useState } from "react";
import { SearchProductItem } from "./SearchProductItem";

import { index, indexObject, searchClient } from "./indexObject";

export const SearchProduct = ({ products }: { products: Product[] }) => {

  const [query, setQuery] = useState("");
  const [result, setResult] = useState<any[]>([]);

  useEffect(() => { indexObject(products) }, []);
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
    <InstantSearchNext searchClient={searchClient} indexName="products">
      <form>
        <input
          type="search"
          onChange={handleChange}
          className="text-black"
          value={query}
          placeholder="buscar"
        />
      </form>
      {result.length !== 0 && (
        <div className="fixed bg-black">
          {result.map((result) => (
            <SearchProductItem key={result.objectID} product={result} />
          ))}
        </div>
      )}
    </InstantSearchNext>
  );
};
