import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Progress from "@/components/ui/progress";
import DonutChart from "@/components/charts/Donut";
import Button from "@/components/ui/button";

export default function GroupsOverview() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
      <Card className="p-5 xl:col-span-2">
        <CardHeader title="Ajo circle" subtitle="12 members • ₦50,000 monthly" action={<Button>Create group</Button>} />
        <CardContent>
          <div className="grid md:grid-cols-2 gap-3">
            <div>
              <p className="text-sm">Contribution progress</p>
              <Progress value={66} />
              <div className="mt-2 text-xs text-muted">8/12 contributed</div>
              <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                {["Ada","Bola","Chi","Femi"].map((m,i)=> (
                  <div key={i} className="p-2 rounded-xl border border-base">{m} • ₦50k</div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm">Payout order</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {[1,2,3,4].map((i)=> (
                  <div key={i} className="p-3 rounded-xl bg-white/5">Member {i}</div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="p-5">
        <CardHeader title="Status" subtitle="Contributions vs payouts" />
        <CardContent>
          <DonutChart data={[{label:"Contributed", value: 8},{label:"Pending", value: 4}]} colors={["#22c55e","#facc15"]} />
        </CardContent>
      </Card>
    </div>
  );
}
