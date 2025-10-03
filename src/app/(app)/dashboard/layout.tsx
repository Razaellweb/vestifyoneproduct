import type { Metadata } from 'next';
import DashboardShell from '@/components/layout/shell';

export const metadata: Metadata = { title: 'Dashboard • Vestify One' };

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DashboardShell>{children}</DashboardShell>;
}
