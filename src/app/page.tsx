import {  Cart, ProductsGrid } from "@/components";

export default function HomePage() {
  return (
    <div className="flex">
      <ProductsGrid />
      <Cart/>
    </div>
  );
}
