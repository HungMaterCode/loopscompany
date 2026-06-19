import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const publishedOnly = searchParams.get("publishedOnly") === "true";

    const where: any = {};
    if (publishedOnly) {
      where.published = true;
    }

    const articles = await prisma.article.findMany({
      where,
      orderBy: { publishedAt: "desc" },
    });

    return NextResponse.json(articles);
  } catch (error) {
    console.error("Failed to fetch articles:", error);
    return NextResponse.json({ error: "Failed to fetch articles" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();
    if (!data.title || !data.title.trim()) {
      return NextResponse.json({ error: "Tiêu đề không được để trống" }, { status: 400 });
    }
    if (!data.slug || !data.slug.trim()) {
      return NextResponse.json({ error: "Slug không được để trống" }, { status: 400 });
    }

    // Check unique slug
    const existing = await prisma.article.findUnique({
      where: { slug: data.slug.trim() },
    });
    if (existing) {
      return NextResponse.json({ error: "Slug này đã tồn tại" }, { status: 400 });
    }

    // Parse date
    let publishedAt = new Date();
    if (data.date) {
      // Expect format "DD/MM/YYYY" or "YYYY-MM-DD"
      if (data.date.includes("/")) {
        const [d, m, y] = data.date.split("/");
        publishedAt = new Date(Number(y), Number(m) - 1, Number(d));
      } else {
        publishedAt = new Date(data.date);
      }
    }

    const newArticle = await prisma.article.create({
      data: {
        slug: data.slug.trim(),
        category: data.category || "seo",
        categoryColor: data.categoryColor || "#16a34a",
        title: data.title.trim(),
        excerpt: data.excerpt || "",
        content: data.content || "",
        cover: data.cover || "",
        coverPublicId: data.coverPublicId || null,
        author: data.author || "Quản trị viên",
        authorRole: data.authorRole || "Author",
        publishedAt,
        readTime: Number(data.readTime) || 5,
        tags: data.tags || [],
        published: data.published !== undefined ? data.published : true,
      },
    });

    return NextResponse.json(newArticle);
  } catch (error: any) {
    console.error("Failed to create article:", error);
    return NextResponse.json({ error: error.message || "Failed to create article" }, { status: 500 });
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
      return NextResponse.json({ error: "Thiếu ID bài viết" }, { status: 400 });
    }
    if (!data.title || !data.title.trim()) {
      return NextResponse.json({ error: "Tiêu đề không được để trống" }, { status: 400 });
    }
    if (!data.slug || !data.slug.trim()) {
      return NextResponse.json({ error: "Slug không được để trống" }, { status: 400 });
    }

    // Check unique slug (excluding self)
    const existing = await prisma.article.findFirst({
      where: {
        slug: data.slug.trim(),
        NOT: { id: data.id },
      },
    });
    if (existing) {
      return NextResponse.json({ error: "Slug này đã bị trùng với bài viết khác" }, { status: 400 });
    }

    // Parse date
    let publishedAt = new Date();
    if (data.date) {
      if (data.date.includes("/")) {
        const [d, m, y] = data.date.split("/");
        publishedAt = new Date(Number(y), Number(m) - 1, Number(d));
      } else {
        publishedAt = new Date(data.date);
      }
    } else if (data.publishedAt) {
      publishedAt = new Date(data.publishedAt);
    }

    const updatedArticle = await prisma.article.update({
      where: { id: data.id },
      data: {
        slug: data.slug.trim(),
        category: data.category || "seo",
        categoryColor: data.categoryColor || "#16a34a",
        title: data.title.trim(),
        excerpt: data.excerpt || "",
        content: data.content || "",
        cover: data.cover || "",
        coverPublicId: data.coverPublicId || null,
        author: data.author || "Quản trị viên",
        authorRole: data.authorRole || "Author",
        publishedAt,
        readTime: Number(data.readTime) || 5,
        tags: data.tags || [],
        published: data.published !== undefined ? data.published : true,
      },
    });

    return NextResponse.json(updatedArticle);
  } catch (error: any) {
    console.error("Failed to update article:", error);
    return NextResponse.json({ error: error.message || "Failed to update article" }, { status: 500 });
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

    await prisma.article.delete({
      where: { id },
    });

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error("Failed to delete article:", error);
    return NextResponse.json({ error: error.message || "Failed to delete article" }, { status: 500 });
  }
}
