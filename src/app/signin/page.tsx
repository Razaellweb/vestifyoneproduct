"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export default function SigninPage() {
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState<string | null>(null);

  function onSubmit() {
    if (!id || !pwd) return setError("Enter email/phone and password");
    window.location.href = "/dashboard";
  }

  return (
    <div className="max-w-md w-full">
      <div className="card p-6">
        <div className="inline-flex items-center gap-2 text-sm text-muted-foreground"><ShieldCheck className="size-4"/> Welcome back</div>
        <div className="grid gap-3 mt-3">
          <input placeholder="Email or phone" value={id} onChange={(e)=>setId(e.target.value)} className="w-full px-3 py-2 rounded-lg border bg-background" />
          <input type="password" placeholder="Password" value={pwd} onChange={(e)=>setPwd(e.target.value)} className="w-full px-3 py-2 rounded-lg border bg-background" />
          {error ? <div className="text-xs text-red-500">{error}</div> : null}
          <button onClick={onSubmit} className="px-4 py-2 rounded-lg btn-primary text-sm w-full">Sign in</button>
          <div className="text-xs text-muted-foreground text-center"><Link href="/reset/request" className="underline">Forgot password?</Link></div>
        </div>
      </div>
    </div>
  );
}
