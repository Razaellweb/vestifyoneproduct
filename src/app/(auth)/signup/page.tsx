"use client";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { Api } from '@/lib/api';

const schema = z.object({
  phone: z.string().regex(/^\+?234\d{10}$|^0\d{10}$/,{ message: 'Enter a valid Nigerian phone number' }),
  password: z.string().min(8, 'At least 8 characters'),
  terms: z.literal(true, { errorMap: () => ({ message: 'You must accept the terms' }) }),
});

type FormValues = z.infer<typeof schema>;

function strength(pw: string) {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[a-z]/.test(pw)) s++;
  if (/\d/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s;
}

export default function SignupPage() {
  const [otpOpen, setOtpOpen] = useState(false);
  const [otp, setOtp] = useState(['','','','','','']);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormValues>({ resolver: zodResolver(schema) });
  const pw = watch('password') || '';
  const s = strength(pw);

  async function onSubmit(values: FormValues) {
    setLoading(true);
    const res = await Api.signup({ phone: values.phone, password: values.password });
    if (res.success) {
      await Api.sendOtp({ phone: values.phone });
      setOtpOpen(true);
    }
    setLoading(false);
  }

  async function verifyOtp() {
    const code = otp.join('');
    const res = await Api.verifyOtp(code);
    if (res.success) {
      window.location.href = '/onboarding/bvn';
    } else {
      alert('Incorrect code. Try 123456 in mock mode.');
    }
  }

  return (
    <div className="card p-6">
      <h1 className="text-2xl font-semibold">Create your account</h1>
      <p className="text-sm text-muted mt-1">Join thousands of Nigerians saving and investing smarter.</p>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label htmlFor="phone">Phone number</Label>
          <Input id="phone" inputMode="tel" placeholder="e.g. 0803 123 4567" aria-invalid={!!errors.phone} {...register('phone')} />
          {errors.phone && <p className="mt-1 text-xs text-red-400">{errors.phone.message}</p>}
        </div>
        <div>
          <Label htmlFor="password">Create password</Label>
          <Input id="password" type="password" aria-invalid={!!errors.password} {...register('password')} />
          <div className="mt-2 flex h-2 overflow-hidden rounded-full border border-base">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex-1" style={{ background: i < s ? 'linear-gradient(135deg, var(--primary), var(--secondary))' : 'transparent' }} />
            ))}
          </div>
          <p className="mt-1 text-xs text-muted">Use at least 8 chars, add numbers and symbols for stronger security.</p>
          {errors.password && <p className="mt-1 text-xs text-red-400">{errors.password.message}</p>}
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" {...register('terms')} />
          <span>I agree to the Terms and Privacy Policy</span>
        </label>
        {errors.terms && <p className="-mt-2 text-xs text-red-400">{errors.terms.message}</p>}

        <Button disabled={loading} variant="gradient" className="w-full">{loading ? 'Creating account…' : 'Create account'}</Button>
      </form>

      <Dialog open={otpOpen}>
        <DialogContent>
          <DialogHeader title="Verify your phone" description="Enter the 6-digit code we sent to your phone." />
          <div aria-label="Enter 6 digit code" className="flex items-center gap-2 justify-between">
            {otp.map((v, i) => (
              <input
                key={i}
                value={v}
                onChange={(e)=>{
                  const t = e.target.value.replace(/[^0-9]/g,'').slice(-1);
                  const next = [...otp];
                  next[i] = t;
                  setOtp(next);
                  const el = document.getElementById('otp-'+(t? i+1 : i-1));
                  (el as HTMLInputElement | null)?.focus();
                }}
                id={`otp-${i}`}
                inputMode="numeric"
                className="w-12 h-12 text-center rounded-xl border border-base bg-[var(--card)] text-lg"
                maxLength={1}
                aria-label={`Digit ${i+1}`}
              />
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between text-sm">
            <button className="text-muted underline" onClick={async()=>{ await Api.sendOtp({ phone: '' }); alert('Code resent'); }}>Resend code</button>
            <Button onClick={verifyOtp}>Verify</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
