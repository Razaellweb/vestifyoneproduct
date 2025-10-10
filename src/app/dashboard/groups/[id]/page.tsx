"use client";
import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function GroupDetails({ params, searchParams }: { params: { id: string }, searchParams: { created?: string } }) {
  const created = searchParams?.created === "1";
  return (
    <div className="space-y-6">
      <Link href="/dashboard/groups" className="text-sm inline-flex items-center gap-1 opacity-70 hover:opacity-100"><ArrowLeft className="size-4"/> Back</Link>
      {created ? (
        <div className="rounded-xl border p-3 bg-emerald-500/10 text-sm">Group created • Invites sent</div>
      ) : null}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="card p-4">
          <div className="text-sm font-medium">Campus Crew {params.id}</div>
          <div className="text-xs text-muted-foreground">₦10,000 weekly • 7 members</div>
          <button className="mt-3 px-4 py-2 rounded-lg btn-primary text-sm">Contribute now</button>
        </div>
        <div className="card p-4">
          <div className="text-sm font-medium">Cycle progress</div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={[{w:1,p:10},{w:2,p:22},{w:3,p:38},{w:4,p:54}]}> 
                <defs>
                  <linearGradient id={`grad`} x1="0" x2="0" y1="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.6}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="w" stroke="var(--muted)" fontSize={12} tickLine={false} axisLine={false}/>
                <YAxis stroke="var(--muted)" fontSize={12} tickLine={false} axisLine={false}/>
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }} />
                <Area type="monotone" dataKey="p" stroke="#10b981" fillOpacity={1} fill={`url(#grad)`} strokeWidth={2}/>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
