import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Star } from "lucide-react";
import { Reveal } from "../components/ui/Reveal";
import { SectionBg, Orb } from "../components/ui/SectionBg";
import { SectionLabel } from "../components/ui/SectionLabel";
import { TESTIMONIALS } from "../data";
import { IMG } from "../images";
import { useSiteData } from "../SiteDataContext";
import { RED, TEXT, TEXT60, TEXT35, BORDER, GLASS, GLASS_LIGHT, EASE } from "../tokens";

function TestiCard({ t, index }: { t: typeof TESTIMONIALS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 32, scale: 0.94 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: index * 0.15, duration: 0.68, ease: EASE }}
      style={{ ...GLASS_LIGHT, borderRadius: 20, padding: 26, display: "flex", flexDirection: "column", gap: 16 }}
      whileHover={{ y: -5, transition: { duration: 0.3 } } as any}>
      <div style={{ display: "flex", gap: 2 }}>
        {[1,2,3,4,5].map(s => <Star key={s} size={13} fill={RED} color={RED} />)}
      </div>
      <p style={{ color: TEXT60, fontSize: 13.5, lineHeight: 1.78, flex: 1, margin: 0, fontStyle: "italic" }}>"{t.text}"</p>
      <div style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 14, borderTop: `1px solid ${BORDER}` }}>
        <div style={{ width: 40, height: 40, borderRadius: "50%", backgroundColor: RED, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#fff", flexShrink: 0 }}>
          {t.initials}
        </div>
        <div>
          <p style={{ color: TEXT, fontSize: 13, fontWeight: 600, margin: "0 0 2px" }}>{t.name}</p>
          <p style={{ color: TEXT35, fontSize: 11, margin: 0 }}>{t.role}</p>
        </div>
      </div>
    </motion.div>
  );
}

export function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const { config } = useSiteData();

  return (
    <section style={{ position: "relative", padding: "100px 24px", overflow: "hidden" }}>
      <SectionBg src={config.oldSections.testimonialsBg} overlayOpacity={0.78} />
      <Orb size={600} opacity={0.12} top="-10%" right="-10%" delay={2} />
      <Orb size={350} opacity={0.09} bottom="0%" left="10%" delay={5} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto" }}>
        <div ref={ref} style={{ textAlign: "center", marginBottom: 52 }}>
          <Reveal>
            <SectionLabel>Khách hàng nói gì</SectionLabel>
            <motion.h2 style={{ color: TEXT, fontSize: "clamp(28px,3.5vw,48px)", fontWeight: 700, letterSpacing: "-0.035em", margin: 0, lineHeight: 1.12 }}
              initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1, duration: 0.6, ease: EASE }}>
              Hơn 500 doanh nghiệp<br />đã thay đổi nhờ website
            </motion.h2>
          </Reveal>
        </div>

        <Reveal style={{ marginBottom: 44, borderRadius: 24, overflow: "hidden", height: 220, position: "relative" }} direction="scale">
          <img src={IMG.nightShop} alt="TP.HCM về đêm" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, ...GLASS, borderRadius: 0 }} />
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {[["500+","Doanh nghiệp phục vụ"],["98%","Tỷ lệ hài lòng"],["8+","Năm kinh nghiệm"],["24/7","Hỗ trợ Zalo"]].map(([n, l], i) => (
              <div key={l} style={{ flex: 1, textAlign: "center", padding: "0 12px", borderRight: i < 3 ? `1px solid ${BORDER}` : "none" }}>
                <div style={{ color: TEXT, fontSize: 36, fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1 }}>{n}</div>
                <div style={{ color: TEXT60, fontSize: 12, marginTop: 8 }}>{l}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 18 }}>
          {TESTIMONIALS.map((t, i) => <TestiCard key={i} t={t} index={i} />)}
        </div>
      </div>
    </section>
  );
}
