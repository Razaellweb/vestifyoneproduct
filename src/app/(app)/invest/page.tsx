"use client";
import { useEffect, useMemo, useState } from 'react';
import { Api } from '@/lib/api';
import { InvestmentProduct } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { formatNaira } from '@/lib/utils';

export default function InvestPage() {
  const [items, setItems] = useState<InvestmentProduct[]>([]);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState<InvestmentProduct | null>(null);
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Api.listInvestments().then((r) => r.success && setItems((r as any).data.items));
  }, []);

  const filtered = useMemo(() => items.filter(i => i.name.toLowerCase().includes(query.toLowerCase())), [items, query]);

  async function invest() {
    if (!active) return;
    const amt = parseInt(amount || '0', 10);
    if (amt < active.minAmount) return alert(`Minimum is ${formatNaira(active.minAmount)}`);
    setLoading(true);
    const r = await Api.invest(active.id, amt);
    setLoading(false);
    if (r.success) {
      alert('Investment successful');
      setActive(null);
    } else { alert('Failed to invest'); }
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="flex items-center justify-between gap-3">
        <input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search products…" className="w-full md:w-80 rounded-xl border border-base bg-[var(--card)] px-4 py-2.5 text-sm" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filtered.map((p) => (
          <Card key={p.id} className="overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{p.name}</span>
                <span className="text-xs text-muted">{p.category}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted min-h-12">{p.description}</p>
              <div className="mt-3 text-sm grid grid-cols-3 gap-2">
                <div><span className="text-muted">Rate</span><div className="font-medium">{p.rate}%</div></div>
                <div><span className="text-muted">Term</span><div className="font-medium">{p.termMonths}m</div></div>
                <div><span className="text-muted">Min</span><div className="font-medium">{formatNaira(p.minAmount)}</div></div>
              </div>
              <Button className="mt-4 w-full" onClick={()=>{ setActive(p); setAmount(p.minAmount.toString()); }} variant="gradient">Invest</Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!active}>
        <DialogContent>
          {active && (
            <>
              <DialogHeader title={active.name} description={`${active.provider} • ${active.termMonths} months`} />
              <div className="space-y-3">
                <div className="text-sm text-muted">Rate {active.rate}% • Minimum {formatNaira(active.minAmount)}</div>
                <Input inputMode="numeric" value={amount} onChange={(e)=>setAmount(e.target.value.replace(/[^0-9]/g,''))} />
                <Button className="w-full" onClick={invest} disabled={loading}>
                  {loading ? 'Processing…' : 'Confirm investment'}
                </Button>
                <Button className="w-full" variant="ghost" onClick={()=>setActive(null)}>Cancel</Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
