import { AboutMe, ProductsGrid } from "@/components";
import { SearchProduct } from "@/components/search/SearchProduct";
import { useProduct } from "@/hooks/useProduct";
import { categories } from "@/schemas/categories";


export default async function HomePage() {
  const { products } = await useProduct();

  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <SearchProduct products={products} />

      {categories.map((category:string) => (
        <ProductsGrid
          key={category}
          category={category}
          perPage={4}
          className=" grid grid-cols-2 md:grid-cols-5  gap-4"
        />
      ))}

      <AboutMe />
    </div>
  );
}
