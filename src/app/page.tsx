import { AboutMe, ProductsGrid } from "@/components";
import { SearchProduct } from "@/components/search/SearchProduct";
import { useProduct } from "@/hooks/useProduct";

export default async function HomePage() {
  const { products } = await useProduct();
  const categories = [
    "Almacen",
    "Bebidas",
    "Frescos",
    "Limpieza",
    "Golosinas",
    "otros",
  ];
  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <SearchProduct products={products} />

      {categories.map((item) => (
        <ProductsGrid
          key={item}
          title={`Productos ${item}`}
          products={products.filter((i) => i.category === item)}
        />
      ))}

      {/* <Cart/> */}
      <AboutMe />
    </div>
  );
}
