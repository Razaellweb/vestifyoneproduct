"use client";
import { useState } from "react";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";

export default function PasswordReset() {
  const [stage, setStage] = useState<"request"|"set">("request");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      <div className="hidden md:block relative">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] opacity-20" />
      </div>
      <div className="p-6 md:p-10">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[var(--primary)] to-[var(--secondary)]" />
        <h1 className="text-2xl font-semibold mt-4">Password reset</h1>
        {stage === "request" ? (
          <form className="mt-6 space-y-3" onSubmit={(e: React.FormEvent<HTMLFormElement>)=>{e.preventDefault(); setStage("set");}}>
            <Input label="Email" placeholder="you@example.com" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setEmail(e.target.value)} />
            <Button className="w-full mt-2">Send reset link</Button>
          </form>
        ) : (
          <form className="mt-6 space-y-3" onSubmit={(e: React.FormEvent<HTMLFormElement>)=>{e.preventDefault(); window.location.assign("/signin");}}>
            <Input type="password" label="New password" placeholder="••••••••" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setPassword(e.target.value)} />
            <Button className="w-full mt-2">Set new password</Button>
          </form>
        )}
      </div>
    </div>
  );
}
