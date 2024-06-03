"use client";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/stores/useCartStore";
import Image from "next/image";
import { useEffect, useState } from "react";
import { categories } from "@/schemas/categories";

export const TopMenu = () => {
  const totalPrice = useCartStore((state) => state.totalPrice);
  const [iconSize, setIconSize] = useState(100); // Tamaño inicial del ícono

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIconSize(50); // Tamaño reducido del ícono
      } else {
        setIconSize(100); // Tamaño original del ícono
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <header className="sticky top-0 flex justify-center py-2 px-10 bg-background z-50">
      <div className="flex justify-between w-[900px] items-center ">
        <Link href={"/"}>
          <Image
            src="/favicon.ico"
            alt="Favicon"
            width={iconSize}
            height={iconSize}
            className="mr-2 transition-all duration-300"
          />
        </Link>
        <ul className="flex gap-2">
          {categories.map((item:string)=>
          <Link key={item} href={`/${item}`} className="capitalize text-xl font-semibold hover:underline">{item}</Link>
          )}
        </ul>
        <Link href={"/pedido"} className="flex gap-2">
          <ShoppingCart />
          <p>${totalPrice}</p>
        </Link>
      </div>
    </header>
  );
};
