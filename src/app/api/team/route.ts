import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    const members = await prisma.teamMember.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(members);
  } catch (error) {
    console.error("Failed to fetch team members:", error);
    return NextResponse.json({ error: "Failed to fetch team members" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();
    if (!data.name || !data.name.trim()) {
      return NextResponse.json({ error: "Họ và tên không được để trống" }, { status: 400 });
    }
    if (!data.role || !data.role.trim()) {
      return NextResponse.json({ error: "Chức vụ không được để trống" }, { status: 400 });
    }

    const newMember = await prisma.teamMember.create({
      data: {
        name: data.name.trim(),
        role: data.role.trim(),
        roleEn: data.roleEn ? data.roleEn.trim() : "",
        avatar: data.avatar || "",
        years: data.years || 0,
        projects: data.projects || 0,
        bio: data.bio || "",
        skills: data.skills || [],
        gradient: data.gradient || "linear-gradient(145deg, #2A2520 0%, #1A1A1A 50%, #3A3530 100%)",
        email: data.email || "",
        zalo: data.zalo || "",
        facebook: data.facebook || "",
        phone: data.phone || "",
        order: data.order || 0,
        active: data.active !== undefined ? data.active : true,
      },
    });
    return NextResponse.json(newMember);
  } catch (error: any) {
    console.error("Failed to create team member:", error);
    return NextResponse.json({ error: error.message || "Failed to create team member" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();
    if (!data.id) {
      return NextResponse.json({ error: "ID thành viên không được để trống" }, { status: 400 });
    }
    if (!data.name || !data.name.trim()) {
      return NextResponse.json({ error: "Họ và tên không được để trống" }, { status: 400 });
    }

    const member = await prisma.teamMember.update({
      where: { id: data.id },
      data: {
        name: data.name.trim(),
        role: data.role.trim(),
        roleEn: data.roleEn ? data.roleEn.trim() : "",
        avatar: data.avatar || "",
        years: data.years || 0,
        projects: data.projects || 0,
        bio: data.bio || "",
        skills: data.skills || [],
        gradient: data.gradient || "linear-gradient(145deg, #2A2520 0%, #1A1A1A 50%, #3A3530 100%)",
        email: data.email || "",
        zalo: data.zalo || "",
        facebook: data.facebook || "",
        phone: data.phone || "",
        order: data.order || 0,
        active: data.active !== undefined ? data.active : true,
      },
    });
    return NextResponse.json(member);
  } catch (error: any) {
    console.error("Failed to update team member:", error);
    return NextResponse.json({ error: error.message || "Failed to update team member" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing id param" }, { status: 400 });
    }

    await prisma.teamMember.delete({
      where: { id },
    });
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error("Failed to delete team member:", error);
    return NextResponse.json({ error: error.message || "Failed to delete team member" }, { status: 500 });
  }
}
