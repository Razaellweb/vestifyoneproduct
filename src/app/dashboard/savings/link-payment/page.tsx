"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Button from "@/components/ui/button";
import DonutChart from "@/components/charts/Donut";
import { simulateMandate } from "@/features/mock";
import { ShieldCheck, Zap } from "lucide-react";

export default function LinkPayment() {
  const [status, setStatus] = useState<"idle"|"loading"|"active"|"failed">("idle");

  const onAuthorize = async () => {
    setStatus("loading");
    const res = await simulateMandate();
    setStatus(res.status);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
      <Card className="p-5 xl:col-span-2">
        <CardHeader title="Link payment method" subtitle="Authorize auto‑debits" />
        <CardContent>
          <div className="grid md:grid-cols-2 gap-3">
            <div className="p-4 rounded-xl border border-base">
              <p className="font-medium">Paystack</p>
              <p className="text-sm text-muted">Secure mandate via Paystack</p>
              <Button className="mt-3" onClick={onAuthorize}>Authorize</Button>
            </div>
            <div className="p-4 rounded-xl border border-base">
              <p className="font-medium">Flutterwave</p>
              <p className="text-sm text-muted">Secure mandate via Flutterwave</p>
              <Button className="mt-3" variant="outline" onClick={onAuthorize}>Authorize</Button>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
            <div className="p-3 rounded-xl bg-white/5">Bank‑grade security <ShieldCheck className="w-4 h-4 inline ml-1"/></div>
            <div className="p-3 rounded-xl bg-white/5">Retry on failure</div>
            <div className="p-3 rounded-xl bg-white/5">Manual funding fallback <Zap className="w-4 h-4 inline ml-1"/></div>
          </div>
        </CardContent>
      </Card>
      <Card className="p-5">
        <CardHeader title="Mandate status" subtitle="Provider update" />
        <CardContent>
          <DonutChart data={[{label:"Active", value: status==="active"?1:0.2},{label:"Pending", value: status==="loading"?0.8:0.2},{label:"Failed", value: status==="failed"?1:0.2}]} colors={["#22c55e","#60a5fa","tomato"]} />
          <p className="text-sm mt-3">Current: <span className="font-medium">{status}</span></p>
          {status === "failed" && <Button className="mt-3">Use manual funding</Button>}
        </CardContent>
      </Card>
    </div>
  );
}
