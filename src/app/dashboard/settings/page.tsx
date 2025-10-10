"use client";
import React, { useState } from "react";
import { Settings, Bell, Lock } from "lucide-react";

export default function SettingsPage() {
  const [email, setEmail] = useState("jane@vestify.one");
  const [notify, setNotify] = useState(true);
  const [pwd, setPwd] = useState("");

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="card p-4">
        <div className="inline-flex items-center gap-2 text-sm text-muted-foreground"><Settings className="size-4"/> Profile</div>
        <div className="grid gap-3 mt-2">
          <label className="text-sm">Email
            <input value={email} onChange={(e)=>setEmail(e.target.value)} className="mt-1 w-full px-3 py-2 rounded-lg border bg-background" />
          </label>
          <label className="text-sm inline-flex items-center gap-2"><input type="checkbox" checked={notify} onChange={(e)=>setNotify(e.target.checked)} /> Receive notifications</label>
          <button className="px-4 py-2 rounded-lg btn-primary text-sm w-fit">Save changes</button>
        </div>
      </div>

      <div className="card p-4">
        <div className="inline-flex items-center gap-2 text-sm text-muted-foreground"><Lock className="size-4"/> Change password</div>
        <div className="grid gap-3 mt-2">
          <label className="text-sm">New password
            <input type="password" value={pwd} onChange={(e)=>setPwd(e.target.value)} className="mt-1 w-full px-3 py-2 rounded-lg border bg-background" />
          </label>
          <button className="px-4 py-2 rounded-lg btn-primary text-sm w-fit">Update password</button>
        </div>
      </div>
    </div>
  );
}
