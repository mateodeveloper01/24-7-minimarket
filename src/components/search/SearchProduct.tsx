"use client";

import { searchProduct } from "@/actions/usePorduct";
import { Input } from "@/components";
import { Search } from "lucide-react";
import { useState } from "react";

export const SearchProduct = ({
  setProducts,
  resetSearch,
}: {
  setProducts: any;
  resetSearch: () => void;
}) => {
  const [filter, setFilter] = useState("");

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!filter.trim()) {
      resetSearch();
      return;
    }

    const modifiedFilter = filter.replace(/ /g, "_");
    const res = await searchProduct(modifiedFilter);
    setProducts(res);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setFilter(event.target.value);
    if (!event.target.value.trim()) {
      resetSearch();
    }
  };

  return (
    <form
      className="flex gap-2 rounded-md border border-input px-2 mr-4 w-full"
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
  );
};
