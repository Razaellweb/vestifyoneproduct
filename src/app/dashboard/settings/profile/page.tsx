"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import DonutChart from "@/components/charts/Donut";

export default function SettingsProfile() {
  const [name, setName] = useState("Jane Doe");
  const [email, setEmail] = useState("jane@vestify.one");
  const [phone, setPhone] = useState("0803 000 0000");

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
      <Card className="p-5 xl:col-span-2">
        <CardHeader title="Profile" subtitle="Keep info up to date" />
        <CardContent>
          <div className="grid md:grid-cols-3 gap-3">
            <Input label="Full name" value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setName(e.target.value)} />
            <Input label="Email" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setEmail(e.target.value)} />
            <Input label="Phone" value={phone} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setPhone(e.target.value)} />
          </div>
          <div className="mt-4 flex gap-2">
            <Button>Save changes</Button>
            <Button variant="outline">Change password</Button>
          </div>
        </CardContent>
      </Card>
      <Card className="p-5">
        <CardHeader title="KYC status" subtitle="BVN verification" />
        <CardContent>
          <DonutChart data={[{label:"Verified", value: 1},{label:"Pending", value: 0.2}]} colors={["#22c55e","#facc15"]} />
          <Button className="mt-3" onClick={()=>window.location.assign("/onboarding/bvn")}>Verify now</Button>
        </CardContent>
      </Card>
    </div>
  );
}
