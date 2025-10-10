"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pwd, setPwd] = useState("");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function onSubmit() {
    if ((!email && !phone) || pwd.length < 6 || !agree) {
      return setError("Enter email or phone, strong password, and accept T&C.");
    }
    window.location.href = "/dashboard/kyc/bvn";
  }

  return (
    <div className="max-w-md w-full">
      <div className="card p-6">
        <div className="inline-flex items-center gap-2 text-sm text-muted-foreground"><ShieldCheck className="size-4"/> Create your account</div>
        <div className="grid gap-3 mt-3">
          <input placeholder="Email (optional)" value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full px-3 py-2 rounded-lg border bg-background" />
          <input placeholder="Phone (optional)" value={phone} onChange={(e)=>setPhone(e.target.value)} className="w-full px-3 py-2 rounded-lg border bg-background" />
          <input type="password" placeholder="Password" value={pwd} onChange={(e)=>setPwd(e.target.value)} className="w-full px-3 py-2 rounded-lg border bg-background" />
          <label className="text-sm inline-flex items-center gap-2"><input type="checkbox" checked={agree} onChange={(e)=>setAgree(e.target.checked)} /> I accept Terms & Privacy</label>
          {error ? <div className="text-xs text-red-500">{error}</div> : null}
          <button onClick={onSubmit} className="px-4 py-2 rounded-lg btn-primary text-sm w-full">Create account</button>
          <div className="text-xs text-muted-foreground text-center">Have an account? <Link href="/signin" className="underline">Sign in</Link></div>
        </div>
      </div>
    </div>
  );
}
