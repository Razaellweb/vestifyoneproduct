"use client";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import { useState } from "react";
import { ShieldCheck } from "lucide-react";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !phone || !password || !agree) { setError("Please complete all fields and agree to terms."); return; }
    window.location.assign("/onboarding/bvn");
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      <div className="hidden md:block relative">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] opacity-20" />
        <div className="absolute -top-10 -left-10 w-72 h-72 rounded-full blur-3xl bg-[color-mix(in_oklab,var(--accent)_50%,transparent)] opacity-30" />
        <div className="absolute bottom-10 right-10 w-72 h-72 rounded-full blur-3xl bg-[color-mix(in_oklab,var(--secondary)_50%,transparent)] opacity-30" />
      </div>
      <div className="p-6 md:p-10">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[var(--primary)] to-[var(--secondary)]" />
        <h1 className="text-2xl font-semibold mt-4">Create your Vestify One account</h1>
        <p className="text-sm text-muted">Save, invest, and borrow — built for Nigerians.</p>
        <form className="mt-6 space-y-3" onSubmit={onSubmit}>
          <Input label="Phone" placeholder="0803 000 0000" value={phone} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setPhone(e.target.value)} />
          <Input label="Email" placeholder="you@example.com" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setEmail(e.target.value)} />
          <Input type="password" label="Password" placeholder="••••••••" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setPassword(e.target.value)} />
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={agree} onChange={(e)=>setAgree(e.target.checked)} className="accent-[var(--primary)]" />
            I agree to the Terms & Privacy
          </label>
          {error && <p className="text-sm text-[tomato]">{error}</p>}
          <Button className="w-full mt-2">Create account</Button>
          <p className="text-xs text-muted flex items-center gap-2"><ShieldCheck className="w-4 h-4"/> Bank‑grade security</p>
          <p className="text-sm">Already have an account? <a className="underline" href="/signin">Sign in</a></p>
        </form>
      </div>
    </div>
  );
}
