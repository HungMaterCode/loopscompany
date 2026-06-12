"use client";

/**
 * ══════════════════════════════════════════════════════════════════════════════
 *  BaogiaWeb.tsx — Trang báo giá website độc lập (Self-contained)
 *
 *  Chỉ phụ thuộc: react, motion/react, lucide-react
 *  Không import bất kỳ file nội bộ nào của project.
 *
 *  ĐỂ DÙNG TRÊN SITE KHÁC:
 *  1. Copy file này vào project mới
 *  2. Chỉnh CONFIG bên dưới (màu, tên công ty, SĐT)
 *  3. Install: pnpm add motion lucide-react (nếu chưa có)
 *  4. Import: import BaogiaWeb from "./BaogiaWeb"
 *
 *  Route gợi ý: { path: "/bao-gia", Component: BaogiaWeb }
 * ══════════════════════════════════════════════════════════════════════════════
 */

import { useState, useRef, useEffect, type ReactNode, type CSSProperties } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Check, X, Star, Send, ChevronDown, Globe, Server, ShieldCheck,
  Search, Zap, ShoppingBag, Building2, Wand2, ArrowRight, Sparkles,
  FileText, BadgeCheck, RefreshCw, CreditCard, ArrowLeft, Phone,
} from "lucide-react";

// ══════════════════════════════════════════════════════════════════════════════
//  SECTION 1: CONFIG — Chỉnh tại đây khi chuyển sang site khác
// ══════════════════════════════════════════════════════════════════════════════

const CONFIG = {
  // Thông tin thương hiệu
  brand:        "LOOPS",
  brandInitial: "LP",
  companyDesc:  "Thiết kế & cho thuê website chuyên nghiệp",
  contactPhone: "0901 234 567",
  heroImageUrl: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920&q=80",

  // Tự động chuyển Light/Dark theme qua CSS Variables của hệ thống
  accent:      "var(--sc-accent, #C8A261)",
  accentHover: "var(--vw-accent-hover, #D4AF37)",
  accentRgb:   "var(--vw-accent-rgb, 200, 162, 97)",

  bg:          "var(--sc-bg-4, #050400)",
  bgNav:       "var(--vw-bg-nav, rgba(5,4,0,0.90))",
  text:        "var(--sc-text, #ffffff)",
  text60:      "var(--sc-text-60, rgba(255,255,255,0.60))",
  text35:      "var(--sc-text-35, rgba(255,255,255,0.35))",
  border:      "var(--sc-border, rgba(255,255,255,0.06))",
  borderM:     "var(--sc-border-m, rgba(255,255,255,0.08))",
  glassBg:     "var(--sc-card-bg, rgba(255,255,255,0.03))",
  glassBorder: "var(--sc-card-border, rgba(255,255,255,0.06))",
  glassShadow: "var(--sc-glass-shadow, 0 12px 40px rgba(0,0,0,0.55))",
  gridline:    "var(--sc-grid-line, rgba(255,255,255,0.025))",
};

// ══════════════════════════════════════════════════════════════════════════════
//  SECTION 2: STYLES — Derived từ CONFIG
// ══════════════════════════════════════════════════════════════════════════════

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const glass: CSSProperties = {
  background: CONFIG.glassBg,
  backdropFilter: "blur(22px)",
  WebkitBackdropFilter: "blur(22px)",
  border: `1px solid ${CONFIG.glassBorder}`,
  boxShadow: CONFIG.glassShadow,
};

function a(alpha: number) {
  return `rgba(var(--vw-accent-rgb, 200, 162, 97), ${alpha})`;
}

function fmt(n: number) {
  return n.toLocaleString("vi-VN") + "đ";
}

// ══════════════════════════════════════════════════════════════════════════════
//  SECTION 3: DATA
// ══════════════════════════════════════════════════════════════════════════════

const PACKAGES = [
  {
    id: "W-01", icon: Zap, isRental: false,
    name: "Landing Page",    tag: "Khởi đầu",
    subtitle: "Trang đích chuyển đổi cao",
    price: 3890000, monthly: "189.000", lp: 400,
    cover: "https://images.unsplash.com/photo-1634084462412-b54873c0a56d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80",
    features: ["1 trang đích tối ưu CRO", "Form liên hệ + Zalo OA tích hợp", "Responsive hoàn hảo mọi thiết bị", "SEO cơ bản On-page", "Tên miền phụ miễn phí", "Băng thông không giới hạn"],
    missing: ["SSL bảo mật cao cấp", "Email doanh nghiệp", "Blog & nội dung"],
  },
  {
    id: "W-02", icon: ShoppingBag, isRental: false,
    name: "Bán Hàng Online", tag: "Tiêu chuẩn",
    subtitle: "Cửa hàng online đầy đủ tính năng",
    price: 6890000, monthly: "589.000", lp: 700,
    cover: "https://images.unsplash.com/photo-1631125915902-d8abe9225ff2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80",
    features: ["Danh mục sản phẩm & giỏ hàng", "Quản lý đơn hàng tự động", "Thanh toán online đa cổng", "SSL bảo mật miễn phí", "Tên miền riêng .com/.vn", "Hỗ trợ ưu tiên"],
    missing: ["SEO nâng cao", "Email doanh nghiệp"],
  },
  {
    id: "W-03", icon: Building2, isRental: false, highlight: true,
    name: "Doanh Nghiệp",   tag: "Phổ biến nhất",
    subtitle: "Website tổ chức chuyên nghiệp",
    price: 9890000, monthly: "889.000", lp: 1000,
    cover: "https://images.unsplash.com/photo-1766330977451-de1b64b5e641?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80",
    features: ["Đa trang + Blog tích hợp", "Thiết kế premium cao cấp", "SEO nâng cao & Core Web Vitals", "Google Analytics & Heatmap", "Tên miền + Email doanh nghiệp", "Hỗ trợ VIP 24/7", "Sao lưu dữ liệu hàng tuần"],
    missing: [],
  },
  {
    id: "W-04", icon: Wand2, isRental: false,
    name: "Theo Yêu Cầu",  tag: "Enterprise",
    subtitle: "Giải pháp tùy chỉnh độc quyền",
    price: 12890000, monthly: "1.189.000", lp: 1300,
    cover: "https://images.unsplash.com/photo-1709486511766-76bdd8b51713?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80",
    features: ["Thiết kế UI/UX độc quyền 100%", "Tích hợp hệ thống CRM/ERP", "Bảo mật nâng cao enterprise", "Báo cáo thống kê hàng tháng", "Hosting VIP + CDN toàn cầu", "Hotline hỗ trợ riêng 24/7", "Cập nhật nội dung không giới hạn"],
    missing: [],
  },
];

