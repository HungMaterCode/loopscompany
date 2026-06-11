import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Star, BarChart2 } from "lucide-react";
import { Reveal, RevealText } from "@/components/ui/Reveal";
import { SectionBg, Orb } from "@/components/ui/SectionBg";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { WHY_POINTS } from "@/legacy-app/data";
import { IMG } from "@/legacy-app/images";
import { useSiteData } from "@/legacy-app/SiteDataContext";
import { RED, RED_DIM, TEXT, TEXT60, TEXT35, BORDER_M, GLASS, GLASS_LIGHT, EASE } from "@/legacy-app/tokens";

export function WhySection() {
  const imgRef = useRef<HTMLDivElement>(null);
  const imgInView = useInView(imgRef, { once: true, margin: "-60px" });
  const { config } = useSiteData();

  return (
    <section id="about" style={{ position: "relative", padding: "96px 20px", overflow: "hidden" }}>
      <SectionBg src={config.oldSections.whyBg} overlayOpacity={0.80} />
      <Orb size={700} opacity={0.35} color="var(--sc-orb-1-bg)" top="0%" right="-15%" delay={1} />
      <Orb size={350} opacity={0.30} color="var(--sc-orb-3-bg)" bottom="10%" left="-5%" delay={4} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }} className="why-grid">
        {/* Image */}
        <motion.div ref={imgRef}
          initial={{ opacity: 0, x: -36, scale: 0.95 }}
          animate={imgInView ? { opacity: 1, x: 0, scale: 1 } : {}}
          transition={{ duration: 0.78, ease: EASE }}
          style={{ position: "relative" }}>
          <div style={{ borderRadius: 22, overflow: "hidden", aspectRatio: "4/5", boxShadow: "0 32px 80px rgba(0,0,0,0.6)" }}>
            <img src={IMG.owner} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(2,2,2,0.5) 0%,transparent 55%)" }} />
          </div>
          {/* Stat card 1 */}
          <motion.div initial={{ opacity: 0, scale: 0.85, x: -16 }} animate={imgInView ? { opacity: 1, scale: 1, x: 0 } : {}} transition={{ delay: 0.45, duration: 0.6, ease: EASE }}
            className="premium-glass"
            style={{ position: "absolute", bottom: 28, left: -28, borderRadius: 14, padding: "14px 18px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, backgroundColor: RED, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <BarChart2 size={17} color="#fff" />
              </div>
              <div>
                <div style={{ color: TEXT, fontSize: 18, fontWeight: 700, letterSpacing: "-0.03em" }}>+40%</div>
                <div style={{ color: TEXT35, fontSize: 11 }}>Tăng khách tháng đầu</div>
              </div>
            </div>
          </motion.div>
          {/* Stat card 2 */}
          <motion.div initial={{ opacity: 0, scale: 0.85, x: 16 }} animate={imgInView ? { opacity: 1, scale: 1, x: 0 } : {}} transition={{ delay: 0.6, duration: 0.6, ease: EASE }}
            className="premium-glass"
            style={{ position: "absolute", top: 24, right: -24, borderRadius: 14, padding: "12px 16px" }}>
            <div style={{ display: "flex", gap: 1, marginBottom: 5 }}>
              {[1,2,3,4,5].map(s => <Star key={s} size={11} fill={RED} color={RED} />)}
            </div>
            <div style={{ color: TEXT, fontSize: 12, fontWeight: 600 }}>98% hài lòng</div>
            <div style={{ color: TEXT35, fontSize: 10, marginTop: 2 }}>500+ khách hàng</div>
          </motion.div>
        </motion.div>

        {/* Text */}
        <div>
          <Reveal>
            <SectionLabel>Tại sao chọn Việt Web</SectionLabel>
            <h2 style={{ color: TEXT, fontSize: "clamp(24px,3vw,42px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.12, margin: "0 0 18px" }}>
              Chúng tôi hiểu<br />doanh nghiệp Việt
            </h2>
            <RevealText
              text="Hơn 8 năm phục vụ các doanh nghiệp vừa và nhỏ tại Việt Nam, chúng tôi hiểu bạn cần gì: một website đẹp, ra đơn hàng, dễ quản lý và giá phải chăng."
              color={TEXT60}
            />
          </Reveal>
          <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 12 }}>
            {WHY_POINTS.map((pt, i) => {
              const Icon = pt.icon;
              return (
                <Reveal key={i} delay={0.1 * (i + 1)} direction="right">
                  <div className="premium-glass" style={{ borderRadius: 14, padding: "14px 16px", display: "flex", gap: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 9, backgroundColor: RED_DIM, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon size={16} color={RED} />
                    </div>
                    <div>
                      <h4 style={{ color: TEXT, fontSize: 13, fontWeight: 600, margin: "0 0 3px", letterSpacing: "-0.01em" }}>{pt.title}</h4>
                      <p style={{ color: TEXT60, fontSize: 12, lineHeight: 1.6, margin: 0 }}>{pt.desc}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
