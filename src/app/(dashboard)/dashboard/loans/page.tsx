"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/api";
import { isMockData } from "@/lib/config";

export default function LoansPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string|undefined>();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Card>
        <CardHeader><CardTitle>Apply for a loan</CardTitle></CardHeader>
        <CardContent>
          <form className="space-y-3" onSubmit={async (e)=>{
            e.preventDefault(); setMessage(undefined); setLoading(true);
            const form = e.currentTarget as HTMLFormElement;
            const amount = Number((form.elements.namedItem("amount") as HTMLInputElement).value);
            const tenure = Number((form.elements.namedItem("tenure") as HTMLInputElement).value);
            if (isMockData) { setLoading(false); setMessage(`Mock approved for ₦${amount} over ${tenure} months`); return; }
            const { data, error } = await api("/api/loans/apply", { method: "POST", body: { amount, tenure } });
            setLoading(false);
            setMessage(error ? error : (data as any)?.message || "Application submitted");
          }}>
            <Input name="amount" placeholder="Amount (₦)" inputMode="numeric" required />
            <Input name="tenure" placeholder="Tenure (months)" inputMode="numeric" required />
            <Button disabled={loading}>{loading?"Submitting...":"Submit"}</Button>
          </form>
          {message && <p className="text-sm mt-3">{message}</p>}
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Tip</CardTitle></CardHeader>
        <CardContent>
          <p className="text-sm text-muted">You can borrow up to 80% of your savings balance with instant decisions.</p>
        </CardContent>
      </Card>
    </div>
  );
}
