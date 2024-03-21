import { type ReactNode } from "react";
import Image from "next/image";
import { TopNav } from "@/components/top-nav";
import "@/lib/globals.css";

import { type Metadata } from "next";

const image = `/xmdb-og.png` as const;
const title = "Stream Atlas";
const description = "wip";

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.ico",
  },
  title: title,
  description: description,
  openGraph: {
    images: [image],
    title: title,
    description: description,
    type: "website",
  },
  twitter: {
    images: [image],
    title: title,
    description: description,
    card: "summary_large_image",
  },
};

type RootLayoutProps = Record<"children" | "modal", ReactNode>;

function RootLayout({ children, modal }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="grid min-h-screen w-full grid-rows-[auto,1fr,auto] bg-gradient-to-b from-slate-950 to-slate-900 text-white">
        <TopNav />

        <main className="container mx-auto">{children}</main>
        {modal}
      </body>
    </html>
  );
}

export default RootLayout;
