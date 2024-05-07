import Image from "next/image";
import { AddCartButton } from "../cart/AddCartButton";
import { Product } from "@/types";

export const ProductItem = (item: Product) => {
  const { title, url } = item;
  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-3">
      <div className="relative w-full h-48 mb-4">
        <Image
          src={url}
          layout="fill"
          objectFit="cover"
          alt={title}
          className="rounded-lg"
        />
      </div>
      <div className="text-xl font-bold mb-2">{title}</div>
      {/* <div className="text-gray-600 mb-2">{description}</div> */}
      {/* <div className="text-gray-500 mb-4">{category}</div> */}
      <div className="flex justify-end">
        <AddCartButton product={{ ...item }} />
      </div>
    </div>
  );
};
