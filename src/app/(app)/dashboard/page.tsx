"use client";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatNaira } from '@/lib/utils';
import { Api } from '@/lib/api';
import { useEffect, useState } from 'react';
import { Area, AreaChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function DashboardPage() {
  const [series, setSeries] = useState<{ date: string; value: number }[]>([]);
  const [eligibility, setEligibility] = useState<{ maxAmount: number; apr: number; tenureOptions: number[] } | null>(null);

  useEffect(() => {
    setSeries(
      Array.from({ length: 10 }).map((_, i) => ({
        date: new Date(Date.now() - (9 - i) * 86400000).toLocaleDateString('en-NG', { month: 'short', day: 'numeric' }),
        value: 300000 + i * 15000 + Math.round(Math.random() * 20000),
      }))
    );
    Api.loanEligibility().then((r) => r.success && setEligibility((r as any).data));
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Savings balance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-semibold">{formatNaira(420500)}</div>
          <div className="h-40 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={series}>
                <defs>
                  <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="var(--accent)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" hide />
                <YAxis hide />
                <Tooltip contentStyle={{ background: 'var(--card)', borderRadius: 12, border: '1px solid var(--border)' }} />
                <Area type="monotone" dataKey="value" stroke="var(--accent)" fill="url(#grad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Loan eligibility</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-semibold">{eligibility ? formatNaira(eligibility.maxAmount) : '—'}</div>
          <p className="text-sm text-muted mt-1">Up to 80% of your savings. APR {eligibility?.apr ?? '—'}%</p>
          <div className="mt-4 flex items-center gap-3">
            <Button variant="gradient" onClick={() => (window.location.href = '/loans')}>Request loan</Button>
            <Button variant="ghost" onClick={() => (window.location.href = '/invest')}>Browse investments</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Recent activity</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="divide-y divide-[var(--border)]">
            {[
              { t: 'Saved ₦2,000 • Ajo circle', d: 'Today' },
              { t: 'Invested ₦20,000 into Money Market', d: 'Yesterday' },
              { t: 'Auto-debit ₦5,000 • Savings goal', d: 'Mon' },
            ].map((i, idx) => (
              <li key={idx} className="flex items-center justify-between py-3 text-sm">
                <span>{i.t}</span>
                <span className="text-muted">{i.d}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
