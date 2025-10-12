import { Card, CardContent, CardHeader } from "@/components/ui/card";
import BarChart from "@/components/charts/Bar";
import DonutChart from "@/components/charts/Donut";

export default function AdminDashboard() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
      <Card className="p-5 xl:col-span-2">
        <CardHeader title="Platform metrics" subtitle="Users • Savings • Loans" />
        <CardContent>
          <BarChart data={[{label:"Users", value: 12000},{label:"Savers", value: 8000},{label:"Loans", value: 3500}]} colors={["#60a5fa","#22c55e","#facc15"]} className="w-full" />
        </CardContent>
      </Card>
      <Card className="p-5">
        <CardHeader title="Fraud alerts" subtitle="Status" />
        <CardContent>
          <DonutChart data={[{label:"Clear", value: 92},{label:"Flagged", value: 8}]} colors={["#22c55e","tomato"]} />
        </CardContent>
      </Card>
    </div>
  );
}
