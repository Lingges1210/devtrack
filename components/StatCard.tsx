import type { LucideIcon } from "lucide-react";

type Accent = "indigo" | "blue" | "amber" | "rose" | "green";

const accentMap: Record<Accent, string> = {
  indigo: "bg-indigo-50 text-indigo-600",
  blue: "bg-blue-50 text-blue-600",
  amber: "bg-amber-50 text-amber-600",
  rose: "bg-rose-50 text-rose-600",
  green: "bg-green-50 text-green-600",
};

type StatCardProps = {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
  accent?: Accent;
};

export default function StatCard({
  title,
  value,
  description,
  icon: Icon,
  accent = "indigo",
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
            {value}
          </h3>
          <p className="mt-1 text-sm text-slate-400">{description}</p>
        </div>
        <div className={`rounded-xl p-3 ${accentMap[accent]}`}>
          <Icon size={22} />
        </div>
      </div>
    </div>
  );
}
