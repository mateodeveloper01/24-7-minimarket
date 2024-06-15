import type { Metadata } from "next";

import {  Toaster, TopMenu, WhatsappButton } from "@/components";

export const metadata: Metadata = {
  title: "Mini market",
};
import "./globals.css";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body className="flex flex-col items-center">
        <TopMenu />

        <main className="py-8 flex justify-center w-full">{children}</main>
        <Toaster />
        <footer className="text-center leading-[4rem] opacity-70">
          © {new Date().getFullYear()} mateo_developments
        </footer>
      </body>
    </html>
  );
}
