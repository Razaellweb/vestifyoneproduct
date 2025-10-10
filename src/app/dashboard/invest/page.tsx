"use client";
import React from "react";
import Link from "next/link";
import { Landmark, ArrowRight, ShieldCheck } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const perf = [
  { p: "3m T-bill", r: 12 },
  { p: "6m T-bill", r: 14 },
  { p: "Money Mkt", r: 11 },
  { p: "Agri Note", r: 18 },
];

export default function InvestmentMarketplace() {
  return (
    <div className="space-y-6">
      <div className="card p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold">Marketplace</h3>
          <Link href="/dashboard/invest" className="text-sm inline-flex items-center gap-1 opacity-70 hover:opacity-100">Filters <ArrowRight className="size-4"/></Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {perf.map((it, i) => (
            <Link key={i} href={`/dashboard/invest/details/${i}`} className="rounded-xl border p-4 hover:shadow-lg transition group">
              <div className="inline-flex items-center gap-2 text-sm text-muted-foreground"><Landmark className="size-4"/> Curated • Low risk</div>
              <div className="mt-2 text-lg font-semibold">{it.p}</div>
              <div className="text-xs text-muted-foreground">Est. annual yield</div>
              <div className="text-2xl font-semibold mt-1">{it.r}%</div>
              <div className="text-sm text-primary mt-3 inline-flex items-center gap-1">View details <ArrowRight className="size-4"/></div>
            </Link>
          ))}
        </div>
      </div>

      <div className="card p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold">Recent returns</h3>
        </div>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={perf}>
              <XAxis dataKey="p" stroke="var(--muted)" fontSize={12} tickLine={false} axisLine={false}/>
              <YAxis stroke="var(--muted)" fontSize={12} tickLine={false} axisLine={false}/>
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }} />
              <Bar dataKey="r" fill="#1d4ed8" radius={[6,6,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-xl border p-4 bg-gradient-to-br from-indigo-500/10 to-blue-500/10 inline-flex items-center gap-2 text-sm">
        <ShieldCheck className="size-4"/> Vetted by Vestify • Principal protection on select products.
      </div>
    </div>
  );
}
