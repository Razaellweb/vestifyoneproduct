"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function SavingsSetup() {
  const [amount, setAmount] = useState(5000);
  const [freq, setFreq] = useState("Weekly");
  const [source, setSource] = useState("Card");
  const [date, setDate] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  function onNext() {
    if (amount <= 0) return setError("Enter a valid amount");
    if (!date) return setError("Pick a start date");
    window.location.href = `/dashboard/savings/payment?amount=${amount}&freq=${freq}&source=${source}`;
  }

  return (
    <div className="space-y-6">
      <Link href="/dashboard/savings" className="text-sm inline-flex items-center gap-1 opacity-70 hover:opacity-100"><ArrowLeft className="size-4"/> Back</Link>
      <div className="card p-4 max-w-md">
        <div className="text-sm text-muted-foreground">Setup automated savings</div>
        <div className="grid gap-3 mt-2">
          <label className="text-sm">Amount (₦)
            <input type="number" value={amount} onChange={(e)=>setAmount(parseInt(e.target.value||"0"))} className="mt-1 w-full px-3 py-2 rounded-lg border bg-background" />
          </label>
          <label className="text-sm">Frequency
            <select value={freq} onChange={(e)=>setFreq(e.target.value)} className="mt-1 w-full px-3 py-2 rounded-lg border bg-background">
              {['Daily','Weekly','Monthly'].map((f)=> <option key={f} value={f}>{f}</option>)}
            </select>
          </label>
          <label className="text-sm">Source
            <select value={source} onChange={(e)=>setSource(e.target.value)} className="mt-1 w-full px-3 py-2 rounded-lg border bg-background">
              {['Card','Bank account'].map((s)=> <option key={s} value={s}>{s}</option>)}
            </select>
          </label>
          <label className="text-sm">Start date
            <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} className="mt-1 w-full px-3 py-2 rounded-lg border bg-background" />
          </label>
          {error ? <div className="text-xs text-red-500">{error}</div> : null}
          <button onClick={onNext} className="px-4 py-2 rounded-lg btn-primary text-sm w-full">Continue to payment</button>
        </div>
      </div>
    </div>
  );
}
