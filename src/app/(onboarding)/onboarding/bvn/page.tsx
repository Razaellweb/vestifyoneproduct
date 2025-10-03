"use client";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Api } from '@/lib/api';
import { Info } from 'lucide-react';

export default function BVNPage() {
  const [bvn, setBvn] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string|undefined>();

  async function submit() {
    setLoading(true); setError(undefined);
    const res = await Api.verifyBvn(bvn);
    setLoading(false);
    if (res.success && (res as any).data?.verified) {
      window.location.href = '/onboarding/savings-setup';
    } else {
      setError('Could not verify BVN. Double-check and try again.');
    }
  }

  return (
    <div className="card p-6">
      <h1 className="text-2xl font-semibold">Verify your BVN</h1>
      <p className="text-sm text-muted mt-1">CBN requires BVN to enable savings and investments. We never store your raw BVN.</p>

      <div className="mt-6 space-y-3">
        <Label htmlFor="bvn">Bank Verification Number (11 digits)</Label>
        <Input id="bvn" inputMode="numeric" maxLength={11} placeholder="e.g. 22345678901" value={bvn} onChange={(e)=>setBvn(e.target.value.replace(/[^0-9]/g,'').slice(0,11))} />
        <p className="text-xs text-muted inline-flex items-center gap-2"><Info className="w-3.5 h-3.5" /> We mask your details and only use BVN for verification.</p>
        {error && <p className="text-xs text-red-400">{error}</p>}
        <Button onClick={submit} disabled={loading || bvn.length!==11} className="w-full" variant="gradient">{loading ? 'Verifying…' : 'Verify BVN'}</Button>
      </div>
    </div>
  );
}
