import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { ChevronRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionBg, Orb, GridPattern } from "@/components/ui/SectionBg";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SERVICES } from "@/features/legacy-core/data";
import { IMG } from "@/features/legacy-core/images";
import { RED, TEXT, TEXT60, BORDER, GLASS, EASE } from "@/features/legacy-core/tokens";

function ServiceCard({ svc, index }: { svc: typeof SERVICES[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const Icon = svc.icon;
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 36, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: index * 0.09, duration: 0.68, ease: EASE }}
      className="svc-card"
      style={{ ...GLASS, borderRadius: 18, display: "flex", flexDirection: "column", overflow: "hidden", cursor: "default" }}
      whileHover={{ y: -6, transition: { duration: 0.28 } } as any}>
      <div style={{ height: 155, overflow: "hidden", position: "relative" }}>
        <img src={svc.img} alt={svc.name} className="svc-img" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 40%, rgba(8,8,8,0.9) 100%)" }} />
        {svc.tag && (
          <span style={{ position: "absolute", top: 10, right: 10, fontSize: 10, fontWeight: 700, color: "#fff", backgroundColor: RED, padding: "3px 9px", borderRadius: 20 }}>
            {svc.tag.toUpperCase()}
          </span>
        )}
        <div style={{ position: "absolute", bottom: 10, left: 12, width: 32, height: 32, borderRadius: 8, backgroundColor: RED, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon size={15} color="#fff" />
        </div>
      </div>
      <div style={{ padding: "16px 18px", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
        <h3 style={{ color: TEXT, fontSize: 14, fontWeight: 600, margin: 0, letterSpacing: "-0.02em" }}>{svc.name}</h3>
        <p style={{ color: TEXT60, fontSize: 12, lineHeight: 1.65, margin: 0, flex: 1 }}>{svc.desc}</p>
        <div style={{ paddingTop: 10, borderTop: `1px solid ${BORDER}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ color: TEXT, fontSize: 12, fontWeight: 600 }}>{svc.price}</span>
          <span style={{ display: "flex", alignItems: "center", gap: 3, color: RED, fontSize: 12, fontWeight: 500 }}>
            Chi tiết <ChevronRight size={12} />
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export function ServicesSection() {
  return (
    <section id="dich-vu" style={{ position: "relative", padding: "96px 20px", overflow: "hidden" }}>
      <SectionBg src={IMG.svcBg} overlayOpacity={0.84} />
      <GridPattern opacity={0.03} />
      <Orb size={600} opacity={0.12} top="-10%" left="-10%" />
      <Orb size={400} opacity={0.08} bottom="-5%" right="-5%" delay={3} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto" }}>
        <Reveal style={{ textAlign: "center", marginBottom: 56 }}>
          <SectionLabel>Dịch vụ của chúng tôi</SectionLabel>
          <h2 style={{ color: TEXT, fontSize: "clamp(26px,3.5vw,46px)", fontWeight: 700, letterSpacing: "-0.035em", margin: "0 0 14px", lineHeight: 1.12 }}>
            Mọi thứ bạn cần<br />cho một website hiệu quả
          </h2>
          <p style={{ color: TEXT60, fontSize: 15, lineHeight: 1.7, maxWidth: 440, margin: "0 auto" }}>
            Từ thiết kế đến vận hành — chúng tôi lo toàn bộ, bạn tập trung kinh doanh.
          </p>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(270px,1fr))", gap: 16 }}>
          {SERVICES.map((svc, i) => <ServiceCard key={i} svc={svc} index={i} />)}
        </div>
      </div>
    </section>
  );
}
