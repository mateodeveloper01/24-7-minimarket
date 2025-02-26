"use client";
import Link from "next/link";
import { AlignJustify, Search, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/stores/useCartStore";
import Image from "next/image";
import { useEffect, useState } from "react";
import { categories } from "@/schemas/categories";

import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { usePathname, useRouter } from "next/navigation";

export const TopMenu = () => {
  const totalPrice = useCartStore((state) => state.totalPrice);
  const [isScrolled, setIsScrolled] = useState(false); // Estado para el scroll
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const searchQuery = (event.target as HTMLFormElement).search.value;
    router.push(`/buscador?query=${searchQuery}`);
  };
  return (
    <>
      <header
        className={`sticky top-0 flex justify-center bg-gray-200 p-5 md:px-10  z-50 w-full transition-all duration-300 ${
          isScrolled ? "scrolled" : ""
        }`}
      >
        <div className="flex justify-between md:w-[900px] w-max items-center gap-1">
          <Link href={"/"}>
            <Image
              src="/favicon.ico"
              alt="Favicon"
              width={isScrolled ? 50 : 100}
              height={isScrolled ? 50 : 100}
              className="mr-2 transition-all duration-300 max-md:w-[60px]"
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
          <Sheet>
            <SheetTrigger className="md:hidden py-0" asChild>
              <Button className="bg-secondary">
                <AlignJustify className="text-4xl" />
              </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col justify-between w-[215px]">
              <SheetClose asChild>
                <Link
                  href={`/`}
                  className={`hover:underline uppercase  border-black font-bold ${pathname === "/" && "text-white bg-secondary "} rounded p-2`}
                >
                  Inicio
                </Link>
              </SheetClose>
              {categories.map((item) => (
                <SheetClose asChild key={item}>
                  <Link
                    href={`/${item}`}
                    className={`hover:underline uppercase   border-black font-bold ${pathname.slice(1) === item && "text-white bg-secondary drop-shadow-2xl "} rounded p-2`}
                  >
                    {item.replace(/_/g, " ")}
                  </Link>
                </SheetClose>
              ))}
            </SheetContent>
          </Sheet>
        </div>
      </header>
      <ul className="hidden gap-2 md:flex bg-secondary w-full justify-around ">
        {categories.map((item) => (
          <Link
            key={item}
            href={`/${item}`}
            className={`capitalize text-xl font-semibold hover:bg-primary text-white drop-shadow-lg w-full py-2 text-center flex justify-center items-center ${pathname.slice(1) === item ? "text-white bg-primary drop-shadow-2xl " : ""}`}
          >
            {item.replace(/_/g, " ")}
          </Link>
        ))}
      </ul>
    </>
  );
};
