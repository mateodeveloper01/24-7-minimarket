import type { Metadata } from "next";

import {
  BottomMenu,
  SearchProduct,
  WhatsappButton,
} from "@/components";

export const metadata: Metadata = {
  title: "Mini market",
};
import { useProduct } from "@/hooks/useProduct";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { getProducts } = useProduct();
  const products = await getProducts();

  return (
    <main className="flex flex-col items-center">
      <SearchProduct products={products} />

      <main className="py-8 flex justify-center w-full">{children}</main>

      <BottomMenu />

      <WhatsappButton />
    </main>
  );
}
