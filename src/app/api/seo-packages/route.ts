import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

const INITIAL_SEO_PACKAGES = [
  { id: "seo_01", label: "Miễn phí", description: "5 bài /tháng", price: 0, order: 1, active: true },
  { id: "seo_02", label: "Cơ bản", description: "10 bài /tháng", price: 2000000, order: 2, active: true },
  { id: "seo_03", label: "Doanh nghiệp", description: "15 bài /tháng", price: 6000000, order: 3, active: true },
  { id: "seo_04", label: "Phổ biến", description: "20 bài /tháng", price: 36000000, order: 4, active: true },
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const all = searchParams.get("all") === "true";

    let seoPackages = await prisma.seoPackage.findMany({
      where: all ? undefined : { active: true },
      orderBy: { order: "asc" },
    });

    // Seed defaults if empty and requesting active ones
    if (seoPackages.length === 0 && !all) {
      await prisma.seoPackage.createMany({
        data: INITIAL_SEO_PACKAGES,
      });
      seoPackages = await prisma.seoPackage.findMany({
        where: { active: true },
        orderBy: { order: "asc" },
      });
    }

    return NextResponse.json(seoPackages);
  } catch (error) {
    console.error("Failed to fetch seo packages:", error);
    return NextResponse.json({ error: "Failed to fetch seo packages" }, { status: 500 });
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

    const count = await prisma.seoPackage.count();
    const newId = `seo_${String(count + 1).padStart(2, '0')}`;

    const newPackage = await prisma.seoPackage.create({
      data: {
        id: data.id || newId,
        label: data.label.trim(),
        description: (data.description || "").trim(),
        price: data.price || 0,
        order: data.order || 0,
        active: data.active !== undefined ? data.active : true,
      },
    });
    return NextResponse.json(newPackage);
  } catch (error: any) {
    console.error("Failed to create seo package:", error);
    return NextResponse.json({ error: error.message || "Failed to create seo package" }, { status: 500 });
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
      return NextResponse.json({ error: "Thiếu ID gói SEO" }, { status: 400 });
    }
    if (!data.label || !data.label.trim()) {
      return NextResponse.json({ error: "Tên gói không được để trống" }, { status: 400 });
    }

    const updatedPackage = await prisma.seoPackage.update({
      where: { id: data.id },
      data: {
        label: data.label.trim(),
        description: (data.description || "").trim(),
        price: data.price || 0,
        order: data.order || 0,
        active: data.active !== undefined ? data.active : true,
      },
    });
    return NextResponse.json(updatedPackage);
  } catch (error: any) {
    console.error("Failed to update seo package:", error);
    return NextResponse.json({ error: error.message || "Failed to update seo package" }, { status: 500 });
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

    await prisma.seoPackage.delete({
      where: { id },
    });
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error("Failed to delete seo package:", error);
    return NextResponse.json({ error: error.message || "Failed to delete seo package" }, { status: 500 });
  }
}
