"use client";
import React, { useState } from "react";

export default function ResetNew() {
  const [pwd, setPwd] = useState("");
  const [ok, setOk] = useState(false);
  function save() { if(pwd.length<6) return; setOk(true); setTimeout(()=> window.location.href = "/signin", 800); }
  return (
    <div className="max-w-md w-full">
      <div className="card p-6">
        <div className="text-sm text-muted-foreground">Set a new password</div>
        {!ok ? (
          <div className="grid gap-3 mt-3">
            <input type="password" value={pwd} onChange={(e)=>setPwd(e.target.value)} placeholder="New password" className="w-full px-3 py-2 rounded-lg border bg-background" />
            <button onClick={save} className="px-4 py-2 rounded-lg btn-primary text-sm w-full">Save password</button>
          </div>
        ) : (
          <div className="text-sm">Password updated. Redirecting…</div>
        )}
      </div>
    </div>
  );
}
