"use client";
import React, { useMemo } from "react";
import { PiggyBank, Landmark, Wallet, Users, Plus, ArrowRight, Sparkles, LineChart } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import Link from "next/link";

const savingsData = [
  { month: "Jan", amount: 40 },
  { month: "Feb", amount: 54 },
  { month: "Mar", amount: 63 },
  { month: "Apr", amount: 74 },
  { month: "May", amount: 90 },
  { month: "Jun", amount: 102 },
];

const investData = [
  { name: "T-Bills", value: 45 },
  { name: "Money Mkt", value: 30 },
  { name: "Agri Notes", value: 25 },
];

const colors = ["#10b981", "#1d4ed8", "#f59e0b", "#14b8a6", "#a855f7"]; // brandy

export default function DashboardHome() {
  const totalBalance = 420_500;
  const loanLimit = Math.round(totalBalance * 0.8);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard icon={PiggyBank} label="Savings" value={"₦" + (totalBalance).toLocaleString()} href="/dashboard/savings" gradient="from-emerald-500 to-sky-500" />
        <StatCard icon={Landmark} label="Investments" value="₦215,000" href="/dashboard/invest" gradient="from-indigo-500 to-blue-500" />
        <StatCard icon={Wallet} label="Loan limit" value={"₦" + loanLimit.toLocaleString()} href="/dashboard/loans" gradient="from-amber-500 to-orange-500" />
        <StatCard icon={Users} label="Groups" value="2 active" href="/dashboard/groups" gradient="from-fuchsia-500 to-pink-500" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="card p-4 xl:col-span-2">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">Savings growth</h3>
            <Link href="/dashboard/savings" className="text-sm inline-flex items-center gap-1 opacity-70 hover:opacity-100">View <ArrowRight className="size-4"/></Link>
          </div>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={savingsData}>
                <defs>
                  <linearGradient id="gradSavings" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="var(--muted)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }} />
                <Area type="monotone" dataKey="amount" stroke="#10b981" fillOpacity={1} fill="url(#gradSavings)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">Portfolio allocation</h3>
            <Link href="/dashboard/invest" className="text-sm inline-flex items-center gap-1 opacity-70 hover:opacity-100">Manage <ArrowRight className="size-4"/></Link>
          </div>
          <div className="h-52 grid place-items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={investData} dataKey="value" nameKey="name" innerRadius={45} outerRadius={72}>
                  {investData.map((_, i) => (
                    <Cell key={i} fill={colors[i % colors.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="card p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">Investment returns (last 6m)</h3>
            <Link href="/dashboard/invest" className="text-sm inline-flex items-center gap-1 opacity-70 hover:opacity-100">Explore <ArrowRight className="size-4"/></Link>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[{m:"Jan",v:8},{m:"Feb",v:11},{m:"Mar",v:10},{m:"Apr",v:13},{m:"May",v:12},{m:"Jun",v:14}]}> 
                <XAxis dataKey="m" stroke="var(--muted)" fontSize={12} tickLine={false} axisLine={false}/>
                <YAxis stroke="var(--muted)" fontSize={12} tickLine={false} axisLine={false}/>
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }} />
                <Bar dataKey="v" fill="#1d4ed8" radius={[6,6,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">Ajo cycle progress</h3>
            <Link href="/dashboard/groups" className="text-sm inline-flex items-center gap-1 opacity-70 hover:opacity-100">Open <ArrowRight className="size-4"/></Link>
          </div>
          <div className="h-56 grid place-items-center">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={[{w:1,p:10},{w:2,p:22},{w:3,p:38},{w:4,p:54},{w:5,p:70},{w:6,p:85}]}> 
                <defs>
                  <linearGradient id="gradAjo" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.6}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="w" stroke="var(--muted)" fontSize={12} tickLine={false} axisLine={false}/>
                <YAxis stroke="var(--muted)" fontSize={12} tickLine={false} axisLine={false}/>
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }} />
                <Area type="monotone" dataKey="p" stroke="#f59e0b" fillOpacity={1} fill="url(#gradAjo)" strokeWidth={2}/>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ActionCard href="/dashboard/savings/setup" title="Start Saving" subtitle="Automate deposits from your card or bank" icon={Plus} gradient="from-emerald-500 to-teal-500" />
        <ActionCard href="/dashboard/invest" title="Explore Investments" subtitle="Curated low-risk products" icon={Sparkles} gradient="from-indigo-500 to-blue-500" />
        <ActionCard href="/dashboard/loans/apply" title="Apply for Loan" subtitle="Instant approval up to 80% savings" icon={Wallet} gradient="from-amber-500 to-orange-500" />
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, href, gradient }: { icon: any; label: string; value: string; href: string; gradient: string }) {
  return (
    <Link href={href} className="group relative overflow-hidden card p-4 transition hover:translate-y-[-2px]">
      <div className={`absolute -top-6 -right-10 size-24 rounded-full bg-gradient-to-br ${gradient} opacity-30 blur-2xl`} />
      <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
        <Icon className="size-4 text-primary" /> {label}
      </div>
      <div className="text-2xl font-semibold mt-2">{value}</div>
      <div className="text-xs mt-1 opacity-70">Tap to manage</div>
    </Link>
  );
}

function ActionCard({ href, title, subtitle, icon: Icon, gradient }: { href: string; title: string; subtitle: string; icon: any; gradient: string }) {
  return (
    <Link href={href} className="relative overflow-hidden rounded-xl border bg-background p-4 transition hover:translate-y-[-2px] hover:shadow-lg">
      <div className={`absolute -top-6 -right-6 size-24 rounded-full bg-gradient-to-br ${gradient} opacity-30 blur-2xl`} />
      <div className="inline-flex items-center gap-2 text-sm">
        <Icon className="size-4" />
        <span className="font-medium">{title}</span>
      </div>
      <div className="text-xs text-muted-foreground mt-1">{subtitle}</div>
      <div className="mt-3 inline-flex items-center gap-1 text-primary text-sm">Proceed <ArrowRight className="size-4"/></div>
    </Link>
  );
}
