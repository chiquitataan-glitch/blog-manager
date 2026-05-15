import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { PageTransition } from "@/components/layout/page-transition";
import { siteConfig } from "@/data/site";
import "./globals.css";

export const metadata: Metadata = {
  title: "清9半斛 / 赵春昊 · 99blog",
  description: siteConfig.description,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="min-h-full bg-[#fffaf7] text-stone-900">
        <Navbar />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
