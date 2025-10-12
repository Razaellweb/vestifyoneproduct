"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Input from "@/components/ui/input";
import Select from "@/components/ui/select";
import Button from "@/components/ui/button";
import AreaChart from "@/components/charts/Area";
import { fetchSavingsPlanProjection } from "@/features/mock";

export default function CreateSavingsPlan() {
  const [amount, setAmount] = useState(5000);
  const [frequency, setFrequency] = useState("monthly");
  const [startDate, setStartDate] = useState<string>(new Date().toISOString().slice(0,10));
  const [projection, setProjection] = useState<{label:string; value:number}[] | null>(null);

  const onPreview = async () => {
    const data = await fetchSavingsPlanProjection({ amount, frequency: frequency as "daily"|"weekly"|"monthly", startDate });
    setProjection(data);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
      <Card className="p-5 xl:col-span-2">
        <CardHeader title="Create savings plan" subtitle="Configure your goal" />
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Input type="number" label="Amount (₦)" value={amount} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setAmount(parseInt(e.target.value||"0"))} />
            <Select label="Frequency" value={frequency} onChange={(e: React.ChangeEvent<HTMLSelectElement>)=>setFrequency(e.target.value)}>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </Select>
            <Input type="date" label="Start date" value={startDate} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setStartDate(e.target.value)} />
          </div>
          <div className="mt-4 flex gap-3">
            <Button onClick={onPreview}>Preview</Button>
            <Button variant="outline">Continue</Button>
          </div>
          {projection && (
            <div className="mt-6">
              <AreaChart id="plan-proj" data={projection} className="w-full" />
              <p className="text-xs text-muted mt-2">12‑month projection</p>
            </div>
          )}
        </CardContent>
      </Card>
      <Card className="p-5">
        <CardHeader title="Summary" subtitle="Before you proceed" />
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li>• Auto‑debits via Paystack/Flutterwave</li>
            <li>• Pause or edit anytime</li>
            <li>• Withdrawal takes minutes</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
