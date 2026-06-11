export type UserRole = "admin" | "developer" | "tester";
export type ProjectStatus = "planning" | "active" | "completed" | "on_hold";
export type TaskPriority = "low" | "medium" | "high" | "critical";
export type TaskStatus = "todo" | "in_progress" | "testing" | "done";
export type BugSeverity = "low" | "medium" | "high" | "critical";
export type BugStatus = "open" | "in_progress" | "fixed" | "testing" | "closed" | "reopened";

export type UserProfile = {
  id: string;
  full_name: string;
  role: UserRole;
  created_at: string;
};

export type Project = {
  id: string;
  name: string;
  description: string | null;
  status: ProjectStatus;
  start_date: string | null;
  end_date: string | null;
  created_by: string | null;
  created_at: string;
};

export type Task = {
  id: string;
  project_id: string;
  title: string;
  description: string | null;
  assigned_to: string | null;
  priority: TaskPriority;
  status: TaskStatus;
  due_date: string | null;
  created_at: string;
  projects?: { name: string } | null;
};

export type BugReport = {
  id: string;
  project_id: string;
  title: string;
  description: string;
  steps_to_reproduce: string | null;
  expected_result: string | null;
  actual_result: string | null;
  severity: BugSeverity;
  status: BugStatus;
  reported_by: string | null;
  assigned_to: string | null;
  screenshot_url: string | null;
  created_at: string;
  projects?: { name: string } | null;
};
