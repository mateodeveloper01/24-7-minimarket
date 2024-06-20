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
      className="grid grid-cols-2 md:grid-cols-6  gap-4"
    />
  );
}
