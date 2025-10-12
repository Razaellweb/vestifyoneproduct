import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Button from "@/components/ui/button";
import DonutChart from "@/components/charts/Donut";

export default function GroupInvite() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
      <Card className="p-5 xl:col-span-2">
        <CardHeader title="Invite members" subtitle="Share via WhatsApp/SMS" />
        <CardContent>
          <div className="grid md:grid-cols-3 gap-3">
            <Button>Share WhatsApp</Button>
            <Button variant="outline">Share SMS</Button>
            <Button variant="ghost">Copy link</Button>
          </div>
          <div className="mt-4 text-sm text-muted">Delivery updates appear here.</div>
        </CardContent>
      </Card>
      <Card className="p-5">
        <CardHeader title="Invite status" subtitle="Delivered vs pending" />
        <CardContent>
          <DonutChart data={[{label:"Delivered", value: 6},{label:"Pending", value: 2}]} colors={["#22c55e","#facc15"]} />
        </CardContent>
      </Card>
    </div>
  );
}
