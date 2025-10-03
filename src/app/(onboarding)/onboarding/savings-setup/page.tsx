"use client";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Api } from '@/lib/api';

export default function SavingsSetupPage() {
  const [amount, setAmount] = useState('5000');
  const [frequency, setFrequency] = useState<'daily'|'weekly'|'monthly'>('monthly');
  const [startDate, setStartDate] = useState(() => new Date().toISOString().slice(0,10));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string|undefined>();

  async function submit() {
    const amt = parseInt(amount || '0', 10);
    if (amt < 1000) { setError('Minimum amount is ₦1,000'); return; }
    setLoading(true); setError(undefined);
    const res = await Api.createSavingsPlan({ amount: amt, frequency, startDate });
    setLoading(false);
    if (res.success) {
      window.location.href = '/dashboard';
    } else setError('Could not create plan. Try again.');
  }

  return (
    <div className="card p-6">
      <h1 className="text-2xl font-semibold">Set up automated savings</h1>
      <p className="text-sm text-muted mt-1">Choose your amount, frequency, and when to start. You can pause anytime.</p>

      <div className="mt-6 grid grid-cols-1 gap-4">
        <div>
          <Label htmlFor="amount">Amount (₦)</Label>
          <Input id="amount" inputMode="numeric" value={amount} onChange={(e)=>setAmount(e.target.value.replace(/[^0-9]/g,''))} />
        </div>
        <div>
          <Label htmlFor="freq">Frequency</Label>
          <select id="freq" value={frequency} onChange={(e)=>setFrequency(e.target.value as any)} className="w-full rounded-lg border border-base bg-[var(--card)] px-4 py-2.5 text-sm">
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        <div>
          <Label htmlFor="start">Start date</Label>
          <Input id="start" type="date" value={startDate} onChange={(e)=>setStartDate(e.target.value)} />
        </div>
        {error && <p className="text-xs text-red-400">{error}</p>}
        <Button onClick={submit} disabled={loading} variant="gradient" className="w-full">{loading ? 'Creating…' : 'Create plan'}</Button>
      </div>
    </div>
  );
}
