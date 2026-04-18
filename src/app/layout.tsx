import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yeri — Merchant infrastructure, redesigned for mobile.",
  description:
    "Yeri is a mobile-first merchant acceptance and operations platform. Accept payments, run the business, in one place.",
  metadataBase: new URL("https://yeri.app"),
  openGraph: {
    title: "Yeri — Merchant infrastructure, redesigned for mobile.",
    description:
      "Accept payments. Run the business. In one place. Built for the next generation of merchant operations.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-black text-[#f5f5f7] grain">{children}</body>
    </html>
  );
}
