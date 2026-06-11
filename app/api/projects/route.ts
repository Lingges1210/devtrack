import { NextRequest } from "next/server";
import { createRouteClient, unauthorizedResponse } from "@/lib/supabaseRoute";

export async function GET(request: NextRequest) {
  const supabase = createRouteClient(request);
  const { data, error } = await supabase
    .from("projects")
    .select("*")
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
    .from("projects")
    .insert({
      name: body.name,
      description: body.description || null,
      status: body.status || "planning",
      start_date: body.start_date || null,
      end_date: body.end_date || null,
      created_by: user.id,
    })
    .select("*")
    .single();

  if (error) return Response.json({ error: error.message }, { status: 400 });

  await supabase.from("activity_logs").insert({
    project_id: data.id,
    user_id: user.id,
    action: `Created project: ${data.name}`,
  });

  return Response.json({ data }, { status: 201 });
}
