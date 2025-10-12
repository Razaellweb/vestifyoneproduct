"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import BarChart from "@/components/charts/Bar";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import { fetchLoanEligibility, formatCurrency } from "@/features/mock";

export default function LoanEligibility() {
  const [savings, setSavings] = useState(420500);
  const [elig, setElig] = useState<{eligible:boolean; max:number}>({eligible:false, max:0});

  useEffect(() => { fetchLoanEligibility(savings).then(setElig); }, [savings]);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
      <Card className="p-5 xl:col-span-2">
        <CardHeader title="Eligibility" subtitle="Up to 80% of savings" />
        <CardContent>
          <BarChart data={[{label:"Savings", value: savings},{label:"Max Loan", value: elig.max}]} colors={["#60a5fa","#22c55e"]} className="w-full" />
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
            <Input type="number" label="Current savings (₦)" value={savings} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setSavings(parseInt(e.target.value||"0"))} />
            <div className="p-3 rounded-xl border border-base">
              <p className="text-xs text-muted">Eligible</p>
              <p className={`font-semibold ${elig.eligible?"text-green-400":"text-red-400"}`}>{elig.eligible? "Yes":"No"}</p>
            </div>
            <div className="p-3 rounded-xl border border-base">
              <p className="text-xs text-muted">Max amount</p>
              <p className="font-semibold">{formatCurrency(elig.max)}</p>
            </div>
          </div>
          <Button className="mt-4" disabled={!elig.eligible} onClick={()=>window.location.assign("/dashboard/loans/apply")}>
            Continue to Apply
          </Button>
        </CardContent>
      </Card>
      <Card className="p-5">
        <CardHeader title="Tips" subtitle="Improve eligibility" />
        <CardContent>
          <ul className="text-sm space-y-2">
            <li>• Increase your savings balance</li>
            <li>• Keep auto‑debits active</li>
            <li>• Complete BVN verification</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
