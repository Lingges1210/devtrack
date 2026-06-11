"use client";

import { useEffect, useMemo, useState } from "react";
import DashboardShell from "@/components/DashboardShell";
import PageHeader from "@/components/PageHeader";
import EmptyState from "@/components/EmptyState";
import { api } from "@/lib/api";
import type { Project, Task, TaskStatus } from "@/lib/types";
import { Plus } from "lucide-react";

const columns: { key: TaskStatus; label: string }[] = [
  { key: "todo", label: "To Do" },
  { key: "in_progress", label: "In Progress" },
  { key: "testing", label: "Testing" },
  { key: "done", label: "Done" },
];

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({ project_id: "", title: "", description: "", priority: "medium", status: "todo", due_date: "" });

  async function load() {
    try {
      const [taskRes, projectRes] = await Promise.all([api.getTasks(), api.getProjects()]);
      setTasks(taskRes.data);
      setProjects(projectRes.data);
      if (!form.project_id && projectRes.data[0]?.id) {
        setForm((current) => ({ ...current, project_id: projectRes.data[0].id }));
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to load tasks");
    }
  }

  useEffect(() => { load(); }, []);

  const grouped = useMemo(() => {
    return columns.reduce<Record<TaskStatus, Task[]>>((acc, column) => {
      acc[column.key] = tasks.filter((task) => task.status === column.key);
      return acc;
    }, { todo: [], in_progress: [], testing: [], done: [] });
  }, [tasks]);

  async function createTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");
    try {
      await api.createTask(form);
      setForm({ ...form, title: "", description: "", due_date: "" });
      await load();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to create task");
    }
  }

  async function updateStatus(id: string, status: TaskStatus) {
    await api.updateTask(id, { status });
    await load();
  }

  return (
    <DashboardShell>
      <PageHeader eyebrow="Tasks" title="Development Task Board" description="Create and manage task cards across a software delivery lifecycle." action={<a href="#new-task" className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-200 hover:bg-indigo-700"><Plus size={16}/> New Task</a>} />
      {message && <div className="mb-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{message}</div>}

      <form id="new-task" onSubmit={createTask} className="mb-6 grid gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-5">
        <select value={form.project_id} onChange={(e) => setForm({ ...form, project_id: e.target.value })} required className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-500">
          {projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required placeholder="Task title" className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 md:col-span-2" />
        <select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })} className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-500">
          <option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option><option value="critical">Critical</option>
        </select>
        <button className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">Create</button>
      </form>

      {tasks.length === 0 ? <EmptyState title="No tasks yet" description="Create a project first, then add development tasks to your board." /> : (
        <div className="grid gap-4 xl:grid-cols-4">
          {columns.map((column) => (
            <section key={column.key} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-slate-900">{column.label}</h2>
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-500">{grouped[column.key].length}</span>
              </div>
              <div className="mt-4 space-y-3">
                {grouped[column.key].map((task) => (
                  <article key={task.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <h3 className="text-sm font-bold text-slate-900">{task.title}</h3>
                    <p className="mt-1 text-xs text-slate-500">{task.projects?.name || "No project"}</p>
                    <div className="mt-3 flex items-center justify-between gap-3">
                      <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-bold capitalize text-indigo-700">{task.priority}</span>
                      <select value={task.status} onChange={(e) => updateStatus(task.id, e.target.value as TaskStatus)} className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs text-slate-600">
                        {columns.map((c) => <option key={c.key} value={c.key}>{c.label}</option>)}
                      </select>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </DashboardShell>
  );
}
