import DashboardShell from "@/components/DashboardShell";
import StatCard from "@/components/StatCard";
import {
  AlertTriangle,
  Bug,
  CheckCircle2,
  FolderKanban,
  ListTodo,
  Plus,
} from "lucide-react";

const activities = [
  {
    title: "Critical bug reported",
    desc: "Login button does not respond after valid credentials.",
    tag: "Bug",
    tagColor: "bg-rose-50 text-rose-700",
  },
  {
    title: "Task moved to testing",
    desc: "Dashboard analytics card completed by frontend team.",
    tag: "Task",
    tagColor: "bg-blue-50 text-blue-700",
  },
  {
    title: "New project created",
    desc: "Inventory Management System added to workspace.",
    tag: "Project",
    tagColor: "bg-green-50 text-green-700",
  },
  {
    title: "Bug marked as fixed",
    desc: "Profile image upload issue resolved.",
    tag: "Fix",
    tagColor: "bg-emerald-50 text-emerald-700",
  },
];

const deadlines = [
  {
    task: "Fix login validation bug",
    project: "Clinic System",
    due: "Tomorrow",
    priority: "Critical",
    priorityColor: "bg-rose-50 text-rose-700",
  },
  {
    task: "Complete task board UI",
    project: "DevTrack",
    due: "2 days",
    priority: "High",
    priorityColor: "bg-amber-50 text-amber-700",
  },
  {
    task: "Test report export",
    project: "Inventory System",
    due: "Friday",
    priority: "Medium",
    priorityColor: "bg-blue-50 text-blue-700",
  },
];

export default function DashboardPage() {
  return (
    <DashboardShell>
      {/* Page header */}
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">
            Overview
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
            Project Dashboard
          </h1>
          <p className="mt-1.5 max-w-xl text-sm text-slate-500">
            Monitor project health, active tasks, open bugs, and sprint progress
            from one developer dashboard.
          </p>
        </div>

        <button className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700">
          <Plus size={16} />
          Create Project
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Projects"
          value="4"
          description="2 active projects"
          icon={FolderKanban}
          accent="indigo"
        />
        <StatCard
          title="Active Tasks"
          value="18"
          description="7 due this week"
          icon={ListTodo}
          accent="blue"
        />
        <StatCard
          title="Open Bugs"
          value="7"
          description="3 waiting for fix"
          icon={Bug}
          accent="amber"
        />
        <StatCard
          title="Critical Issues"
          value="2"
          description="Needs urgent review"
          icon={AlertTriangle}
          accent="rose"
        />
      </div>

      {/* Sprint + Bug severity row */}
      <div className="mt-6 grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        {/* Sprint progress */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Sprint Progress</h2>
              <p className="mt-1 text-sm text-slate-400">
                Current sprint task completion summary.
              </p>
            </div>
            <CheckCircle2 className="text-green-500" size={24} />
          </div>

          <div className="mt-6">
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-slate-500">Completed Tasks</span>
              <span className="font-bold text-indigo-600">64%</span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-indigo-100">
              <div className="h-full w-[64%] rounded-full bg-indigo-600" />
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <MiniMetric label="Done" value="23" color="text-green-600" />
              <MiniMetric label="In Progress" value="9" color="text-blue-600" />
              <MiniMetric label="Testing" value="4" color="text-amber-600" />
            </div>
          </div>
        </section>

        {/* Bug severity */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">Bug Severity</h2>
          <p className="mt-1 text-sm text-slate-400">Distribution of reported issues.</p>

          <div className="mt-5 space-y-4">
            <SeverityRow label="Critical" value="2" width="28%" color="bg-rose-500" />
            <SeverityRow label="High" value="3" width="42%" color="bg-orange-500" />
            <SeverityRow label="Medium" value="5" width="70%" color="bg-amber-400" />
            <SeverityRow label="Low" value="4" width="56%" color="bg-green-500" />
          </div>
        </section>
      </div>

      {/* Activity + Deadlines row */}
      <div className="mt-5 grid gap-5 xl:grid-cols-[0.85fr_1.15fr]">
        {/* Recent activity */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">Recent Activity</h2>

          <div className="mt-5 space-y-3">
            {activities.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-slate-100 bg-slate-50 p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-sm font-semibold text-slate-900">{item.title}</h3>
                  <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${item.tagColor}`}>
                    {item.tag}
                  </span>
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Upcoming deadlines */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">Upcoming Deadlines</h2>

          <div className="mt-5 overflow-hidden rounded-xl border border-slate-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-400">
                <tr>
                  <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider">Task</th>
                  <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider">Project</th>
                  <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider">Due</th>
                  <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider">Priority</th>
                </tr>
              </thead>
              <tbody>
                {deadlines.map((row, i) => (
                  <tr key={i} className="border-t border-slate-100">
                    <td className="px-4 py-3.5 font-semibold text-slate-800">{row.task}</td>
                    <td className="px-4 py-3.5 text-slate-400">{row.project}</td>
                    <td className="px-4 py-3.5 text-slate-400">{row.due}</td>
                    <td className="px-4 py-3.5">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${row.priorityColor}`}>
                        {row.priority}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}

function MiniMetric({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
      <p className="text-xs text-slate-400">{label}</p>
      <p className={`mt-1.5 text-2xl font-extrabold ${color}`}>{value}</p>
    </div>
  );
}

function SeverityRow({
  label,
  value,
  width,
  color,
}: {
  label: string;
  value: string;
  width: string;
  color: string;
}) {
  return (
    <div>
      <div className="mb-1.5 flex justify-between text-sm">
        <span className="font-medium text-slate-700">{label}</span>
        <span className="text-slate-400">{value}</span>
      </div>
      <div className="h-2 rounded-full bg-slate-100">
        <div className={`h-2 rounded-full ${color}`} style={{ width }} />
      </div>
    </div>
  );
}
