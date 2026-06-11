"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, Plus, Search } from "lucide-react";
import Sidebar from "./Sidebar";
import { supabase } from "@/lib/supabaseClient";

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.push("/login");
        return;
      }
      setChecking(false);
    }

    checkAuth();
  }, [router]);

  if (checking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-500">
        Checking workspace access...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <Sidebar />

      <section className="min-h-screen lg:pl-72">
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 px-6 py-4 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
            <div className="hidden w-full max-w-md items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-slate-400 md:flex">
              <Search size={17} />
              <span className="text-sm">Search projects, tasks, or bugs...</span>
            </div>

            <div className="ml-auto flex items-center gap-3">
              <button className="hidden items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-200 hover:bg-indigo-700 md:inline-flex">
                <Plus size={16} />
                New Issue
              </button>
              <button className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-500 hover:bg-slate-50">
                <Bell size={18} />
              </button>
              <span className="rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-bold text-green-700">
                Online
              </span>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-7xl px-6 py-8">{children}</div>
      </section>
    </main>
  );
}
