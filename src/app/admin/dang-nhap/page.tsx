import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  const session = await getSession();
  const defaultEmail = session?.email || "admin@loops.vn";
  return <AdminLoginForm defaultEmail={defaultEmail} />;
}
