import { Product } from "../../types.d";
import Image from "next/image";
import { useCartStore } from "../../stores/useCartStore";
import { useImage } from "@/hooks/useImage";
import { Trash2 } from "lucide-react";
import { ProductTitle } from "../products/ProductTitle";
import { Quantity } from "../products/Quantity";

interface Props {
  product: Product;
}

export default function CartItem({ product }: Props) {
  const { amount, brand, description, quantity, tipo } = product;
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  return (
    <li className="flex justify-between items-center gap-4 shadow-md ">
        <Image
          src={useImage(product)}
          alt={tipo}
          width={70}
          height={70}
          className="h-full object-cover bg-white"
        />
          <ProductTitle
            amount={amount}
            brand={brand}
            description={description}
            tipo={tipo}
          />
		  <Quantity id={product.id}/>
          {/* <p>
            <span>Cantidad: {quantity}</span> x
            <span className="text-gray-600 font-bold"> ${product.price}</span>
          </p> */}
      <div className="w-20 flex justify-center items-center gap-4 pr-10">
        <p className=" font-bold">${quantity! * product.price!}</p>
		<button
          title="Remove Item"
          className="text-red-500 hover:text-red-600  text-center"
          onClick={() => removeFromCart(product)}
        >
          <Trash2 />
        </button>
      </div>
    </li>
  );
}
