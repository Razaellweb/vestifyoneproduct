"use client";
import { Bell, PlusCircle, QrCode, WalletMinimal } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-[color-mix(in_oklab,var(--bg)_70%,transparent)] bg-[var(--bg)]/70 border-b border-base">
      <div className="px-4 md:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[var(--primary)] to-[var(--secondary)]" />
          <div>
            <p className="text-xs text-muted">Welcome back</p>
            <p className="font-semibold">Vestify One</p>
          </div>
        </div>
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-1 sm:gap-2 justify-end">
          <button className="hidden sm:flex px-3 py-2 rounded-xl border border-base hover:bg-white/5 items-center gap-2 text-sm whitespace-nowrap"><QrCode className="w-4 h-4"/> <span className="hidden sm:inline">Pay</span></button>
          <button className="px-3 py-2 rounded-xl btn-primary flex items-center gap-2 text-sm whitespace-nowrap"><PlusCircle className="w-4 h-4"/> <span className="hidden sm:inline">Add Money</span></button>
          <button className="p-2 rounded-xl border border-base hover:bg-white/5" aria-label="notifications"><Bell className="w-5 h-5"/></button>
          <div className="w-8 h-8 rounded-full bg-[var(--card)] border border-base grid place-items-center"><WalletMinimal className="w-4 h-4"/></div>
        </div>
      </div>
    </header>
  );
}
