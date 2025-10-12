"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";

export default function AdminActions() {
  const [userId, setUserId] = useState("");
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
      <Card className="p-5 xl:col-span-2">
        <CardHeader title="Admin actions" subtitle="Block user • Flag txn • Update product" />
        <CardContent>
          <div className="grid md:grid-cols-3 gap-3">
            <Input label="User ID" value={userId} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setUserId(e.target.value)} />
            <Button variant="outline">Block user</Button>
            <Button>Flag transaction</Button>
          </div>
        </CardContent>
      </Card>
      <Card className="p-5">
        <CardHeader title="Audit" subtitle="Recent actions" />
        <CardContent>
          <ul className="text-sm space-y-2">
            <li>• Admin A blocked user 123</li>
            <li>• Admin B updated product fees</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
