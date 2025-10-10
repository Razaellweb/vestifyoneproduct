"use client";
import React, { useState } from "react";

export default function ResetVerify() {
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  function next() { if(code.length!==6) return setError("Enter 6-digit code"); window.location.href = "/reset/new";}
  return (
    <div className="max-w-md w-full">
      <div className="card p-6">
        <div className="text-sm text-muted-foreground">Enter the code sent to you</div>
        <div className="grid gap-3 mt-3">
          <input value={code} onChange={(e)=>setCode(e.target.value)} placeholder="6-digit code" className="w-full px-3 py-2 rounded-lg border bg-background" />
          {error ? <div className="text-xs text-red-500">{error}</div> : null}
          <button onClick={next} className="px-4 py-2 rounded-lg btn-primary text-sm w-full">Continue</button>
        </div>
      </div>
    </div>
  );
}
