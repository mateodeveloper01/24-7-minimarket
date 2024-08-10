"use client";
import Link from "next/link";
import { AlignJustify, Search, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/stores/useCartStore";
import Image from "next/image";
import { useEffect, useState } from "react";
import { categories } from "@/schemas/categories";

import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";

export const TopMenu = () => {
  const totalPrice = useCartStore((state) => state.totalPrice);
  const [isScrolled, setIsScrolled] = useState(false); // Estado para el scroll
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSearch = async (event: any) => {
    event.preventDefault();
    const searchQuery = event.target.elements.search.value;
    router.push(`/buscador?query=${searchQuery}`);
  };

  return (
    <>
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

          {/* <Link href={"/buscador"} className=""> */}
          <form
            onSubmit={handleSearch}
            className="w-3/5 only:flex gap-2 rounded-md border border-input px-2 flex"
          >
            <Input
              className="border-none "
              placeholder="Buscar"
              name="search"
              // onChange={handleChange}
            />
            <button type="submit">
              <Search />
            </button>
          </form>
          {/* </Link> */}
          <Link href={"/pedido"}>
            <Button className="flex gap-2 max-md:hidden  bg-primary hover:bg-black">
              <ShoppingCart />
              <p>${totalPrice}</p>
            </Button>
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
                {item.replace(/_/g," ")}
              </Link>
            ))}
          </SheetContent>
        </Sheet>
      </header>
      <ul className="hidden gap-2 md:flex bg-secondary w-full justify-around ">
        {categories.map((item: string) => (
          <Link
            key={item}
            href={`/${item}`}
            className="capitalize text-xl font-semibold hover:bg-primary text-white drop-shadow-lg w-full py-2 text-center flex justify-center items-center"
          >
            {item.replace(/_/g," ")}
          </Link>
        ))}
      </ul>
    </>
  );
};
