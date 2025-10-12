import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div data-dashboard="true" className="min-h-screen grid md:grid-cols-[18rem_1fr]">
      <Sidebar />
      <div className="relative">
        {/* decorative blobs */}
        <div className="pointer-events-none absolute -top-20 -right-20 w-72 h-72 rounded-full blur-3xl opacity-20 bg-[color-mix(in_oklab,var(--secondary)_50%,transparent)]" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 w-72 h-72 rounded-full blur-3xl opacity-20 bg-[color-mix(in_oklab,var(--primary)_50%,transparent)]" />
        <Header />
        <main className="px-4 md:px-6 py-6 space-y-6">{children}</main>
      </div>
    </div>
  );
}
