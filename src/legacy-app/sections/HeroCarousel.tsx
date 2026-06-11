import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { BrowserMockup } from "../components/ui/BrowserMockup";
import { IMG } from "../images";
import { useSiteData } from "../SiteDataContext";
import { RED, RED_DIM, TEXT, TEXT60, TEXT35, BORDER, BORDER_M, GLASS, EASE } from "../tokens";

const SLIDE_DURATION = 6000;

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const { config } = useSiteData();

  useEffect(() => {
    setProgress(0);
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const pct = Math.min((now - start) / SLIDE_DURATION, 1);
      setProgress(pct);
      const len = config.hero.slides.length || 1;
      if (pct < 1) raf = requestAnimationFrame(tick);
      else setCurrent(c => (c + 1) % len);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [current, config.hero.slides.length]);

  const slide = config.hero.slides[current];
  if (!slide) return null;
  const bgSrc = slide.bgUrl;

  // Hardcode mockups per slide index since we didn't add them to config yet
  const mockups = [
    { ui1: IMG.ui1, ui2: IMG.ui3 },
    { ui1: IMG.ui2, ui2: IMG.ui5 },
    { ui1: IMG.ui4, ui2: IMG.ui6 },
  ][current % 3];

  return (
    <section data-theme="dark" style={{ position: "relative", height: "100vh", minHeight: 580, overflow: "hidden", backgroundColor: "var(--vw-bg)" }}>
      {/* Ken Burns background */}
      <AnimatePresence mode="sync">
        <motion.div key={`bg-${current}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.2 }}
          style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <img src={bgSrc} alt="" key={`img-${current}`} className="hero-kb"
            style={{ position: "absolute", inset: 0, transformOrigin: "center center" }} />
        </motion.div>
      </AnimatePresence>

      {/* Overlays */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(110deg,rgba(2,2,2,0.96) 0%,rgba(2,2,2,0.80) 50%,rgba(2,2,2,0.45) 100%)", zIndex: 1 }} />
      <div style={{ position: "absolute", top: "15%", left: "-5%", width: 700, height: 700, background: `radial-gradient(circle,rgba(212,59,31,0.20) 0%,transparent 70%)`, zIndex: 1, pointerEvents: "none", animation: "floatOrb 9s ease-in-out infinite" }} />
      <div style={{ position: "absolute", bottom: "-10%", right: "5%", width: 500, height: 500, background: `radial-gradient(circle,rgba(212,59,31,0.09) 0%,transparent 70%)`, zIndex: 1, pointerEvents: "none", animation: "floatOrb2 11s ease-in-out infinite" }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 3, height: "100%", display: "flex", alignItems: "center", maxWidth: 1280, margin: "0 auto", width: "100%", padding: "80px 20px 80px", boxSizing: "border-box" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center", width: "100%" }} className="hero-grid">
          {/* Left */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div key={`content-${current}`} initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.6, ease: EASE }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, backgroundColor: RED_DIM, border: "1px solid rgba(212,59,31,0.3)", borderRadius: 40, padding: "6px 14px", marginBottom: 24 }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", backgroundColor: RED, animation: "pulse 2s ease infinite" }} />
                  <span style={{ color: RED, fontSize: 12, fontWeight: 600, letterSpacing: "0.02em" }}>{slide.badge}</span>
                </div>

                <h1 style={{ color: slide.textColor || TEXT, fontSize: "clamp(30px,4.5vw,60px)", fontWeight: 700, lineHeight: 1.08, letterSpacing: "-0.03em", margin: "0 0 20px" }}>
                  {[slide.title1, slide.title2, slide.title3].filter(Boolean).map((line, li) => (
                    <span key={li} style={{ display: "block", color: li === slide.accentIndex ? (slide.accentColor || RED) : (slide.textColor || TEXT) }}>{line}</span>
                  ))}
                </h1>

                <p style={{ color: TEXT60, fontSize: "clamp(13px,1.4vw,16px)", lineHeight: 1.75, margin: "0 0 32px", maxWidth: 440 }}>{slide.sub}</p>

                <div className="hero-ctas" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <button style={{ display: "flex", alignItems: "center", gap: 8, backgroundColor: RED, color: "#fff", border: "none", borderRadius: 40, padding: "12px 22px", fontSize: 14, fontWeight: 600, cursor: "pointer", transition: "background-color 0.2s" }}
                    onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "#bb3218")}
                    onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = RED)}>
                    {slide.cta} <ArrowRight size={14} />
                  </button>
                  <button style={{ display: "flex", alignItems: "center", gap: 8, backgroundColor: "transparent", color: TEXT, border: `1px solid ${BORDER_M}`, borderRadius: 40, padding: "12px 20px", fontSize: 14, fontWeight: 500, cursor: "pointer" }}>
                    Xem danh mục
                  </button>
                </div>

                <div className="hero-stats" style={{ display: "flex", gap: 28, marginTop: 40, paddingTop: 24, borderTop: `1px solid ${BORDER}`, flexWrap: "wrap" }}>
                  {[["500+","Dự án"],["5 ngày","Giao hàng"],["24/7","Hỗ trợ"]].map(([n,l]) => (
                    <div key={l}>
                      <div style={{ color: TEXT, fontSize: 20, fontWeight: 700, letterSpacing: "-0.03em" }}>{n}</div>
                      <div style={{ color: TEXT35, fontSize: 11, marginTop: 2 }}>{l}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right – floating mockups */}
          <AnimatePresence mode="wait">
            <motion.div key={`mockups-${current}`} initial={{ opacity: 0, x: 36, scale: 0.95 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.7, ease: EASE }}
              style={{ position: "relative", height: 460 }} className="hero-mockup">
              <div className="mockup-f1" style={{ position: "absolute", top: 0, left: 0, right: 30 }}>
                <BrowserMockup src={mockups.ui1} />
              </div>
              <div className="mockup-f2" style={{ position: "absolute", bottom: 0, right: 0, left: 50, zIndex: 2 }}>
                <BrowserMockup src={mockups.ui2} style={{ boxShadow: "0 28px 80px rgba(0,0,0,0.85)" }} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Progress + dots */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 4 }}>
        <div style={{ height: 2, backgroundColor: "var(--vw-ghost-md)" }}>
          <motion.div key={`prog-${current}`} initial={{ width: "0%" }} animate={{ width: `${progress * 100}%` }}
            style={{ height: "100%", backgroundColor: RED }} transition={{ duration: 0.05 }} />
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, padding: "14px 20px 20px" }}>
          <button onClick={() => setCurrent(c => (c - 1 + config.hero.slides.length) % config.hero.slides.length)}
            style={{ width: 32, height: 32, borderRadius: "50%", ...GLASS, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: TEXT, border: "none" }}>
            <ChevronLeft size={14} />
          </button>
          <div style={{ display: "flex", gap: 7 }}>
            {config.hero.slides.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)}
                style={{ width: i === current ? 22 : 7, height: 7, borderRadius: 4, border: "none", cursor: "pointer", backgroundColor: i === current ? RED : "var(--vw-ghost-22)", transition: "all 0.3s ease" }} />
            ))}
          </div>
          <button onClick={() => setCurrent(c => (c + 1) % config.hero.slides.length)}
            style={{ width: 32, height: 32, borderRadius: "50%", ...GLASS, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: TEXT, border: "none" }}>
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}
