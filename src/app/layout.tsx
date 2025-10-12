import type { Metadata } from "next";
import { DM_Sans, Work_Sans } from "next/font/google";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./globals.css";
import AppShell from "@/components/AppShell";

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const workSans = Work_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Vestify One — Save, Invest, and Borrow for Nigerians",
  description:
    "Vestify One is a mobile‑first fintech for Nigeria: automated savings, curated low‑risk investments, instant collateralized loans (up to 80% of savings), Ajo/Esusu group savings, and seamless payments via Paystack/Flutterwave — with bank‑grade security.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${dmSans.variable} ${workSans.variable} antialiased relative bg-[var(--bg)] text-[var(--fg)] min-h-screen overflow-x-hidden`}
        data-theme="dark"
      >
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
