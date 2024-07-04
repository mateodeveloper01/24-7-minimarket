import { AboutMe, Button, Input, ProductsCarrousel } from "@/components";
import { categories } from "@/schemas";
import Link from "next/link";


export default async function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center w-full gap-10">
      

      {categories.map((category: string) => (
        <ProductsCarrousel key={category} category={category} />
      ))}
      <AboutMe />
    </div>
  );
}
