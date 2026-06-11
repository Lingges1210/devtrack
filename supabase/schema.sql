-- ============================================================
-- DevTrack Database Schema
-- Developer Task & Bug Tracking System
-- Supabase PostgreSQL
-- ============================================================

create extension if not exists "pgcrypto";

create table if not exists users_profile (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  role text check (role in ('admin', 'developer', 'tester')) default 'developer',
  created_at timestamp with time zone default now()
);

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  status text check (status in ('planning', 'active', 'completed', 'on_hold')) default 'planning',
  start_date date,
  end_date date,
  created_by uuid references users_profile(id) on delete set null,
  created_at timestamp with time zone default now()
);

create table if not exists tasks (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects(id) on delete cascade,
  title text not null,
  description text,
  assigned_to uuid references users_profile(id) on delete set null,
  priority text check (priority in ('low', 'medium', 'high', 'critical')) default 'medium',
  status text check (status in ('todo', 'in_progress', 'testing', 'done')) default 'todo',
  due_date date,
  created_at timestamp with time zone default now()
);

create table if not exists bugs (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects(id) on delete cascade,
  title text not null,
  description text not null,
  steps_to_reproduce text,
  expected_result text,
  actual_result text,
  severity text check (severity in ('low', 'medium', 'high', 'critical')) default 'medium',
  status text check (status in ('open', 'in_progress', 'fixed', 'testing', 'closed', 'reopened')) default 'open',
  reported_by uuid references users_profile(id) on delete set null,
  assigned_to uuid references users_profile(id) on delete set null,
  screenshot_url text,
  created_at timestamp with time zone default now()
);

create table if not exists activity_logs (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects(id) on delete cascade,
  user_id uuid references users_profile(id) on delete set null,
  action text not null,
  created_at timestamp with time zone default now()
);

alter table users_profile enable row level security;
alter table projects enable row level security;
alter table tasks enable row level security;
alter table bugs enable row level security;
alter table activity_logs enable row level security;

drop policy if exists "Users can read profiles" on users_profile;
drop policy if exists "Users can insert own profile" on users_profile;
drop policy if exists "Users can update own profile" on users_profile;
drop policy if exists "Authenticated users can read projects" on projects;
drop policy if exists "Authenticated users can create projects" on projects;
drop policy if exists "Authenticated users can update projects" on projects;
drop policy if exists "Authenticated users can delete projects" on projects;
drop policy if exists "Authenticated users can read tasks" on tasks;
drop policy if exists "Authenticated users can create tasks" on tasks;
drop policy if exists "Authenticated users can update tasks" on tasks;
drop policy if exists "Authenticated users can delete tasks" on tasks;
drop policy if exists "Authenticated users can read bugs" on bugs;
drop policy if exists "Authenticated users can create bugs" on bugs;
drop policy if exists "Authenticated users can update bugs" on bugs;
drop policy if exists "Authenticated users can delete bugs" on bugs;
drop policy if exists "Authenticated users can read activity logs" on activity_logs;
drop policy if exists "Authenticated users can create activity logs" on activity_logs;

create policy "Users can read profiles" on users_profile for select to authenticated using (true);
create policy "Users can insert own profile" on users_profile for insert to authenticated with check (auth.uid() = id);
create policy "Users can update own profile" on users_profile for update to authenticated using (auth.uid() = id);

create policy "Authenticated users can read projects" on projects for select to authenticated using (true);
create policy "Authenticated users can create projects" on projects for insert to authenticated with check (auth.uid() = created_by);
create policy "Authenticated users can update projects" on projects for update to authenticated using (true);
create policy "Authenticated users can delete projects" on projects for delete to authenticated using (true);

create policy "Authenticated users can read tasks" on tasks for select to authenticated using (true);
create policy "Authenticated users can create tasks" on tasks for insert to authenticated with check (true);
create policy "Authenticated users can update tasks" on tasks for update to authenticated using (true);
create policy "Authenticated users can delete tasks" on tasks for delete to authenticated using (true);

create policy "Authenticated users can read bugs" on bugs for select to authenticated using (true);
create policy "Authenticated users can create bugs" on bugs for insert to authenticated with check (true);
create policy "Authenticated users can update bugs" on bugs for update to authenticated using (true);
create policy "Authenticated users can delete bugs" on bugs for delete to authenticated using (true);

create policy "Authenticated users can read activity logs" on activity_logs for select to authenticated using (true);
create policy "Authenticated users can create activity logs" on activity_logs for insert to authenticated with check (true);
