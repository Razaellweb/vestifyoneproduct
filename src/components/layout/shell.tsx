"use client";
import * as React from 'react';
import Sidebar from './sidebar';
import Header from './header';

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = React.useState<'light' | 'dark'>('dark');
  return (
    <div data-theme={theme} className="grid min-h-[100dvh] grid-cols-1 md:grid-cols-[16rem_1fr] gap-4">
      <Sidebar className="mt-[4.5rem] md:mt-0" />
      <div className="flex flex-col">
        <Header setThemeHost={setTheme} />
        <main className="pb-10">{children}</main>
      </div>
    </div>
  );
}
