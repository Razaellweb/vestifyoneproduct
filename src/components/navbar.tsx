"use client";

import { Bars3BottomRightIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { HiOutlineX } from "react-icons/hi";
import Link from "next/link";
import { Moon, Sun } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const stored = (typeof window !== "undefined" && localStorage.getItem("theme")) as
      | "light"
      | "dark"
      | null;
    const initial = stored ?? "dark";
    setTheme(initial);
    if (typeof document !== "undefined") {
      document.body.setAttribute("data-theme", initial);
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    if (typeof document !== "undefined") {
      document.body.setAttribute("data-theme", next);
    }
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", next);
    }
  };

  const links = [
    { href: "#features", label: "Features" },
    { href: "#pricing", label: "Pricing" },
    { href: "#testimonials", label: "Stories" },
    { href: "#faq", label: "FAQ" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <>
      {/* Desktop Navbar */}
      <div className="hidden xl:block">
        <section className="w-full bg-[var(--card)] border border-base rounded-full flex items-center justify-between px-6 py-3">
          {/* Logo */}
          <div className="left-0 flex gap-2 items-center">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[var(--primary)] to-[var(--secondary)]" />
            <h1 className="text-2xl font-semibold tracking-tight">Vestify One</h1>
          </div>

          {/* Nav Links */}
          <nav className="flex items-center">
            {links.map((link) => (
              <h1
                key={link.href}
                className={`text-base px-4 py-2 rounded-full cursor-pointer transition-colors hover:bg-white/5`}
              >
                <a href={link.href}>{link.label}</a>
              </h1>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              aria-label="Toggle theme"
              onClick={toggleTheme}
              className="p-2 rounded-full border border-base hover:bg-white/5"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
            <h1 className="text-base cursor-pointer hidden md:block">
              <Link href="/signup">Sign Up</Link>
            </h1>
            <Link href="/signup" className="px-6 py-2 rounded-full btn-primary text-sm md:text-base">
              Start Saving
            </Link>
          </div>
        </section>
      </div>

      {/* Mobile & Tablet Navbar */}
      <div className="xl:hidden w-[97%] mx-auto bg-[var(--card)] border border-base px-6 py-3 flex justify-between items-center rounded-full">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[var(--primary)] to-[var(--secondary)]" />
          <h1 className="text-lg font-semibold">Vestify One</h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            aria-label="Toggle theme"
            onClick={toggleTheme}
            className="p-2 rounded-full border border-base hover:bg-white/5"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
          <button
            onClick={() => setMenuOpen(true)}
            className="text-black text-3xl z-[100] px-3 py-2 rounded-full btn-primary"
            aria-label="Open menu"
          >
            <Bars3BottomRightIcon className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 bg-black/50 z-40"
        />
      )}

      {/* Sidebar Menu */}
      <div
        className={`fixed top-0 z-[1000] right-0 h-full w-64 bg-[var(--card)] text-[var(--fg)] px-6 py-6 transform transition-transform duration-300 ease-in-out border-l border-base ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={() => setMenuOpen(false)}
          className="text-white text-3xl mb-6"
          aria-label="Close menu"
        >
          <HiOutlineX />
        </button>

        {/* Menu Items */}
        <div className="flex flex-col gap-3">
          {links.map((link) => (
            <h1 key={link.href} className={`text-base cursor-pointer px-3 py-2 rounded-full hover:bg-white/5`}>
              <a href={link.href} onClick={() => setMenuOpen(false)}>{link.label}</a>
            </h1>
          ))}

          <hr className="border-base my-4" />
          <h1 className="text-base cursor-pointer">
            <Link href="/signup" onClick={() => setMenuOpen(false)}>Sign Up</Link>
          </h1>
          <Link href="/signup" className="w-full text-center py-3 rounded-full btn-primary text-base" onClick={() => setMenuOpen(false)}>
            Start Saving
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
