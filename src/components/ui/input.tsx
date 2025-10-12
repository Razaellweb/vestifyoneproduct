import React from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export default function Input({ label, error, hint, className = "", ...props }: Props) {
  return (
    <label className="block">
      {label && <span className="text-sm text-muted">{label}</span>}
      <input
        {...props}
        className={`mt-1 w-full px-3 py-2 rounded-xl bg-[var(--bg)] border border-base focus:outline-none focus:ring-2 focus:ring-[var(--ring)] ${className}`}
      />
      {hint && !error && <p className="text-xs text-muted mt-1">{hint}</p>}
      {error && <p className="text-xs text-[tomato] mt-1">{error}</p>}
    </label>
  );
}
