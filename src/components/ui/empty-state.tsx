import { ImageOff } from "lucide-react";

export default function EmptyState({ title = "Nothing here yet", description = "Come back later.", action }: { title?: string; description?: string; action?: React.ReactNode }) {
  return (
    <div className="text-center p-6 border border-dashed border-base rounded-xl">
      <div className="w-12 h-12 mx-auto rounded-full bg-white/5 grid place-items-center">
        <ImageOff className="w-6 h-6 text-[var(--accent)]" />
      </div>
      <p className="mt-3 font-medium">{title}</p>
      <p className="text-sm text-muted">{description}</p>
      {action && <div className="mt-3">{action}</div>}
    </div>
  );
}
