"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/api";
import { isMockData } from "@/lib/config";

export default function GroupsPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string|undefined>();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Card>
        <CardHeader><CardTitle>Create a group (Ajo/Esusu)</CardTitle></CardHeader>
        <CardContent>
          <form className="space-y-3" onSubmit={async (e)=>{
            e.preventDefault(); setMessage(undefined); setLoading(true);
            const form = e.currentTarget as HTMLFormElement;
            const name = (form.elements.namedItem("name") as HTMLInputElement).value;
            const cycle_days = Number((form.elements.namedItem("cycle_days") as HTMLInputElement).value);
            if (isMockData) { setLoading(false); setMessage(`Mock group created: ${name}`); return; }
            const { data, error } = await api("/api/groups/create", { method: "POST", body: { name, cycle_days } });
            setLoading(false);
            setMessage(error ? error : (data as any)?.message || "Group created");
          }}>
            <Input name="name" placeholder="Group name" required />
            <Input name="cycle_days" placeholder="Cycle days" inputMode="numeric" required />
            <Button disabled={loading}>{loading?"Creating...":"Create group"}</Button>
          </form>
          {message && <p className="text-sm mt-3">{message}</p>}
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>How it works</CardTitle></CardHeader>
        <CardContent>
          <p className="text-sm text-muted">Invite members, set payout order, and automate reminders. Transparent and secure.</p>
        </CardContent>
      </Card>
    </div>
  );
}
