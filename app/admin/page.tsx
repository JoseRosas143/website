import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminDashboard } from "@/components/AdminDashboard";
import { isAdmin } from "@/lib/admin-auth";
import { getLeads, getSiteContent } from "@/lib/storage";

export const metadata: Metadata = { title: "Panel de administración", robots: { index: false, follow: false } };

export default async function AdminPage() {
  if (!(await isAdmin())) redirect("/admin/login");
  const [content, leads] = await Promise.all([getSiteContent(), getLeads()]);
  return <AdminDashboard initialContent={content} initialLeads={leads} />;
}
