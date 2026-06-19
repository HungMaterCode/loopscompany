import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

const INITIAL_SERVICES = [
  {
    id: "service_01",
    label: "Tạo Website",
    sub: "Landing page, web app, thương mại điện tử chuyên nghiệp.",
    img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    tags: ["Landing Page", "Web App", "E-commerce"],
    size: "large",
    glassBg: "rgba(15, 32, 67, 0.45)",
    link: "/bao-gia",
    order: 1,
    active: true,
  },
  {
    id: "service_02",
    label: "Marketing",
    sub: "Chiến lược digital, Google Ads, Meta Ads, tăng trưởng thực.",
    img: "https://images.unsplash.com/photo-1683721003111-070bcc053d8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    tags: ["Google Ads", "Meta Ads", "SEO"],
    size: "small",
    glassBg: "linear-gradient(135deg, rgba(139, 92, 246, 0.3) 0%, rgba(236, 72, 153, 0.3) 100%)",
    link: "/coming-soon",
    order: 2,
    active: true,
  },
  {
    id: "service_03",
    label: "Content",
    sub: "Copywriting, bài viết blog, kịch bản thương hiệu chất lượng cao.",
    img: "https://images.unsplash.com/photo-1455390582262-044cdead277a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    tags: ["Copywriting", "Blog", "Script"],
    size: "small",
    glassBg: "rgba(184, 134, 11, 0.3)",
    link: "/coming-soon",
    order: 3,
    active: true,
  },
  {
    id: "service_04",
    label: "Media & Video",
    sub: "Ảnh thương mại, video quảng cáo, reels viral chất lượng điện ảnh.",
    img: "https://images.unsplash.com/photo-1497015289639-54688650d173?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    tags: ["Video Ads", "Reels", "Photography"],
    size: "large",
    glassBg: "rgba(139, 69, 19, 0.3)",
    link: "/coming-soon",
    order: 4,
    active: true,
  },
  {
    id: "service_05",
    label: "Thương hiệu",
    sub: "Logo, bộ nhận diện thương hiệu đồng bộ, design system.",
    img: "https://images.unsplash.com/photo-1779261320306-8885b83599ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    tags: ["Logo", "Brand Kit", "Design System"],
    size: "small",
    glassBg: "rgba(13, 148, 136, 0.3)",
    link: "/coming-soon",
    order: 5,
    active: true,
  },
  {
    id: "service_06",
    label: "Analytics",
    sub: "Đo lường hiệu quả, báo cáo ROI, tối ưu chiến dịch liên tục.",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    tags: ["Dashboard", "ROI Report", "A/B Test"],
    size: "small",
    glassBg: "rgba(4, 120, 87, 0.3)",
    link: "/coming-soon",
    order: 6,
    active: true,
  },
  {
    id: "service_07",
    label: "Vận hành & Bảo trì",
    sub: "Bảo mật, tối ưu tốc độ, nâng cấp hệ thống trơn tru 24/7.",
    img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    tags: ["Hosting", "Security", "Speed"],
    size: "small",
    glassBg: "rgba(200, 162, 97, 0.25)",
    link: "/coming-soon",
    order: 7,
    active: true,
  },
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const onlyActive = searchParams.get("activeOnly") === "true";

    const where: any = {};
    if (onlyActive) {
      where.active = true;
    }

    let services = await prisma.service.findMany({
      where,
      orderBy: { order: "asc" },
    });

    if (services.length === 0) {
      // Seed initially
      await prisma.service.createMany({
        data: INITIAL_SERVICES,
      });
      services = await prisma.service.findMany({
        where,
        orderBy: { order: "asc" },
      });
    }

    return NextResponse.json(services);
  } catch (error) {
    console.error("Failed to fetch services:", error);
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
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
      return NextResponse.json({ error: "Tên dịch vụ không được để trống" }, { status: 400 });
    }

    const count = await prisma.service.count();
    const newId = `service_${String(count + 1).padStart(2, '0')}`;

    const newService = await prisma.service.create({
      data: {
        id: data.id || newId,
        label: data.label.trim(),
        sub: data.sub || "",
        img: data.img || "",
        tags: data.tags || [],
        size: data.size || "small",
        glassBg: data.glassBg || null,
        link: data.link || "/coming-soon",
        order: data.order || 0,
        active: data.active !== undefined ? data.active : true,
      },
    });
    return NextResponse.json(newService);
  } catch (error: any) {
    console.error("Failed to create service:", error);
    return NextResponse.json({ error: error.message || "Failed to create service" }, { status: 500 });
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
      return NextResponse.json({ error: "Thiếu ID dịch vụ" }, { status: 400 });
    }
    if (!data.label || !data.label.trim()) {
      return NextResponse.json({ error: "Tên dịch vụ không được để trống" }, { status: 400 });
    }

    const service = await prisma.service.update({
      where: { id: data.id },
      data: {
        label: data.label.trim(),
        sub: data.sub || "",
        img: data.img || "",
        tags: data.tags || [],
        size: data.size || "small",
        glassBg: data.glassBg || null,
        link: data.link || "/coming-soon",
        order: data.order || 0,
        active: data.active !== undefined ? data.active : true,
      },
    });
    return NextResponse.json(service);
  } catch (error: any) {
    console.error("Failed to update service:", error);
    return NextResponse.json({ error: error.message || "Failed to update service" }, { status: 500 });
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

    await prisma.service.delete({
      where: { id },
    });
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error("Failed to delete service:", error);
    return NextResponse.json({ error: error.message || "Failed to delete service" }, { status: 500 });
  }
}
