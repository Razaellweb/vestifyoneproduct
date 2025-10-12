"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";

export default function GroupCreate() {
  const [name, setName] = useState("My Ajo Circle");
  const [amount, setAmount] = useState(50000);
  const [members, setMembers] = useState("ada@example.com, bola@example.com");
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
      <Card className="p-5 xl:col-span-2">
        <CardHeader title="Create group" subtitle="Set rules and invite" />
        <CardContent>
          <div className="grid md:grid-cols-3 gap-3">
            <Input label="Group name" value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setName(e.target.value)} />
            <Input type="number" label="Amount per cycle (₦)" value={amount} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setAmount(parseInt(e.target.value||"0"))} />
            <Input label="Members (comma‑separated)" value={members} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setMembers(e.target.value)} />
          </div>
          <Button className="mt-4" onClick={()=>window.location.assign("/dashboard/groups/invite")}>Create & Invite</Button>
        </CardContent>
      </Card>
      <Card className="p-5">
        <CardHeader title="Preview" subtitle="Monthly cycle" />
        <CardContent>
          <div className="p-3 rounded-xl bg-white/5 text-sm">
            {name} • ₦{amount.toLocaleString()} • {members.split(",").length} members
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
