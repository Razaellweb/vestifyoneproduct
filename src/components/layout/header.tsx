"use client";
import ThemeToggle from '@/components/theme-toggle';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header({ onTheme, setThemeHost }: { onTheme?: (t: 'light' | 'dark') => void; setThemeHost?: (t: 'light' | 'dark') => void }) {
  return (
    <header className="sticky top-0 z-20 mb-4 flex items-center justify-between rounded-2xl border border-base bg-[var(--card)]/80 px-3 py-2 backdrop-blur supports-[backdrop-filter]:bg-[var(--card)]/60">
      <div className="font-semibold">Vestify One</div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" aria-label="Notifications"><Bell className="w-4 h-4" /></Button>
        <ThemeToggle onChange={(t)=>{ onTheme?.(t); setThemeHost?.(t); }} />
        <div className="ml-1 size-8 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)]" aria-label="User avatar" />
      </div>
    </header>
  );
}
