import Link from "next/link";
import {
  ArrowRight,
  Bug,
  CheckCircle2,
  CircleDot,
  FolderKanban,
  GitBranch,
  LayoutDashboard,
  ListTodo,
  LockKeyhole,
  Network,
  Radar,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
  Users,
  Workflow,
} from "lucide-react";

const features = [
  {
    icon: FolderKanban,
    title: "Project Workspaces",
    desc: "Create structured software workspaces for products, internal tools, client projects, and academic development teams.",
    color: "bg-indigo-50 text-indigo-600",
  },
  {
    icon: ListTodo,
    title: "Task Lifecycle",
    desc: "Track work from planning to development, testing, and completion using a clean task workflow engine.",
    color: "bg-amber-50 text-amber-600",
  },
  {
    icon: Bug,
    title: "Issue & Bug Tracking",
    desc: "Capture bugs with severity, status, expected behaviour, actual results, and reproduction steps.",
    color: "bg-rose-50 text-rose-600",
  },
];

const workflow = [
  {
    title: "Plan project scope",
    desc: "Create a project workspace and define the software module being developed.",
  },
  {
    title: "Assign development tasks",
    desc: "Break work into tasks and track progress across development stages.",
  },
  {
    title: "Report and classify bugs",
    desc: "Log software defects with severity, status, and testing information.",
  },
  {
    title: "Monitor delivery progress",
    desc: "Use dashboards and activity logs to review team progress and sprint health.",
  },
];

