"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import AreaChart from "@/components/charts/Area";

export default function LoanApply() {
  const [amount, setAmount] = useState(100000);
  const [term, setTerm] = useState(3);

  const projection = Array.from({ length: term }, (_, i) => ({ label: `M${i+1}`, value: amount - (amount/term)*(i+1) }));

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
      <Card className="p-5 xl:col-span-2">
        <CardHeader title="Loan application" subtitle="Instant approval if eligible" />
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Input type="number" label="Amount (₦)" value={amount} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setAmount(parseInt(e.target.value||"0"))} />
            <Input type="number" label="Term (months)" value={term} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setTerm(parseInt(e.target.value||"1"))} />
            <label className="flex items-center gap-2 mt-6 text-sm"><input type="checkbox" className="accent-[var(--primary)]"/> I agree to terms</label>
          </div>
          <div className="mt-4">
            <AreaChart id="repay" data={projection} className="w-full" />
            <p className="text-xs text-muted mt-2">Projected outstanding balance</p>
          </div>
          <Button className="mt-4" onClick={()=>window.location.assign("/dashboard/loans/success")}>Submit</Button>
        </CardContent>
      </Card>
      <Card className="p-5">
        <CardHeader title="Summary" subtitle="Before you submit" />
        <CardContent>
          <ul className="text-sm space-y-2">
            <li>• Funds credited to wallet instantly</li>
            <li>• Repayment auto‑debits</li>
            <li>• No penalties for early repayment</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
