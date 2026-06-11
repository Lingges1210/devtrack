import { NextRequest } from "next/server";
import { createRouteClient, unauthorizedResponse } from "@/lib/supabaseRoute";

export async function GET(request: NextRequest) {
  const supabase = createRouteClient(request);
  const { data, error } = await supabase
    .from("bugs")
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
    .from("bugs")
    .insert({
      project_id: body.project_id,
      title: body.title,
      description: body.description,
      steps_to_reproduce: body.steps_to_reproduce || null,
      expected_result: body.expected_result || null,
      actual_result: body.actual_result || null,
      severity: body.severity || "medium",
      status: body.status || "open",
      reported_by: user.id,
      assigned_to: body.assigned_to || null,
      screenshot_url: body.screenshot_url || null,
    })
    .select("*, projects(name)")
    .single();

  if (error) return Response.json({ error: error.message }, { status: 400 });

  await supabase.from("activity_logs").insert({
    project_id: body.project_id,
    user_id: user.id,
    action: `Reported bug: ${body.title}`,
  });

  return Response.json({ data }, { status: 201 });
}
