import { NextRequest } from "next/server";
import { createRouteClient, unauthorizedResponse } from "@/lib/supabaseRoute";

export async function GET(request: NextRequest) {
  const supabase = createRouteClient(request);
  const { data, error } = await supabase
    .from("tasks")
    .select("*, projects(name)")
    .order("created_at", { ascending: false });

  if (error) return Response.json({ error: error.message }, { status: 400 });
  return Response.json({ data });
}

export async function POST(request: NextRequest) {
  const supabase = createRouteClient(request);
  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user;
  if (!user) return unauthorizedResponse();

  const body = await request.json();

  const { data, error } = await supabase
    .from("tasks")
    .insert({
      project_id: body.project_id,
      title: body.title,
      description: body.description || null,
      assigned_to: body.assigned_to || null,
      priority: body.priority || "medium",
      status: body.status || "todo",
      due_date: body.due_date || null,
    })
    .select("*, projects(name)")
    .single();

  if (error) return Response.json({ error: error.message }, { status: 400 });

  await supabase.from("activity_logs").insert({
    project_id: body.project_id,
    user_id: user.id,
    action: `Created task: ${body.title}`,
  });

  return Response.json({ data }, { status: 201 });
}
