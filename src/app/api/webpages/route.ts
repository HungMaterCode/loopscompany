import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

const INITIAL_PAGES = [
  {
    code: "W-01",
    name: "Landing Page",
    tag: "Khởi đầu",
    subtitle: "Trang đích chuyển đổi cao",
    price: 3890000,
    cover: "https://images.unsplash.com/photo-1634084462412-b54873c0a56d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80",
    icon: "Zap",
    highlight: false,
    features: ["1 trang đích tối ưu CRO", "Form liên hệ + Zalo OA tích hợp", "Responsive hoàn hảo mọi thiết bị", "SEO cơ bản On-page", "Tên miền phụ miễn phí", "Băng thông không giới hạn"],
    missing: ["SSL bảo mật cao cấp", "Email doanh nghiệp", "Blog & nội dung"],
    order: 1,
    active: true,
  },
  {
    code: "W-02",
    name: "Bán Hàng Online",
    tag: "Tiêu chuẩn",
    subtitle: "Cửa hàng online đầy đủ tính năng",
    price: 6890000,
    cover: "https://images.unsplash.com/photo-1631125915902-d8abe9225ff2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80",
    icon: "ShoppingBag",
    highlight: false,
    features: ["Danh mục sản phẩm & giỏ hàng", "Quản lý đơn hàng tự động", "Thanh toán online đa cổng", "SSL bảo mật miễn phí", "Tên miền riêng .com/.vn", "Hỗ trợ ưu tiên"],
    missing: ["SEO nâng cao", "Email doanh nghiệp"],
    order: 2,
    active: true,
  },
  {
    code: "W-03",
    name: "Doanh Nghiệp",
    tag: "Phổ biến nhất",
    subtitle: "Website tổ chức chuyên nghiệp",
    price: 9890000,
    cover: "https://images.unsplash.com/photo-1766330977451-de1b64b5e641?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80",
    icon: "Building2",
    highlight: true,
    features: ["Đa trang + Blog tích hợp", "Thiết kế premium cao cấp", "SEO nâng cao & Core Web Vitals", "Google Analytics & Heatmap", "Tên miền + Email doanh nghiệp", "Hỗ trợ VIP 24/7", "Sao lưu dữ liệu hàng tuần"],
    missing: [],
    order: 3,
    active: true,
  },
  {
    code: "W-04",
    name: "Theo Yêu Cầu",
    tag: "Enterprise",
    subtitle: "Giải pháp tùy chỉnh độc quyền",
    price: 12890000,
    cover: "https://images.unsplash.com/photo-1709486511766-76bdd8b51713?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80",
    icon: "Wand2",
    highlight: false,
    features: ["Thiết kế UI/UX độc quyền 100%", "Tích hợp hệ thống CRM/ERP", "Bảo mật nâng cao enterprise", "Báo cáo thống kê hàng tháng", "Hosting VIP + CDN toàn cầu", "Hotline hỗ trợ riêng 24/7", "Cập nhật nội dung không giới hạn"],
    missing: [],
    order: 4,
    active: true,
  },
];

export async function GET() {
  try {
    let pages = await prisma.webPage.findMany({
      orderBy: { order: "asc" },
    });

    if (pages.length === 0) {
      // Seed with initial pages if empty
      await prisma.webPage.createMany({
        data: INITIAL_PAGES,
      });
      pages = await prisma.webPage.findMany({
        orderBy: { order: "asc" },
      });
    }

    return NextResponse.json(pages);
  } catch (error) {
    console.error("Failed to fetch webpages:", error);
    return NextResponse.json({ error: "Failed to fetch webpages" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();
    if (!data.code || !data.code.trim()) {
      return NextResponse.json({ error: "Mã gói không được để trống" }, { status: 400 });
    }

    const existing = await prisma.webPage.findUnique({
      where: { code: data.code.trim() },
    });
    if (existing) {
      return NextResponse.json({ error: `Mã gói "${data.code}" đã tồn tại` }, { status: 400 });
    }

    const newPage = await prisma.webPage.create({
      data: {
        code: data.code,
        name: data.name,
        tag: data.tag || "",
        subtitle: data.subtitle || "",
        price: data.price || 0,
        cover: data.cover || "",
        icon: data.icon || "Zap",
        highlight: data.highlight || false,
        features: data.features || [],
        missing: data.missing || [],
        order: data.order || 0,
        active: data.active !== undefined ? data.active : true,
        isRental: data.isRental !== undefined ? data.isRental : false,
      },
    } as any);
    return NextResponse.json(newPage);
  } catch (error: any) {
    console.error("Failed to create webpage:", error);
    return NextResponse.json({ error: error.message || "Failed to create webpage" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();
    if (!data.code || !data.code.trim()) {
      return NextResponse.json({ error: "Mã gói không được để trống" }, { status: 400 });
    }

    const existing = await prisma.webPage.findUnique({
      where: { code: data.code.trim() },
    });
    if (existing && ((data.id && existing.id !== data.id) || (!data.id && existing.code !== data.code))) {
      return NextResponse.json({ error: `Mã gói "${data.code}" đã tồn tại ở một gói khác` }, { status: 400 });
    }

    const page = await prisma.webPage.update({
      where: data.id ? { id: data.id } : { code: data.code },
      data: {
        code: data.code,
        name: data.name,
        tag: data.tag || "",
        subtitle: data.subtitle || "",
        price: data.price || 0,
        cover: data.cover || "",
        icon: data.icon || "Zap",
        highlight: data.highlight || false,
        features: data.features || [],
        missing: data.missing || [],
        order: data.order || 0,
        active: data.active !== undefined ? data.active : true,
        isRental: data.isRental !== undefined ? data.isRental : undefined,
      },
    } as any);
    return NextResponse.json(page);
  } catch (error: any) {
    console.error("Failed to update webpage:", error);
    return NextResponse.json({ error: error.message || "Failed to update webpage" }, { status: 500 });
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
    const code = searchParams.get("code");

    if (!id && !code) {
      return NextResponse.json({ error: "Missing id or code param" }, { status: 400 });
    }

    await prisma.webPage.delete({
      where: id ? { id } : { code: code! },
    });
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error("Failed to delete webpage:", error);
    return NextResponse.json({ error: error.message || "Failed to delete webpage" }, { status: 500 });
  }
}
