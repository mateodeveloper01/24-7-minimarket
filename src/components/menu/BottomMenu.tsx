'use client'
import { useCartStore } from "@/stores/useCartStore";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export const BottomMenu = () => {
  const totalPrice = useCartStore((state) => state.totalPrice);

  return (
    <div className="fixed bottom-0 bg-background w-full h-20 md:hidden ">
      <Link href={'/pedido'} className="flex bg-gray-900 text-white m-4 p-3 rounded-lg justify-around items-center text-xl">
        <ShoppingCart />
        <p className="uppercase">Ver pedido</p>
        <p className="font-semibold text-2xl">${totalPrice}</p>
      </Link>
    </div>
  );
};
