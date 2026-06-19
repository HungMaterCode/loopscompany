import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" }
    });
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json(
      { error: "Lỗi khi lấy danh sách đơn hàng" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { leadId, name, email, phone, type, details } = body;

    if (!name || !email || !type || !details) {
      return NextResponse.json({ error: "Thiếu thông tin bắt buộc" }, { status: 400 });
    }

    // Sinh mã đơn hàng dạng ORD-0001, ORD-0002
    const count = await prisma.order.count();
    const code = `ORD-${String(count + 1).padStart(4, "0")}`;

    const order = await prisma.order.create({
      data: {
        code,
        name,
        email,
        phone,
        type,
        details,
        status: "pending"
      }
    });

    // Cập nhật trạng thái lead liên hệ nếu có
    if (leadId) {
      await prisma.contactLead.update({
        where: { id: leadId },
        data: { status: "đã lên đơn" }
      });
    }

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error("Lỗi tạo đơn hàng:", error);
    return NextResponse.json(
      { error: "Lỗi khi tạo đơn hàng" },
      { status: 500 }
    );
  }
}
