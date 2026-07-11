import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    const dbPages = await prisma.seoPage.findMany();
    return NextResponse.json(dbPages);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch SEO pages" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { pageId, title, description, keywords, ogTitle, ogDescription, canonical, ogImage } = body;

    if (!pageId) {
      return NextResponse.json({ error: "Missing pageId" }, { status: 400 });
    }

    const updated = await prisma.seoPage.upsert({
      where: { pageId },
      update: {
        title,
        description,
        keywords,
        ogTitle,
        ogDescription,
        canonical,
        ogImage,
      },
      create: {
        pageId,
        label: pageId === "home" ? "Trang chủ" : pageId === "services" ? "Dịch vụ" : pageId === "pricing" ? "Bảng giá" : "Đội ngũ",
        title,
        description,
        keywords,
        ogTitle,
        ogDescription,
        canonical,
        ogImage,
      },
    });

    return NextResponse.json(updated);
  } catch (err) {
    console.error("Error in PUT /api/seo:", err);
    return NextResponse.json({ error: "Failed to save SEO page" }, { status: 500 });
  }
}
