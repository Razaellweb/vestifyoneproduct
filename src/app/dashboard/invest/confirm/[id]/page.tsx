"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function InvestConfirm({ params }: { params: { id: string } }) {
  const [amount, setAmount] = useState(5000);
  const [error, setError] = useState<string | null>(null);
  const wallet = 20000;

  function onConfirm() {
    if (amount <= 0) return setError("Enter a valid amount");
    if (amount > wallet) return setError("Insufficient wallet balance. Top up first.");
    window.location.href = `/dashboard/invest/success?id=${params.id}&amount=${amount}`;
  }

  return (
    <div className="space-y-6">
      <Link href={`/dashboard/invest/details/${params.id}`} className="text-sm inline-flex items-center gap-1 opacity-70 hover:opacity-100"><ArrowLeft className="size-4"/> Back</Link>
      <div className="card p-4 max-w-md">
        <div className="text-sm text-muted-foreground">Enter amount</div>
        <input type="number" value={amount} onChange={(e)=>setAmount(parseInt(e.target.value||"0"))} className="mt-2 w-full px-3 py-2 rounded-lg border bg-background" min={0} />
        <div className="text-xs text-muted-foreground mt-1">Wallet: ₦{wallet.toLocaleString()}</div>
        {error ? <div className="text-xs text-red-500 mt-2">{error}</div> : null}
        <button onClick={onConfirm} className="mt-3 px-4 py-2 rounded-lg btn-primary text-sm w-full">Confirm investment</button>
      </div>
    </div>
  );
}
