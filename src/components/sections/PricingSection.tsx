import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Check, X, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionBg, Orb, GridPattern } from "@/components/ui/SectionBg";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { PLANS } from "@/features/legacy-core/data";
import { RED, TEXT, TEXT60, TEXT35, BORDER, BORDER_M, GLASS, EASE } from "@/features/legacy-core/tokens";

type Plan = typeof PLANS[number];

function PlanCard({ plan, index }: { plan: Plan; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const hl = plan.highlight;
  const cardStyle: React.CSSProperties = hl
    ? { background: "var(--vw-hl-bg)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", border: "none", boxShadow: "0 0 40px rgba(212,59,31,0.35), 0 24px 64px rgba(0,0,0,0.6)" }
    : { ...GLASS };

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 36, scale: 0.94 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: index * 0.11, duration: 0.68, ease: EASE }}
      className={hl ? "glow-card" : ""}
      style={{ borderRadius: 20, display: "flex", flexDirection: "column", overflow: "hidden", position: "relative", minWidth: 0, ...cardStyle }}
      whileHover={{ y: -6, transition: { duration: 0.3 } } as any}>
      {hl && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,${RED},#ff7055)` }} />}
      <div style={{ padding: "22px 20px 0" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", color: hl ? "var(--vw-hl-sub)" : TEXT35, backgroundColor: hl ? "var(--vw-hl-div)" : BORDER_M, padding: "4px 10px", borderRadius: 20 }}>{plan.tag}</span>
          <span style={{ fontSize: 10, letterSpacing: "0.04em", color: hl ? "var(--vw-hl-sub)" : TEXT35, fontWeight: 600 }}>{plan.code}</span>
        </div>
        <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 10px", color: hl ? "var(--vw-hl-sub)" : TEXT35 }}>{plan.name}</p>
        <div style={{ marginBottom: 4 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
            <span style={{ fontSize: 30, fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1, color: hl ? "var(--vw-hl-text)" : TEXT }}>{plan.price}</span>
            <span style={{ fontSize: 13, color: hl ? "var(--vw-hl-sub)" : TEXT35 }}>₫/{plan.period}</span>
          </div>
          <p style={{ fontSize: 11, margin: "5px 0 0", color: hl ? "var(--vw-hl-sub)" : TEXT35 }}>Phí thiết lập: {plan.setupFee}</p>
        </div>
      </div>
      <div style={{ margin: "14px 20px", height: 1, backgroundColor: hl ? "var(--vw-hl-div)" : BORDER }} />
      <div style={{ padding: "0 20px", flex: 1 }}>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
          {plan.features.map((f, fi) => (
            <li key={fi} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
              <Check size={13} color={RED} style={{ marginTop: 2, flexShrink: 0 }} />
              <span style={{ fontSize: 12, lineHeight: 1.5, color: hl ? "var(--vw-hl-feat)" : TEXT60 }}>{f}</span>
            </li>
          ))}
          {plan.missing.map((f, fi) => (
            <li key={fi} style={{ display: "flex", alignItems: "flex-start", gap: 8, opacity: 0.3 }}>
              <X size={13} color={hl ? "var(--vw-hl-text)" : TEXT35} style={{ marginTop: 2, flexShrink: 0 }} />
              <span style={{ fontSize: 12, lineHeight: 1.5, textDecoration: "line-through", color: hl ? "var(--vw-hl-sub)" : TEXT35 }}>{f}</span>
            </li>
          ))}
        </ul>
      </div>
      <div style={{ padding: 20 }}>
        <button
          style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 7, backgroundColor: hl ? RED : "var(--vw-ghost-10)", color: hl ? "#fff" : TEXT, border: "none", borderRadius: 40, padding: "11px 20px", fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "background-color 0.2s", letterSpacing: "-0.01em" }}
          onMouseEnter={e => { if (!hl) (e.currentTarget as HTMLButtonElement).style.backgroundColor = "var(--vw-ghost-20)"; }}
          onMouseLeave={e => { if (!hl) (e.currentTarget as HTMLButtonElement).style.backgroundColor = "var(--vw-ghost-10)"; }}>
          Đăng ký ngay <ArrowRight size={14} />
        </button>
      </div>
    </motion.div>
  );
}

export function PricingSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <section id="bang-gia" style={{ position: "relative", padding: "100px 24px", overflow: "hidden" }}>
      <SectionBg src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920&q=75" overlayOpacity={0.88} />
      <GridPattern opacity={0.05} />
      <Orb size={600} opacity={0.14} top="-15%" left="20%" delay={0} />
      <Orb size={400} opacity={0.10} bottom="-10%" right="10%" delay={3} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto" }}>
        <div ref={ref} style={{ textAlign: "center", marginBottom: 60 }}>
          <Reveal>
            <SectionLabel>Bảng báo giá</SectionLabel>
            <motion.h2 style={{ color: TEXT, fontSize: "clamp(28px,3.5vw,48px)", fontWeight: 700, letterSpacing: "-0.035em", margin: "0 0 14px", lineHeight: 1.12 }}
              initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1, duration: 0.6, ease: EASE }}>
              Gói thuê website phù hợp<br />với mọi ngân sách
            </motion.h2>
            <motion.p style={{ color: TEXT60, fontSize: 15, maxWidth: 440, margin: "0 auto" }}
              initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2, duration: 0.5 }}>
              Không phí thiết lập. Không ràng buộc. Nâng cấp gói bất kỳ lúc nào.
            </motion.p>
          </Reveal>
        </div>

        <div className="plans-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 18, alignItems: "stretch" }}>
          {PLANS.map((plan, i) => <PlanCard key={plan.code} plan={plan} index={i} />)}
        </div>

        <motion.p style={{ textAlign: "center", color: TEXT35, fontSize: 12, marginTop: 28 }}
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.8 }}>
          Tất cả gói bao gồm bảo hành kỹ thuật 30 ngày • Giao website trong 5 ngày làm việc
        </motion.p>
      </div>
    </section>
  );
}
