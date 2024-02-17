import AppContainer from "@/components/AppContainer";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stream Atlas",
  description: "Stream Atlas - WIP",
};

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster richColors position="top-center" />
        <AppContainer>{children}</AppContainer>
      </body>
    </html>
  );
}
