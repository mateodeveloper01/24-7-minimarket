import Image from "next/image";
import { AddCartButton } from "../cart/AddCartButton";
import { Product } from "@/types";
import { ProductTitle } from "./ProductTitle";

export const ProductItem = (item: Product) => {
  const { tipo, price, description, brand, amount, url } = item;
  return (
    <div className="w-[140px] md:w-[200px] h-[300px] md:h-[320px] border border-black rounded-lg shadow-md p-2 bg-card flex flex-col justify-between">
      <div className="relative w-full  mb-4 flex justify-center items-center">
        <Image
          src={url ? url : "no_image_product.png"}
          width={150}
          height={150}
          fill={false}
          alt={tipo}
          className=" rounded-lg bg-white max-h-[120px] w-auto"
        />
      </div>
      <div className="text-xl font-bold">${price}</div>

      <ProductTitle
        amount={amount}
        brand={brand}
        description={description}
        tipo={tipo}
        className={'max-md:justify-center'}
      />
     
      <div className="flex justify-end max-md:justify-center">
        <AddCartButton product={{ ...item }} />
      </div>
    </div>
  );
};
