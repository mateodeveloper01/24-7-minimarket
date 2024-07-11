import { AboutMe, ProductsCarrousel } from "@/components";
import { categories } from "@/schemas";

export default async function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center w-full gap-10">
      {categories.map((category: string) => (
        <>{category}</>
      ))}
      <AboutMe />
    </div>
  );
}
