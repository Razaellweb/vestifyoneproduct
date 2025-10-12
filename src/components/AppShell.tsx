"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard") || pathname?.startsWith("/admin");
  const isAuth = pathname === "/signup" || pathname === "/signin" || pathname?.startsWith("/password-reset") || pathname?.startsWith("/onboarding");

  if (isDashboard || isAuth) {
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
