"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function TestSupabasePage() {
  const [message, setMessage] = useState("Checking connection...");

  useEffect(() => {
    async function testConnection() {
      const { error } = await supabase.from("projects").select("*").limit(1);
      if (error) setMessage(`Supabase error: ${error.message}`);
      else setMessage("Supabase connected successfully ✅");
    }
    testConnection();
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-900">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-extrabold">Supabase Test</h1>
        <p className="mt-4 text-slate-500">{message}</p>
      </div>
    </main>
  );
}
