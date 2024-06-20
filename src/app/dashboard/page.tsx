"use client";

import { getProduct } from "@/hooks/useProduct";
import { columns, DataTable, ProductForm } from "./_components";

export default function Dashboard() {
  const { products,isLoading } = getProduct({limit:200});
  if (isLoading) return <div>...cargando</div>;
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={products} />

    </div>
  );
}
