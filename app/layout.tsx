import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DevTrack — Developer Task & Bug Tracking System",
  description:
    "Production-style full-stack software delivery workspace for projects, tasks, bugs, and sprint progress.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
