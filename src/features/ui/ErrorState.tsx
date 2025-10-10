import React from "react";
import { AlertTriangle } from "lucide-react";

export default function ErrorState({ title = "Something went wrong", message = "Please try again or contact support.", onRetry }: { title?: string; message?: string; onRetry?: () => void; }) {
  return (
    <div className="rounded-xl border p-4 bg-red-500/5">
      <div className="inline-flex items-center gap-2 text-sm font-medium"><AlertTriangle className="size-4 text-red-500"/> {title}</div>
      <div className="text-xs text-muted-foreground mt-1">{message}</div>
      {onRetry ? <button onClick={onRetry} className="mt-2 px-3 py-1.5 rounded-lg border text-sm">Retry</button> : null}
    </div>
  );
}
