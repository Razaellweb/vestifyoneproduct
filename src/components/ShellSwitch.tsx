"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function ShellSwitch({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");
  const isAuth = pathname === "/signin" || pathname === "/signup" || pathname?.startsWith("/reset");

  if (isDashboard || isAuth) {
    // Strip marketing chrome
    return <>{children}</>;
  }

  return (
    <>
      <div className="w-[98%] md:w-[90%] 2xl:w-[80%] mx-auto pt-[2rem]">
        <Navbar />
        {children}
      </div>
      <Footer />
    </>
  );
}
