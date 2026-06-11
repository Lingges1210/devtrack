"use client";

import { useEffect, useState } from "react";
import DashboardShell from "@/components/DashboardShell";
import PageHeader from "@/components/PageHeader";
import EmptyState from "@/components/EmptyState";
import { api } from "@/lib/api";
import type { Project } from "@/lib/types";
import { Plus } from "lucide-react";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    name: "",
    description: "",
    status: "planning",
    start_date: "",
    end_date: "",
  });

  async function loadProjects() {
    try {
      setLoading(true);
      const res = await api.getProjects();
      setProjects(res.data);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to load projects");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProjects();
  }, []);

  async function createProject(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");
    try {
      await api.createProject(form);
      setForm({ name: "", description: "", status: "planning", start_date: "", end_date: "" });
      await loadProjects();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to create project");
    }
  }

  return (
    <DashboardShell>
      <PageHeader
        eyebrow="Projects"
        title="Software Projects"
        description="Create project workspaces and track the delivery status of each software module."
        action={
          <a href="#new-project" className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-200 hover:bg-indigo-700">
            <Plus size={16} /> New Project
          </a>
        }
      />

      {message && <div className="mb-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{message}</div>}

      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <form id="new-project" onSubmit={createProject} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">Create Project</h2>
          <div className="mt-5 space-y-4">
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required placeholder="Project name" className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100" />
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Project description" rows={4} className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100" />
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100">
              <option value="planning">Planning</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="on_hold">On Hold</option>
            </select>
            <div className="grid gap-3 md:grid-cols-2">
              <input type="date" value={form.start_date} onChange={(e) => setForm({ ...form, start_date: e.target.value })} className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100" />
              <input type="date" value={form.end_date} onChange={(e) => setForm({ ...form, end_date: e.target.value })} className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100" />
            </div>
            <button className="w-full rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white hover:bg-indigo-700">Save Project</button>
          </div>
        </form>

        <section>
          {loading ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-500">Loading projects...</div>
          ) : projects.length === 0 ? (
            <EmptyState title="No projects yet" description="Create your first workspace to start tracking tasks and bugs." />
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {projects.map((project) => (
                <article key={project.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold capitalize text-indigo-700">{project.status.replace("_", " ")}</span>
                  <h3 className="mt-4 text-lg font-bold text-slate-900">{project.name}</h3>
                  <p className="mt-2 line-clamp-3 text-sm text-slate-500">{project.description || "No description added."}</p>
                  <p className="mt-4 text-xs text-slate-400">Created {new Date(project.created_at).toLocaleDateString()}</p>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </DashboardShell>
  );
}
