"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Settings } from "lucide-react";
import { RED, TEXT, TEXT60, TEXT35, BORDER, GLASS } from "@/features/legacy-core/tokens";
import { SITE } from "@/lib/site";
import { useTheme } from "@/features/legacy-core/theme-context";

const COLS = [
  {
    title: "Dịch vụ",
    links: [
      { label: "Landing Page", href: "/#services" },
      { label: "Cửa hàng online", href: "/#services" },
      { label: "Website doanh nghiệp", href: "/#services" },
      { label: "SEO & Google", href: "/#services" },
      { label: "Thiết kế thương hiệu", href: "/#services" }
    ]
  },
  {
    title: "Bảng giá",
    links: [
      { label: "W-01 — 189K/tháng", href: "/bao-gia" },
      { label: "W-02 — 589K/tháng", href: "/bao-gia" },
      { label: "W-03 — 889K/tháng", href: "/bao-gia" },
      { label: "W-04 — 1.189K/tháng", href: "/bao-gia" },
      { label: "Tất cả bảng giá", href: "/bao-gia" }
    ]
  },
  {
    title: "Công ty",
    links: [
      { label: "Đội ngũ", href: "/doi-ngu" },
      { label: "Danh mục dự án", href: "/du-an" },
      { label: "Blog & Kiến thức", href: "/bai-viet" }
    ]
  },
];

export function Footer() {
  const { isDark } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const logoSrc = mounted && isDark ? "/logo_White.png" : "/LOOP_LOGO_removeBG.png";

  return (
    <footer style={{ position: "relative", borderTop: `1px solid ${BORDER}`, padding: "60px 20px 28px", backgroundColor: "var(--vw-bg)" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(var(--vw-gridline-color) 1px, transparent 1px), linear-gradient(90deg, var(--vw-gridline-color) 1px, transparent 1px)`, backgroundSize: "60px 60px", pointerEvents: "none" }} />
      <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 44 }} className="footer-grid">
          {/* Brand */}
          <div>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, textDecoration: "none" }}>
              <img src={logoSrc} alt="LOOP Logo" style={{ height: '42px', objectFit: 'contain' }} />
            </Link>
            <p style={{ color: TEXT60, fontSize: 13, lineHeight: 1.7, margin: "0 0 16px", maxWidth: 240 }}>
              Đơn vị thiết kế và cho thuê website chuyên nghiệp hàng đầu cho doanh nghiệp Việt Nam.
            </p>
            
            {/* Contact Details */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20, fontSize: 12, color: TEXT60 }}>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <span style={{ color: TEXT, fontWeight: 500 }}>Hotline:</span>
                <a href={`tel:${SITE.hotline.replace(/[^\d+]/g, "")}`} style={{ color: TEXT60, textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = TEXT)}
                  onMouseLeave={e => (e.currentTarget.style.color = TEXT60)}>{SITE.hotline}</a>
              </div>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <span style={{ color: TEXT, fontWeight: 500 }}>Email:</span>
                <a href={`mailto:${SITE.email}`} style={{ color: TEXT60, textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = TEXT)}
                  onMouseLeave={e => (e.currentTarget.style.color = TEXT60)}>{SITE.email}</a>
              </div>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <span style={{ color: TEXT, fontWeight: 500 }}>Địa chỉ:</span>
                <span>{SITE.address}</span>
              </div>
            </div>

            {/* Social Links */}
            <div style={{ display: "flex", gap: 8 }}>
              {[
                { label: "ZA", href: `https://zalo.me/${SITE.zalo.replace(/[^\d]/g, "")}` },
                { label: "FB", href: "https://facebook.com" },
                { label: "YT", href: "https://youtube.com" }
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" style={{ width: 32, height: 32, borderRadius: 8, ...GLASS, display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", cursor: "pointer", transition: "border-color 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--sc-accent)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--vw-glass-border)"; }}>
                  <span style={{ color: TEXT60, fontSize: 9, fontWeight: 700 }}>{s.label}</span>
                </a>
              ))}
            </div>
          </div>
          {COLS.map(col => (
            <div key={col.title}>
              <p style={{ color: TEXT, fontSize: 12, fontWeight: 600, margin: "0 0 12px", letterSpacing: "0.02em" }}>{col.title}</p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                {col.links.map(link => (
                  <li key={link.label}>
                    <Link href={link.href} style={{ color: TEXT35, fontSize: 12, textDecoration: "none", transition: "color 0.2s" }}
                      onMouseEnter={e => (e.currentTarget.style.color = TEXT)}
                      onMouseLeave={e => (e.currentTarget.style.color = TEXT35)}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 20, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
          <p style={{ color: TEXT35, fontSize: 12, margin: 0 }}>© 2026 LOOP. Bảo lưu mọi quyền.</p>
          <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
            {["Điều khoản","Bảo mật","Hỗ trợ"].map(item => (
              <a key={item} href="#" style={{ color: TEXT35, fontSize: 12, textDecoration: "none" }}
                onMouseEnter={e => (e.currentTarget.style.color = TEXT)}
                onMouseLeave={e => (e.currentTarget.style.color = TEXT35)}>{item}</a>
            ))}
            <Link href="/admin/dang-nhap"
              style={{ display: "flex", alignItems: "center", gap: 5, color: TEXT35, fontSize: 11, textDecoration: "none", padding: "5px 11px", borderRadius: 20, border: `1px solid ${BORDER}`, transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.color = TEXT; e.currentTarget.style.borderColor = "var(--vw-border-m)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = TEXT35; e.currentTarget.style.borderColor = BORDER; }}>
              <Settings size={11} /> Quản trị
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
