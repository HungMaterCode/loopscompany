import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // 1. Count users
    const userCount = await prisma.user.count();

    // 2. Count articles
    const articleCount = await prisma.article.count();

    // 3. Count team members
    const teamCount = await prisma.teamMember.count();

    // 4. Count contact leads
    const contactCount = await prisma.contactLead.count();

    // 5. Count orders
    const orderCount = await prisma.order.count();

    // 6. Fetch recent activities
    // Fetch 5 most recent orders
    const recentOrders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: {
        name: true,
        type: true,
        createdAt: true,
      },
    });

    // Fetch 5 most recent contact leads
    const recentLeads = await prisma.contactLead.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: {
        name: true,
        message: true,
        source: true,
        createdAt: true,
      },
    });

    // Combine and format recent activities
    const activities = [
      ...recentOrders.map(o => ({
        action: `Đơn hàng mới từ ${o.name} (${o.type})`,
        time: o.createdAt,
        type: "pricing", // matches color type in UI
      })),
      ...recentLeads.map(l => ({
        action: `Liên hệ mới từ ${l.name} (nguồn: ${l.source})`,
        time: l.createdAt,
        type: "portfolio", // matches color type in UI
      })),
    ];

    // Sort by time descending and take top 5
    activities.sort((a, b) => b.time.getTime() - a.time.getTime());
    const recentActivities = activities.slice(0, 5).map(act => {
      const diffMs = new Date().getTime() - act.time.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMins / 60);
      const diffDays = Math.floor(diffHours / 24);

      let timeStr = "";
      if (diffMins < 1) {
        timeStr = "Vừa xong";
      } else if (diffMins < 60) {
        timeStr = `${diffMins} phút trước`;
      } else if (diffHours < 24) {
        timeStr = `${diffHours} giờ trước`;
      } else {
        timeStr = `${diffDays} ngày trước`;
      }

      return {
        action: act.action,
        time: timeStr,
        type: act.type,
      };
    });

    return NextResponse.json({
      userCount,
      articleCount,
      teamCount,
      contactCount,
      orderCount,
      recentActivities,
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    return NextResponse.json({ error: "Failed to fetch dashboard stats" }, { status: 500 });
  }
}
