import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Sign up • Vestify One' };

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-md py-10">{children}</div>;
}
