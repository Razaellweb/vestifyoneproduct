"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function GroupCreatePage() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(10000);
  const [freq, setFreq] = useState("Weekly");
  const [error, setError] = useState<string | null>(null);

  function onSubmit() {
    if (!name.trim()) return setError("Enter a group name");
    window.location.href = `/dashboard/groups/1?created=1`;
  }

  return (
    <div className="space-y-6">
      <Link href="/dashboard/groups" className="text-sm inline-flex items-center gap-1 opacity-70 hover:opacity-100"><ArrowLeft className="size-4"/> Back</Link>
      <div className="card p-4 max-w-md">
        <div className="text-sm text-muted-foreground">Create or Join group</div>
        <div className="grid gap-3 mt-2">
          <label className="text-sm">Group name
            <input value={name} onChange={(e)=>setName(e.target.value)} className="mt-1 w-full px-3 py-2 rounded-lg border bg-background" />
          </label>
          <label className="text-sm">Amount (₦)
            <input type="number" value={amount} onChange={(e)=>setAmount(parseInt(e.target.value||"0"))} className="mt-1 w-full px-3 py-2 rounded-lg border bg-background" />
          </label>
          <label className="text-sm">Frequency
            <select value={freq} onChange={(e)=>setFreq(e.target.value)} className="mt-1 w-full px-3 py-2 rounded-lg border bg-background">
              {['Weekly','Monthly'].map((f)=> <option key={f} value={f}>{f}</option>)}
            </select>
          </label>
          <label className="text-sm">Join via code
            <input placeholder="Optional join code" className="mt-1 w-full px-3 py-2 rounded-lg border bg-background" />
          </label>
          {error ? <div className="text-xs text-red-500">{error}</div> : null}
          <button onClick={onSubmit} className="px-4 py-2 rounded-lg btn-primary text-sm w-full">Create group</button>
        </div>
      </div>
    </div>
  );
}
