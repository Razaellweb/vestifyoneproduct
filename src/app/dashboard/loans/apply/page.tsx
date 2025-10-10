"use client";
import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function LoanApply() {
  const [amount, setAmount] = useState(50000);
  const [term, setTerm] = useState(3);
  const [error, setError] = useState<string | null>(null);
  const savings = 420500;
  const max = Math.floor(savings * 0.8);

  function onSubmit() {
    if (amount <= 0) return setError("Enter a valid amount");
    if (amount > max) return setError(`Amount exceeds 80% of savings (₦${max.toLocaleString()})`);
    window.location.href = `/dashboard/loans/success?amount=${amount}&term=${term}`;
  }

  return (
    <div className="space-y-6">
      <Link href="/dashboard/loans" className="text-sm inline-flex items-center gap-1 opacity-70 hover:opacity-100"><ArrowLeft className="size-4"/> Back</Link>
      <div className="card p-4 max-w-md">
        <div className="text-sm text-muted-foreground">Loan request</div>
        <div className="mt-2 grid grid-cols-1 gap-3">
          <label className="text-sm">Amount (₦)
            <input type="number" value={amount} onChange={(e)=>setAmount(parseInt(e.target.value||"0"))} className="mt-1 w-full px-3 py-2 rounded-lg border bg-background" />
          </label>
          <label className="text-sm">Term (months)
            <select value={term} onChange={(e)=>setTerm(parseInt(e.target.value))} className="mt-1 w-full px-3 py-2 rounded-lg border bg-background">
              {[3,6,9,12].map((t)=> <option key={t} value={t}>{t}</option>)}
            </select>
          </label>
          {error ? <div className="text-xs text-red-500">{error}</div> : null}
          <button onClick={onSubmit} className="px-4 py-2 rounded-lg btn-primary text-sm w-full">Confirm</button>
        </div>
        <div className="mt-3 text-xs text-muted-foreground">Max eligible: ₦{max.toLocaleString()}</div>
      </div>
    </div>
  );
}
