"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function ResetRequest() {
  const [id, setId] = useState("");
  const [sent, setSent] = useState(false);
  function send() { if(!id) return; setSent(true); }
  return (
    <div className="max-w-md w-full">
      <div className="card p-6">
        <div className="text-sm text-muted-foreground">Reset your password</div>
        <div className="grid gap-3 mt-3">
          {!sent ? (
            <>
              <input placeholder="Email or phone" value={id} onChange={(e)=>setId(e.target.value)} className="w-full px-3 py-2 rounded-lg border bg-background" />
              <button onClick={send} className="px-4 py-2 rounded-lg btn-primary text-sm w-full">Send code</button>
            </>
          ) : (
            <div className="text-sm">We sent a code. <Link href="/reset/verify" className="underline">Enter code</Link></div>
          )}
        </div>
      </div>
    </div>
  );
}
