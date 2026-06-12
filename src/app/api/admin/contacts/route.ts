import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // force rebuild

export const dynamic = "force-dynamic";
export async function GET() {
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
        status: true
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
