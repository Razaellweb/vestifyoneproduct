"use client";
import React from "react";
import Link from "next/link";
import { Users, ArrowRight } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function GroupsDashboard() {
  return (
    <div className="space-y-6">
      <div className="card p-4 flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground"><Users className="size-4"/> Ajo circles</div>
          <div className="text-2xl font-semibold mt-1">2 active</div>
          <div className="text-xs text-muted-foreground mt-1">Weekly contributions</div>
        </div>
        <Link href="/dashboard/groups/create" className="px-4 py-2 rounded-lg btn-primary text-sm">Create/Join</Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1,2].map((id)=> (
          <Link key={id} href={`/dashboard/groups/${id}`} className="rounded-xl border p-4 hover:shadow-lg transition group">
            <div className="text-sm font-medium">Campus Crew {id}</div>
            <div className="text-xs text-muted-foreground">₦10,000 weekly • 7 members</div>
            <div className="h-36 mt-3">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={[{w:1,p:10},{w:2,p:22},{w:3,p:38},{w:4,p:54}]}> 
                  <defs>
                    <linearGradient id={`grad${id}`} x1="0" x2="0" y1="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.6}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="w" stroke="var(--muted)" fontSize={12} tickLine={false} axisLine={false}/>
                  <YAxis stroke="var(--muted)" fontSize={12} tickLine={false} axisLine={false}/>
                  <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }} />
                  <Area type="monotone" dataKey="p" stroke="#10b981" fillOpacity={1} fill={`url(#grad${id})`} strokeWidth={2}/>
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="text-sm text-primary mt-2 inline-flex items-center gap-1">Open group <ArrowRight className="size-4"/></div>
          </Link>
        ))}
      </div>
    </div>
  );
}
