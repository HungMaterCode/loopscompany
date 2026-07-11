import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

const INITIAL_CLOUDS = [
  { id: 1, label: "Cloud Cơ bản", price: 521000, price1Year: 430000, price3Years: 325000, order: 1, active: true },
  { id: 2, label: "Cloud Tiêu chuẩn", price: 1195000, price1Year: 809000, price3Years: 596000, order: 2, active: true },
  { id: 3, label: "Cloud Cao cấp", price: 2365000, price1Year: 1593000, price3Years: 1165000, order: 3, active: true },
];

export async function GET() {
  try {
    let clouds = await prisma.cloud.findMany({
      orderBy: { order: "asc" },
    });

    if (clouds.length === 0) {
      await prisma.cloud.createMany({
        data: INITIAL_CLOUDS,
      });
      clouds = await prisma.cloud.findMany({
        orderBy: { order: "asc" },
      });
    }

    return NextResponse.json(clouds);
  } catch (error) {
    console.error("Failed to fetch clouds:", error);
    return NextResponse.json({ error: "Failed to fetch clouds" }, { status: 500 });
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
      return NextResponse.json({ error: "Tên gói không được để trống" }, { status: 400 });
    }

    const newCloud = await prisma.cloud.create({
      data: {
        label: data.label.trim(),
        price: data.price || 0,
        price1Year: data.price1Year || 0,
        price3Years: data.price3Years || 0,
        order: data.order || 0,
        active: data.active !== undefined ? data.active : true,
      },
    });
    return NextResponse.json(newCloud);
  } catch (error: any) {
    console.error("Failed to create cloud package:", error);
    return NextResponse.json({ error: error.message || "Failed to create cloud package" }, { status: 500 });
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
      return NextResponse.json({ error: "Thiếu ID gói cloud" }, { status: 400 });
    }
    if (!data.label || !data.label.trim()) {
      return NextResponse.json({ error: "Tên gói không được để trống" }, { status: 400 });
    }

    const cloud = await prisma.cloud.update({
      where: { id: Number(data.id) },
      data: {
        label: data.label.trim(),
        price: data.price || 0,
        price1Year: data.price1Year || 0,
        price3Years: data.price3Years || 0,
        order: data.order || 0,
        active: data.active !== undefined ? data.active : true,
      },
    });
    return NextResponse.json(cloud);
  } catch (error: any) {
    console.error("Failed to update cloud package:", error);
    return NextResponse.json({ error: error.message || "Failed to update cloud package" }, { status: 500 });
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

    await prisma.cloud.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error("Failed to delete cloud package:", error);
    return NextResponse.json({ error: error.message || "Failed to delete cloud package" }, { status: 500 });
  }
}
