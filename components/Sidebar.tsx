"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  BarChart3,
  Bug,
  FolderKanban,
  GitBranch,
  Home,
  ListTodo,
  LogOut,
  Settings,
  UserCircle,
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Projects", href: "/projects", icon: FolderKanban },
  { name: "Tasks", href: "/tasks", icon: ListTodo },
  { name: "Bugs", href: "/bugs", icon: Bug },
  { name: "Reports", href: "/reports", icon: BarChart3 },
];

type Profile = {
  full_name: string;
  role: string;
};

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    async function loadProfile() {
      const { data: auth } = await supabase.auth.getUser();
      const user = auth.user;
      if (!user) return;

      const { data } = await supabase
        .from("users_profile")
        .select("full_name, role")
        .eq("id", user.id)
        .single();

      if (data) setProfile(data);
    }

    loadProfile();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-72 border-r border-slate-200 bg-white px-5 py-6 text-slate-900 lg:block">
      <Link href="/" className="flex items-center gap-3">
        <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 shadow-sm shadow-indigo-200">
          <GitBranch size={20} className="text-white" />
          <div className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border-2 border-white bg-green-500" />
        </div>
        <div>
          <h1 className="text-base font-bold tracking-tight">DevTrack</h1>
          <p className="text-xs text-slate-400">Software Delivery Workspace</p>
        </div>
      </Link>

      <nav className="mt-10 space-y-1.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                active
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Icon size={19} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-6 left-5 right-5">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center gap-3">
            <UserCircle className="text-indigo-600" size={34} />
            <div>
              <p className="text-sm font-bold">
                {profile?.full_name || "DevTrack User"}
              </p>
              <p className="text-xs capitalize text-slate-400">
                {profile?.role?.replace("_", " ") || "Workspace Member"}
              </p>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between gap-3">
            <Link
              href="/profile"
              className="flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-indigo-600"
            >
              <Settings size={14} />
              Profile
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-xs font-semibold text-rose-500 hover:text-rose-600"
            >
              <LogOut size={14} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
