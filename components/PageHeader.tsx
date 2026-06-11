type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  action?: React.ReactNode;
};

export default function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: PageHeaderProps) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">
          {eyebrow}
        </p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
          {title}
        </h1>
        <p className="mt-1.5 max-w-xl text-sm text-slate-500">{description}</p>
      </div>
      {action}
    </div>
  );
}
