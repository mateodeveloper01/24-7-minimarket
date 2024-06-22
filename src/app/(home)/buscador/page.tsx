"use client";

import {  ProductItem } from "@/components";
import { Product } from "@/types";
import { useState } from "react";
import { SearchProduct } from '../../../components/search/SearchProduct';

export default function SearchPage() {
  const [results, setResults] = useState([]);
  const resetSearch = () => {
    setResults([]);
  };
  return (
    <div className="w-4/5 flex flex-col gap-10">
      <SearchProduct setProducts={setResults} resetSearch={resetSearch} />
      <div className="grid grid-cols-dynamic-150 md:grid-cols-dynamic-200 gap-4">
        {results.map((result: Product) => (
          <ProductItem {...result} key={result.id} />
        ))}
      </div>
    </div>
  );
}
