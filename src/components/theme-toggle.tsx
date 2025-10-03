"use client";
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ThemeToggle({ onChange }: { onChange?: (theme: 'light' | 'dark') => void }) {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => 'dark');
  useEffect(() => { onChange?.(theme); }, [theme, onChange]);
  return (
    <Button variant="ghost" size="sm" aria-label="Toggle theme" onClick={() => setTheme(t => (t === 'dark' ? 'light' : 'dark'))}>
      {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