const RENT_PACKAGES = [
  {
    id: "R-01", icon: Zap, isRental: true,
    name: "Landing Page",    tag: "Khởi đầu",
    subtitle: "Trang đích chuyển đổi cao",
    price: 189000, monthly: "", lp: 200,
    cover: "https://images.unsplash.com/photo-1634084462412-b54873c0a56d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80",
    features: ["Landing Page đơn giản chuẩn CRO", "Responsive mọi thiết bị", "Tên miền phụ miễn phí", "Hỗ trợ kỹ thuật cơ bản", "Băng thông không giới hạn"],
    missing: ["SSL bảo mật", "SEO tối ưu", "Email doanh nghiệp"],
  },
  {
    id: "R-02", icon: ShoppingBag, isRental: true,
    name: "Bán Hàng Online", tag: "Tiêu chuẩn",
    subtitle: "Cửa hàng online đầy đủ tính năng",
    price: 589000, monthly: "", lp: 600,
    cover: "https://images.unsplash.com/photo-1631125915902-d8abe9225ff2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80",
    features: ["Landing Page tùy chỉnh thương hiệu", "Form liên hệ + Zalo OA", "SSL bảo mật miễn phí", "Hỗ trợ ưu tiên", "Tên miền riêng .com/.vn"],
    missing: ["SEO nâng cao", "Email doanh nghiệp"],
  },
  {
    id: "R-03", icon: Building2, isRental: true, highlight: true,
    name: "Doanh Nghiệp",   tag: "Phổ biến nhất",
    subtitle: "Website tổ chức chuyên nghiệp",
    price: 889000, monthly: "", lp: 1000,
    cover: "https://images.unsplash.com/photo-1766330977451-de1b64b5e641?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80",
    features: ["Landing Page đa phần + Blog", "Thiết kế premium cao cấp", "SEO cơ bản & Core Web Vitals", "Google Analytics tích hợp", "Hỗ trợ 24/7", "Tên miền + Email doanh nghiệp", "Sao lưu dữ liệu hàng tuần"],
    missing: [],
  },
  {
    id: "R-04", icon: Wand2, isRental: true,
    name: "Theo Yêu Cầu",  tag: "Enterprise",
    subtitle: "Giải pháp tùy chỉnh hoàn toàn",
    price: 1189000, monthly: "", lp: 1400,
    cover: "https://images.unsplash.com/photo-1709486511766-76bdd8b51713?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80",
    features: ["Website đầy đủ tính năng", "Thiết kế độc quyền theo brand", "SEO nâng cao & tối ưu tốc độ", "Báo cáo thống kê hàng tháng", "Hỗ trợ VIP 24/7 + hotline riêng", "Hosting VIP + CDN toàn cầu", "Cập nhật nội dung không giới hạn", "Bảo mật nâng cao"],
    missing: [],
  },
];

type AnyPkg = typeof PACKAGES[0] | typeof RENT_PACKAGES[0];

const DOMAIN_OPTS  = [{ label: "Không đăng ký tên miền", value: 0 }, { label: "Tên miền .com  +350.000đ", value: 350000 }, { label: "Tên miền .vn  +550.000đ", value: 550000 }];
const HOSTING_OPTS = [{ label: "2GB NVMe — kèm theo gói", value: 0 }, { label: "5GB NVMe  +500.000đ", value: 500000 }, { label: "10GB NVMe  +1.000.000đ", value: 1000000 }];
const SSL_OPTS     = [{ label: "SSL miễn phí mặc định", value: 0 }, { label: "SSL Sectigo cao cấp  +450.000đ", value: 450000 }, { label: "SSL + CDN Cloudflare  +950.000đ", value: 950000 }];

// ══════════════════════════════════════════════════════════════════════════════
//  SECTION 4: SHARED KEYFRAMES CSS (inject once)
// ══════════════════════════════════════════════════════════════════════════════

const KEYFRAMES = `
@keyframes bw-floatOrb { 0%,100%{transform:translate(0,0)} 40%{transform:translate(30px,-40px)} 70%{transform:translate(-20px,20px)} }
@keyframes bw-slideX   { 0%,100%{transform:translateX(0)} 50%{transform:translateX(8px)} }
`;

// ══════════════════════════════════════════════════════════════════════════════
//  SECTION 5: SUB-COMPONENTS
// ══════════════════════════════════════════════════════════════════════════════

