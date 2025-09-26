"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/tabler-icons";

export function ThemeSelector() {
  const [mode, setMode] = useState<string>("dark");
  useEffect(() => {
    const attr = document.body.getAttribute("data-theme") || "dark";
    setMode(attr);
  }, []);
  const toggle = () => {
    const next = mode === "dark" ? "light" : "dark";
    document.body.setAttribute("data-theme", next);
    setMode(next);
  };
  return (
    <Button size="icon" variant="secondary" onClick={toggle} aria-label="Toggle theme">{mode === "dark" ? <Icons.sun /> : <Icons.moon />}</Button>
  );
}
export default ThemeSelector;
