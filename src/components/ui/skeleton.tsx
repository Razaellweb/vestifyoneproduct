import { cn } from "@/lib/utils";
function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="skeleton" className={cn("bg-[color-mix(in_oklab,var(--fg)_8%,transparent)] animate-pulse rounded-md", className)} {...props} />;
}
export { Skeleton };
