import { useState, useEffect } from "react";
import { BarChart3, Globe, Layers3, MonitorSmartphone, Sparkles, TrendingUp, Zap, ArrowUpRight, BookOpen, Users, UserSquare2 } from "lucide-react";
import { PLANS, SERVICES, PORTFOLIO, TEAM } from "@/features/legacy-core/data";
import { ARTICLES } from "@/features/legacy-core/articles";
import { WEBSITE_MODULES } from "@/features/legacy-core/site-config";
import type { TC } from "./types";

interface DashboardStats {
  userCount: number;
  articleCount: number;
  teamCount: number;
  contactCount: number;
  orderCount: number;
  recentActivities: { action: string; time: string; type: string }[];
}

interface Props {
  t: TC;
  isDark: boolean;
  onNavigate: (tab: string) => void;
}

export function Dashboard({ t, isDark, onNavigate }: Props) {
  const [statsData, setStatsData] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/dashboard-stats")
      .then((res) => {
        if (!res.ok) throw new Error("API failed");
        return res.json();
      })
      .then((data) => {
        setStatsData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch dashboard stats:", err);
        setLoading(false);
      });
  }, []);

  const enabledCount = WEBSITE_MODULES.filter((m) => m.status === "Đang bật").length;

  const stats = [
    {
      label: "Section đang bật",
      value: `${enabledCount}/${WEBSITE_MODULES.length}`,
      icon: Layers3,
      gradient: "from-red-500 to-orange-400",
      change: "+1 hôm nay",
      tab: "sections"
    },
    {
      label: "Bài viết đã đăng",
      value: loading
        ? "..."
        : (statsData?.articleCount ?? ARTICLES.length).toString().padStart(2, "0"),
      icon: BookOpen,
      gradient: "from-rose-400 to-fuchsia-500",
      change: "Xem tất cả",
      tab: "blog"
    },
    {
      label: "Người dùng",
      value: loading
        ? "..."
        : (statsData?.userCount ?? 0).toString().padStart(2, "0"),
      icon: Users,
      gradient: "from-blue-400 to-indigo-500",
      change: "Quản lý",
      tab: "users"
    },
    {
      label: "Thành viên nhóm",
      value: loading
        ? "..."
        : (statsData?.teamCount ?? TEAM.length).toString().padStart(2, "0"),
      icon: UserSquare2,
      gradient: "from-emerald-400 to-teal-500",
      change: "Đội ngũ chính",
      tab: "team"
    },
  ];

  const recentActivities = statsData?.recentActivities ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h2 className={`text-2xl font-bold tracking-tight ${t.text}`}>Tổng quan</h2>
        <p className={`mt-1 text-sm ${t.textMuted}`}>Trạng thái hiện tại của website Việt Web.</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} onClick={() => onNavigate(s.tab)} className={`rounded-2xl p-5 transition cursor-pointer ${t.card} ${t.cardHover}`}>
              <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${s.gradient}`}>
                <Icon className="h-5 w-5 text-white" />
              </div>
              <div className={`text-3xl font-bold tracking-tight ${t.text}`}>{s.value}</div>
              <div className={`mt-1 text-sm ${t.textMuted}`}>{s.label}</div>
              <div className="mt-3 flex items-center gap-1.5">
                <ArrowUpRight className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-xs text-emerald-400">{s.change}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {/* Quick actions */}
        <div className={`rounded-2xl p-5 ${t.card}`}>
          <h3 className={`mb-4 font-semibold ${t.text}`}>Thao tác nhanh</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Chỉnh bảng giá",  icon: MonitorSmartphone, tab: "pricing",   color: "from-amber-400 to-red-500" },
              { label: "Thêm bài viết",   icon: BookOpen,           tab: "blog",      color: "from-rose-400 to-fuchsia-500" },
              { label: "Cập nhật SEO",    icon: Globe,              tab: "seo",       color: "from-blue-400 to-indigo-500" },
              { label: "Quản lý đội ngũ", icon: UserSquare2,        tab: "team",      color: "from-emerald-400 to-teal-500" },
            ].map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.tab}
                  onClick={() => onNavigate(action.tab)}
                  className={`group flex flex-col items-start gap-3 rounded-xl p-4 text-left transition ${t.cardHover} ${isDark ? "bg-white/[0.04] border border-white/[0.07]" : "bg-gray-50 border border-gray-200"}`}
                >
                  <div className={`flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br ${action.color}`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <span className={`text-sm font-semibold ${t.text}`}>{action.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Recent activity */}
        <div className={`rounded-2xl p-5 ${t.card}`}>
          <div className="mb-4 flex items-center justify-between">
            <h3 className={`font-semibold ${t.text}`}>Hoạt động gần đây</h3>
            <Zap className={`h-4 w-4 ${t.textFaint}`} />
          </div>
          
          {loading ? (
            <div className="flex h-[200px] items-center justify-center">
              <span className={`text-sm ${t.textMuted}`}>Đang tải hoạt động...</span>
            </div>
          ) : recentActivities.length === 0 ? (
            <div className="flex h-[200px] items-center justify-center">
              <span className={`text-sm ${t.textMuted}`}>Chưa có hoạt động mới nào.</span>
            </div>
          ) : (
            <div className="space-y-3">
              {recentActivities.map((item, i) => (
                <div key={i} className={`flex items-center gap-3 py-2 ${i < recentActivities.length - 1 ? `border-b ${t.divider}` : ""}`}>
                  <div className={`h-2 w-2 flex-shrink-0 rounded-full ${
                    item.type === "pricing" ? "bg-amber-400" :
                    item.type === "seo" ? "bg-blue-400" :
                    item.type === "portfolio" ? "bg-emerald-400" :
                    "bg-red-400"
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm truncate ${t.text}`}>{item.action}</p>
                    <p className={`text-xs ${t.textFaint}`}>{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Website health */}
      <div className={`rounded-2xl p-5 ${t.card}`}>
        <div className="mb-4 flex items-center justify-between">
          <h3 className={`font-semibold ${t.text}`}>Trạng thái website</h3>
          <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${t.badgeGreen}`}>Online</span>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { label: "Uptime", value: "99.9%", sub: "30 ngày qua" },
            { label: "Tốc độ tải", value: "1.2s", sub: "Trung bình" },
            { label: "Core Web Vitals", value: "Tốt", sub: "LCP / CLS / INP" },
          ].map((item) => (
            <div key={item.label} className={`rounded-xl p-4 ${isDark ? "bg-white/[0.04]" : "bg-gray-50"}`}>
              <div className={`text-xl font-bold ${t.text}`}>{item.value}</div>
              <div className={`text-sm font-medium ${t.textMuted}`}>{item.label}</div>
              <div className={`text-xs ${t.textFaint}`}>{item.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

