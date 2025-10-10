"use client";
import React from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function SavingsSuccess() {
  const sp = useSearchParams();
  const amount = sp.get("amount");
  const freq = sp.get("freq");
  return (
    <div className="grid place-items-center py-12">
      <div className="card p-6 text-center max-w-md">
        <CheckCircle2 className="size-10 text-emerald-500 mx-auto"/>
        <h3 className="text-xl font-semibold mt-2">Savings plan active</h3>
        <p className="text-sm text-muted-foreground mt-1">₦{Number(amount||0).toLocaleString()} • {freq} • Auto-debits enabled</p>
        <Link href="/dashboard" className="mt-4 inline-flex px-4 py-2 rounded-lg btn-primary text-sm">Back to dashboard</Link>
      </div>
    </div>
  );
}
