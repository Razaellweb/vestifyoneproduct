import React from "react";

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
}

export default function Select({ label, children, className = "", ...props }: Props) {
  return (
    <label className="block">
      {label && <span className="text-sm text-muted">{label}</span>}
      <select
        {...props}
        className={`mt-1 w-full px-3 py-2 rounded-xl bg-[var(--bg)] border border-base focus:outline-none focus:ring-2 focus:ring-[var(--ring)] ${className}`}
      >
        {children}
      </select>
    </label>
  );
}
