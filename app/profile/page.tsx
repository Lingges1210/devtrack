"use client";

import { useEffect, useState } from "react";
import DashboardShell from "@/components/DashboardShell";
import PageHeader from "@/components/PageHeader";
import { supabase } from "@/lib/supabaseClient";

export default function ProfilePage() {
  const [profile, setProfile] = useState({ full_name: "", role: "developer" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadProfile() {
      const { data: auth } = await supabase.auth.getUser();
      if (!auth.user) return;

      const { data } = await supabase
        .from("users_profile")
        .select("full_name, role")
        .eq("id", auth.user.id)
        .single();

      if (data) setProfile(data);
    }
    loadProfile();
  }, []);

  async function saveProfile(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");
    const { data: auth } = await supabase.auth.getUser();
    if (!auth.user) return;

    const { error } = await supabase
      .from("users_profile")
      .update(profile)
      .eq("id", auth.user.id);

    if (error) setMessage(error.message);
    else setMessage("Profile updated successfully.");
  }

  return (
    <DashboardShell>
      <PageHeader eyebrow="Profile" title="Workspace Profile" description="Update the profile attached to your authenticated Supabase account." />
      <form onSubmit={saveProfile} className="max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-slate-700">Full Name</label>
            <input value={profile.full_name} onChange={(e) => setProfile({ ...profile, full_name: e.target.value })} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500" />
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-700">Role</label>
            <select value={profile.role} onChange={(e) => setProfile({ ...profile, role: e.target.value })} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500">
              <option value="admin">Project Manager</option><option value="developer">Developer</option><option value="tester">Tester / QA</option>
            </select>
          </div>
          {message && <div className="rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-3 text-sm text-indigo-700">{message}</div>}
          <button className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700">Save Profile</button>
        </div>
      </form>
    </DashboardShell>
  );
}
