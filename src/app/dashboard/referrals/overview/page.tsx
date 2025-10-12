import { Card, CardContent, CardHeader } from "@/components/ui/card";
import DonutChart from "@/components/charts/Donut";

export default function ReferralOverview() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
      <Card className="p-5 xl:col-span-2">
        <CardHeader title="Rewards" subtitle="Invited friends" />
        <CardContent>
          <div className="grid grid-cols-2 gap-3 text-sm">
            {[{l:"Invited", v: 32},{l:"Signed up", v: 18}].map((s,i)=> (
              <div key={i} className="p-3 rounded-xl border border-base flex items-center justify-between">
                <span>{s.l}</span>
                <span className="font-semibold">{s.v}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card className="p-5">
        <CardHeader title="Sources" subtitle="Where invites come from" />
        <CardContent>
          <DonutChart data={[{label:"WhatsApp", value: 60},{label:"SMS", value: 30},{label:"Other", value: 10}]} colors={["#22c55e","#60a5fa","#facc15"]} />
        </CardContent>
      </Card>
    </div>
  );
}
