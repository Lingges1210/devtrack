"use client";

import { useEffect, useState } from "react";
import DashboardShell from "@/components/DashboardShell";
import PageHeader from "@/components/PageHeader";
import StatCard from "@/components/StatCard";
import { api } from "@/lib/api";
import { AlertTriangle, Bug, CheckCircle2, FolderKanban, ListTodo } from "lucide-react";

type Stats = {
  totalProjects: number;
  totalTasks: number;
  completedTasks: number;
  openBugs: number;
  criticalBugs: number;
  sprintProgress: number;
};

export default function ReportsPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const res = await api.getStats();
        setStats(res.data);
      } catch (error) {
        setMessage(error instanceof Error ? error.message : "Failed to load report");
      }
    }
    load();
  }, []);

  return (
    <DashboardShell>
      <PageHeader eyebrow="Reports" title="Sprint & Testing Report" description="Review live backend counts for projects, tasks, bugs, and sprint completion." />
      {message && <div className="mb-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{message}</div>}
      {!stats ? <div className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-500">Loading reports...</div> : (
        <>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            <StatCard title="Projects" value={String(stats.totalProjects)} description="Total workspaces" icon={FolderKanban} accent="indigo" />
            <StatCard title="Tasks" value={String(stats.totalTasks)} description="All tracked tasks" icon={ListTodo} accent="blue" />
            <StatCard title="Done" value={String(stats.completedTasks)} description="Completed tasks" icon={CheckCircle2} accent="green" />
            <StatCard title="Open Bugs" value={String(stats.openBugs)} description="Not yet closed" icon={Bug} accent="amber" />
            <StatCard title="Critical" value={String(stats.criticalBugs)} description="Urgent defects" icon={AlertTriangle} accent="rose" />
          </div>
          <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">Overall Sprint Completion</h2>
            <div className="mt-5 h-3 overflow-hidden rounded-full bg-indigo-100">
              <div className="h-full rounded-full bg-indigo-600" style={{ width: `${stats.sprintProgress}%` }} />
            </div>
            <p className="mt-3 text-sm text-slate-500">{stats.sprintProgress}% of tracked tasks are completed.</p>
          </section>
        </>
      )}
    </DashboardShell>
  );
}
