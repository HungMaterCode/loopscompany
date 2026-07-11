import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

const INITIAL_DOMAINS = [
  { id: "dm_01", label: ".com", price: 350000, order: 1, active: true },
  { id: "dm_02", label: ".vn", price: 438000, order: 2, active: true },
  { id: "dm_03", label: ".com.vn", price: 563000, order: 3, active: true },
  { id: "dm_04", label: ".net", price: 400000, order: 4, active: true },
  { id: "dm_05", label: ".org", price: 438000, order: 5, active: true },
  { id: "dm_06", label: ".info", price: 313000, order: 6, active: true },
  { id: "dm_07", label: ".biz", price: 350000, order: 7, active: true },
  { id: "dm_08", label: ".io", price: 875000, order: 8, active: true },
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const all = searchParams.get("all") === "true";

    let domains = await prisma.domain.findMany({
      where: all ? undefined : { active: true },
      orderBy: { order: "asc" },
    });

    if (domains.length === 0 && !all) {
      await prisma.domain.createMany({
        data: INITIAL_DOMAINS,
      });
      domains = await prisma.domain.findMany({
        where: { active: true },
        orderBy: { order: "asc" },
      });
    }

    return NextResponse.json(domains);
  } catch (error) {
    console.error("Failed to fetch domains:", error);
    return NextResponse.json({ error: "Failed to fetch domains" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();
    if (!data.label || !data.label.trim()) {
      return NextResponse.json({ error: "Đuôi tên miền không được để trống" }, { status: 400 });
    }

    const count = await prisma.domain.count();
    const newId = `dm_${String(count + 1).padStart(2, '0')}`;

    const newDomain = await prisma.domain.create({
      data: {
        id: data.id || newId,
        label: data.label.trim(),
        price: data.price || 0,
        order: data.order || 0,
        active: data.active !== undefined ? data.active : true,
      },
    });
    return NextResponse.json(newDomain);
  } catch (error: any) {
    console.error("Failed to create domain:", error);
    return NextResponse.json({ error: error.message || "Failed to create domain" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();
    if (!data.id) {
      return NextResponse.json({ error: "Thiếu ID tên miền" }, { status: 400 });
    }
    if (!data.label || !data.label.trim()) {
      return NextResponse.json({ error: "Đuôi tên miền không được để trống" }, { status: 400 });
    }

    const domain = await prisma.domain.update({
      where: { id: data.id },
      data: {
        label: data.label.trim(),
        price: data.price || 0,
        order: data.order || 0,
        active: data.active !== undefined ? data.active : true,
      },
    });
    return NextResponse.json(domain);
  } catch (error: any) {
    console.error("Failed to update domain:", error);
    return NextResponse.json({ error: error.message || "Failed to update domain" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing id param" }, { status: 400 });
    }

    await prisma.domain.delete({
      where: { id },
    });
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error("Failed to delete domain:", error);
    return NextResponse.json({ error: error.message || "Failed to delete domain" }, { status: 500 });
  }
}
