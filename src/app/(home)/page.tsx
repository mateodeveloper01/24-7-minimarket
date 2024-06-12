import { AboutMe, CarouselContainer, ProductsGrid } from "@/components";
import { categories } from "@/schemas";

export default async function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center gap-10">
     <div className="hidden">
      <CarouselContainer  />
      </div>
      {categories.map((category: string) => (
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