// ── 5a. Custom Dropdown ───────────────────────────────────────────────────────

function CustomSelect({ options, value, onChange }: {
  options: { label: string; value: number }[];
  value: number; onChange: (v: number) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.value === value) ?? options[0];

  useEffect(() => {
    const fn = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative", width: 220, flexShrink: 0 }}>
      <button type="button" onClick={() => setOpen((v) => !v)}
        style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, background: CONFIG.glassBg, border: `1px solid ${open ? CONFIG.accent : CONFIG.borderM}`, borderRadius: 10, padding: "9px 12px 9px 13px", fontSize: 12, color: CONFIG.text, cursor: "pointer", outline: "none", boxShadow: open ? `0 0 0 3px ${a(0.12)}` : "none", transition: "border-color 0.2s, box-shadow 0.2s" }}>
        <AnimatePresence mode="wait">
          <motion.span key={selected.value}
            initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", textAlign: "left", display: "inline-block" }}>
            {selected.label}
          </motion.span>
        </AnimatePresence>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }} style={{ display: "flex", flexShrink: 0 }}>
          <ChevronDown size={13} color={CONFIG.accent} />
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -6, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -6, scale: 0.97 }} transition={{ duration: 0.18, ease: EASE }}
            style={{ position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0, zIndex: 100, background: CONFIG.glassBg, backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: `1px solid ${CONFIG.glassBorder}`, borderRadius: 12, boxShadow: "0 16px 48px rgba(0,0,0,0.35)", overflow: "hidden", padding: 4 }}>
            {options.map((opt) => {
              const isActive = opt.value === value;
              return (
                <button key={opt.value} type="button" onClick={() => { onChange(opt.value); setOpen(false); }}
                  style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, padding: "9px 12px", borderRadius: 8, border: "none", cursor: "pointer", background: isActive ? a(0.12) : "transparent", color: isActive ? CONFIG.accent : CONFIG.text60, fontSize: 12, fontWeight: isActive ? 700 : 400, textAlign: "left", transition: "background 0.15s, color 0.15s" }}
                  onMouseEnter={(e) => { if (!isActive) { e.currentTarget.style.background = "rgba(237,232,225,0.08)"; e.currentTarget.style.color = CONFIG.text; } }}
                  onMouseLeave={(e) => { if (!isActive) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = CONFIG.text60; } }}>
                  <span>{opt.label}</span>
                  {isActive && <Check size={13} color={CONFIG.accent} style={{ flexShrink: 0 }} />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── 5b. Addon Row ─────────────────────────────────────────────────────────────

function AddonRow({ icon: Icon, label, desc, options, value, onChange }: {
  icon: typeof Globe; label: string; desc: string;
  options: { label: string; value: number }[];
  value: number; onChange: (v: number) => void;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", borderRadius: 14, background: CONFIG.glassBg, border: `1px solid ${CONFIG.border}` }}>
      <div style={{ width: 36, height: 36, borderRadius: 10, background: a(0.1), display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icon size={16} color={CONFIG.accent} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: CONFIG.text, margin: "0 0 1px" }}>{label}</p>
        <p style={{ fontSize: 11, color: CONFIG.text35, margin: 0 }}>{desc}</p>
      </div>
      <CustomSelect options={options} value={value} onChange={onChange} />
      <AnimatePresence>
        {value > 0 && (
          <motion.span key={value}
            initial={{ scale: 0.5, opacity: 0, x: -10 }}
            animate={{ scale: [1.1, 1], opacity: 1, x: 0 }}
            exit={{ scale: 0.5, opacity: 0, x: 10 }}
            transition={{ type: "spring", stiffness: 400, damping: 12 }}
            style={{ fontSize: 12, fontWeight: 800, color: CONFIG.accent, background: a(0.15), border: `1px solid ${a(0.3)}`, padding: "4px 10px", borderRadius: 20, flexShrink: 0, whiteSpace: "nowrap" }}>
            +{fmt(value)}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── 5c. Package Card ──────────────────────────────────────────────────────────

function PackageCard({ p, active, onClick, isRentalMode, idx }: {
  p: AnyPkg; active: boolean; onClick: () => void; isRentalMode: boolean; idx: number;
}) {
  const Icon = p.icon;
  return (
    <motion.button
      initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.08, duration: 0.5, ease: EASE }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick} type="button"
      style={{ position: "relative", padding: 0, borderRadius: 20, overflow: "hidden", cursor: "pointer", textAlign: "left", border: active ? `2px solid ${CONFIG.accent}` : `1px solid ${CONFIG.border}`, background: active ? a(0.05) : CONFIG.glassBg, boxShadow: active ? `0 0 0 4px ${a(0.10)}, 0 16px 48px rgba(0,0,0,0.2)` : "0 4px 16px rgba(0,0,0,0.1)", transition: "background 0.25s, border-color 0.25s, box-shadow 0.25s" }}>

      {/* Cover image */}
      <div style={{ height: 130, overflow: "hidden", position: "relative" }}>
        <img src={p.cover} alt={p.name}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: active ? "none" : "saturate(0.4) brightness(0.6)", transition: "filter 0.4s" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.8) 100%)" }} />
        {active && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: CONFIG.accent }} />}
        {"highlight" in p && p.highlight && !active && (
          <div style={{ position: "absolute", top: 8, right: 8, background: CONFIG.accent, color: "#fff", fontSize: 8, fontWeight: 800, padding: "3px 7px", borderRadius: 20, letterSpacing: "0.05em" }}>⭐ PHỔ BIẾN</div>
        )}
        <div style={{ position: "absolute", bottom: 10, left: 12, right: 12, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: active ? CONFIG.accent : "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.25s" }}>
            <Icon size={14} color="#fff" />
          </div>
          {active && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
              style={{ width: 22, height: 22, borderRadius: "50%", background: CONFIG.accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Check size={11} color="#fff" strokeWidth={3} />
            </motion.div>
          )}
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: "12px 14px 14px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
          <p style={{ fontSize: 14, fontWeight: 800, color: active ? CONFIG.accent : CONFIG.text, margin: 0 }}>{p.name}</p>
          <span style={{ fontSize: 9, fontWeight: 800, color: active ? CONFIG.accent : CONFIG.text35, background: active ? a(0.10) : CONFIG.borderM, padding: "3px 7px", borderRadius: 20, textTransform: "uppercase", letterSpacing: "0.05em" }}>{p.tag}</span>
        </div>
        <p style={{ fontSize: 11, color: CONFIG.text35, margin: "0 0 10px", lineHeight: 1.4 }}>{p.subtitle}</p>
        <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
          <span style={{ fontSize: 20, fontWeight: 900, color: active ? CONFIG.accent : CONFIG.text, letterSpacing: "-0.03em" }}>
            {isRentalMode ? p.price.toLocaleString("vi-VN") : (p.price / 1000000).toFixed(2) + "M"}
          </span>
          <span style={{ fontSize: 10, color: CONFIG.text35 }}>
            {isRentalMode ? "đ/tháng" : "đ · từ " + (p as typeof PACKAGES[0]).monthly + "₫/tháng"}
          </span>
        </div>
      </div>
    </motion.button>
  );
}

// ── 5d. Preview Panel (right column) ─────────────────────────────────────────

function PreviewPanel({ pkg, domain, hosting, ssl, seo, onSubmit }: {
  pkg: AnyPkg; domain: number; hosting: number; ssl: number; seo: boolean; onSubmit: () => void;
}) {
  const isRental = pkg.isRental;
  const subtotal = isRental ? pkg.price : pkg.price + domain + hosting + ssl + (seo ? 500000 : 0);
  const vat      = Math.round(subtotal * 0.1);
  const total    = isRental ? pkg.price : subtotal + vat;

  const lineItems = isRental
    ? [{ id: "base", label: "Gói " + pkg.name, value: pkg.price }]
    : [
        { id: "base", label: "Gói " + pkg.name, value: pkg.price },
        ...(domain  ? [{ id: "domain", label: "Tên miền",     value: domain }]  : []),
        ...(hosting ? [{ id: "hosting", label: "Hosting NVMe", value: hosting }] : []),
        ...(ssl     ? [{ id: "ssl", label: "SSL / CDN",     value: ssl }]     : []),
        ...(seo     ? [{ id: "seo", label: "SEO On-page",  value: 500000 }]  : []),
      ];

  return (
    <div style={{ position: "sticky", top: 90, borderRadius: 24, overflow: "hidden", border: `1px solid ${CONFIG.border}`, boxShadow: `0 0 0 1px rgba(255,255,255,0.04), 0 32px 80px rgba(0,0,0,0.35), 0 0 60px ${a(0.18)}` }}>

      {/* Accent stripe */}
      <div style={{ height: 4, background: `linear-gradient(90deg, ${CONFIG.accent}, ${a(0.4)})` }} />

      {/* Cover */}
      <div style={{ position: "relative", height: 200, overflow: "hidden" }}>
        <AnimatePresence>
          <motion.img key={pkg.id} src={pkg.cover} alt={pkg.name}
            initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        </AnimatePresence>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 20%, rgba(0,0,0,0.82) 100%)" }} />
        <AnimatePresence>
          <motion.div key={pkg.id + "lbl"}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            style={{ position: "absolute", bottom: 16, left: 18, right: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
              <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: CONFIG.accent, background: a(0.15), border: `1px solid ${a(0.3)}`, padding: "3px 9px", borderRadius: 20 }}>{pkg.tag}</span>
              {"highlight" in pkg && pkg.highlight && <span style={{ fontSize: 9, fontWeight: 800, color: "#fff", background: CONFIG.accent, padding: "3px 9px", borderRadius: 20 }}>⭐ PHỔ BIẾN</span>}
            </div>
            <p style={{ color: "#fff", fontSize: 18, fontWeight: 800, margin: "0 0 2px" }}>{pkg.name}</p>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 11, margin: 0 }}>{pkg.subtitle}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Feature list */}
      <div style={{ background: CONFIG.glassBg, padding: "20px 22px 0" }}>
        <p style={{ fontSize: 10, fontWeight: 800, color: CONFIG.text35, textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 12px" }}>Bao gồm trong gói</p>
          <motion.div key={pkg.id + "feat"}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 7, marginBottom: 16 }}>
              {pkg.features.map((f, i) => (
                <motion.div key={f} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04, duration: 0.25 }}
                  style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                  <Check size={12} color={CONFIG.accent} style={{ marginTop: 2, flexShrink: 0 }} />
                  <span style={{ fontSize: 12, color: CONFIG.text60, lineHeight: 1.5 }}>{f}</span>
                </motion.div>
              ))}
              {pkg.missing.map((f) => (
                <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: 8, opacity: 0.28 }}>
                  <X size={12} color={CONFIG.text35} style={{ marginTop: 2, flexShrink: 0 }} />
                  <span style={{ fontSize: 12, color: CONFIG.text35, lineHeight: 1.5, textDecoration: "line-through" }}>{f}</span>
                </div>
              ))}
            </div>
          </motion.div>
      </div>

      {/* Price breakdown */}
      <div style={{ background: CONFIG.glassBg, borderTop: `1px solid ${CONFIG.border}`, padding: "18px 22px 0" }}>
        <p style={{ fontSize: 10, fontWeight: 800, color: CONFIG.text35, textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 12px" }}>Chi tiết chi phí</p>
        <AnimatePresence>
          {lineItems.map((item) => (
            <motion.div key={item.id}
              initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22 }}
              style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${CONFIG.border}` }}>
              <motion.span key={item.label} initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ fontSize: 12, color: CONFIG.text60 }}>{item.label}</motion.span>
              <motion.span key={item.value} initial={{ scale: 1.1 }} animate={{ scale: 1 }} style={{ fontSize: 12, fontWeight: 600, color: CONFIG.text }}>{fmt(item.value)}</motion.span>
            </motion.div>
          ))}
        </AnimatePresence>
        {!isRental && (
          <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${CONFIG.border}` }}>
            <span style={{ fontSize: 12, color: CONFIG.text35 }}>Thuế VAT (10%)</span>
            <span style={{ fontSize: 12, color: CONFIG.text35 }}>{fmt(vat)}</span>
          </div>
        )}

        <div style={{ padding: "16px 0 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <p style={{ fontSize: 10, fontWeight: 700, color: CONFIG.text35, textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 2px" }}>
              {isRental ? "Chi phí hàng tháng" : "Tổng dự tính"}
            </p>
            <p style={{ fontSize: 10, color: CONFIG.text35, margin: 0 }}>
              {isRental ? "Đã bao gồm hosting + hỗ trợ" : "Đã bao gồm VAT 10%"}
            </p>
          </div>
          <motion.span key={total}
            initial={{ scale: 1.15 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 350, damping: 15 }}
            style={{ fontSize: 26, fontWeight: 900, letterSpacing: "-0.04em", color: CONFIG.accent, display: "flex", alignItems: "baseline", gap: 4 }}>
            {fmt(total)}
            {isRental && <span style={{ fontSize: 12, fontWeight: 600, color: CONFIG.text35 }}>/tháng</span>}
          </motion.span>
        </div>
      </div>

      {/* LP + CTA */}
      <div style={{ background: CONFIG.glassBg, borderTop: `1px solid ${CONFIG.border}`, padding: "18px 22px 22px" }}>
          <motion.div key={pkg.lp} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}
            style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 14px", marginBottom: 16, borderRadius: 12, background: a(0.07), border: `1px solid ${a(0.18)}` }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: CONFIG.accent, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: `0 4px 14px ${a(0.35)}` }}>
              <Star size={16} color="#fff" fill="#fff" />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 16, fontWeight: 900, color: CONFIG.accent, margin: "0 0 1px" }}>+{pkg.lp} LP</p>
              <p style={{ fontSize: 10, color: CONFIG.text35, margin: 0 }}>
                {isRental ? "Điểm thưởng mỗi tháng" : "Điểm thưởng khi hoàn tất đăng ký"}
              </p>
            </div>
          </motion.div>

        <motion.button
          whileHover={{ scale: 1.03, boxShadow: `0 16px 48px ${a(0.45)}` }} whileTap={{ scale: 0.97 }}
          onClick={onSubmit} type="button"
          style={{ width: "100%", padding: "15px", borderRadius: 14, background: CONFIG.accent, border: "none", color: "#fff", fontSize: 13, fontWeight: 800, cursor: "pointer", letterSpacing: "0.02em", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: `0 8px 28px ${a(0.35)}`, transition: "box-shadow 0.2s" }}>
          <Send size={14} /> ĐĂNG KÝ GÓI NÀY
        </motion.button>
        <p style={{ textAlign: "center", fontSize: 11, color: CONFIG.text35, margin: "10px 0 0", lineHeight: 1.6 }}>
          🔒 Bảo mật · Miễn phí tư vấn · Phản hồi trong 30 phút
        </p>
      </div>
    </div>
  );
}

