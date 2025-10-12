import { Card, CardContent, CardHeader } from "@/components/ui/card";
import AreaChart from "@/components/charts/Area";
import Progress from "@/components/ui/progress";
import { fetchDashboard, formatCurrency, mockSavingsHistory } from "@/features/mock";
import Button from "@/components/ui/button";

export default async function SavingsOverview() {
  const data = await fetchDashboard().catch(()=>null);
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
      <Card className="p-5 xl:col-span-2">
        <CardHeader title="Savings progress" subtitle="All plans" action={<Button>New Plan</Button>} />
        <CardContent>
          <AreaChart id="sav-ov" data={mockSavingsHistory} className="w-full" />
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
            {[{name:"Emergency", v: 55},{name:"New Phone", v: 40},{name:"Travel", v: 20}].map((g,i)=> (
              <div key={i} className="p-3 rounded-xl border border-base">
                <div className="flex items-center justify-between">
                  <p>{g.name}</p>
                  <span className="text-muted">{g.v}%</span>
                </div>
                <div className="mt-2"><Progress value={g.v} /></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card className="p-5">
        <CardHeader title="Balance" subtitle="Available" />
        <CardContent>
          <p className="text-3xl font-semibold">{formatCurrency(data?.balances.savings || 0)}</p>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <Button variant="outline">Withdraw</Button>
            <Button>Create Plan</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
