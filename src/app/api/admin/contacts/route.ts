import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";
export async function GET() {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const leads = await prisma.contactLead.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        message: true,
        source: true,
        createdAt: true,
        status: true,
        details: true
      }
    });
    return NextResponse.json(leads);
  } catch (error) {
    return NextResponse.json(
      { error: "Lỗi khi lấy danh sách liên hệ" },
      { status: 500 }
    );
  }
}
