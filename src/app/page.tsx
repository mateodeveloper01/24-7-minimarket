import {  ProductsGrid } from "@/components";
import { useProduct } from "@/hooks/useProduct";


export default async function HomePage() {
  const { products } = await useProduct();
  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <ProductsGrid title={"Productos Almacen"} products={products.filter(i=>i.category ==='Almacen')} />
      {/* <ProductsGrid title={"Productos Alicante"} products={products} /> */}

      <ProductsGrid title={"Bebidas"} products={products.filter(i=>i.category ==='Bebidas')} />
      {/* <Cart/> */}
    </div>
  );
}
