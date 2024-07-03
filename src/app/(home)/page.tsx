import { AboutMe, Button, Input, ProductsCarrousel } from "@/components";
import { categories } from "@/schemas";
import { Search } from "lucide-react";
import Link from "next/link";

export default async function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center w-full gap-10">
      <Link href={"/buscador"} className="w-4/5">
        <form className="flex gap-2 rounded-md border border-input px-2">
          <Input className="border-none" placeholder="Buscar" />
          <button type="submit">
            <Search />
          </button>
        </form>
      </Link>

      {categories.map((category: string) => (
        <ProductsCarrousel key={category} category={category} />
      ))}
      <AboutMe />
    </div>
  );
}
