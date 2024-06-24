"use client";
import Link from "next/link";
import { AlignJustify, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/stores/useCartStore";
import Image from "next/image";
import { useEffect, useState } from "react";
import { categories } from "@/schemas/categories";

import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

export const TopMenu = () => {
  const totalPrice = useCartStore((state) => state.totalPrice);
  const [isScrolled, setIsScrolled] = useState(false); // Estado para el scroll

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 flex justify-center py-2 px-10 bg-background z-50 w-full transition-all duration-300 ${
        isScrolled ? "scrolled" : ""
      }`}
    >
      <div className="flex justify-between w-[900px] items-center ">
        <Link href={"/"}>
          <Image
            src="/favicon.ico"
            alt="Favicon"
            width={isScrolled ? 50 : 100}
            height={isScrolled ? 50 : 100}
            className="mr-2 transition-all duration-300"
          />
        </Link>
        <ul className="hidden gap-2 md:flex">
          {categories.map((item: string) => (
            <Link
              key={item}
              href={`/${item}`}
              className="capitalize text-xl font-semibold hover:underline"
            >
              {item}
            </Link>
          ))}
        </ul>
        <Link href={"/pedido"} className="flex gap-2 max-md:hidden">
          <ShoppingCart />
          <p>${totalPrice}</p>
        </Link>
      </div>

      <Sheet>
        <SheetTrigger className="md:hidden">
          <AlignJustify />
        </SheetTrigger>
        <SheetContent className="flex flex-col">
          <Link
            href={`/`}
            className="text-2xl pb-4 hover:underline uppercase border-b-2 border-black"
          >
            Inicio
          </Link>
          {categories.map((item: string) => (
            <Link
              key={item}
              href={`/${item}`}
              className="text-2xl pb-4 hover:underline uppercase border-b-2 border-black"
            >
              {item}
            </Link>
          ))}
        </SheetContent>
      </Sheet>
    </header>
  );
};
