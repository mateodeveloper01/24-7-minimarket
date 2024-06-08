import Image from "next/image";
import { AddCartButton } from "../cart/AddCartButton";
import { Product } from "@/types";
import { ProductTitle } from "./ProductTitle";

export const ProductItem = (item: Product) => {
  const { tipo, price, description, brand, amount,url } = item;
  return (
    <div className="border border-black rounded-lg shadow-md p-3">
      <div className="relative w-full  mb-4 flex justify-center items-center">
        <Image
          src={url}
          width={200}
          height={200}
          fill={false}
          alt={tipo}
          className=" rounded-lg bg-white"
        />
      </div>
      <div className="text-xl font-bold">${price}</div>

      <ProductTitle amount={amount} brand={brand} description={description} tipo={tipo} />
      {/* <p className="text-xl font-semibold mb-2 capitalize-first-letter">
        {tipo} {description} <span className="capitalize">{brand} </span>
        {amount}
      </p> */}
      <div className="flex justify-end">
        <AddCartButton product={{ ...item }} />
      </div>
    </div>
  );
};
