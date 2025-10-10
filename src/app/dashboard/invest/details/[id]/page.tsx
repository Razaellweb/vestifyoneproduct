"use client";
import React from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ["#10b981", "#1d4ed8", "#f59e0b"];

export default function InvestmentDetails({ params }: { params: { id: string } }) {
  const id = params.id;
  return (
    <div className="space-y-6">
      <Link href="/dashboard/invest" className="text-sm inline-flex items-center gap-1 opacity-70 hover:opacity-100"><ArrowLeft className="size-4"/> Back</Link>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="card p-4">
          <div className="text-sm text-muted-foreground">Product</div>
          <div className="text-2xl font-semibold mt-1">3-month Treasury Bill</div>
          <ul className="mt-3 space-y-2 text-sm">
            <li className="inline-flex items-center gap-2"><CheckCircle2 className="size-4 text-emerald-500"/> Low risk • Govt-backed</li>
            <li className="inline-flex items-center gap-2"><CheckCircle2 className="size-4 text-emerald-500"/> Liquidity: Medium</li>
            <li className="inline-flex items-center gap-2"><CheckCircle2 className="size-4 text-emerald-500"/> Min: ₦5,000</li>
          </ul>
          <Link href={`/dashboard/invest/confirm/${id}`} className="mt-4 inline-flex px-4 py-2 rounded-lg btn-primary text-sm">Invest now</Link>
        </div>
        <div className="card p-4">
          <div className="text-sm font-medium">Risk/Return profile</div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={[{n:"Risk",v:30},{n:"Return",v:60},{n:"Liquidity",v:10}]} dataKey="v" nameKey="n" innerRadius={45} outerRadius={72}>
                  {[0,1,2].map((i)=> <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
