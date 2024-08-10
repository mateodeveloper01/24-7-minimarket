import type { Metadata } from "next";

import {
  AboutMe,
  BottomMenu,
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


  return (
    <div className="flex flex-col items-center w-full">
{/* className="py-8 flex justify-center w-full" */}

      
      {children}


      <BottomMenu />

      <WhatsappButton />
    </div>
  );
}
