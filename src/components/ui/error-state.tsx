import { TriangleAlert } from "lucide-react";

export default function ErrorState({ title = "Something went wrong", description = "Please retry or contact support.", action }: { title?: string; description?: string; action?: React.ReactNode }) {
  return (
    <div className="text-center p-6 border border-base rounded-xl bg-[color-mix(in_oklab,tomato_10%,transparent)]">
      <div className="w-12 h-12 mx-auto rounded-full bg-[color-mix(in_oklab,tomato_25%,transparent)] grid place-items-center">
        <TriangleAlert className="w-6 h-6 text-[tomato]" />
      </div>
      <p className="mt-3 font-medium">{title}</p>
      <p className="text-sm text-muted">{description}</p>
      {action && <div className="mt-3">{action}</div>}
    </div>
  );
}
