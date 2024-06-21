import { ProductsGrid } from "@/components";

interface Prop {
  params: {
    category: string;
  };
}
export default function CategoryPage({ params }: Prop) {
  return (
    <ProductsGrid
      perPage={100}
      category={params.category}
      className="grid grid-cols-dynamic-150 md:grid-cols-dynamic-200  gap-4"
    />
  );
}
