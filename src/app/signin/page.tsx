"use client";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import { useState } from "react";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [admin, setAdmin] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) return setError("Email and password required.");
    if (admin && otp.length < 4) return setError("Enter 2FA code for admin.");
    window.location.assign(admin? "/admin" : "/dashboard");
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      <div className="hidden md:block relative">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] opacity-20" />
      </div>
      <div className="p-6 md:p-10">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[var(--primary)] to-[var(--secondary)]" />
        <h1 className="text-2xl font-semibold mt-4">Welcome back</h1>
        <form className="mt-6 space-y-3" onSubmit={onSubmit}>
          <Input label="Email" placeholder="you@example.com" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setEmail(e.target.value)} />
          <Input type="password" label="Password" placeholder="••••••••" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setPassword(e.target.value)} />
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={admin} onChange={(e)=>setAdmin(e.target.checked)} className="accent-[var(--primary)]"/> Admin login</label>
          {admin && <Input label="2FA code" placeholder="123456" value={otp} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setOtp(e.target.value)} />}
          {error && <p className="text-sm text-[tomato]">{error}</p>}
          <Button className="w-full mt-2">Sign in</Button>
          <p className="text-sm mt-2"><a className="underline" href="/password-reset">Forgot password?</a></p>
        </form>
      </div>
    </div>
  );
}
