"use client";

import { useEffect, useState } from "react";
import DashboardShell from "@/components/DashboardShell";
import PageHeader from "@/components/PageHeader";
import EmptyState from "@/components/EmptyState";
import { api } from "@/lib/api";
import type { BugReport, BugStatus, Project } from "@/lib/types";
import { Plus } from "lucide-react";

export default function BugsPage() {
  const [bugs, setBugs] = useState<BugReport[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({ project_id: "", title: "", description: "", severity: "medium", status: "open", steps_to_reproduce: "", expected_result: "", actual_result: "" });

  async function load() {
    try {
      const [bugRes, projectRes] = await Promise.all([api.getBugs(), api.getProjects()]);
      setBugs(bugRes.data);
      setProjects(projectRes.data);
      if (!form.project_id && projectRes.data[0]?.id) setForm((current) => ({ ...current, project_id: projectRes.data[0].id }));
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to load bugs");
    }
  }

  useEffect(() => { load(); }, []);

  async function createBug(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");
    try {
      await api.createBug(form);
      setForm({ ...form, title: "", description: "", steps_to_reproduce: "", expected_result: "", actual_result: "" });
      await load();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to report bug");
    }
  }

  async function updateStatus(id: string, status: BugStatus) {
    await api.updateBug(id, { status });
    await load();
  }

  return (
    <DashboardShell>
      <PageHeader eyebrow="Bug Tracker" title="Reported Bugs" description="Capture defects, classify severity, and track issue resolution status." action={<a href="#new-bug" className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-200 hover:bg-indigo-700"><Plus size={16}/> Report Bug</a>} />
      {message && <div className="mb-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{message}</div>}

      <form id="new-bug" onSubmit={createBug} className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid gap-3 md:grid-cols-4">
          <select value={form.project_id} onChange={(e) => setForm({ ...form, project_id: e.target.value })} required className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-500">
            {projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
          <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required placeholder="Bug title" className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 md:col-span-2" />
          <select value={form.severity} onChange={(e) => setForm({ ...form, severity: e.target.value })} className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-500">
            <option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option><option value="critical">Critical</option>
          </select>
        </div>
        <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required placeholder="Describe the bug" rows={3} className="mt-3 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-500" />
        <button className="mt-3 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">Save Bug Report</button>
      </form>

      {bugs.length === 0 ? <EmptyState title="No bugs reported" description="Report the first issue after creating a project workspace." /> : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-400">
              <tr>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider">Bug</th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider">Project</th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider">Severity</th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {bugs.map((bug) => (
                <tr key={bug.id} className="border-t border-slate-100">
                  <td className="px-5 py-4 font-semibold text-slate-900">{bug.title}<p className="mt-1 text-xs font-normal text-slate-500">{bug.description}</p></td>
                  <td className="px-5 py-4 text-slate-500">{bug.projects?.name || "No project"}</td>
                  <td className="px-5 py-4"><span className="rounded-full bg-rose-50 px-2.5 py-1 text-xs font-bold capitalize text-rose-700">{bug.severity}</span></td>
                  <td className="px-5 py-4">
                    <select value={bug.status} onChange={(e) => updateStatus(bug.id, e.target.value as BugStatus)} className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs capitalize text-slate-600">
                      <option value="open">Open</option><option value="in_progress">In Progress</option><option value="fixed">Fixed</option><option value="testing">Testing</option><option value="closed">Closed</option><option value="reopened">Reopened</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DashboardShell>
  );
}
