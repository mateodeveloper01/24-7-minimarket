"use client";

import { Input, ProductItem } from "@/components";
import { searchProduct } from "@/hooks/useProduct";
import { Product } from "@/types";
import { Search } from "lucide-react";
import { useState } from "react";

export default function SearchPage() {
  const [filter, setFilter] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const modifiedFilter = filter.replace(/ /g, "_");

    const res = await searchProduct(modifiedFilter);
    setResults(res);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setFilter(event.target.value);
  };

  return (
    <div className="w-4/5 flex flex-col gap-10">
      <form
        className="flex gap-2 rounded-md border border-input px-2"
        onSubmit={handleSearch}
      >
        <Input
          className="border-none"
          placeholder="Buscar"
          value={filter}
          onChange={handleChange}
        />
        <button type="submit">
          <Search />
        </button>
      </form>
      <div className="grid grid-cols-dynamic-150 md:grid-cols-dynamic-200 gap-4">
        {results.map((result: Product) => (
          <ProductItem {...result} key={result.id} />
        ))}
      </div>
    </div>
  );
}
