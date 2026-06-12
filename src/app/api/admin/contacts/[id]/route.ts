import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // force rebuild

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const { status } = await request.json();
    const resolvedParams = await params;
    await prisma.contactLead.update({
      where: { id: resolvedParams.id },
      data: { status },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Lỗi khi cập nhật trạng thái liên hệ" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const resolvedParams = await params;
    await prisma.contactLead.delete({
      where: { id: resolvedParams.id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Lỗi khi xóa liên hệ" },
      { status: 500 }
    );
  }
}
