import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

const INITIAL_HOSTINGS = [
  { id: "ht_01", label: "Khởi đầu", price: 540000, order: 1, active: true },
  { id: "ht_02", label: "Tiêu chuẩn", price: 918000, order: 2, active: true },
  { id: "ht_03", label: "Nâng cao", price: 1836000, order: 3, active: true },
  { id: "ht_04", label: "Doanh nghiệp", price: 3366000, order: 4, active: true },
];

export async function GET() {
  try {
    let hostings = await prisma.hosting.findMany({
      orderBy: { order: "asc" },
    });

    if (hostings.length === 0) {
      await prisma.hosting.createMany({
        data: INITIAL_HOSTINGS,
      });
      hostings = await prisma.hosting.findMany({
        orderBy: { order: "asc" },
      });
    }

    return NextResponse.json(hostings);
  } catch (error) {
    console.error("Failed to fetch hostings:", error);
    return NextResponse.json({ error: "Failed to fetch hostings" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();
    if (!data.label || !data.label.trim()) {
      return NextResponse.json({ error: "Tên gói không được để trống" }, { status: 400 });
    }

    const count = await prisma.hosting.count();
    const newId = `ht_${String(count + 1).padStart(2, '0')}`;

    const newHosting = await prisma.hosting.create({
      data: {
        id: data.id || newId,
        label: data.label.trim(),
        price: data.price || 0,
        order: data.order || 0,
        active: data.active !== undefined ? data.active : true,
      },
    });
    return NextResponse.json(newHosting);
  } catch (error: any) {
    console.error("Failed to create hosting:", error);
    return NextResponse.json({ error: error.message || "Failed to create hosting" }, { status: 500 });
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
      return NextResponse.json({ error: "Thiếu ID gói hosting" }, { status: 400 });
    }
    if (!data.label || !data.label.trim()) {
      return NextResponse.json({ error: "Tên gói không được để trống" }, { status: 400 });
    }

    const hosting = await prisma.hosting.update({
      where: { id: data.id },
      data: {
        label: data.label.trim(),
        price: data.price || 0,
        order: data.order || 0,
        active: data.active !== undefined ? data.active : true,
      },
    });
    return NextResponse.json(hosting);
  } catch (error: any) {
    console.error("Failed to update hosting:", error);
    return NextResponse.json({ error: error.message || "Failed to update hosting" }, { status: 500 });
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

    await prisma.hosting.delete({
      where: { id },
    });
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error("Failed to delete hosting:", error);
    return NextResponse.json({ error: error.message || "Failed to delete hosting" }, { status: 500 });
  }
}
