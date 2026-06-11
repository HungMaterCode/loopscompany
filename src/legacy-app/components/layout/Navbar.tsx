import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, User } from "lucide-react";
import { NAV_LINKS } from "../../data";
import { RED, TEXT, TEXT60, BORDER, GLASS_LIGHT, EASE } from "../../tokens";

export function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const location = useLocation();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        backgroundColor: scrolled ? "var(--vw-bg-nav)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? `1px solid ${BORDER}` : "none",
        transition: "all 0.35s ease",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px", height: 64, display: "flex", alignItems: "center", gap: 32 }}>
          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", flexShrink: 0 }}>
            <div style={{ width: 34, height: 34, borderRadius: 8, backgroundColor: RED, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 12, fontWeight: 800, letterSpacing: "-0.04em" }}>
              LP
            </div>
            <span style={{ color: TEXT, fontWeight: 800, fontSize: 16, letterSpacing: "-0.04em" }}>LOOP</span>
          </Link>

          {/* Desktop links */}
          <div className="nav-links" style={{ flex: 1, justifyContent: "center", gap: 24 }}>
            {NAV_LINKS.map(link => {
              const active = link.isRoute && location.pathname === link.href;
              return link.isRoute ? (
                <Link key={link.label} href={link.href}
                  style={{ color: active ? TEXT : TEXT60, fontSize: 13, fontWeight: 500, textDecoration: "none", transition: "color 0.2s", borderBottom: active ? `1px solid ${RED}` : "none", paddingBottom: active ? 2 : 0 }}>
                  {link.label}
                </Link>
              ) : (
                <a key={link.label} href={link.href}
                  style={{ color: TEXT60, fontSize: 13, fontWeight: 500, textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = TEXT)}
                  onMouseLeave={e => (e.currentTarget.style.color = TEXT60)}>
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="nav-cta-btn" style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            <Link href="/dang-nhap"
              style={{ display: "flex", alignItems: "center", gap: 6, color: TEXT60, fontSize: 13, fontWeight: 500, textDecoration: "none", padding: "8px 14px", borderRadius: 40, border: `1px solid ${BORDER}`, transition: "all 0.2s", background: "var(--vw-ghost)" }}
              onMouseEnter={e => { e.currentTarget.style.color = TEXT; e.currentTarget.style.borderColor = "var(--vw-ghost-22)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = TEXT60; e.currentTarget.style.borderColor = BORDER; }}>
              <User size={13} /> Đăng nhập
            </Link>
            <button
              style={{ backgroundColor: RED, color: "#fff", border: "none", borderRadius: 40, padding: "9px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer", letterSpacing: "-0.01em", transition: "background-color 0.2s" }}
              onMouseEnter={e => ((e.currentTarget).style.backgroundColor = "var(--vw-accent-hover)")}
              onMouseLeave={e => ((e.currentTarget).style.backgroundColor = RED)}>
              Tư vấn miễn phí
            </button>
          </div>

          {/* Hamburger */}
          <button className="hamburger"
            onClick={() => setMenuOpen(v => !v)}
            style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: "var(--vw-ghost-md)", border: `1px solid ${BORDER}`, display: "none", alignItems: "center", justifyContent: "center", cursor: "pointer", color: TEXT, flexShrink: 0 }}>
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile slide-down menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.28, ease: EASE }}
            style={{
              position: "fixed", top: 64, left: 0, right: 0, zIndex: 99,
              ...GLASS_LIGHT, padding: "16px 20px 24px",
              borderTop: `1px solid ${BORDER}`,
            }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {NAV_LINKS.map(link =>
                link.isRoute ? (
                  <Link key={link.label} href={link.href} onClick={() => setMenuOpen(false)}
                    style={{ padding: "12px 14px", borderRadius: 10, color: TEXT, fontSize: 15, fontWeight: 500, textDecoration: "none", display: "block" }}>
                    {link.label}
                  </Link>
                ) : (
                  <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)}
                    style={{ padding: "12px 14px", borderRadius: 10, color: TEXT60, fontSize: 15, fontWeight: 500, textDecoration: "none", display: "block" }}>
                    {link.label}
                  </a>
                )
              )}
              <Link href="/dang-nhap" onClick={() => setMenuOpen(false)}
                style={{ marginTop: 4, display: "flex", alignItems: "center", justifyContent: "center", gap: 7, padding: "12px", borderRadius: 14, border: `1px solid ${BORDER}`, color: TEXT60, fontSize: 14, fontWeight: 500, textDecoration: "none", background: "var(--vw-ghost)" }}>
                <User size={14} /> Đăng nhập
              </Link>
              <button style={{ marginTop: 8, backgroundColor: RED, color: "#fff", border: "none", borderRadius: 40, padding: "13px", fontSize: 14, fontWeight: 600, cursor: "pointer", width: "100%" }}>
                Tư vấn miễn phí
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
