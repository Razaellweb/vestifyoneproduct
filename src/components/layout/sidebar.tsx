import Link from 'next/link';
import { PiggyBank, LineChart, Banknote, Settings, Home, HandCoins } from 'lucide-react';
import { cn } from '@/lib/utils';

const nav = [
  { href: '/dashboard', label: 'Overview', icon: Home },
  { href: '/invest', label: 'Invest', icon: LineChart },
  { href: '/savings', label: 'Savings', icon: PiggyBank },
  { href: '/loans', label: 'Loans', icon: HandCoins },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ className }: { className?: string }) {
  return (
    <aside className={cn('hidden md:flex md:w-64 shrink-0 flex-col gap-2', className)} aria-label="Sidebar">
      <div className="rounded-2xl border border-base bg-[var(--card)] p-3">
        <div className="px-2 py-1 text-xs text-muted">Navigation</div>
        <nav className="mt-1 flex flex-col">
          {nav.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-[var(--ring)]">
              <Icon className="w-4 h-4 text-[var(--accent)]" />
              <span>{label}</span>
            </Link>
          ))}
        </nav>
      </div>
      <div className="rounded-2xl border border-base bg-[var(--card)] p-3">
        <div className="text-xs text-muted">Limits</div>
        <div className="mt-2 text-sm"><span className="text-muted">Daily transfers:</span> ₦500k</div>
      </div>
    </aside>
  );
}
