import { NextRequest } from "next/server";
import { createRouteClient } from "@/lib/supabaseRoute";

export async function GET(request: NextRequest) {
  const supabase = createRouteClient(request);
  const { data, error } = await supabase
    .from("activity_logs")
    .select("*, projects(name), users_profile(full_name)")
    .order("created_at", { ascending: false })
    .limit(10);

  if (error) return Response.json({ error: error.message }, { status: 400 });
  return Response.json({ data });
}
