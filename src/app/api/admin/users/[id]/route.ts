import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import bcrypt from "bcryptjs";

export async function PATCH(request: Request, props: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const params = await props.params;
    const { role, password } = await request.json();

    // Prevent self-demotion
    if (params.id === session.userId && role && role !== "admin") {
      return NextResponse.json(
        { error: "Bạn không thể tự hạ quyền quản trị của chính mình" },
        { status: 400 }
      );
    }
    
    const existing = await prisma.user.findUnique({ where: { id: params.id } });
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const updateData: Record<string, string> = { role };
    
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    } else if (role === "admin" && existing.role !== "admin" && !existing.password) {
      return NextResponse.json(
        { error: "Cần đặt mật khẩu khi nâng quyền admin" },
        { status: 400 }
      );
    }
    
    const user = await prisma.user.update({
      where: { id: params.id },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        avatar: true,
        googleId: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}

export async function DELETE(request: Request, props: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const params = await props.params;

    // Prevent self-deletion
    if (params.id === session.userId) {
      return NextResponse.json(
        { error: "Bạn không thể tự xóa tài khoản quản trị đang sử dụng" },
        { status: 400 }
      );
    }

    await prisma.user.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }
}
