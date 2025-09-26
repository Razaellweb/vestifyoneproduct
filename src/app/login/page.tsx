"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { api } from "@/lib/api";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string|undefined>();
  return (
    <div className="max-w-md mx-auto my-16 card p-6">
      <h1 className="text-2xl font-semibold">Welcome back</h1>
      <p className="text-sm text-muted mt-1">Login to continue</p>
      <form className="mt-6 space-y-3" onSubmit={async (e) => {
        e.preventDefault(); setError(undefined); setLoading(true);
        const form = e.currentTarget as HTMLFormElement;
        const email = (form.elements.namedItem("email") as HTMLInputElement).value;
        const password = (form.elements.namedItem("password") as HTMLInputElement).value;
        const { error } = await api("/api/auth/signin", { method: "POST", body: { email, password } });
        setLoading(false);
        if (error) setError(error); else window.location.href = "/dashboard";
      }}>
        <Input name="email" placeholder="Email" type="email" autoComplete="email" required />
        <Input name="password" placeholder="Password" type="password" autoComplete="current-password" required />
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <Button className="w-full" disabled={loading}>{loading ? "Signing in..." : "Sign in"}</Button>
      </form>
      <p className="text-sm text-muted mt-4">No account? <Link className="underline" href="/signup">Create one</Link></p>
    </div>
  );
}
