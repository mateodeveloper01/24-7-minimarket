"use client";
// import type { Metadata } from "next";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster, TopMenu, WhatsappButton } from "@/components";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// export const metadata: Metadata = {
//   title: "Mini market",
// };
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();

  return (
    <html lang="es">
      <body className="flex flex-col items-center">
        <TopMenu />

        <main className="py-8 flex justify-center w-full">
          <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </main>

        <Toaster />
        <footer className="text-center leading-[4rem] opacity-70">
          © {new Date().getFullYear()} mateo_developments
        </footer>
      </body>
    </html>
  );
}