// ── 5e. Form Modal ────────────────────────────────────────────────────────────

function FormModal({ pkg, total, onClose, onSuccess }: {
  pkg: AnyPkg; total: number; onClose: () => void; onSuccess: (name: string, phone: string) => void;
}) {
  const [name, setName]   = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  const inp: CSSProperties = { width: "100%", boxSizing: "border-box", background: CONFIG.glassBg, border: `1.5px solid ${CONFIG.borderM}`, borderRadius: 12, padding: "13px 16px", fontSize: 14, color: CONFIG.text, outline: "none", transition: "border-color 0.2s, box-shadow 0.2s" };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ position: "fixed", inset: 0, zIndex: 200, backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", background: "rgba(0,0,0,0.65)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}
      onClick={onClose}>
      <motion.div initial={{ opacity: 0, scale: 0.92, y: 32 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.4, ease: EASE }} onClick={(e) => e.stopPropagation()}
        style={{ ...glass, borderRadius: 28, width: "100%", maxWidth: 520, overflow: "hidden", boxShadow: "0 40px 100px rgba(0,0,0,0.5)" }}>
        <div style={{ height: 5, background: `linear-gradient(90deg, ${CONFIG.accent}, ${a(0.4)})` }} />
        <div style={{ padding: "28px 32px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
            <div style={{ width: 52, height: 52, borderRadius: 14, overflow: "hidden", flexShrink: 0 }}>
              <img src={pkg.cover} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div>
              <p style={{ fontSize: 16, fontWeight: 800, color: CONFIG.accent, margin: "0 0 2px" }}>{pkg.name}</p>
              <p style={{ fontSize: 12, color: CONFIG.text35, margin: "0 0 4px" }}>{pkg.subtitle}</p>
              <p style={{ fontSize: 15, fontWeight: 800, color: CONFIG.text, margin: 0 }}>
                {fmt(total)}{pkg.isRental ? <span style={{ fontSize: 11, color: CONFIG.text35, fontWeight: 400 }}>/tháng</span> : <span style={{ fontSize: 11, color: CONFIG.text35, fontWeight: 400 }}> (đã bao gồm VAT)</span>}
              </p>
            </div>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); onSuccess(name, phone); }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: CONFIG.text35, marginBottom: 7, textTransform: "uppercase", letterSpacing: "0.06em" }}>Họ và tên *</label>
                  <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Nguyễn Văn A" style={inp}
                    onFocus={(e) => { e.currentTarget.style.borderColor = CONFIG.accent; e.currentTarget.style.boxShadow = `0 0 0 3px ${a(0.14)}`; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = CONFIG.borderM; e.currentTarget.style.boxShadow = "none"; }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: CONFIG.text35, marginBottom: 7, textTransform: "uppercase", letterSpacing: "0.06em" }}>Zalo / SĐT *</label>
                  <input required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="0901 234 567" style={inp}
                    onFocus={(e) => { e.currentTarget.style.borderColor = CONFIG.accent; e.currentTarget.style.boxShadow = `0 0 0 3px ${a(0.14)}`; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = CONFIG.borderM; e.currentTarget.style.boxShadow = "none"; }} />
                </div>
              </div>
              <div>
                <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: CONFIG.text35, marginBottom: 7, textTransform: "uppercase", letterSpacing: "0.06em" }}>Ý tưởng / Ghi chú</label>
                <textarea value={notes} onChange={(e) => setNotes(e.target.value)}
                  placeholder="Phong cách thiết kế, màu sắc thương hiệu, website tham khảo..."
                  rows={3} style={{ ...inp, resize: "none" }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = CONFIG.accent; e.currentTarget.style.boxShadow = `0 0 0 3px ${a(0.14)}`; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = CONFIG.borderM; e.currentTarget.style.boxShadow = "none"; }} />
              </div>
              <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                style={{ width: "100%", padding: "15px", borderRadius: 14, background: CONFIG.accent, border: "none", color: "#fff", fontSize: 14, fontWeight: 800, cursor: "pointer", letterSpacing: "0.02em", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: `0 8px 28px ${a(0.35)}` }}>
                <BadgeCheck size={16} /> XÁC NHẬN & GỬI YÊU CẦU
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── 5f. Success Screen ────────────────────────────────────────────────────────

