import { Button } from "@/components";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mini market",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  return (
    <div className=" flex justify-center items-center w-full flex-col">
    <div className="flex justify-between w-full px-10 m-w-[900px] items-center ">
          <Link href={"/"}>
            <Image
              src="/favicon.ico"
              alt="Favicon"
              width={ 100 }
              height={ 100 }
              // className="mr-2 transition-all duration-300"
            />
          </Link>
          <Link href={"/"}><Button  className="bg-gray-500">Volver</Button></Link>
          </div>
      {children}
    </div>
  );
}
