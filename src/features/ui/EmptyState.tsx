import React from "react";
import { Search } from "lucide-react";

export default function EmptyState({ title = "Nothing here yet", message = "No data found. Try again later." }: { title?: string; message?: string; }) {
  return (
    <div className="rounded-xl border p-4">
      <div className="inline-flex items-center gap-2 text-sm font-medium"><Search className="size-4"/> {title}</div>
      <div className="text-xs text-muted-foreground mt-1">{message}</div>
    </div>
  );
}
