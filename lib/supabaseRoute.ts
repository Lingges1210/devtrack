import { createClient } from "@supabase/supabase-js";
import type { NextRequest } from "next/server";

export function createRouteClient(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase environment variables");
  }

  const authHeader = request.headers.get("authorization");

  return createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: authHeader ? { Authorization: authHeader } : {},
    },
  });
}

export function unauthorizedResponse() {
  return Response.json(
    { error: "Unauthorized. Please login first." },
    { status: 401 }
  );
}