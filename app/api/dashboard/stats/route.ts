import { NextRequest } from "next/server";
import { createRouteClient } from "@/lib/supabaseRoute";

export async function GET(request: NextRequest) {
  const supabase = createRouteClient(request);

  const [projects, tasks, doneTasks, bugs, criticalBugs] = await Promise.all([
    supabase.from("projects").select("id", { count: "exact", head: true }),
    supabase.from("tasks").select("id", { count: "exact", head: true }),
    supabase.from("tasks").select("id", { count: "exact", head: true }).eq("status", "done"),
    supabase.from("bugs").select("id", { count: "exact", head: true }).neq("status", "closed"),
    supabase.from("bugs").select("id", { count: "exact", head: true }).eq("severity", "critical"),
  ]);

  const errors = [projects, tasks, doneTasks, bugs, criticalBugs]
    .map((res) => res.error?.message)
    .filter(Boolean);

  if (errors.length) {
    return Response.json({ error: errors[0] }, { status: 400 });
  }

  const taskCount = tasks.count || 0;
  const doneCount = doneTasks.count || 0;
  const sprintProgress = taskCount === 0 ? 0 : Math.round((doneCount / taskCount) * 100);

  return Response.json({
    data: {
      totalProjects: projects.count || 0,
      totalTasks: taskCount,
      completedTasks: doneCount,
      openBugs: bugs.count || 0,
      criticalBugs: criticalBugs.count || 0,
      sprintProgress,
    },
  });
}
