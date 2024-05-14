import Image from "next/image";
import { AddCartButton } from "../cart/AddCartButton";
import { Product } from "@/types";

export const ProductItem = (item: Product) => {
  const { tipo, url, price, description, brand, amount } = item;
  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-3">
      <div className="relative w-full  mb-4 flex justify-center items-center">
        <Image
          src={url}          
          width={200}
          height={200}
          // objectFit="cover"
          alt={tipo}
          className=" rounded-lg"
        />
      </div>
      <div className="text-xl font-bold mb-2">
        {tipo} {description} {brand} {amount}
      </div>
      <div>${price}</div>
      {/* <div className="text-gray-600 mb-2">{description}</div> */}
      {/* <div className="text-gray-500 mb-4">{category}</div> */}
      <div className="flex justify-end">
        <AddCartButton product={{ ...item }} />
      </div>
    </div>
  );
};
