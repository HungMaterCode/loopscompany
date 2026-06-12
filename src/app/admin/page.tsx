import Link from "next/link";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/admin-shell";
import { SiteDataProvider } from "@/legacy-app/SiteDataContext";
import { getSiteConfig } from "@/lib/site-config-server";
import { prisma as db } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await getSession();
  if (!session) redirect("/admin/dang-nhap");

  const user = await db.user.findUnique({ where: { id: session.userId } });
  if (user?.role !== "admin") {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-50 p-4 font-sans">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
            <svg className="h-10 w-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="mb-3 text-3xl font-bold tracking-tight text-gray-900">Truy cập bị từ chối</h1>
          <p className="mb-8 text-base text-gray-600">Xin lỗi, bạn không có quyền truy cập vào khu vực quản trị này. Vui lòng liên hệ Admin nếu bạn cần được cấp quyền.</p>
          <Link href="/" className="inline-flex w-full items-center justify-center rounded-xl bg-gray-900 px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-gray-800 sm:w-auto">
            Quay về trang chủ
          </Link>
        </div>
      </div>
    );
  }

  const config = await getSiteConfig();

  return (
    <SiteDataProvider initialConfig={config}>
      <AdminShell adminName={session.name} />
    </SiteDataProvider>
  );
}