function SuccessScreen({ name, phone, pkg, total, onBack }: {
  name: string; phone: string; pkg: AnyPkg; total: number; onBack?: () => void;
}) {
  return (
    <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "80px 24px", textAlign: "center" }}>
      <div style={{ maxWidth: 520 }}>
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.6, ease: EASE }}
          style={{ width: 100, height: 100, borderRadius: "50%", background: CONFIG.accent, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 32px", boxShadow: `0 20px 60px ${a(0.45)}` }}>
          <Check size={48} color="#fff" strokeWidth={2.5} />
        </motion.div>
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          style={{ color: CONFIG.text, fontSize: "clamp(26px,4vw,42px)", fontWeight: 800, letterSpacing: "-0.04em", margin: "0 0 14px" }}>
          Yêu cầu thành công!
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          style={{ color: CONFIG.text60, fontSize: 16, lineHeight: 1.75, margin: "0 0 36px" }}>
          Chuyên viên sẽ liên hệ <strong style={{ color: CONFIG.text }}>{name}</strong> qua <strong style={{ color: CONFIG.accent }}>{phone}</strong> trong vòng 30 phút.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          style={{ ...glass, borderRadius: 20, padding: "24px 28px", marginBottom: 28, textAlign: "left" }}>
          {[{ l: "Gói", v: pkg.name }, { l: pkg.isRental ? "Chi phí/tháng" : "Tổng", v: fmt(total), a: true }, { l: "Điểm thưởng", v: `+${pkg.lp} LP`, a: true }].map((r) => (
            <div key={r.l} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: `1px solid ${CONFIG.border}` }}>
              <span style={{ fontSize: 13, color: CONFIG.text60 }}>{r.l}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: r.a ? CONFIG.accent : CONFIG.text }}>{r.v}</span>
            </div>
          ))}
        </motion.div>
        {onBack && (
          <motion.button onClick={onBack} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 32px", borderRadius: 40, background: CONFIG.accent, border: "none", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
            <ArrowLeft size={15} /> Quay lại
          </motion.button>
        )}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
