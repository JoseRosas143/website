import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminLogin } from "@/components/AdminLogin";
import { isAdmin } from "@/lib/admin-auth";

export const metadata: Metadata = { title: "Acceso administrativo", robots: { index: false, follow: false } };

export default async function AdminLoginPage() { if (await isAdmin()) redirect("/admin"); return <AdminLogin />; }
