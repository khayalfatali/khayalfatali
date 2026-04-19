import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yeri — Run your entire business from your phone.",
  description:
    "Yeri is a mobile-first merchant platform. Accept payments with Tap to Pay on iPhone, manage your business, and grow — all in one app. Built for Azerbaijan and beyond.",
  metadataBase: new URL("https://yeri.app"),
  openGraph: {
    title: "Yeri — Run your entire business from your phone.",
    description:
      "Accept payments with Tap to Pay on iPhone. Run your business. All in one app.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${instrumentSerif.variable} h-full antialiased`}>
      <body className="min-h-full bg-black text-[#f5f5f7]">{children}</body>
    </html>
  );
}
