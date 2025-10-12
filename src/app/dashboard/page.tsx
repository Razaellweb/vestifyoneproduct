import type { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import AreaChart from "@/components/charts/Area";
import BarChart from "@/components/charts/Bar";
import DonutChart from "@/components/charts/Donut";
import Sparkline from "@/components/charts/Sparkline";
import Progress from "@/components/ui/progress";
import { PiggyBank, CircleDollarSign, Landmark, Rocket, Users } from "lucide-react";
import { fetchDashboard, formatCurrency, mockSavingsHistory } from "@/features/mock";

export default async function DashboardOverview() {
  const data = await fetchDashboard().catch(() => null);

  type Stat = { icon: LucideIcon; label: string; value: string; trend: number[] };
  const stats: Stat[] = [
    { icon: PiggyBank, label: "Saves", value: "+₦9,000", trend:[2,3,3,4,6,7,9] },
    { icon: Rocket, label: "Invest", value: "+₦4,000", trend:[1,2,2,3,3,4,4] },
    { icon: Users, label: "Referrals", value: "+12", trend:[0,1,2,3,4,8,12] },
    { icon: Landmark, label: "Wallet", value: "+₦12,000", trend:[1,1,2,4,6,8,12] },
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
      {/* Wallet + actions */}
      <Card className="p-0 overflow-hidden xl:col-span-2">
        <div className="grid md:grid-cols-2">
          <div className="p-5">
            <CardHeader title="Savings balance" subtitle="Total across plans" />
            <CardContent>
              <p className="text-3xl font-semibold">{formatCurrency(data?.balances.savings || 0)}</p>
              <div className="mt-3 flex items-center gap-3 text-sm text-muted">
                <span className="inline-flex items-center gap-1"><PiggyBank className="w-4 h-4 text-[var(--accent)]"/> Auto‑debits active</span>
                <span className="inline-flex items-center gap-1"><CircleDollarSign className="w-4 h-4 text-[var(--secondary)]"/> Loan limit: {formatCurrency((data?.balances.savings || 0) * 0.8)}</span>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3">
                {[{label:"Add Money"},{label:"Withdraw"},{label:"Create Plan"}].map((a,i)=>(
                  <button key={i} className="px-3 py-2 rounded-xl border border-base hover:bg-white/5 text-sm">{a.label}</button>
                ))}
              </div>
            </CardContent>
          </div>
          <div className="p-5 bg-gradient-to-br from-[color-mix(in_oklab,var(--primary)_30%,transparent)] to-[color-mix(in_oklab,var(--secondary)_20%,transparent)]">
            <AreaChart id="ov-savings" data={mockSavingsHistory} className="w-full" />
            <div className="mt-2 text-xs text-muted">Monthly savings trend</div>
          </div>
        </div>
      </Card>

      {/* Allocation donut */}
      <Card className="p-5">
        <CardHeader title="Allocation" subtitle="Savings • Investments • Wallet" />
        <CardContent>
          <div className="flex items-center gap-4">
            <DonutChart
              data={[{label:"Savings", value: 60},{label:"Invest", value: 25},{label:"Wallet", value: 15}]}
              colors={["#22c55e","#60a5fa","#facc15"]}
              center={<div className="text-center"><p className="text-xs text-muted">Total</p><p className="font-semibold">{formatCurrency((data?.balances.savings||0)+(data?.balances.investments||0)+(data?.balances.wallet||0))}</p></div>}
            />
            <div className="grid gap-2 text-sm">
              <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#22c55e]"/> Savings</div>
              <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#60a5fa]"/> Investments</div>
              <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#facc15]"/> Wallet</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick stats with micro charts */}
      <Card className="p-5 xl:col-span-3">
        <CardHeader title="This week" subtitle="Activity overview" />
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {stats.map((s,i)=>{
                const Icon = s.icon;
                return (
                <div key={i} className="p-4 rounded-xl border border-base bg-[var(--bg)]">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted">{s.label}</p>
                      <p className="font-semibold">{s.value}</p>
                    </div>
                    <Icon className="w-5 h-5 text-[var(--accent)]" />
                  </div>
                  <div className="mt-2">
                    <Sparkline data={s.trend} />
                  </div>
                </div>)}
              )}
          </div>
        </CardContent>
      </Card>

      {/* Activity bar chart */}
      <Card className="p-5 xl:col-span-2">
        <CardHeader title="Recent activity" subtitle="Credits vs debits" />
        <CardContent>
          <BarChart data={[{label:"Mon", value: 4},{label:"Tue", value: 7},{label:"Wed", value: 3},{label:"Thu", value: 6},{label:"Fri", value: 8},{label:"Sat", value: 2},{label:"Sun", value: 5}]} colors={["#22c55e","#60a5fa","#facc15","#1d4ed8","#0f766e","#84cc16","#fb923c"]} className="w-full" />
        </CardContent>
      </Card>

      {/* Progress + transactions */}
      <Card className="p-5">
        <CardHeader title="Goal: New Phone" subtitle="₦600,000 target" />
        <CardContent>
          <Progress value={40} />
          <div className="mt-3 text-sm text-muted">40% complete • Next debit: Fri</div>
          <div className="mt-4 space-y-2 text-sm">
            {(data?.txns || []).map(t => (
              <div key={t.id} className="flex items-center justify-between">
                <span>{t.note}</span>
                <span className={t.type === "credit" ? "text-green-400" : "text-red-400"}>
                  {t.type === "credit" ? "+" : "-"}{formatCurrency(t.amount)}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
