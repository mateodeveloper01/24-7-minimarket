// 'use client'
import type { Metadata } from "next";

import {
  BottomMenu,
  SearchProduct,
  WhatsappButton,
} from "@/components";

export const metadata: Metadata = {
  title: "Mini market",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const { getProducts } = useProduct();


  return (
    <main className="flex flex-col items-center">
      {/* <SearchProduct products={getProducts.data!} /> */}

      <main className="py-8 flex justify-center w-full">{children}</main>

      <BottomMenu />

      <WhatsappButton />
    </main>
  );
}
