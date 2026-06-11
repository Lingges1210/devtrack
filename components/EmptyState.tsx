import { Inbox } from "lucide-react";

export default function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 text-slate-400">
        <Inbox size={22} />
      </div>
      <h3 className="font-bold text-slate-900">{title}</h3>
      <p className="mx-auto mt-2 max-w-sm text-sm text-slate-500">
        {description}
      </p>
    </div>
  );
}
