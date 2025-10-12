"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, PiggyBank, Users, Share2, Settings, LogOut, 
  ChevronRight, CircleDollarSign, ShieldCheck, LineChart
} from "lucide-react";
import { useState } from "react";

const nav = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/savings/overview", label: "Savings", icon: PiggyBank },
  { href: "/dashboard/loans/eligibility", label: "Loans", icon: CircleDollarSign },
  { href: "/dashboard/groups/overview", label: "Groups", icon: Users },
  { href: "/dashboard/referrals/overview", label: "Referrals", icon: Share2 },
  { href: "/dashboard/settings/profile", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <aside className="h-full">
      {/* Mobile trigger */}
      <button
        className="md:hidden fixed left-4 top-4 z-50 px-3 py-2 rounded-full btn-primary shadow"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Overlay */}
      {open && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:static z-50 left-0 top-0 h-full md:h-auto w-[80%] max-w-72 md:w-72 bg-[var(--card)] border-r border-base transform transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="p-4 border-b border-base flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[var(--primary)] to-[var(--secondary)]" />
          <div>
            <p className="text-sm text-muted">Vestify One</p>
            <p className="font-semibold">Dashboard</p>
          </div>
        </div>
        <nav className="p-3 space-y-1">
          {nav.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href || pathname?.startsWith(item.href + "/");
            return (
              <Link
                href={item.href}
                key={item.href}
                onClick={() => setOpen(false)}
                className={`group flex items-center gap-3 px-3 py-2 rounded-xl transition-all ${
                  active ? "bg-white/5 border border-base" : "hover:bg-white/5"
                }`}
              >
                <Icon className="w-5 h-5 text-[var(--accent)]" />
                <span>{item.label}</span>
                <LineChart className="w-4 h-4 ml-auto opacity-50 group-hover:opacity-100 transition-opacity" />
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto p-3 border-t border-base">
          <div className="p-3 rounded-xl bg-gradient-to-br from-[color-mix(in_oklab,var(--primary)_50%,transparent)] to-[color-mix(in_oklab,var(--secondary)_40%,transparent)]">
            <div className="flex items-center gap-2 text-xs text-muted">
              <ShieldCheck className="w-4 h-4 text-[var(--accent)]" />
              <span>CBN-compliant KYC</span>
            </div>
            <p className="text-sm mt-2">Secure your account with BVN</p>
            <Link href="/onboarding/bvn" className="mt-2 inline-flex px-3 py-1 rounded-full btn-primary text-xs">
              Verify BVN
            </Link>
          </div>
          <button className="mt-3 w-full flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-white/5">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </div>
    </aside>
  );
}
