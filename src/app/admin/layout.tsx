import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div data-dashboard="true" className="min-h-screen grid md:grid-cols-[18rem_1fr]">
      <Sidebar />
      <div className="relative">
        <Header />
        <main className="px-4 md:px-6 py-6 space-y-6">{children}</main>
      </div>
    </div>
  );
}
