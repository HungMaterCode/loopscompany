"use client";

import { useState, useEffect } from "react";
import {
  BarChart3, Eye, Layers3, LogOut, MonitorSmartphone, Palette,
  Search, Settings2, ShieldCheck, Sparkles, Globe, Menu, X,
  BookOpen, Users, UserSquare2,
} from "lucide-react";
import { tc, type AdminTheme, type AdminTab } from "./admin/types";
import { Dashboard } from "./admin/Dashboard";
import { SectionManager } from "./admin/SectionManager";
import { PricingManager } from "./admin/PricingManager";
import { PortfolioManager } from "./admin/PortfolioManager";
import { ServicesManager } from "./admin/ServicesManager";
import { BlogManager } from "./admin/BlogManager";
import { UsersManager } from "./admin/UsersManager";
import { TeamManager } from "./admin/TeamManager";
import { SeoManager } from "./admin/SeoManager";
import { AppearanceManager } from "./admin/AppearanceManager";
import { SiteConfigManager } from "./admin/SiteConfigManager";
import { ContactManager } from "./admin/ContactManager";

const NAV_ITEMS: { id: AdminTab; label: string; icon: typeof Layers3; group?: string }[] = [
  { id: "dashboard",   label: "Tổng quan",    icon: BarChart3,         group: "main" },
  { id: "sections",    label: "Section",      icon: Layers3,           group: "content" },
  { id: "pricing",     label: "Bảng giá",     icon: MonitorSmartphone, group: "content" },
  { id: "portfolio",   label: "Dự án",        icon: BarChart3,         group: "content" },
  { id: "services",    label: "Dịch vụ",      icon: Sparkles,          group: "content" },
  { id: "blog",        label: "Bài viết",     icon: BookOpen,          group: "content" },
  { id: "contacts",    label: "Liên hệ",      icon: UserSquare2,       group: "content" },
  { id: "users",       label: "Người dùng",   icon: Users,             group: "content" },
  { id: "team",        label: "Đội ngũ",      icon: UserSquare2,       group: "content" },
  { id: "siteConfig",  label: "Cấu hình Web", icon: Settings2,         group: "tools" },
  { id: "seo",         label: "SEO",          icon: Globe,             group: "tools" },
  { id: "appearance",  label: "Giao diện",    icon: Palette,           group: "tools" },
];

const STORAGE_KEY = "vietweb_admin_theme";

function getStoredTheme(): AdminTheme {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === "light" || v === "dark") return v;
  } catch {}
  return "dark";
}

