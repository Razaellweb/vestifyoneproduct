"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

const data = [
  { day: "Mon", savings: 12000, deposits: 4 },
  { day: "Tue", savings: 15000, deposits: 5 },
  { day: "Wed", savings: 18000, deposits: 6 },
  { day: "Thu", savings: 24000, deposits: 9 },
  { day: "Fri", savings: 22000, deposits: 7 },
  { day: "Sat", savings: 30000, deposits: 11 },
  { day: "Sun", savings: 28000, deposits: 8 },
];

export default function DashboardOverview() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Weekly Savings Growth</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{ savings: { label: "Savings", color: "#22c55e" } }}>
            <AreaChart data={data} margin={{ left: 12, right: 12 }}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
              <YAxis tickLine={false} axisLine={false} tickFormatter={(v) => `₦${(v/1000).toFixed(0)}k`} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area dataKey="savings" type="monotone" stroke="#22c55e" fill="#22c55e20" strokeWidth={2} />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Key Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3 text-sm">
            <li className="flex justify-between"><span>Total balance</span><span className="font-semibold">₦420,500</span></li>
            <li className="flex justify-between"><span>Loan limit</span><span className="font-semibold">₦336,400</span></li>
            <li className="flex justify-between"><span>Active goals</span><span className="font-semibold">3</span></li>
            <li className="flex justify-between"><span>Upcoming debit</span><span className="font-semibold">₦5,000</span></li>
          </ul>
        </CardContent>
      </Card>
      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle>Deposits per Day</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{ deposits: { label: "Deposits", color: "#1d4ed8" } }}>
            <AreaChart data={data} margin={{ left: 12, right: 12 }}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
              <YAxis tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area dataKey="deposits" type="monotone" stroke="#1d4ed8" fill="#1d4ed820" strokeWidth={2} />
              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
