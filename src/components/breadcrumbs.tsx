"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const crumbs = segments.map((seg, i) => {
    const href = "/" + segments.slice(0, i + 1).join("/");
    const label = seg.replace(/-/g, " ");
    return { href, label };
  });
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-2 text-sm text-muted">
        <li><Link href="/">Home</Link></li>
        {crumbs.map((c, i) => (
          <li key={c.href} className="flex items-center gap-2">
            <span aria-hidden>/</span>
            {i === crumbs.length - 1 ? (
              <span className="text-[var(--fg)]">{c.label}</span>
            ) : (
              <Link href={c.href} className="hover:underline">{c.label}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
export default Breadcrumbs;
