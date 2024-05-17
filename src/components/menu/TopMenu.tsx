import Link from "next/link";
import {
  Button,
  Cart,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components";
import { ShoppingCart } from "lucide-react";

export const TopMenu = async () => {
  return (
    <header className="sticky top-0 flex justify-center py-2 px-10 bg-black z-50">
      <div className="flex justify-between w-[900px] ">
        <Link href={"/"}>24/7 MiniMarket</Link>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex justify-center items-center ">
            <ShoppingCart />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-4/5 py-3">
            <Cart />
            <div className="flex justify-end py-3">
              <Button><Link href={'/pedido'}>Terminar pedido</Link></Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
