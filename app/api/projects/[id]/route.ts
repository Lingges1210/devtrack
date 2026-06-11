import { NextRequest } from "next/server";
import { createRouteClient } from "@/lib/supabaseRoute";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = createRouteClient(request);
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return Response.json({ error: error.message }, { status: 404 });
  return Response.json({ data });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = createRouteClient(request);
  const body = await request.json();

  const { data, error } = await supabase
    .from("projects")
    .update(body)
    .eq("id", id)
    .select("*")
    .single();

  if (error) return Response.json({ error: error.message }, { status: 400 });
  return Response.json({ data });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = createRouteClient(request);
  const { error } = await supabase.from("projects").delete().eq("id", id);

  if (error) return Response.json({ error: error.message }, { status: 400 });
  return Response.json({ data: { id } });
}
