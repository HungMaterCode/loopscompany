"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, User } from "lucide-react";
import { NAV_LINKS } from "@/features/legacy-core/data";
import { RED, TEXT, TEXT60, BORDER, GLASS_LIGHT, EASE } from "@/features/legacy-core/tokens";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const goTo = (href: string, e: React.MouseEvent) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    if (pathname !== "/") {
      window.location.href = `/${href}`;
      return;
    }
    document.getElementById(href.slice(1))?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        padding: "12px 20px",
        transition: "background 0.3s",
        ...(scrolled ? GLASS_LIGHT : {}),
        borderBottom: scrolled ? `1px solid ${BORDER}` : "none",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", flexShrink: 0 }}>
          <span style={{ color: RED, fontWeight: 800, fontSize: 18 }}>LOOP</span>
        </Link>
        <Link href="/dang-nhap" style={{ color: TEXT60, textDecoration: "none", fontSize: 13 }}>
          <User size={18} />
        </Link>
      </div>
    </nav>
  );
}
