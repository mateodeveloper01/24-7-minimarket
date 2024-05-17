import { AboutMe, ProductsGrid } from "@/components";
import { SearchProduct } from "@/components/search/SearchProduct";
import { useProduct } from "@/hooks/useProduct";

export default async function HomePage() {
  const { products } = await useProduct();
  return (
    <div className="flex flex-col items-center justify-center gap-10">
        <SearchProduct products={products} />

      <ProductsGrid
        title={"Productos Almacen"}
        products={products.filter((i) => i.category === "Almacen")}
      />
      {/* <ProductsGrid title={"Productos Alicante"} products={products} /> */}

      <ProductsGrid
        title={"Bebidas"}
        products={products.filter((i) => i.category === "Bebidas")}
      />
      {/* <Cart/> */}
      <AboutMe/>
    </div>
  );
}
