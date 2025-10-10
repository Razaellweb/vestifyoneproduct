"use client";
import React from "react";
import Link from "next/link";
import { PiggyBank, ArrowRight } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { d: "Mon", v: 2 },
  { d: "Tue", v: 3 },
  { d: "Wed", v: 1.5 },
  { d: "Thu", v: 2.2 },
  { d: "Fri", v: 3.4 },
  { d: "Sat", v: 2.9 },
  { d: "Sun", v: 2.2 },
];

export default function SavingsPage() {
  return (
    <div className="space-y-6">
      <div className="card p-4 flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground"><PiggyBank className="size-4"/> Automated savings</div>
          <div className="text-2xl font-semibold mt-1">₦420,500</div>
          <div className="text-xs text-muted-foreground mt-1">Weekly • Debit card</div>
        </div>
        <Link href="/dashboard/savings/setup" className="px-4 py-2 rounded-lg btn-primary text-sm">Edit plan</Link>
      </div>

      <div className="card p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold">Last 7 days</h3>
          <Link href="#" className="text-sm inline-flex items-center gap-1 opacity-70 hover:opacity-100">Export <ArrowRight className="size-4"/></Link>
        </div>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="d" stroke="var(--muted)" fontSize={12} tickLine={false} axisLine={false}/>
              <YAxis stroke="var(--muted)" fontSize={12} tickLine={false} axisLine={false}/>
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }} />
              <Line type="monotone" dataKey="v" stroke="#10b981" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl border p-4">
          <div className="text-sm font-medium">Next debit</div>
          <div className="text-2xl font-semibold mt-1">₦5,000</div>
          <div className="text-xs text-muted-foreground mt-1">Fri, 10:00 AM</div>
        </div>
        <div className="rounded-xl border p-4">
          <div className="text-sm font-medium">Loan limit</div>
          <div className="text-2xl font-semibold mt-1">₦336,400</div>
          <div className="text-xs text-muted-foreground mt-1">Based on savings</div>
        </div>
      </div>

      <div className="rounded-xl border p-4 bg-gradient-to-br from-emerald-500/10 to-sky-500/10">
        <div className="text-sm font-medium">Tip</div>
        <div className="text-sm text-muted-foreground">Increase your weekly amount to unlock a higher loan limit.</div>
      </div>
    </div>
  );
}
