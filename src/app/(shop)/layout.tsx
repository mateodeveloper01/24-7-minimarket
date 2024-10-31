import type { Metadata } from "next";

import { AboutMe, TopMenu } from "@/components";

export const metadata: Metadata = {
  title: "Mini market",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TopMenu />
      {children}
      <AboutMe />
    </>
  );
}
