import Link from "next/link";
import {
  Cart,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components";
import { ShoppingCart } from "lucide-react";

export const TopMenu = () => {
  return (
    <header className="sticky top-0 flex justify-center py-2 px-10 bg-black z-50">
      <div className="flex justify-between w-[900px]">
        <Link href={"/"}>24/7 MiniMarket</Link>
        {/* <Link href={"/"} className="flex justify-center items-center "><ShoppingCart /></Link> */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex justify-center items-center ">
            <ShoppingCart />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-4/5 py-3">
            <Cart/>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