//  SECTION 6: MAIN COMPONENT
// ══════════════════════════════════════════════════════════════════════════════

interface BaogiaWebProps {
  /** Render header tùy chỉnh — nếu không truyền, dùng header tối giản */
  renderHeader?: () => ReactNode;
  /** Render footer tùy chỉnh */
  renderFooter?: () => ReactNode;
  /** ID plan khởi đầu ("W-01" | "W-02" | "W-03" | "W-04"), default "W-03" */
  initialPlan?: string;
}

export default function BaogiaWeb({ renderHeader, renderFooter, initialPlan = "W-03" }: BaogiaWebProps) {
  const initPkg = PACKAGES.find((p) => p.id === initialPlan) ?? PACKAGES[2];

  const [mode,     setMode]     = useState<"thue" | "mua">("thue");
  const [pkg,      setPkg]      = useState(initPkg);
  const [rentPkg,  setRentPkg]  = useState(RENT_PACKAGES[2]);
  const [domain,   setDomain]   = useState(0);
  const [hosting,  setHosting]  = useState(0);
  const [ssl,      setSsl]      = useState(0);
  const [seo,      setSeo]      = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [success,  setSuccess]  = useState(false);
  const [custName, setCustName] = useState("");
  const [custPhone,setCustPhone]= useState("");

  const isRentalMode = mode === "thue";
  const activePkg: AnyPkg = isRentalMode ? rentPkg : pkg;

  const subtotal = isRentalMode ? rentPkg.price : pkg.price + domain + hosting + ssl + (seo ? 500000 : 0);
  const total    = isRentalMode ? rentPkg.price : subtotal + Math.round(subtotal * 0.1);

  const handleModeChange = (next: "thue" | "mua") => {
    setMode(next);
    setDomain(0); setHosting(0); setSsl(0); setSeo(false);
  };

  const handleSuccess = (n: string, p: string) => {
    setCustName(n); setCustPhone(p);
    setShowForm(false); setSuccess(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div style={{ backgroundColor: CONFIG.bg, minHeight: "100vh", color: CONFIG.text, fontFamily: "'Be Vietnam Pro', sans-serif" }}>
      <style>{KEYFRAMES}</style>

      {renderHeader && renderHeader()}

      {/* ── HERO ── */}
      {!success && (
        <section style={{ position: "relative", height: "56vh", minHeight: 420, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
          <img src={CONFIG.heroImageUrl} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom, var(--vw-bg-nav, rgba(2,2,2,0.55)) 0%, ${CONFIG.bg} 100%)` }} />
          <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 25% 60%, ${a(0.2)} 0%, transparent 50%)` }} />
          <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${CONFIG.gridline} 1px, transparent 1px), linear-gradient(90deg, ${CONFIG.gridline} 1px, transparent 1px)`, backgroundSize: "60px 60px", pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: "5%", right: "8%", width: 460, height: 460, borderRadius: "50%", background: `radial-gradient(circle, ${a(0.18)} 0%, transparent 70%)`, filter: "blur(50px)", animation: "bw-floatOrb 9s ease-in-out infinite" }} />

          <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "0 24px", maxWidth: 680 }}>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: a(0.15), border: `1px solid ${a(0.3)}`, borderRadius: 40, padding: "6px 16px", marginBottom: 22 }}>
                <FileText size={12} color={CONFIG.accent} />
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: CONFIG.accent, textTransform: "uppercase" }}>Cấu hình & Báo giá chi tiết</span>
              </div>
              <h1 style={{ color: CONFIG.text, fontSize: "clamp(30px,5vw,60px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.1, margin: "0 0 16px" }}>
                Chọn Gói Website<br /><span style={{ color: CONFIG.accent }}>Phù Hợp</span> Với Bạn
              </h1>
              <p style={{ color: CONFIG.text60, fontSize: "clamp(13px,1.5vw,16px)", lineHeight: 1.75, margin: 0 }}>
                Bấm chọn gói bên dưới — cột phải hiển thị ngay toàn bộ thông tin, tính năng và báo giá chi tiết.
              </p>
            </motion.div>
          </div>
        </section>
      )}

      {/* ── SUCCESS ── */}
      {success && (
        <div style={{ paddingTop: 80 }}>
          <SuccessScreen name={custName} phone={custPhone} pkg={activePkg} total={total}
            onBack={() => { setSuccess(false); setCustName(""); setCustPhone(""); }} />
        </div>
      )}

      {/* ── MAIN 2-COLUMN ── */}
      {!success && (
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "60px 24px 100px", display: "grid", gridTemplateColumns: "1fr 380px", gap: 32, alignItems: "start" }} className="bw-main-grid">

          {/* LEFT */}
          <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>

            {/* Tab switcher */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: CONFIG.text35, textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 10px" }}>Hình thức thanh toán</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, background: CONFIG.glassBg, border: `1px solid ${CONFIG.border}`, borderRadius: 18, padding: 5 }}>
                {([
                  { id: "thue", label: "Thuê website",    sub: "Thanh toán hàng tháng", Icon: RefreshCw },
                  { id: "mua",  label: "Mua gói website", sub: "Thanh toán một lần",    Icon: CreditCard },
                ] as const).map(({ id, label, sub, Icon }) => (
                  <motion.button key={id} type="button" onClick={() => handleModeChange(id)} whileTap={{ scale: 0.97 }}
                    style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 18px", borderRadius: 14, border: "none", cursor: "pointer", textAlign: "left", background: mode === id ? CONFIG.accent : "transparent", transition: "background 0.25s, box-shadow 0.25s", boxShadow: mode === id ? `0 4px 20px ${a(0.35)}` : "none" }}>
                    <div style={{ width: 38, height: 38, borderRadius: 10, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: mode === id ? "rgba(255,255,255,0.2)" : a(0.10) }}>
                      <Icon size={17} color={mode === id ? "#fff" : CONFIG.accent} />
                    </div>
                    <div>
                      <motion.p animate={{ scale: mode === id ? [1.05, 1] : 1 }} transition={{ duration: 0.2 }} style={{ fontSize: 14, fontWeight: 800, color: mode === id ? "#fff" : CONFIG.text, margin: "0 0 2px", letterSpacing: "-0.01em", transformOrigin: "left center" }}>{label}</motion.p>
                      <motion.p animate={{ opacity: mode === id ? [0.5, 1] : 1 }} transition={{ duration: 0.2 }} style={{ fontSize: 11, color: mode === id ? "rgba(255,255,255,0.7)" : CONFIG.text35, margin: 0 }}>{sub}</motion.p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Step 01 */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
                <span style={{ width: 28, height: 28, borderRadius: 8, background: CONFIG.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "#fff", flexShrink: 0 }}>01</span>
                <h2 style={{ color: CONFIG.text, fontSize: 18, fontWeight: 800, letterSpacing: "-0.02em", margin: 0 }}>Chọn gói dịch vụ</h2>
                <span style={{ fontSize: 12, color: CONFIG.text35 }}>— Bấm để xem chi tiết →</span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div key={mode} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3, ease: EASE }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }} className="bw-pkg-grid">
                    {(isRentalMode ? RENT_PACKAGES : PACKAGES).map((p, i) => (
                      <PackageCard key={p.id} p={p} idx={i} isRentalMode={isRentalMode}
                        active={isRentalMode ? rentPkg.id === p.id : pkg.id === p.id}
                        onClick={() => isRentalMode ? setRentPkg(p as typeof RENT_PACKAGES[0]) : setPkg(p as typeof PACKAGES[0])} />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Step 02 — add-ons (chỉ "mua") */}
            <AnimatePresence>
              {!isRentalMode && (
                <motion.div key="addons" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3, ease: EASE }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                    <span style={{ width: 28, height: 28, borderRadius: 8, background: CONFIG.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "#fff", flexShrink: 0 }}>02</span>
                    <h2 style={{ color: CONFIG.text, fontSize: 18, fontWeight: 800, letterSpacing: "-0.02em", margin: 0 }}>Dịch vụ cộng thêm</h2>
                    <span style={{ fontSize: 12, color: CONFIG.text35 }}>— Tuỳ chọn</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <AddonRow icon={Globe}       label="Đăng ký tên miền"        desc="Domain mới cho website"         options={DOMAIN_OPTS}  value={domain}  onChange={setDomain} />
                    <AddonRow icon={Server}      label="Hosting NVMe"             desc="Nâng cấp dung lượng cloud"      options={HOSTING_OPTS} value={hosting} onChange={setHosting} />
                    <AddonRow icon={ShieldCheck} label="SSL & CDN"                desc="Bảo mật + tăng tốc toàn cầu"   options={SSL_OPTS}      value={ssl}     onChange={setSsl} />
                    {/* SEO checkbox */}
                    <motion.div whileHover={{ y: -2 }} onClick={() => setSeo(!seo)}
                      style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", borderRadius: 14, background: seo ? a(0.06) : CONFIG.glassBg, border: `1px solid ${seo ? CONFIG.accent : CONFIG.border}`, cursor: "pointer", transition: "all 0.2s" }}>
                      <div style={{ width: 36, height: 36, borderRadius: 10, background: a(0.1), display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Search size={16} color={CONFIG.accent} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: 13, fontWeight: 700, color: CONFIG.text, margin: "0 0 1px" }}>Tối ưu SEO On-page</p>
                        <p style={{ fontSize: 11, color: CONFIG.text35, margin: 0 }}>Schema markup, meta tags, tốc độ tải trang</p>
                      </div>
                      <span style={{ fontSize: 13, fontWeight: 800, color: CONFIG.accent, flexShrink: 0 }}>+500.000đ</span>
                      <div style={{ width: 22, height: 22, borderRadius: 6, background: seo ? CONFIG.accent : "transparent", border: `2px solid ${seo ? CONFIG.accent : CONFIG.borderM}`, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s", flexShrink: 0 }}>
                        {seo && <Check size={12} color="#fff" strokeWidth={3} />}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Hint */}
            <motion.div animate={{ x: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity }}
              style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 18px", borderRadius: 14, background: a(0.06), border: `1px solid ${a(0.15)}` }}>
              <Sparkles size={16} color={CONFIG.accent} />
              <span style={{ fontSize: 13, color: CONFIG.text60, lineHeight: 1.55 }}>
                <strong style={{ color: CONFIG.text }}>Xem cột bên phải</strong> — tính năng và báo giá cập nhật tức thì.
              </span>
              <ArrowRight size={16} color={CONFIG.accent} style={{ flexShrink: 0 }} />
            </motion.div>
          </div>

          {/* RIGHT: Preview */}
          <motion.div initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2, ease: EASE }}>
            <PreviewPanel pkg={activePkg} domain={domain} hosting={hosting} ssl={ssl} seo={seo} onSubmit={() => setShowForm(true)} />
          </motion.div>
        </div>
      )}

      {renderFooter ? renderFooter() : (
        <footer style={{ borderTop: `1px solid ${CONFIG.border}`, padding: "32px 24px", textAlign: "center" }}>
          <p style={{ fontSize: 12, color: CONFIG.text35, margin: 0 }}>© 2026 {CONFIG.brand} · {CONFIG.companyDesc}</p>
        </footer>
      )}

      <AnimatePresence>
        {showForm && (
          <FormModal pkg={activePkg} total={total} onClose={() => setShowForm(false)} onSuccess={handleSuccess} />
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 960px) { .bw-main-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 560px) { .bw-pkg-grid  { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
