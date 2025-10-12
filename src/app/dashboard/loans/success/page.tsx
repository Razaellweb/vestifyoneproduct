"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import DonutChart from "@/components/charts/Donut";
import Button from "@/components/ui/button";

export default function LoanSuccess() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
      <Card className="p-5 xl:col-span-2 overflow-hidden">
        <div className="p-4 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-black/90">
          <h3 className="text-xl font-semibold">Loan approved 🎉</h3>
          <p className="text-sm">₦100,000 credited to your wallet. Repay over 3 months.</p>
          <div className="mt-3"><Button variant="outline" onClick={()=>window.location.assign("/dashboard")}>Go to Dashboard</Button></div>
        </div>
        <CardHeader title="Repayment plan" subtitle="Auto‑debits monthly" />
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
            {[1,2,3].map(i=> (
              <div key={i} className="p-3 rounded-xl border border-base">
                <p className="text-xs text-muted">Month {i}</p>
                <p className="font-semibold">₦{(100000/3).toFixed(0)}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card className="p-5">
        <CardHeader title="Allocation" subtitle="Interest vs principal" />
        <CardContent>
          <DonutChart data={[{label:"Principal", value: 95},{label:"Interest", value: 5}]} colors={["#22c55e","#60a5fa"]} />
        </CardContent>
      </Card>
    </div>
  );
}