const techStack = [
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Supabase Auth",
  "PostgreSQL",
  "CRUD Workflows",
  "Dashboard Analytics",
  "Role-Based Access",
  "Vercel Deployment",
  "Postman Testing",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Navbar */}
      <nav className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <DevTrackLogo />
            <div>
              <h1 className="text-base font-bold tracking-tight text-slate-900">
                DevTrack
              </h1>
              <p className="text-xs text-slate-400">Software Delivery Workspace</p>
            </div>
          </Link>

          <div className="hidden items-center gap-7 text-sm text-slate-500 md:flex">
            <a href="#platform" className="hover:text-indigo-600 transition-colors">Platform</a>
            <a href="#workflow" className="hover:text-indigo-600 transition-colors">Workflow</a>
            <a href="#security" className="hover:text-indigo-600 transition-colors">Security</a>
            <a href="#tech" className="hover:text-indigo-600 transition-colors">Stack</a>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 md:inline-flex"
            >
              Sign in
            </Link>
            <Link
              href="/register"
              className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700"
            >
              Launch Workspace
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-700">
            <Radar size={15} />
            Production-style issue tracking for software teams
          </div>

          <h1 className="max-w-2xl text-5xl font-extrabold leading-[1.12] tracking-tight text-slate-900 md:text-6xl">
            Ship{" "}
            <span className="text-indigo-600">cleaner</span>{" "}
            software, faster.
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-500">
            DevTrack is your full-stack workspace for tasks, bug reports, sprint
            visibility, and team progress — all in one professional dashboard.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white shadow-md shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-indigo-700"
            >
              Open Dashboard
              <ArrowRight size={17} />
            </Link>
            <Link
              href="/register"
              className="rounded-xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:bg-slate-50"
            >
              Create Account
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <MiniStat value="4" label="Core modules" />
            <MiniStat value="3" label="Team roles" />
            <MiniStat value="24/7" label="Issue visibility" />
          </div>

          <div className="mt-7 flex flex-wrap gap-3 text-sm text-slate-500">
            <TrustBadge icon={ShieldCheck} text="Authenticated workspace" />
            <TrustBadge icon={GitBranch} text="Sprint-ready workflow" />
            <TrustBadge icon={TerminalSquare} text="Built with TypeScript" />
          </div>
        </div>

        {/* Product preview */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-xl shadow-slate-200/60">
          {/* Preview header */}
          <div className="mb-5 flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <div className="flex items-center gap-3">
              <DevTrackLogo small />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-600">
                  Workspace
                </p>
                <h2 className="text-sm font-bold text-slate-900">
                  Release Control Center
                </h2>
              </div>
            </div>
            <span className="rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
              Stable
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <PreviewCard icon={FolderKanban} title="Projects" value="04" desc="2 active" iconColor="bg-indigo-50 text-indigo-600" />
            <PreviewCard icon={ListTodo} title="Tasks" value="36" desc="23 completed" iconColor="bg-blue-50 text-blue-600" />
            <PreviewCard icon={Bug} title="Open Bugs" value="07" desc="2 critical" iconColor="bg-rose-50 text-rose-600" />
            <PreviewCard icon={CheckCircle2} title="Sprint Health" value="64%" desc="on track" iconColor="bg-amber-50 text-amber-600" />
          </div>

          <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-slate-500">Current Sprint Completion</span>
              <span className="font-bold text-indigo-600">64%</span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-indigo-100">
              <div className="h-full w-[64%] rounded-full bg-indigo-600" />
            </div>
          </div>

          <div className="mt-4 grid gap-2">
            <ActivityItem type="Critical" typeColor="bg-rose-50 text-rose-700" text="Authentication bug reported by QA team" dot="bg-rose-500" />
            <ActivityItem type="Task" typeColor="bg-blue-50 text-blue-700" text="Dashboard analytics moved to Testing" dot="bg-blue-500" />
            <ActivityItem type="Project" typeColor="bg-green-50 text-green-700" text="Inventory workspace created by PM" dot="bg-green-500" />
          </div>
        </div>
      </section>

      {/* Platform */}
      <section id="platform" className="bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="mb-10 max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">
              Platform
            </p>
            <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900">
              Designed like a real internal engineering tool.
            </h2>
            <p className="mt-4 text-slate-500 leading-relaxed">
              DevTrack demonstrates practical software engineering through
              authentication, relational database design, issue tracking, task
              workflows, activity logs, and dashboard metrics.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-md hover:shadow-indigo-100/50"
                >
                  <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${feature.color} transition group-hover:scale-105`}>
                    <Icon size={22} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section id="workflow" className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">
              Workflow
            </p>
            <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900">
              From backlog to issue closure.
            </h2>
            <p className="mt-4 text-slate-500 leading-relaxed">
              Built around common software development practices: planning,
              implementation, testing, defect reporting, and progress review.
            </p>
          </div>

          <div className="grid gap-3">
            {workflow.map((item, index) => (
              <div
                key={item.title}
                className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-sm font-extrabold text-white shadow-sm shadow-indigo-200">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security */}
      <section id="security" className="bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">
              Security & Architecture
            </p>
            <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900">
              Production-grade by design.
            </h2>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            <ProductionCard
              icon={LockKeyhole}
              iconColor="bg-blue-50 text-blue-600"
              title="Authentication"
              desc="User registration and login powered by Supabase Auth with profile roles for project manager, developer, and tester."
            />
            <ProductionCard
              icon={Network}
              iconColor="bg-teal-50 text-teal-600"
              title="Relational Data Model"
              desc="Projects, tasks, bugs, profiles, and activity logs structured using PostgreSQL relationships."
            />
            <ProductionCard
              icon={Workflow}
              iconColor="bg-violet-50 text-violet-600"
              title="Real Team Simulation"
              desc="Designed around realistic software delivery workflows: task assignment, bug severity, testing, and status updates."
            />
          </div>
        </div>
      </section>

      {/* Tech stack */}
      <section id="tech" className="mx-auto max-w-7xl px-6 py-20">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 md:p-10">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">
                Engineering Stack
              </p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900">
                Modern full-stack architecture.
              </h2>
              <p className="mt-4 text-slate-500 leading-relaxed">
                Designed to show practical full-stack capability: UI development,
                authentication, database design, CRUD workflows, testing, and
                deployment.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 content-start">
              {techStack.map((tech, i) => (
                <span
                  key={tech}
                  className={`rounded-full border px-4 py-1.5 text-sm font-semibold ${
                    i % 3 === 0
                      ? "border-indigo-200 bg-indigo-50 text-indigo-700"
                      : i % 5 === 0
                      ? "border-amber-200 bg-amber-50 text-amber-700"
                      : "border-slate-200 bg-white text-slate-700"
                  }`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-50 to-sky-50 p-8 text-center md:p-14">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-md shadow-indigo-300">
            <LayoutDashboard size={26} />
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900">
            Start managing software delivery with DevTrack.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-500 leading-relaxed">
            Create a workspace, track development tasks, report defects, and
            monitor project progress using a clean production-style dashboard.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/register"
              className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white shadow-md shadow-indigo-200 transition hover:bg-indigo-700"
            >
              Launch Workspace
            </Link>
            <Link
              href="/dashboard"
              className="rounded-xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              View Dashboard
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 px-6 py-6 text-center text-sm text-slate-400">
        DevTrack — Production-style developer task and bug tracking system ·
        Next.js · TypeScript · Supabase · PostgreSQL
      </footer>
    </main>
  );
}

function DevTrackLogo({ small = false }: { small?: boolean }) {
  return (
    <div
      className={`relative flex ${
        small ? "h-9 w-9" : "h-10 w-10"
      } items-center justify-center rounded-xl bg-indigo-600 shadow-sm shadow-indigo-200`}
    >
      <GitBranch size={small ? 17 : 20} className="text-white" />
      <div className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border-2 border-white bg-green-500" />
    </div>
  );
}

function MiniStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-5 py-3 shadow-sm text-center">
      <p className="text-2xl font-extrabold text-slate-900">{value}</p>
      <p className="mt-0.5 text-xs text-slate-400">{label}</p>
    </div>
  );
}

function TrustBadge({
  icon: Icon,
  text,
}: {
  icon: React.ElementType;
  text: string;
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-600 shadow-sm">
      <Icon size={14} className="text-indigo-600" />
      {text}
    </span>
  );
}

function PreviewCard({
  icon: Icon,
  title,
  value,
  desc,
  iconColor,
}: {
  icon: React.ElementType;
  title: string;
  value: string;
  desc: string;
  iconColor: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className={`rounded-lg p-2 ${iconColor}`}>
          <Icon size={18} />
        </div>
        <span className="text-xs text-slate-400">{desc}</span>
      </div>
      <p className="mt-3 text-xs text-slate-400">{title}</p>
      <p className="mt-0.5 text-2xl font-extrabold text-slate-900">{value}</p>
    </div>
  );
}

function ActivityItem({
  text,
  type,
  typeColor,
  dot,
}: {
  text: string;
  type: string;
  typeColor: string;
  dot: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm shadow-sm">
      <div className="flex items-center gap-2.5 text-slate-700">
        <div className={`h-2 w-2 shrink-0 rounded-full ${dot}`} />
        {text}
      </div>
      <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${typeColor}`}>
        {type}
      </span>
    </div>
  );
}

function ProductionCard({
  icon: Icon,
  iconColor,
  title,
  desc,
}: {
  icon: React.ElementType;
  iconColor: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className={`mb-5 flex h-11 w-11 items-center justify-center rounded-xl ${iconColor}`}>
        <Icon size={22} />
      </div>
      <h3 className="text-lg font-bold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-500">{desc}</p>
    </div>
  );
}