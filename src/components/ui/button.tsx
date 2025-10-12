"use client";
import React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "outline";
}

export default function Button({ variant = "primary", className = "", ...props }: Props) {
  const base = "px-4 py-2 rounded-xl text-sm transition-colors";
  const variants = {
    primary: "btn-primary",
    ghost: "btn-ghost",
    outline: "border border-base hover:bg-white/5",
  } as const;
  return <button className={`${base} ${variants[variant]} ${className}`} {...props} />;
}
