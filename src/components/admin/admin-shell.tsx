"use client";

import { useRouter } from "next/navigation";
import { Admin } from "@/legacy-pages/Admin";

export function AdminShell({ adminName }: { adminName: string }) {
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/dang-nhap");
    router.refresh();
  }

  return <Admin adminName={adminName} onLogout={logout} />;
}
