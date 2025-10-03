"use client";
import { useEffect, useState } from 'react';
import { Api } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatNaira } from '@/lib/utils';

export default function LoansPage() {
  const [elig, setElig] = useState<{ maxAmount: number; apr: number; tenureOptions: number[] } | null>(null);
  const [amount, setAmount] = useState('');
  const [tenure, setTenure] = useState<number | ''>('' as any);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    Api.loanEligibility().then((r) => r.success && setElig((r as any).data));
  }, []);

  async function requestLoan() {
    if (!elig) return;
    const amt = parseInt(amount || '0', 10);
    if (amt <= 0 || !tenure) return;
    setLoading(true); setMsg(null);
    const r = await Api.requestLoan(amt, tenure);
    setLoading(false);
    setMsg(r.success ? 'Loan approved and disbursed.' : (r.error?.message || 'Loan request failed'));
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Loan overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-semibold">{elig ? formatNaira(elig.maxAmount) : '—'}</div>
          <p className="text-sm text-muted mt-1">Up to 80% of your savings. APR {elig?.apr ?? '—'}%</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Request a loan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-3">
            <label className="text-sm">Amount (₦)
              <input className="mt-1 w-full rounded-lg border border-base bg-[var(--card)] px-4 py-2.5 text-sm" inputMode="numeric" value={amount} onChange={(e)=>setAmount(e.target.value.replace(/[^0-9]/g,''))} />
            </label>
            <label className="text-sm">Repayment tenure
              <select className="mt-1 w-full rounded-lg border border-base bg-[var(--card)] px-4 py-2.5 text-sm" value={tenure} onChange={(e)=>setTenure(parseInt(e.target.value))}>
                <option value="">Select</option>
                {elig?.tenureOptions.map((t)=> <option key={t} value={t}>{t} month{t>1?'s':''}</option>)}
              </select>
            </label>
            <Button onClick={requestLoan} disabled={loading || !amount || !tenure} variant="gradient">{loading ? 'Requesting…' : 'Confirm request'}</Button>
            {msg && <p className="text-sm mt-1">{msg}</p>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
