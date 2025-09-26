"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { isMockData } from "@/lib/config";
import { api } from "@/lib/api";

export default function SavingsPage() {
  const [accounts, setAccounts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string|undefined>();
  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(undefined);
      try {
        if (isMockData) {
          const mock = [{ id: "acc_1", name: "Main Savings", balance: 420500, auto_debit: true }, { id: "acc_2", name: "Travel Goal", balance: 120000, auto_debit: false }];
          if (!cancelled) setAccounts(mock);
        } else {
          const { data, error } = await api<{ accounts: any[] }>("/api/savings/accounts");
          if (error) throw new Error(error);
          if (!cancelled) setAccounts(data?.accounts ?? []);
        }
      } catch (e: any) { if (!cancelled) setError(e.message ?? "Failed to load"); }
      finally { if (!cancelled) setLoading(false); }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Card>
        <CardHeader><CardTitle>Your Savings Accounts</CardTitle></CardHeader>
        <CardContent>
          {loading ? <p className="text-muted">Loading...</p> : error ? <p className="text-red-400">{error}</p> : (
            <ul className="space-y-3">
              {accounts.map((a) => (
                <li key={a.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{a.name}</p>
                    <p className="text-sm text-muted">Balance</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">₦{Number(a.balance ?? 0).toLocaleString()}</p>
                    <p className="text-sm text-muted">Auto-debit: {a.auto_debit ? "On" : "Off"}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Quick Deposit</CardTitle></CardHeader>
        <CardContent>
          <form action={async (formData) => {
            const amount = Number(formData.get("amount"));
            const accountId = String(formData.get("accountId"));
            if (isMockData) { alert(`Mock deposit ₦${amount} to ${accountId}`); return; }
            const { error } = await api("/api/savings/deposit", { method: "POST", body: { amount, accountId } });
            if (error) alert(error); else alert("Deposit initiated");
          }} className="space-y-3">
            <Input name="amount" placeholder="Amount (₦)" inputMode="numeric" required />
            <Input name="accountId" placeholder="Account ID" required />
            <Button type="submit">Deposit</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
