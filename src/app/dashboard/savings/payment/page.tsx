"use client";
import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";

export default function SavingsPayment() {
  const sp = useSearchParams();
  const amount = Number(sp.get("amount") || 0);
  const freq = sp.get("freq");
  const source = sp.get("source");
  function pay() {
    // simulate gateway redirect
    setTimeout(()=> {
      window.location.href = `/dashboard/savings/success?amount=${amount}&freq=${freq}`;
    }, 1000);
  }
  return (
    <div className="space-y-6">
      <Link href="/dashboard/savings/setup" className="text-sm inline-flex items-center gap-1 opacity-70 hover:opacity-100"><ArrowLeft className="size-4"/> Back</Link>
      <div className="card p-4 max-w-md">
        <div className="text-sm text-muted-foreground">Payment via {source}</div>
        <div className="text-2xl font-semibold mt-1">₦{amount.toLocaleString()}</div>
        <div className="text-xs text-muted-foreground">Plan: {freq}</div>
        <button onClick={pay} className="mt-3 px-4 py-2 rounded-lg btn-primary text-sm w-full inline-flex items-center gap-2"><Loader2 className="size-4 animate-spin"/> Pay now</button>
        <div className="text-xs text-muted-foreground mt-2">If payment fails, you can retry or choose another method.</div>
      </div>
    </div>
  );
}
