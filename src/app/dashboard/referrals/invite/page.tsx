import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Button from "@/components/ui/button";
import Sparkline from "@/components/charts/Sparkline";

export default function ReferralInvite() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
      <Card className="p-5 xl:col-span-2">
        <CardHeader title="Invite friends" subtitle="Share your referral code" />
        <CardContent>
          <div className="p-4 rounded-xl border border-base">
            <p className="text-sm text-muted">Your code</p>
            <p className="text-2xl font-semibold">VEST‑1234</p>
            <div className="mt-3 flex gap-2">
              <Button>Share WhatsApp</Button>
              <Button variant="outline">Share SMS</Button>
              <Button variant="ghost">Copy code</Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="p-5">
        <CardHeader title="Clicks" subtitle="Last 7 days" />
        <CardContent>
          <Sparkline data={[1,2,2,3,5,8,13]} />
        </CardContent>
      </Card>
    </div>
  );
}
