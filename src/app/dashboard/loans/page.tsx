"use client";
import React from "react";
import Link from "next/link";
import { Wallet, ArrowRight } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const limits = [{m:"Jan",v:120},{m:"Feb",v:150},{m:"Mar",v:168},{m:"Apr",v:210},{m:"May",v:265},{m:"Jun",v:336}];

export default function LoansDashboard() {
  return (
    <div className="space-y-6">
      <div className="card p-4 flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground"><Wallet className="size-4"/> Loan limit</div>
          <div className="text-2xl font-semibold mt-1">₦336,400</div>
          <div className="text-xs text-muted-foreground mt-1">Based on your savings</div>
        </div>
        <Link href="/dashboard/loans/apply" className="px-4 py-2 rounded-lg btn-primary text-sm">Apply for loan</Link>
      </div>

      <div className="card p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold">Loan limit growth</h3>
          <Link href="#" className="text-sm inline-flex items-center gap-1 opacity-70 hover:opacity-100">Details <ArrowRight className="size-4"/></Link>
        </div>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={limits}>
              <defs>
                <linearGradient id="gradLimit" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.6}/>
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="m" stroke="var(--muted)" fontSize={12} tickLine={false} axisLine={false}/>
              <YAxis stroke="var(--muted)" fontSize={12} tickLine={false} axisLine={false}/>
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }} />
              <Area type="monotone" dataKey="v" stroke="#f59e0b" fillOpacity={1} fill="url(#gradLimit)" strokeWidth={2}/>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
