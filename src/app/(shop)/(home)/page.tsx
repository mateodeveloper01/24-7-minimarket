import { AboutMe, ProductsCarrousel } from "@/components";
import { categories } from "@/schemas";
import { Category } from "@prisma/client";

export default async function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center w-full gap-10 pt-10">
      {categories.map((category: string) => (
        <ProductsCarrousel key={category} category={category as Category} />
      ))}
    </div>
  );
}
