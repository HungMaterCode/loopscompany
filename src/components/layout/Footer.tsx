"use client";

import Link from "next/link";
import { Settings } from "lucide-react";
import { RED, TEXT, TEXT60, TEXT35, BORDER, GLASS } from "@/features/legacy-core/tokens";

const COLS = [
  { title: "Dịch vụ", links: ["Landing Page","Cửa hàng online","Website doanh nghiệp","SEO & Google","Thiết kế thương hiệu"] },
  { title: "Bảng giá", links: ["W-01 — 189K/tháng","W-02 — 589K/tháng","W-03 — 889K/tháng","W-04 — 1.189K/tháng"] },
  { title: "Công ty",  links: ["Về chúng tôi","Quy trình làm việc","Danh mục dự án","Blog & Kiến thức","Tuyển dụng"] },
];

export function Footer() {
  return (
    <footer style={{ position: "relative", borderTop: `1px solid ${BORDER}`, padding: "60px 20px 28px", backgroundColor: "var(--vw-bg)" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(var(--vw-gridline-color) 1px, transparent 1px), linear-gradient(90deg, var(--vw-gridline-color) 1px, transparent 1px)`, backgroundSize: "60px 60px", pointerEvents: "none" }} />
      <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 44 }} className="footer-grid">
          {/* Brand */}
          <div>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, textDecoration: "none" }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: RED, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 11, fontWeight: 800, letterSpacing: "-0.04em" }}>LP</div>
              <span style={{ color: TEXT, fontWeight: 800, fontSize: 16, letterSpacing: "-0.04em" }}>LOOP</span>
            </Link>
            <p style={{ color: TEXT60, fontSize: 13, lineHeight: 1.7, margin: "0 0 18px", maxWidth: 240 }}>
              Đơn vị thiết kế và cho thuê website chuyên nghiệp hàng đầu cho doanh nghiệp Việt Nam.
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              {["ZA","FB","YT"].map(s => (
                <div key={s} style={{ width: 32, height: 32, borderRadius: 8, ...GLASS, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                  <span style={{ color: TEXT60, fontSize: 9, fontWeight: 700 }}>{s}</span>
                </div>
              ))}
            </div>
          </div>
          {COLS.map(col => (
            <div key={col.title}>
              <p style={{ color: TEXT, fontSize: 12, fontWeight: 600, margin: "0 0 12px", letterSpacing: "0.02em" }}>{col.title}</p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                {col.links.map(link => (
                  <li key={link}>
                    <a href="#" style={{ color: TEXT35, fontSize: 12, textDecoration: "none", transition: "color 0.2s" }}
                      onMouseEnter={e => (e.currentTarget.style.color = TEXT)}
                      onMouseLeave={e => (e.currentTarget.style.color = TEXT35)}>{link}</a>
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
