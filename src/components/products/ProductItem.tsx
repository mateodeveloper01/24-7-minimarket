import Image from "next/image";
import { AddCartButton } from "../cart/AddCartButton";
import { Product } from "@/types";
import { useImage } from "@/hooks/useImage";

export const ProductItem = (item: Product) => {
  const { tipo, price, description, brand, amount } = item;
  return (
    <div className="border border-black rounded-lg shadow-md p-3">
      <div className="relative w-full  mb-4 flex justify-center items-center">
        <Image
          src={useImage(item)}
          width={200}
          height={200}
          fill={false}
          alt={tipo}
          className=" rounded-lg bg-white"
        />
      </div>
      <div className="text-xl font-bold">${price}</div>

      <p className="text-xl font-semibold mb-2 capitalize-first-letter">
        {tipo} {description} <span className="capitalize">{brand} </span>
        {amount}
      </p>
      {/* <div className="text-gray-600 mb-2">{description}</div> */}
      {/* <div className="text-gray-500 mb-4">{category}</div> */}
      <div className="flex justify-end">
        <AddCartButton product={{ ...item }} />
      </div>
    </div>
  );
};
