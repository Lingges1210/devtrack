import { supabase } from "@/lib/supabaseClient";

async function getAuthHeaders() {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;

  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function request<T>(url: string, options: RequestInit = {}): Promise<T> {
  const headers = await getAuthHeaders();

  const res = await fetch(url, {
    ...options,
    headers: {
      ...headers,
      ...(options.headers || {}),
    },
  });

  const payload = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(payload.error || "Request failed");
  }

  return payload as T;
}

export const api = {
  getStats: () => request<{ data: any }>("/api/dashboard/stats"),
  getActivity: () => request<{ data: any[] }>("/api/activity"),

  getProjects: () => request<{ data: any[] }>("/api/projects"),
  createProject: (body: any) =>
    request<{ data: any }>("/api/projects", {
      method: "POST",
      body: JSON.stringify(body),
    }),
  updateProject: (id: string, body: any) =>
    request<{ data: any }>(`/api/projects/${id}`, {
      method: "PATCH",
      body: JSON.stringify(body),
    }),
  deleteProject: (id: string) =>
    request<{ data: any }>(`/api/projects/${id}`, { method: "DELETE" }),

  getTasks: () => request<{ data: any[] }>("/api/tasks"),
  createTask: (body: any) =>
    request<{ data: any }>("/api/tasks", {
      method: "POST",
      body: JSON.stringify(body),
    }),
  updateTask: (id: string, body: any) =>
    request<{ data: any }>(`/api/tasks/${id}`, {
      method: "PATCH",
      body: JSON.stringify(body),
    }),
  deleteTask: (id: string) =>
    request<{ data: any }>(`/api/tasks/${id}`, { method: "DELETE" }),

  getBugs: () => request<{ data: any[] }>("/api/bugs"),
  createBug: (body: any) =>
    request<{ data: any }>("/api/bugs", {
      method: "POST",
      body: JSON.stringify(body),
    }),
  updateBug: (id: string, body: any) =>
    request<{ data: any }>(`/api/bugs/${id}`, {
      method: "PATCH",
      body: JSON.stringify(body),
    }),
  deleteBug: (id: string) =>
    request<{ data: any }>(`/api/bugs/${id}`, { method: "DELETE" }),
};