export function Admin({
  adminName = "Quản trị viên LOOP",
  onLogout,
}: {
  adminName?: string;
  onLogout?: () => void | Promise<void>;
}) {
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const [theme, setThemeState] = useState<AdminTheme>("dark");
  const [mounted, setMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    setThemeState(getStoredTheme());
  }, []);

  if (!mounted) {
    return <div className="flex h-screen overflow-hidden bg-[#020510]" />;
  }

  const isDark = theme === "dark";
  const t = tc(isDark);

  const setTheme = (next: AdminTheme) => {
    setThemeState(next);
    try { localStorage.setItem(STORAGE_KEY, next); } catch {}
  };

  const handleLogout = () => {
    void onLogout?.();
  };

  const navigate2Tab = (tab: string) => {
    setActiveTab(tab as AdminTab);
    setSidebarOpen(false);
  };

  const activeNavItem = NAV_ITEMS.find((n) => n.id === activeTab);

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className={`flex h-16 items-center gap-3 px-5 border-b ${t.divider}`}>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#C8A261]">
          <ShieldCheck className="h-4 w-4 text-white" />
        </div>
        <div>
          <div className={`text-sm font-bold ${t.text}`}>Việt Web</div>
          <div className={`text-[10px] uppercase tracking-widest ${t.textFaint}`}>Admin Panel</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
        {["main", "content", "tools"].map((group) => {
          const groupItems = NAV_ITEMS.filter((n) => n.group === group);
          const groupLabel = group === "main" ? null : group === "content" ? "Nội dung" : "Công cụ";
          return (
            <div key={group} className="mb-1">
              {groupLabel && (
                <p className={`mb-1 mt-3 px-3 text-[10px] font-semibold uppercase tracking-widest ${t.textFaint}`}>
                  {groupLabel}
                </p>
              )}
              {groupItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => navigate2Tab(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium ${isActive ? t.navActive : t.navItem}`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    {item.label}
                  </button>
                );
              })}
            </div>
          );
        })}
      </nav>

      {/* User info */}
      <div className={`border-t ${t.divider} p-3`}>
        <div className={`flex items-center gap-3 rounded-xl px-3 py-2.5 ${isDark ? "bg-white/[0.04]" : "bg-gray-50"}`}>
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
            {adminName?.charAt(0).toUpperCase() || "A"}
          </div>
          <div className="flex-1 min-w-0">
            <p className={`text-sm font-semibold truncate ${t.text}`}>{adminName}</p>
            <p className={`text-xs ${t.textFaint}`}>Quản trị viên</p>
          </div>
          <button onClick={handleLogout} title="Đăng xuất"
            className={`rounded-lg p-1.5 transition ${isDark ? "hover:bg-white/10 text-white/40 hover:text-white" : "hover:bg-gray-200 text-gray-400 hover:text-gray-700"}`}>
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </>
  );

  return (
    <div className={`flex h-screen overflow-hidden ${t.page}`}>
      {/* Desktop sidebar */}
      <aside className={`hidden lg:flex lg:flex-col w-60 shrink-0 border-r ${t.sidebar}`}>
        <SidebarContent />
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <aside className={`absolute left-0 top-0 bottom-0 flex w-64 flex-col border-r ${t.sidebar}`}>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header className={`flex h-16 shrink-0 items-center gap-4 border-b px-4 sm:px-6 ${t.topbar}`}>
          <button onClick={() => setSidebarOpen(true)} className={`lg:hidden rounded-lg p-2 transition ${isDark ? "hover:bg-white/10 text-white/60" : "hover:bg-gray-100 text-gray-500"}`}>
            <Menu className="h-5 w-5" />
          </button>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2">
            <span className={`text-sm ${t.textFaint}`}>Admin</span>
            <span className={t.textFaint}>/</span>
            <span className={`text-sm font-semibold ${t.text}`}>{activeNavItem?.label || "Tổng quan"}</span>
          </div>

          <div className="ml-auto flex items-center gap-2">
            {/* Search (decorative) */}
            <div className={`hidden sm:flex items-center gap-2 rounded-xl px-3 py-2 text-sm ${isDark ? "bg-white/[0.05] text-white/35" : "bg-gray-100 text-gray-400"}`}>
              <Search className="h-3.5 w-3.5" />
              <span>Tìm kiếm...</span>
            </div>

            {/* View site */}
            <a href="/" target="_blank" rel="noopener noreferrer"
              className={`hidden sm:inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium transition ${t.btnGhost}`}>
              <Eye className="h-4 w-4" />
              <span className="hidden md:inline">Xem website</span>
            </a>

            {/* Theme quick toggle */}
            <button onClick={() => setTheme(isDark ? "light" : "dark")}
              className={`rounded-xl p-2 transition ${t.btnGhost}`} title={isDark ? "Chuyển sang sáng" : "Chuyển sang tối"}>
              {isDark
                ? <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                : <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>}
            </button>

            {/* Settings */}
            <button onClick={() => navigate2Tab("appearance")} className={`rounded-xl p-2 transition ${t.btnGhost}`} title="Cài đặt giao diện">
              <Settings2 className="h-4 w-4" />
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
            {activeTab === "dashboard"  && <Dashboard t={t} isDark={isDark} onNavigate={navigate2Tab} />}
            {activeTab === "sections"   && <SectionManager t={t} isDark={isDark} />}
            {activeTab === "pricing"    && <PricingManager t={t} isDark={isDark} />}
            {activeTab === "portfolio"  && <PortfolioManager t={t} isDark={isDark} />}
            {activeTab === "services"   && <ServicesManager t={t} isDark={isDark} />}
            {activeTab === "blog"       && <BlogManager t={t} isDark={isDark} />}
            {activeTab === "users"      && <UsersManager t={t} isDark={isDark} />}
            {activeTab === "team"       && <TeamManager t={t} isDark={isDark} />}
            {activeTab === "contacts"   && <ContactManager t={t} isDark={isDark} />}
            { activeTab === "seo"        && <SeoManager t={t} isDark={isDark} /> }
            { activeTab === "siteConfig" && <SiteConfigManager t={t} isDark={isDark} /> }
            { activeTab === "appearance" && <AppearanceManager t={t} isDark={isDark} theme={theme} onThemeChange={setTheme} /> }
          </div>
        </main>
      </div>
    </div>
  );
}
