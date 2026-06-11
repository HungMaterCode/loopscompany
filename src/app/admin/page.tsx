import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/admin-shell";
import { SiteDataProvider } from "@/legacy-app/SiteDataContext";
import { getSiteConfig } from "@/lib/site-config-server";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await getSession();
  if (!session) redirect("/admin/dang-nhap");

  const config = await getSiteConfig();

  return (
    <SiteDataProvider initialConfig={config}>
      <AdminShell adminName={session.name} />
    </SiteDataProvider>
  );
}
