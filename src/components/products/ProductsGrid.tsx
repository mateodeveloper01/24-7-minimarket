import { useProduct } from "@/hooks/useProduct";
import { ProductItem } from "./ProductItem";

export const ProductsGrid = async () => {
  const { products } = await useProduct();
  return (
    <div className="cart grid grid-cols-3 w-4/5 gap-4">
      {products.map((product) => (
        <ProductItem {...product} key={product.title}/>
      ))}
    </div>
  );
};
