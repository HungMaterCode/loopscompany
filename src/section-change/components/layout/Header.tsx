"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/legacy-app/theme-context';
import { SITE } from '@/lib/site';
import Link from 'next/link';

const F = "inherit";

const NAV = [
  { label: 'Dịch vụ', href: '/#services'  },
  { label: 'Dự án',   href: '/#portfolio' },
  { label: 'Báo giá', href: '/#pricing'   },
  { label: 'Đội ngũ', href: '/doi-ngu'    },
  { label: 'Bài viết', href: '/bai-viet'  },
  { label: 'Liên hệ', href: '/#lien-he'   },
];

function goTo(href: string, e: React.MouseEvent) {
  if (!href.startsWith('/#')) return;
  e.preventDefault();
  const id = href.slice(2);
  if (window.location.pathname !== '/') { window.location.href = href; return; }
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function Header() {
  const [hidden, setHidden] = useState(false);
  const [menu, setMenu]     = useState(false);
  const [isOverDark, setIsOverDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const lastY = useRef(0);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > lastY.current && y > 80);
      lastY.current = y;

      const headerEl = document.getElementById('main-nav-bar');
      if (headerEl) {
        const headerRect = headerEl.getBoundingClientRect();
        const headerCenterY = headerRect.top + headerRect.height / 2;
        let overDark = false;
        document.querySelectorAll('[data-theme="dark"]').forEach(sec => {
          const rect = sec.getBoundingClientRect();
          if (headerCenterY >= rect.top && headerCenterY <= rect.bottom) {
            overDark = true;
          }
        });
        setIsOverDark(overDark);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    // check on initial load
    setTimeout(onScroll, 100);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menu ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menu]);

  const textColor = isOverDark ? '#ffffff' : 'var(--sc-text)';
  const textMuted = isOverDark ? 'rgba(255, 255, 255, 0.75)' : 'var(--sc-text-60)';

  const btnBg = isOverDark
    ? 'rgba(255, 255, 255, 0.08)'
    : 'var(--sc-card-bg, rgba(255, 255, 255, 0.85))';

  const btnBorder = isOverDark
    ? 'rgba(255, 255, 255, 0.15)'
    : 'var(--sc-border, rgba(0, 0, 0, 0.08))';

  const btnHoverBg = isOverDark
    ? 'rgba(255, 255, 255, 0.18)'
    : 'rgba(0, 0, 0, 0.05)';

  const btnHoverBorder = isOverDark
    ? 'rgba(255, 255, 255, 0.3)'
    : 'var(--sc-accent, #FF6B9D)';

  return (
    <>
      <nav id="main-nav-bar" style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 300,
        padding: 'clamp(10px,2vw,16px) clamp(12px,4vw,24px)',
        transform: hidden ? 'translateY(-110%)' : 'translateY(0)',
        transition: 'transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94)',
      }}>
        <div className="liquid-glass" style={{
          maxWidth: '1000px', margin: '0 auto', borderRadius: '9999px',
          padding: 'clamp(8px,1.5vw,10px) clamp(14px,2vw,20px)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: 'var(--sc-header-bg, rgba(128, 128, 128, 0.15))',
          backdropFilter: 'blur(24px) saturate(180%)', WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          border: 'var(--sc-header-border, 1px solid rgba(128, 128, 128, 0.2))',
          boxShadow: 'var(--sc-header-shadow, 0 8px 32px rgba(0, 0, 0, 0.05))',
        }}>
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', flexShrink: 0 }}>
            <Globe size={18} color={textColor} style={{ transition: 'color 0.3s' }} />
            <span style={{ color: textColor, fontWeight: 800, fontSize: '15px', fontFamily: F, letterSpacing: '0.06em', transition: 'color 0.3s' }}>LOOPS</span>
          </Link>

          {/* Desktop links — hidden on mobile via display none at <768px */}
          <div style={{ gap: 'clamp(16px,2.5vw,28px)', alignItems: 'center' }} className="hidden md:flex">
            {NAV.map(l => (
              <Link key={l.label} href={l.href}
                onClick={e => goTo(l.href, e)}
                style={{ color: textMuted, fontSize: '13px', fontFamily: F, fontWeight: 600, textDecoration: 'none', transition: 'color 0.2s', whiteSpace: 'nowrap' }}
                onMouseEnter={e => e.currentTarget.style.color = textColor}
                onMouseLeave={e => e.currentTarget.style.color = textMuted}
              >{l.label}</Link>
            ))}
          </div>

          {/* Right side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              style={{
                background: btnBg,
                border: `1px solid ${btnBorder}`,
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: textColor,
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                padding: 0,
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'scale(1.08)';
                e.currentTarget.style.background = btnHoverBg;
                e.currentTarget.style.borderColor = btnHoverBorder;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.background = btnBg;
                e.currentTarget.style.borderColor = btnBorder;
              }}
            >
              {!mounted ? (
                <div style={{ width: 17, height: 17 }} />
              ) : isDark ? (
                <Sun size={17} />
              ) : (
                <Moon size={17} />
              )}
            </button>

            {/* Desktop CTA */}
            <Link href="/#pricing" onClick={e => goTo('/#pricing', e)}
              className="hidden md:flex"
              style={{
                alignItems: 'center', gap: '6px', borderRadius: '9999px', padding: '8px 20px',
                background: 'var(--sc-accent)', border: 'none',
                color: '#fff', fontSize: '13px', fontFamily: F, fontWeight: 700,
                textDecoration: 'none', transition: 'all 0.2s', letterSpacing: '0.02em', whiteSpace: 'nowrap',
                boxShadow: '0 4px 12px rgba(255,107,157,0.25)',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 16px rgba(255,107,157,0.4)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'none'; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 12px rgba(255,107,157,0.25)'; }}
            >Xem báo giá</Link>

            {/* Hamburger — visible on mobile */}
              <button
              onClick={() => setMenu(v => !v)}
              className="flex md:hidden"
              aria-label="Toggle menu"
              style={{
                background: 'none', border: 'none', color: textColor, transition: 'color 0.3s',
                cursor: 'pointer', padding: '6px',
                width: '36px', height: '36px', alignItems: 'center', justifyContent: 'center',
              }}
            >
              {menu ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {menu && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 290,
              background: 'var(--sc-bg-nav, rgba(8, 8, 12, 0.85))',
              backdropFilter: 'blur(32px) saturate(190%)',
              WebkitBackdropFilter: 'blur(32px) saturate(190%)',
              display: 'flex', flexDirection: 'column',
              padding: '80px 24px 40px',
              overflow: 'hidden',
            }}
          >
            {/* Embedded responsive CSS styles */}
            <style>{`
              @media (min-width: 768px) {
                .menu-content-grid {
                  grid-template-columns: 1.25fr 1fr !important;
                  align-items: center !important;
                }
                .menu-links-col {
                  align-items: flex-start !important;
                  text-align: left !important;
                }
                .menu-link-item {
                  justify-content: flex-start !important;
                }
              }
            `}</style>

            {/* Grid background lines */}
            <div style={{
              position: 'absolute', inset: 0, display: 'flex', justifyContent: 'space-between',
              pointerEvents: 'none', opacity: 0.04, padding: '0 8vw'
            }}>
              <div style={{ width: '1px', height: '100%', backgroundColor: 'var(--sc-text)' }} />
              <div style={{ width: '1px', height: '100%', backgroundColor: 'var(--sc-text)' }} />
              <div style={{ width: '1px', height: '100%', backgroundColor: 'var(--sc-text)' }} />
            </div>

            {/* Glowing background light */}
            <div style={{
              position: 'absolute', width: '600px', height: '600px',
              borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,107,157,0.08) 0%, rgba(0,0,0,0) 70%)',
              top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
              pointerEvents: 'none', filter: 'blur(80px)',
            }} />

            {/* Logo at top */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              style={{ position: 'absolute', top: '24px', left: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <Globe size={18} color="var(--sc-text)" />
              <span style={{ color: 'var(--sc-text)', fontWeight: 800, fontSize: '15px', fontFamily: F, letterSpacing: '0.06em' }}>LOOPS</span>
            </motion.div>

            {/* Close button */}
            <motion.button
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              whileHover={{ rotate: 90, scale: 1.1, backgroundColor: 'var(--sc-card-bg)', borderColor: 'var(--sc-accent)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setMenu(false)}
              style={{
                position: 'absolute', top: '20px', right: '20px',
                background: 'var(--sc-header-bg, rgba(128,128,128,0.1))',
                border: '1px solid var(--sc-border, rgba(128,128,128,0.2))',
                borderRadius: '50%', width: '40px', height: '40px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--sc-text)', cursor: 'pointer', transition: 'border-color 0.2s, background-color 0.2s',
                zIndex: 300,
              }}
            >
              <X size={18} />
            </motion.button>

            {/* Split Screen Grid */}
            <div style={{
              width: '100%', maxWidth: '960px', margin: 'auto',
              display: 'grid', gridTemplateColumns: '1fr', gap: '32px',
              position: 'relative', zIndex: 1, maxHeight: '80vh',
              overflowY: 'auto', padding: '20px 8px',
            }} className="menu-content-grid">
              
              {/* Left Column: Navigation Links */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'center', width: '100%' }} className="menu-links-col">
                <span style={{ color: 'var(--sc-accent)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '8px', fontFamily: F }}>
                  Danh mục điều hướng
                </span>
                
                {NAV.map((l, i) => (
                  <motion.div
                    key={l.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.05, duration: 0.4 }}
                    style={{ width: '100%' }}
                  >
                    <Link
                      href={l.href}
                      onClick={e => { goTo(l.href, e); setMenu(false); }}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '16px',
                        color: 'var(--sc-text)', fontSize: 'clamp(28px, 4.5vw, 38px)',
                        fontFamily: F, fontWeight: 800, textDecoration: 'none',
                        letterSpacing: '-0.03em', padding: '10px 20px', borderRadius: '16px',
                        transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                        width: '100%', boxSizing: 'border-box',
                        justifyContent: 'center',
                      }}
                      className="menu-link-item"
                      onMouseEnter={e => {
                        e.currentTarget.style.color = 'var(--sc-accent)';
                        e.currentTarget.style.background = 'var(--sc-card-bg, rgba(255,255,255,0.06))';
                        e.currentTarget.style.paddingLeft = '28px';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.color = 'var(--sc-text)';
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.paddingLeft = '20px';
                      }}
                    >
                      <span style={{ fontSize: '14px', fontFamily: 'monospace', color: 'var(--sc-accent)', opacity: 0.6, fontWeight: 500 }}>
                        0{i + 1}.
                      </span>
                      {l.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Right Column: Contact & Brand Cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
                
                {/* Brand Showcase Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  style={{
                    background: 'var(--sc-card-bg, rgba(255, 255, 255, 0.03))',
                    border: '1px solid var(--sc-border, rgba(128, 128, 128, 0.15))',
                    borderRadius: '24px', padding: '24px',
                    display: 'flex', flexDirection: 'column', gap: '12px',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Globe size={18} color="var(--sc-accent)" />
                    <span style={{ color: 'var(--sc-text)', fontWeight: 800, fontSize: '15px', fontFamily: F, letterSpacing: '0.06em' }}>LOOPS</span>
                    <span style={{
                      backgroundColor: 'rgba(255,107,157,0.12)', color: 'var(--sc-accent)',
                      fontSize: '9px', fontWeight: 700, padding: '3px 8px', borderRadius: '999px',
                      fontFamily: F, marginLeft: 'auto'
                    }}>
                      Cần Thơ
                    </span>
                  </div>
                  <p style={{ color: 'var(--sc-text-60)', fontSize: '13px', lineHeight: 1.6, margin: 0, fontFamily: F }}>
                    Thiết kế và thuê website chuyên nghiệp, chuẩn SEO, bàn giao nhanh trong 5 ngày.
                  </p>
                </motion.div>

                {/* Quick Contact Widget Grid */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  style={{
                    display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', width: '100%'
                  }}
                >
                  {/* Zalo Button */}
                  <a
                    href={`https://zalo.me/${SITE.zalo.replace(/[^\d]/g, "")}`}
                    target="_blank" rel="noopener noreferrer"
                    style={{
                      background: 'rgba(0, 104, 255, 0.08)', border: '1px solid rgba(0, 104, 255, 0.15)',
                      borderRadius: '16px', padding: '16px', display: 'flex', flexDirection: 'column',
                      gap: '8px', color: 'var(--sc-text)', textDecoration: 'none', transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0, 104, 255, 0.14)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0, 104, 255, 0.08)'; e.currentTarget.style.transform = 'none'; }}
                  >
                    <span style={{ color: '#0068FF', fontSize: '11px', fontWeight: 700, fontFamily: F }}>Nhắn Zalo →</span>
                    <span style={{ color: 'var(--sc-text-60)', fontSize: '12px', fontWeight: 500 }}>{SITE.zalo}</span>
                  </a>

                  {/* Email Button */}
                  <a
                    href={`mailto:${SITE.email}`}
                    style={{
                      background: 'rgba(255, 107, 157, 0.08)', border: '1px solid rgba(255, 107, 157, 0.15)',
                      borderRadius: '16px', padding: '16px', display: 'flex', flexDirection: 'column',
                      gap: '8px', color: 'var(--sc-text)', textDecoration: 'none', transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255, 107, 157, 0.14)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255, 107, 157, 0.08)'; e.currentTarget.style.transform = 'none'; }}
                  >
                    <span style={{ color: 'var(--sc-accent)', fontSize: '11px', fontWeight: 700, fontFamily: F }}>Gửi Email →</span>
                    <span style={{ color: 'var(--sc-text-60)', fontSize: '12px', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{SITE.email}</span>
                  </a>

                  {/* Hotline Button */}
                  <a
                    href={`tel:${SITE.hotline.replace(/[^\d+]/g, "")}`}
                    style={{
                      background: 'rgba(22, 163, 74, 0.08)', border: '1px solid rgba(22, 163, 74, 0.15)',
                      borderRadius: '16px', padding: '16px', display: 'flex', flexDirection: 'column',
                      gap: '8px', color: 'var(--sc-text)', textDecoration: 'none', transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(22, 163, 74, 0.14)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(22, 163, 74, 0.08)'; e.currentTarget.style.transform = 'none'; }}
                  >
                    <span style={{ color: '#16a34a', fontSize: '11px', fontWeight: 700, fontFamily: F }}>Gọi hotline →</span>
                    <span style={{ color: 'var(--sc-text-60)', fontSize: '12px', fontWeight: 500 }}>{SITE.hotline}</span>
                  </a>

                  {/* Google Map Button */}
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.address)}`}
                    target="_blank" rel="noopener noreferrer"
                    style={{
                      background: 'rgba(217, 119, 6, 0.08)', border: '1px solid rgba(217, 119, 6, 0.15)',
                      borderRadius: '16px', padding: '16px', display: 'flex', flexDirection: 'column',
                      gap: '8px', color: 'var(--sc-text)', textDecoration: 'none', transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(217, 119, 6, 0.14)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(217, 119, 6, 0.08)'; e.currentTarget.style.transform = 'none'; }}
                  >
                    <span style={{ color: '#d97706', fontSize: '11px', fontWeight: 700, fontFamily: F }}>Xem vị trí →</span>
                    <span style={{ color: 'var(--sc-text-60)', fontSize: '12px', fontWeight: 500 }}>{SITE.address}</span>
                  </a>
                </motion.div>

                {/* Pricing CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  style={{ width: '100%' }}
                >
                  <Link href="/#pricing"
                    onClick={e => { goTo('/#pricing', e); setMenu(false); }}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                      borderRadius: '9999px', padding: '14px 28px',
                      background: 'var(--sc-accent)',
                      color: '#fff', fontSize: '14px', fontFamily: F, fontWeight: 700,
                      textDecoration: 'none', width: '100%', boxSizing: 'border-box',
                      boxShadow: '0 8px 24px rgba(255,107,157,0.3)',
                      transition: 'all 0.3s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.boxShadow = '0 12px 28px rgba(255,107,157,0.45)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(255,107,157,0.3)'; }}
                  >
                    Xem báo giá dịch vụ →
                  </Link>
                </motion.div>
                
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
