"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import ErrorState from "@/components/ui/error-state";

export default function BVNVerification() {
  const [bvn, setBvn] = useState("");
  const [dob, setDob] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle"|"verifying"|"success">("idle");

  const onVerify = async () => {
    if (bvn.length !== 11 || !dob) return setError("Enter a valid 11‑digit BVN and DOB.");
    setError(null); setStatus("verifying");
    setTimeout(()=>{ setStatus("success"); }, 900);
  };

  return (
    <div className="min-h-screen grid place-items-center p-6">
      <div className="w-full max-w-xl">
        <Card className="p-5">
          <CardHeader title="BVN Verification" subtitle="Required by CBN" />
          <CardContent>
            {status !== "success" ? (
              <>
                <div className="grid md:grid-cols-2 gap-3">
                  <Input label="BVN" placeholder="11‑digit" value={bvn} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setBvn(e.target.value)} />
                  <Input type="date" label="Date of birth" value={dob} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setDob(e.target.value)} />
                </div>
                {error && <div className="mt-3"><ErrorState title="Verification error" description={error} /></div>}
                <Button className="mt-4 w-full" onClick={onVerify}>
                  {status === "verifying" ? "Verifying..." : "Verify"}
                </Button>
              </>
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-[color-mix(in_oklab,var(--primary)_40%,transparent)] grid place-items-center">✅</div>
                <p className="mt-3 font-medium">BVN verified</p>
                <Button className="mt-3" onClick={()=>window.location.assign("/dashboard")}>Continue to Dashboard</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
