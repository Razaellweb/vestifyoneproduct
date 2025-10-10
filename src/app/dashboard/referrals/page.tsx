"use client";
import React from "react";
import { Gift, Copy, ArrowRight } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function ReferralsPage() {
  const code = "VEST-9JA";
  function copy() { navigator.clipboard?.writeText(code); }
  return (
    <div className="space-y-6">
      <div className="card p-4 flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground"><Gift className="size-4"/> Your referral code</div>
          <div className="text-2xl font-semibold mt-1">{code}</div>
          <div className="text-xs text-muted-foreground mt-1">Share with friends and earn</div>
        </div>
        <button onClick={copy} className="px-4 py-2 rounded-lg btn-primary text-sm inline-flex items-center gap-2"><Copy className="size-4"/> Copy</button>
      </div>

      <div className="card p-4">
        <div className="text-sm font-medium mb-2">Rewards (last 6 referrals)</div>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={[{n:"Ada",r:1500},{n:"Chidi",r:1000},{n:"Bola",r:800},{n:"Uche",r:600},{n:"Ife",r:400},{n:"Hauwa",r:300}]}> 
              <XAxis dataKey="n" stroke="var(--muted)" fontSize={12} tickLine={false} axisLine={false}/>
              <YAxis stroke="var(--muted)" fontSize={12} tickLine={false} axisLine={false}/>
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }} />
              <Bar dataKey="r" fill="#10b981" radius={[6,6,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-xl border p-4 bg-gradient-to-br from-emerald-500/10 to-sky-500/10 text-sm">
        Pro tip: Earn more when your friends set up their first savings.
      </div>
    </div>
  );
}
