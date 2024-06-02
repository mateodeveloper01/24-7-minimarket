import { Button, Cart } from "@/components";
import Link from "next/link";

export default function pedido() {
  return (
    <div className="flex flex-col gap-4 md:w-3/5">
      <Cart />
      <div className="px-4 flex justify-end">
        <Link href={"/confirmacion"}>
          <Button>Confirmar pedido</Button>
        </Link>
      </div>
    </div>
  );
}
