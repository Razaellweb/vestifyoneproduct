import React from "react";
import { ShieldCheck, Home, PiggyBank, Wallet, Landmark, Users, Sparkles, Gift, Settings, ChevronRight, Menu, LogOut, Smartphone, BadgeCheck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cookies } from "next/headers";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div data-dashboard="true" className="min-h-screen grid grid-cols-1 md:grid-cols-[260px_1fr] bg-background text-foreground">
      <DashboardSidebar />
      <div className="flex flex-col min-h-screen">
        <DashboardHeader />
        <main className="p-4 md:p-6 lg:p-8 space-y-6">{children}</main>
      </div>
    </div>
  );
}

function DashboardHeader() {
  return (
    <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-background/60 bg-background/80 border-b">
      <div className="px-4 md:px-6 lg:px-8 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="md:hidden inline-flex items-center justify-center p-2 rounded-lg border hover:bg-accent/30 transition" aria-label="Toggle sidebar">
            <Menu className="size-5" />
          </button>
          <div className="inline-flex items-center gap-2">
            <div className="size-7 rounded-lg bg-gradient-to-br from-emerald-500 to-sky-500 grid place-items-center text-white shadow-md">
              <ShieldCheck className="size-4" />
            </div>
            <span className="font-semibold">Vestify One</span>
            <span className="text-xs text-muted-foreground hidden sm:inline">CBN-compliant • BVN KYC</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg border hover:bg-accent/30 transition">
            <Smartphone className="size-4" /> Install PWA
          </button>
          <button className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border hover:bg-accent/30 transition">
            <LogOut className="size-4" /> Logout
          </button>
        </div>
      </div>
    </header>
  );
}

function NavItem({ href, icon: Icon, label, badge }: { href: string; icon: any; label: string; badge?: string }) {
  const pathname = typeof window !== "undefined" ? window.location.pathname : "";
  const active = pathname.startsWith(href);
  return (
    <Link href={href} className={`group flex items-center justify-between px-3 py-2 rounded-lg border transition ${active ? "bg-primary/10 border-primary/40" : "hover:bg-accent/40"}`}>
      <span className="inline-flex items-center gap-3 text-sm">
        <Icon className="size-4 text-primary" />
        <span>{label}</span>
      </span>
      <span className="inline-flex items-center gap-2">
        {badge ? (
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/20 text-primary border border-primary/30">{badge}</span>
        ) : null}
        <ChevronRight className="size-4 opacity-50 group-hover:opacity-80 transition" />
      </span>
    </Link>
  );
}

function DashboardSidebar() {
  return (
    <aside className="hidden md:flex flex-col gap-2 p-4 border-r bg-sidebar text-sidebar-foreground min-h-screen">
      <Link href="/dashboard" className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border bg-background">
        <div className="size-7 rounded-lg bg-gradient-to-br from-emerald-500 to-sky-500 grid place-items-center text-white shadow-md">
          <ShieldCheck className="size-4" />
        </div>
        <div>
          <div className="text-sm font-semibold">Vestify One</div>
          <div className="text-xs text-muted-foreground">Save • Invest • Borrow</div>
        </div>
      </Link>

      <div className="pt-2 pb-1 text-xs uppercase tracking-wide text-muted-foreground">Overview</div>
      <NavItem href="/dashboard" icon={Home} label="Home" />

      <div className="pt-2 pb-1 text-xs uppercase tracking-wide text-muted-foreground">Money</div>
      <NavItem href="/dashboard/savings" icon={PiggyBank} label="Savings" />
      <NavItem href="/dashboard/invest" icon={Landmark} label="Investments" />
      <NavItem href="/dashboard/loans" icon={Wallet} label="Loans" />
      <NavItem href="/dashboard/groups" icon={Users} label="Ajo/Esusu" />

      <div className="pt-2 pb-1 text-xs uppercase tracking-wide text-muted-foreground">Engage</div>
      <NavItem href="/dashboard/referrals" icon={Gift} label="Referrals" badge="Naira" />
      <NavItem href="/dashboard/settings" icon={Settings} label="Settings" />
      <NavItem href="/dashboard/kyc/bvn" icon={BadgeCheck} label="BVN KYC" />

      <div className="mt-auto text-xs text-muted-foreground">
        <div className="rounded-xl p-3 border bg-background/60">
          <div className="text-xs font-medium">Tip</div>
          <p className="text-[11px] mt-1 leading-relaxed">
            Fund a Growth plan weekly and unlock instant loans up to 80% of your savings.
          </p>
        </div>
      </div>
    </aside>
  );
}
