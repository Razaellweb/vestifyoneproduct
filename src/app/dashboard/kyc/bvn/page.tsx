"use client";
import React, { useState } from "react";
import { BadgeCheck } from "lucide-react";

export default function BVNPage() {
  const [bvn, setBvn] = useState("");
  const [otp, setOtp] = useState("");
  const [stage, setStage] = useState<"bvn"|"otp"|"done">("bvn");
  const [error, setError] = useState<string | null>(null);

  function requestOtp() {
    if (bvn.length !== 11) return setError("Enter a valid 11-digit BVN");
    setError(null); setStage("otp");
  }
  function verify() {
    if (otp.length !== 6) return setError("Enter the 6-digit OTP sent to you");
    setError(null); setStage("done");
  }

  return (
    <div className="space-y-6 max-w-md">
      <div className="card p-4">
        <div className="inline-flex items-center gap-2 text-sm text-muted-foreground"><BadgeCheck className="size-4"/> BVN Verification</div>
        {stage === "bvn" && (
          <div className="grid gap-3 mt-2">
            <label className="text-sm">Enter BVN
              <input value={bvn} onChange={(e)=>setBvn(e.target.value)} className="mt-1 w-full px-3 py-2 rounded-lg border bg-background" placeholder="11-digit BVN" />
            </label>
            {error ? <div className="text-xs text-red-500">{error}</div> : null}
            <button onClick={requestOtp} className="px-4 py-2 rounded-lg btn-primary text-sm w-full">Send OTP</button>
          </div>
        )}
        {stage === "otp" && (
          <div className="grid gap-3 mt-2">
            <label className="text-sm">Enter OTP
              <input value={otp} onChange={(e)=>setOtp(e.target.value)} className="mt-1 w-full px-3 py-2 rounded-lg border bg-background" placeholder="6-digit code" />
            </label>
            {error ? <div className="text-xs text-red-500">{error}</div> : null}
            <button onClick={verify} className="px-4 py-2 rounded-lg btn-primary text-sm w-full">Verify</button>
          </div>
        )}
        {stage === "done" && (
          <div className="text-sm">KYC completed. You can now access all features.</div>
        )}
      </div>
    </div>
  );
}
